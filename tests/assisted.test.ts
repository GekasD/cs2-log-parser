import type { TestingLog } from './helpers/tester.ts';
import type { AssistedEventPayload } from '../src/parsers/index.ts';
import { player, bot } from './helpers/constants.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<AssistedEventPayload>[] = [
	[
		'"dimi<0><[U:1:221567857]><CT>" assisted killing "Panama<0><BOT><TERRORIST>"',
		{
			assistant: player,
			victim: bot,
			flashAssist: false
		}
	],
    
	[
		'"dimi<0><[U:1:221567857]><CT>" flash-assisted killing "Panama<0><BOT><TERRORIST>"',
		{
			assistant: player,
			victim: bot,
			flashAssist: true
		}
	]
];

testLogs('assisted', logs);