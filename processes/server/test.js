import { assert } from "chai";
import startedProcess from "./process.js";


export default Test;

function Test({ config, db }) {
const mockData=[
	{
		"date": "2020-04-01",
		"user_id": 654654,
		"itemId": 1853257996,
		"calls_answered": 2,
		"calls": 0,
		"calls_new": 2,
		"calls_newAnswered": 0,
		"uniqContacts": 1,
		"uniqFavorites": 0,
		"uniqViews": 10
	},
	{
		"date": "2020-04-02",
		"user_id": 654654,
		"itemId": 1853257996,
		"calls_answered": 3,
		"calls": 0,
		"calls_new": 3,
		"calls_newAnswered": 0,
		"uniqContacts": 0,
		"uniqFavorites": 2,
		"uniqViews": 7
	},
	{
		"date": "2020-04-03",
		"user_id": 654654,
		"itemId": 1853257996,
		"calls_answered": 4,
		"calls": 0,
		"calls_new": 4,
		"calls_newAnswered": 0,
		"uniqContacts": 1,
		"uniqFavorites": 0,
		"uniqViews": 10
	},
	{
		"date": "2020-04-04",
		"user_id": 654654,
		"itemId": 1853257996,
		"calls_answered": 0,
		"calls": 0,
		"calls_new": 0,
		"calls_newAnswered": 0,
		"uniqContacts": 1,
		"uniqFavorites": 0,
		"uniqViews": 760
	},
	{
		"date": "2020-04-05",
		"user_id": 654654,
		"itemId": 1853257996,
		"calls_answered": 5,
		"calls": 0,
		"calls_new": 5,
		"calls_newAnswered": 0,
		"uniqContacts": 1,
		"uniqFavorites": 0,
		"uniqViews": 10
	},
	{
		"date": "2020-04-06",
		"user_id": 654654,
		"itemId": 1853257996,
		"calls_answered": 52,
		"calls": 2,
		"calls_new": 51,
		"calls_newAnswered": 10,
		"uniqContacts": 3,
		"uniqFavorites": 0,
		"uniqViews": 230
	},
	{
		"date": "2020-05-01",
		"user_id": 654654,
		"itemId": 1853257996,
		"calls_answered": 2,
		"calls": 0,
		"calls_new": 2,
		"calls_newAnswered": 0,
		"uniqContacts": 1,
		"uniqFavorites": 0,
		"uniqViews": 10
	},
	{
		"date": "2020-05-01",
		"user_id": 654654,
		"itemId": 1853212996,
		"calls_answered": 2,
		"calls": 0,
		"calls_new": 2,
		"calls_newAnswered": 0,
		"uniqContacts": 1,
		"uniqFavorites": 0,
		"uniqViews": 10
	},
	{
		"date": "2020-05-02",
		"user_id": 654654,
		"itemId": 1853212996,
		"calls_answered": 3,
		"calls": 0,
		"calls_new": 3,
		"calls_newAnswered": 0,
		"uniqContacts": 0,
		"uniqFavorites": 2,
		"uniqViews": 7
	},
	{
		"date": "2020-05-03",
		"user_id": 654654,
		"itemId": 1853212996,
		"calls_answered": 4,
		"calls": 0,
		"calls_new": 4,
		"calls_newAnswered": 0,
		"uniqContacts": 1,
		"uniqFavorites": 0,
		"uniqViews": 10
	},
	{
		"date": "2020-05-04",
		"user_id": 654654,
		"itemId": 1853212996,
		"calls_answered": 0,
		"calls": 0,
		"calls_new": 0,
		"calls_newAnswered": 0,
		"uniqContacts": 1,
		"uniqFavorites": 0,
		"uniqViews": 760
	},
	{
		"date": "2020-05-05",
		"user_id": 654654,
		"itemId": 1853212996,
		"calls_answered": 5,
		"calls": 0,
		"calls_new": 5,
		"calls_newAnswered": 0,
		"uniqContacts": 1,
		"uniqFavorites": 0,
		"uniqViews": 10
	},
	{
		"date": "2020-05-06",
		"user_id": 654654,
		"itemId": 1853212996,
		"calls_answered": 2,
		"calls": 1,
		"calls_new": 3,
		"calls_newAnswered": 0,
		"uniqContacts": 12,
		"uniqFavorites": 2,
		"uniqViews": 0
	}
]
describe('Проверка логики', ()=> {
	it(`Запрос данных API`, async () => {
		const response = await (await fetch('http://127.0.0.1:8099/api/avitoStats', {
			method: "POST",
			headers: { "Content-Type": "application/json"},
			body: JSON.stringify({
				"dateFrom": "2020-05-01",
				"dateTo":"2020-05-01",
				"user_id":[654654],
				"itemId": [1853257996]
			})
		})).json()
		assert.notStrictEqual(response.item, mockData)

	});

})
	

}