import StatsToApi from "../services/statsToApi/service.js"

export default function(){
	return {
		endpoint: "/api/avitoStats",
		auth: "bypass",
		description: "",
		errors: {
			400:"Не верный запрос"
		},
		
		reqSchema: ({string, object, array, number, any}, {})=> ({
			dateFrom: string(/.{1,100}/),
			dateTo: string(/.{1,100}/),
			user_id: number(/[0-9]{1,12}/),
			itemId: array(number(/[0-9]{1,12}/)).optional(),
		}),

		resSchema: ({string, object, array, number, any}, {})=> ({
			items: any()
		}),

		controller: async function({body, req, res, errors}){
			const {dateFrom, dateTo,user_id, itemId} = body
			if(!dateFrom || !dateTo || !user_id ) {
				throw new Error('400')
			}
			const response = await StatsToApi(body)

			return {items:response}
		}
	}
}