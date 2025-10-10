import type { TestingLog } from './helpers/tester.ts';
import type { PickedUpEventPayload } from '../src/parsers/index.ts';
import { player } from './helpers/constants.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<PickedUpEventPayload>[] = [
	[
		'"dimi<0><[U:1:221567857]><CT>" picked up "fiveseven"',
		{
			player: player,
			weapon: 'fiveseven'
		}
	]
];

testLogs('picked_up', logs);