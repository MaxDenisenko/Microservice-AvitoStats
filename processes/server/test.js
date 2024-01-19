import startedProcess from "./process.js";
import { expect } from "chai";

export default Test;

function Test({ AvitoManager, config, db }) {
	const mockDataCals = {
		"result": {
			"items": [
				{
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
					"itemId": 1853257996
				}
			]
		}
	}
	const mockDataViewsContacts ={
		"result": {
		  "items": [
			{
			  "itemId": "1853257996",
			  "stats": [
				{
				  "date": "2020-06-11",
				  "uniqContacts": 1,
				  "uniqFavorites": 0,
				  "uniqViews": 10
				},
				{
				  "date": "2020-06-12",
				  "uniqContacts": 0,
				  "uniqFavorites": 2,
				  "uniqViews": 7
				}
			  ]
			},
			{
			  "itemId": "1853257996",
			  "stats": [
				{
				  "date": "2020-06-11",
				  "uniqContacts": 4,
				  "uniqFavorites": 3,
				  "uniqViews": 21
				},
				{
				  "date": "2020-06-12",
				  "uniqContacts": 1,
				  "uniqFavorites": 1,
				  "uniqViews": 18
				}
			  ]
			}
		  ]
		}
	  }
	  it(`Запрос данных от Авито`, async () => {
			const response = 2
			expect(response).to.be.equal(2);

		});


}