import type { TestingLog } from './helpers/tester.ts';
import type { EntityTriggeredEventPayload } from '../src/parsers/index.ts';
import { world, bot } from './helpers/constants.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<EntityTriggeredEventPayload>[] = [
	[
		'World triggered "Round_End"',
		{
			entity: world,
			event: 'round_end',
			value: null
		}
	],

	[
		'World triggered "Match_Start" on "de_train"',
		{
			entity: world,
			event: 'match_start',
			value: 'de_train'
		}
	],

	[
		'"Panama<0><BOT><TERRORIST>" triggered "Planted_The_Bomb" at bombsite B',
		{
			entity: bot,
			event: 'planted_the_bomb',
			value: 'B'
		}
	]
];

testLogs('entity_triggered', logs);