import { expect } from "chai";
import { ClickHouse } from 'clickhouse'

export default Test;

function Test({ClickHouseManager, db, config, health}) {

	it('Проверка экспорта в ClickHouse!!!', async () => {
		const clickHouse = new ClickHouseManager({db, health, config, ClickHouse})
		const result = await clickHouse.exportStatsToClickHouse()
		expect(result).to.be.eql('Export to ClickHouse successfully')
	});
}