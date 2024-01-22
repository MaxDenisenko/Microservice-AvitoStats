import { expect } from "chai";
import { ClickHouse } from 'clickhouse'

export default Test;

function Test({ AvitoManager, db, health, config, ClickHouseManager }) {
	it(`Нормализация данных`, async () => {
		const clickHouse = new ClickHouseManager({ config, db, health, ClickHouse })
		const avitoManager = new AvitoManager({ db, health, config, clickHouse })
		const resCalls = [{
			"days": [
				{
					"answered": 0,
					"calls": 0,
					"date": "2020-04-01",
					"new": 0,
					"newAnswered": 0
				}
			],
			"employeeId": 0,
			"itemId": 1853257996,
			"user_id": 654654
		}]
		const resViewsContacts = [{
			"itemId": "1853257996",
			"stats": [
				{
					"date": "2020-04-01",
					"uniqContacts": 1,
					"uniqFavorites": 0,
					"uniqViews": 10
				},

			],
			"user_id": 654654
		}]
		const data = [{
			date: '2020-04-01',
			user_id: 654654,
			itemId: 1853257996,
			calls_answered: 0,
			calls: 0,
			calls_new: 0,
			calls_newAnswered: 0,
			uniqContacts: 1,
			uniqFavorites: 0,
			uniqViews: 10
		}]

		const result = await avitoManager.normalizeAndSaveToMongo(resCalls, resViewsContacts)

		expect(result).to.be.eql(data)

	});
}