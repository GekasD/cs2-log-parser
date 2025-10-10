import type { KilledEventPayload } from '../src/parsers/index.ts';
import type { TestingLog } from './helpers/tester';
import { positionedPlayer, positionedBot, positionedDynamicProp } from './helpers/constants.ts';
import { testLogs } from './helpers/tester';

const logs: TestingLog<KilledEventPayload>[] = [
	[
		'"dimi<0><[U:1:221567857]><CT>" [0 0 0] killed "Panama<0><BOT><TERRORIST>" [0 0 0] with "ak47" (headshot)',
		{
			attacker: positionedPlayer,
			victim: positionedBot,
			weapon: 'ak47',
			modifiers: ['headshot']
		}
	],

	[
		'"dimi<0><[U:1:221567857]><CT>" [0 0 0] killed other "prop_dynamic<0>" [0 0 0] with "ak47"',
		{
			attacker: positionedPlayer,
			victim: positionedDynamicProp,
			weapon: 'ak47',
			modifiers: []
		}
	]
];

testLogs('killed', logs);