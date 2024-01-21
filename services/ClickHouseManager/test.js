
import { assert } from 'chai';
import { ClickHouse } from 'clickhouse'

export default Test;

function Test({ ClickHouseManager, db, health, config }) {

	it('Проверка экспорта в CLickHouse', async () => {
		const clickHouse = new ClickHouseManager({ db, health, config, ClickHouse })
		try {
			const r = await clickHouse.exportStatsToClickHouse()
			assert.strictEqual(r, 'Export to ClickHouse successfully')
			
		} catch (error) {
			console.log(error)
		}

	});
}