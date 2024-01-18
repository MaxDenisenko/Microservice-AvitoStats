
import config from "../../../config.json" assert {type: "json"};
import { MongoClient } from 'mongodb'

const client = new MongoClient(`${config.horizen.mongodb.host}`)
const avitoDb = client.db("avito")
const avitoCollection = avitoDb.collection("avitoItems")

async function addZapis(data) {
    const options = { ordered: true }
    try {
        const findItem = await avitoCollection.findOne({ date: data.date, itemId: data.itemId })
        if (findItem) {
            return
        }
        const result = await avitoCollection.insertOne(data, options)
        console.log(`${result.insertedId} write`)
    } catch (error) {
        console.log(error)
    }

}
export default addZapis