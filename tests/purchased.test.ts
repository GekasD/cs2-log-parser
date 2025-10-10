import type { TestingLog } from './helpers/tester.ts';
import type { PurchasedEventPayload } from '../src/parsers/index.ts';
import { player } from './helpers/constants.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<PurchasedEventPayload>[] = [
	[
		'"dimi<0><[U:1:221567857]><CT>" purchased "awp"',
		{
			player: player,
			weapon: 'awp'
		}
	]
];

testLogs('purchased', logs);