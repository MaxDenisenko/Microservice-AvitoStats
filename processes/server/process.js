import Horizen from "horizen-framework/backend";
import config from "../../config.json" assert {type: "json"};
import { CronJob } from "cron";
import { ClickHouse } from 'clickhouse'

const horizen = new Horizen(config.horizen);

export default horizen.init(async function (props, options) {
	const { localServices, controllers, db, health } = props;
	const ClickHouseManager = new localServices.ClickHouseManager({ config, db, health, ClickHouse })
	const deps = { ...props, config, ClickHouseManager };


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