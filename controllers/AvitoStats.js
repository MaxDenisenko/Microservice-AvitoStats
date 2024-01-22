export default function ({ localServices, config, db, health, clickHouse }) {
	return {
		endpoint: "/api/avitoStats",
		auth: "bypass",
		description: "",
		errors: {
			400: "Invalid request",
			500: "Error while making a request"
		},

		reqSchema: ({ string, object, array, number, any }, { }) => ({
			dateFrom: string(/.{1,100}/),
			dateTo: string(/.{1,100}/),
			user_id: array(number(/[0-9]{1,12}/)),
			itemId: array(number(/[0-9]{1,12}/)).optional(),
		}),

		resSchema: ({ string, object, array, number, any }, { }) => ({
			items: array(object({
				date: string(/.{1,10}/),
				user_id: number(/[0-9]{1,12}/),
				itemId: number(/[0-9]{1,12}/),
				calls_answered: number(/[0-9]{1,4}/),
				calls: number(/[0-9]{1,4}/),
				calls_new: number(/[0-9]{1,4}/),
				calls_newAnswered: number(/[0-9]{1,4}/),
				uniqContacts: number(/[0-9]{1,4}/),
				uniqFavorites: number(/[0-9]{1,4}/),
				uniqViews: number(/[0-9]{1,4}/),
			}))

		}),

		controller: async function ({ body, req, res, errors }) {
			const { dateFrom, dateTo, user_id, itemId } = body
			if (!dateFrom || !dateTo || !user_id) {
				throw new Error('400')
			}
			const AvitoManager = new localServices.AvitoManager({ config, db, health, body, clickHouse })
			const result = await AvitoManager.getAvitoStats()
			if(result[0].status === false) throw new Error('500')
			return { items: result }
		}
	}
}