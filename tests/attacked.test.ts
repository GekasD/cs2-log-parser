import type { TestingLog } from './helpers/tester.ts';
import type { AttackedEventPayload } from '../src/parsers/index.ts';
import { positionedPlayer, positionedBot } from './helpers/constants.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<AttackedEventPayload>[] = [
	[
		'"dimi<0><[U:1:221567857]><CT>" [0 0 0] attacked "Panama<0><BOT><TERRORIST>" [0 0 0] with "ak47" (damage "27") (damage_armor "0") (health "73") (armor "100") (hitgroup "left leg")',
		{
			attacker: positionedPlayer,
			victim: positionedBot,
			damage: 27,
			damageArmor: 0,
			remainingHealth: 73,
			remainingArmor: 100,
			hitGroup: 'left_leg',
			weapon: 'ak47'
		}
	]
];

testLogs('attacked', logs);