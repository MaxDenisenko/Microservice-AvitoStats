import config from "../../config.json" assert {type: "json"};
import { MongoClient } from 'mongodb'

const tableName = 'avitoItems'
const client = new MongoClient(`${config.horizen.mongodb.host}`)
const avitoDb = client.db("avito")
const avitoCollection = avitoDb.collection(tableName)


async function StatsToApi({ dateFrom, dateTo, user_id, itemId }) {

    const findUserId = await avitoCollection.find({"user_id": user_id}).toArray()
    if(findUserId.length == 0) throw new Error('400')

    if (itemId.length > 0) {
        let results = itemId.map(item =>
            avitoCollection.find({
                "$and": [
                    { "user_id": user_id },
                    { "itemId": item },
                    {
                        "date": {
                            $gte: dateFrom,
                            $lte: dateTo
                        }
                    }
                ]
            }).toArray()
        )

        const result = Promise.all(results).then(responses => responses)

        return result
    }
    const result = await avitoCollection.find({
        "$and": [
            { "user_id": user_id },
            {
                "date": {
                    $gte: dateFrom,
                    $lte: dateTo
                }
            }
        ]

    }).toArray()

    return result

}

export default StatsToApi