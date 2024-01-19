export default function({localServices, config, db, health, ClickHouseManager}){
	return {
		endpoint: "/api/avitoStats",
		auth: "bypass",
		description: "",
		errors: {
			400:"Invalid request"
		},
		
		reqSchema: ({string, object, array, number, any}, {})=> ({
			dateFrom: string(/.{1,100}/),
			dateTo: string(/.{1,100}/),
			user_id: array(number(/[0-9]{1,12}/)),
			itemId: array(number(/[0-9]{1,12}/)).optional(),
		}),

		resSchema: ({string, object, array, number, any}, {})=> ({
			items:any()
		}),

		controller: async function({body, req, res, errors}){
			const {dateFrom, dateTo,user_id, itemId} = body
			if(!dateFrom || !dateTo || !user_id ) {
				throw new Error('400')
			}
			const AvitoManager = new localServices.AvitoManager({config, db, health, body, ClickHouseManager})
			const result = await AvitoManager.getAvitoStats()
			
			return {items:result}
		}
	}
}