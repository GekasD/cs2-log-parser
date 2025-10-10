import type { SayEventPayload } from '../src/parsers/index.ts';
import type { TestingLog } from './helpers/tester.ts';
import { player } from './helpers/constants.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<SayEventPayload>[] = [
	[
		'"dimi<0><[U:1:221567857]><CT>" say "go A"',
		{
			player: player,
			to: 'all',
			message: 'go A',
		}
	],

	[
		'"dimi<0><[U:1:221567857]><CT>" say_team "go B"',
		{
			player: player,
			to: 'team',
			message: 'go B',
		}
	]
];

testLogs('say', logs);