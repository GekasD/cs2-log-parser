import type { TestingLog } from './helpers/tester.ts';
import type { ConnectionEventPayload } from '../src/parsers/index.ts';
import { unknownTeamPlayer, testAddress } from './helpers/constants.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<ConnectionEventPayload>[] = [
	[
		'"dimi<0><[U:1:221567857]><>" connected, address "127.0.0.1"',
		{
			state: 'connected',
			client: unknownTeamPlayer,
			address: testAddress
		}
	],

	[
		'"dimi<0><[U:1:221567857]><>" entered the game',
		{
			state: 'entered',
			client: unknownTeamPlayer
		}
	],

	[
		'"dimi<0><[U:1:221567857]><>" disconnected (reason "Server shutting down")',
		{
			state: 'disconnected',
			client: unknownTeamPlayer,
			reason: 'Server shutting down'
		}
	]
];

testLogs('connection', logs);