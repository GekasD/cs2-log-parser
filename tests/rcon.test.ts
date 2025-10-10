import type { RconEventPayload } from '../src/parsers/index.ts';
import type { TestingLog } from './helpers/tester.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<RconEventPayload>[] = [
	[
		'rcon from "127.0.0.1:49987": command "say hello"',
		{
			address: '127.0.0.1:49987',
			command: 'say hello'
		}
	]
];

testLogs('rcon', logs);