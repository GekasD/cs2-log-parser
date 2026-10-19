import type { TestingLog } from './helpers/tester.ts';
import type { MoneyChangeEventPayload } from '../src/parsers/index.ts';
import { player } from './helpers/constants.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<MoneyChangeEventPayload>[] = [
	[
		'"dimi<0><[U:1:221567857]><CT>" money change 16000-4750 = $11250 (tracked)',
		{
			player: player,
			oldMoney: 16000,
			newMoney: 11250,
			purchase: null,
			acquire: null
		}
	],

	[
		'"dimi<0><[U:1:221567857]><CT>" money change 16000-4750 = $11250 (tracked) (purchase: weapon_awp)',
		{
			player: player,
			oldMoney: 16000,
			newMoney: 11250,
			purchase: 'weapon_awp',
			acquire: null
		}
	],

	[
		'"dimi<0><[U:1:221567857]><CT>" money change 150+650 = $800 (tracked) (acquire: sellback)',
		{
			player: player,
			oldMoney: 150,
			newMoney: 800,
			purchase: null,
			acquire: 'sellback'
		}
	]

];

testLogs('money_change', logs);
