import AvitoStat from "./AvitoStat.js"

function ClickHouseManager({ db, config, health, ClickHouse }) {
    const self = this

    const clickHouse = new ClickHouse(config.horizen.clickhouse)
    const tableName = 'avito'
    const schemas = new AvitoStat({ Schema })

    self.Schema = Schema
    self.exportStatsToClickHouse = exportStatsToClickHouse

    function Schema(model) {
        const self = this

        self.model = model;
        self.toDataTypes = () => extract("type");
        self.toNormalizer = () => extract("normalizer");

        function extract(subKey) {
            const result = {};

            for (let key in model) {
                result[key] = model[key][subKey];

                if (!result[key]) {
                    delete result[key];
                }
            }

            return result;
        }
    }

    async function exportStatsToClickHouse() {
        const schema = await schemas.getModel(db(tableName))
        const rExport = exportToClickhouse()

        async function exportToClickhouse() {

            const chSchema = schema.toDataTypes()
            const queries = [
                `DROP TABLE IF EXISTS ${tableName}`,

                `CREATE TABLE ${tableName} (
	                ${Object.keys(chSchema).map((key) => `${key} ${chSchema[key]}`).join(",\n")}
	            )

	            ENGINE = MergeTree
	            PRIMARY KEY (_id);`,
            ];

            for (const query of queries) {
                const r = await clickHouse.query(query).toPromise();
            }
            const collectionToExport = await db(tableName).find().toArray();
            collectionToExport.map((item, index) => item._id = index)

            const resultPromise = collectionToExport.map(async (item) => {
                try {
                    const result = await clickHouse.insert(`
                INSERT INTO ${tableName} (${Object.keys(chSchema).join(", ")}) VALUES (${Object.values(item).join(", ")})`
                    ).toPromise()
                    return result
                } catch (error) {
                    health.error(error)
                }

            })
            const resultOkMessage = 'Export to ClickHouse successfully'
            const resultError = 'Export to ClickHouse some Error'
            let resultObj = {}
            await Promise.all(resultPromise).then(item => {

                if (item[0].r === 1){
                    resultObj.r = 1
                }
            }
            )
            if (resultObj.r ==  1) {
                return resultOkMessage
            }
            return resultError
        }
        return rExport

    }


}
export default ClickHouseManager