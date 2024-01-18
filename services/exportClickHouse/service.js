import AvitoStat from '../avitoStats/schemas/AvitoStat.js'
import { MongoClient } from 'mongodb'
import { ClickHouse } from 'clickhouse'

function ServiceToExportClickHouse({ config }) {
    const tableName = 'avitoItems'
    const schemas = new AvitoStat({ Schema })
    const clickHouse = new ClickHouse(config.horizen.clickhouse)

    const client = new MongoClient(`${config.horizen.mongodb.host}`)
    const avitoDb = client.db("avito")
    const avitoCollection = avitoDb.collection(tableName)
    const options = { ordered: true }

    function Schema(model) {

        this.model = model;
        this.toDataTypes = () => extract("type");
        this.toNormalizer = () => extract("normalizer");

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

    exportData(tableName)

    async function exportData(tableName) {
        const schema = await schemas.getModel(avitoCollection)

        await exportToClickhouse(tableName)

        async function exportToClickhouse(tableName) {
            console.log('Чистим clickhouse')
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
            console.log("Экспортируем в clickhouse");

            const collectionToExport = await avitoCollection.find().toArray();
            collectionToExport.map((item, index) => item._id = index)

            collectionToExport.map(async (item) => {
                try {
                    await clickHouse.insert(`
                INSERT INTO ${tableName} (${Object.keys(chSchema).join(", ")}) VALUES (${Object.values(item).join(", ")})`
                    ).toPromise()
                } catch (error) {
                    console.log(error)
                    throw new Error(error)
                }

            })
            console.log('Данные экспортированы');

        }
    }

    // async function selectData(tableName) {
    //     try {
    //         const r = await clickHouse.query(`SELECT * FROM ${tableName}`).toPromise()
    //         console.log(r);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}

export default ServiceToExportClickHouse