import Horizen from "horizen-framework/backend";
import config from "../../config.json" assert {type: "json"};
import avitoService from "../../services/avitoStats/service.js";
import {CronJob} from 'cron'

import serviceToExportClickHouse from "../../services/exportClickHouse/service.js";


const horizen = new Horizen(config.horizen);

export default horizen.init(async function(props, options){
	const {localServices, controllers, db} = props;
	const deps = {...props, config};

	const cronAvitoService = new CronJob('00 00 00 * * *', ()=> {
		avitoService()
	})
	cronAvitoService.start()

	const cronExportClickHouse = new CronJob('00 00 03 * * *', ()=> {
		serviceToExportClickHouse()
	})
	cronExportClickHouse.start(deps)

	// options.setCustomTypes(({string, number}) => ({
	// 	anyString: ()=> string(/.{0,150}/)
	// }));

	return {
		port: config.horizen.ports.server,

		controllers: {
			post: [
				controllers.AvitoStats(deps),
			], 

			get: []
		}
	};
});