import startedProcess from "./process.js";
import {expect} from "chai";

export default Test;

function Test({config}){
	const url = `http://127.0.0.1:${config.horizen.ports.server}`

	describe("Проверка бизнес-цепочки", function(){
		it(`Должен вернуть массив`, async ()=> { 
			const response = await (await fetch(`${url}/api/avitoStats`, {
			    method: "POST",
			    headers: { "Content-Type": "application/json"},
			    body: JSON.stringify({
					"dateFrom": "2020-05-01",
					"dateTo":"2020-05-01",
					"user_id":234321,
					"itemId": [1853257996]
			    })
			})).json();

			expect(response.text).to.be.equal('Не верный запрос');
		});
	})
}