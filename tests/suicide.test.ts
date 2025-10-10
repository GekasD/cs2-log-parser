import type { SuicideEventPayload } from '../src/parsers/index.ts';
import type { TestingLog } from './helpers/tester.ts';
import { positionedPlayer } from './helpers/constants.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<SuicideEventPayload>[] = [
	[
		'"dimi<0><[U:1:221567857]><CT>" [0 0 0] committed suicide with "world"',
		{
			player: positionedPlayer,
			method: 'world'
		}
	]
];

testLogs('suicide', logs);