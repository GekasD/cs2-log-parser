import type { TestingLog } from './helpers/tester.ts';
import type { ThrewEventPayload } from '../src/parsers/index.ts';
import { player, testVector } from './helpers/constants.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<ThrewEventPayload>[] = [
	[
		'"dimi<0><[U:1:221567857]><CT>" threw molotov [0 0 0]',
		{
			player: player,
			grenade: 'molotov',
			position: testVector,
			entIndex: null 
		}
	],

	[
		'"dimi<0><[U:1:221567857]><CT>" threw flashbang [0 0 0] flashbang entindex 630)',
		{
			player: player,
			grenade: 'flashbang',
			position: testVector,
			entIndex: 630 
		}
	]
];

testLogs('threw', logs);