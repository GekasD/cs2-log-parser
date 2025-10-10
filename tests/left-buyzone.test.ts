import type { TestingLog } from './helpers/tester.ts';
import type { LeftBuyzoneEventPayload } from '../src/parsers/index.ts';
import { player } from './helpers/constants.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<LeftBuyzoneEventPayload>[] = [
	[
		'"dimi<0><[U:1:221567857]><CT>" left buyzone with [ weapon_knife_karambit weapon_m4a1_silencer weapon_hegrenade weapon_fiveseven defuser kevlar(100) helmet ]',
		{
			player: player,
			equipment: [ 'weapon_knife_karambit', 'weapon_m4a1_silencer', 'weapon_hegrenade', 'weapon_fiveseven', 'defuser', 'kevlar(100)', 'helmet' ]
		}
	],

	[
		'"dimi<0><[U:1:221567857]><CT>" left buyzone with [ ]',
		{
			player: player,
			equipment: []
		}
	]
];

testLogs('left_buyzone', logs);