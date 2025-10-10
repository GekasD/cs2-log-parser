import type { KilledByBombEventPayload } from '../src/parsers/index.ts';
import type { TestingLog } from './helpers/tester.ts';
import { positionedPlayer } from './helpers/constants.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<KilledByBombEventPayload>[] = [
	[
		'"dimi<0><[U:1:221567857]><CT>" [0 0 0] was killed by the bomb.',
		positionedPlayer
	]
];

testLogs('killed_by_bomb', logs);