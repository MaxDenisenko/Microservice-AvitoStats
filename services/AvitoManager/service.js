
function AvitoManager({ db, config, health, body, clickHouse }) {
    const self = this
    const tableName = 'avito'

    self.getAvitoStats = getAvitoStats
    self.normalizeAndSaveToMongo = normalizeAndSaveToMongo

    async function getAvitoStats() {
        health.info('Get data Avito')
        const userDataForAvito = config.horizen.avito

        if (userDataForAvito.length > 0) {
            let resCalls = []
            let resViewsContacts = []
            const result = await Promise.all(userDataForAvito.map(async (avito) => {
                try {

                    const responseCalls = await (await fetch(`https://api.avito.ru/core/v1/accounts/${avito.user_id}/calls/stats/`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${avito.userApiKey}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "dateFrom": body.dateFrom,
                            "dateTo": body.dateTo,
                            "itemId": body.itemId
                        })
                    })).json()
                    if (responseCalls.error) {
                        return responseCalls.error
                    }
                    if (responseCalls.result.status === false) {
                        return responseCalls.result
                    }

                    responseCalls.result.items && responseCalls.result.items.map((item) => resCalls.push({ ...item, user_id: avito.user_id }))

                    const responseViewsContacts = await (await fetch(`https://api.avito.ru/stats/v1/accounts/${avito.user_id}/items`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${avito.userApiKey}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "dateFrom": body.dateFrom,
                            "dateTo": body.dateTo,
                            "fields": [
                                "uniqContacts",
                                "uniqFavorites",
                                "uniqViews"
                            ],
                            "itemId": body.itemId,
                            "periodGrouping": "day"
                        })
                    })).json()
                    if (responseViewsContacts.error) {
                        return responseViewsContacts.error
                    }
                    if (responseViewsContacts.result.status === false) {
                        return responseViewsContacts.result
                    }
                    responseViewsContacts.result.items && responseViewsContacts.result.items.map(item => resViewsContacts.push({ ...item, user_id: avito.user_id }))

                } catch (error) {
                    health.error(error)
                }
            }))

            if (resCalls.length > 0 || resViewsContacts > 0) {
                const resultSave = await normalizeAndSaveToMongo(resCalls, resViewsContacts)
                return resultSave
            }
            return result

        }
        health.error('No data Avito user in config.json')

    }
    async function normalizeAndSaveToMongo(resCalls, resViewsContacts) {
        health.info('Normalize data')
        const normalaizeArray = []
        resCalls.map(item => {
            item.days.map(day => {
                normalaizeArray.push({
                    "date": day.date,
                    "user_id": item.user_id,
                    "itemId": item.itemId,
                    "calls_answered": day.answered,
                    "calls": day.calls,
                    "calls_new": day.new,
                    "calls_newAnswered": day.newAnswered
                })
            })
        })

        resViewsContacts.forEach(item => {
            item.stats.forEach((itemStats) => {
                const noData = ({ date, ...rest }) => rest
                const res = noData(itemStats)
                let newItem = normalaizeArray.find((itemFind) => itemFind.date === itemStats.date && itemFind.itemId === parseInt(item.itemId) && itemFind.user_id === item.user_id)
                newItem = Object.assign(newItem, res)
            })
        })
        health.info('Write data in MongoDb')

        // Определяем кол-во записей данных к загрузке
        let countArr = normalaizeArray.length

        const result = await Promise.all(normalaizeArray.map(async (item) => {
            await addRecord(item)
            if (item._id) {
                const no_id = ({ _id, ...rest }) => rest
                const newItem = no_id(item)
                return newItem
            }
            return item
        }))


        async function addRecord(dataset) {
            try {
                const findItem = await db(tableName).findOne({ date: dataset.date, itemId: dataset.itemId })
                if (findItem) {
                    return
                }
                const result = await db(tableName).insertOne(dataset)
                health.info(`Data write - ID: ${result.insertedId}`)
            } catch (error) {
                health.info(error)
            }
            finally {
                await countMongoCollection()
            }
        }
        async function countMongoCollection() {
            if (countArr == 1) {
                const r = await clickHouse.exportStatsToClickHouse()
                health.info(r)
            }
            countArr--
        }

        return result
    }


}
export default AvitoManager