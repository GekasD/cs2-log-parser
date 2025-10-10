import type { TestingLog } from './helpers/tester.ts';
import type { BlindedEventPayload } from '../src/parsers/index.ts';
import { player, bot } from './helpers/constants.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<BlindedEventPayload>[] = [
	[
		'"Panama<0><BOT><TERRORIST>" blinded for 2.07 by "dimi<0><[U:1:221567857]><CT>" from flashbang entindex 356',
		{
			attacker: player,
			victim: bot,
			blindDuration: 2.07,
			flashbangIndex: 356
		}
	]
];

testLogs('blinded', logs);