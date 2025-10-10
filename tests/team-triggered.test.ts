import type { TestingLog } from './helpers/tester.ts';
import type { TeamTriggeredEventPayload } from '../src/parsers/index.ts';
import { Team } from '../src/models.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<TeamTriggeredEventPayload>[] = [
	[
		'Team "CT" triggered "SFUI_Notice_Bomb_Defused" (CT "7") (T "6")',
		{
			team: Team.CounterTerrorists,
			tScore: 6,
			ctScore: 7,
			event: 'sfui_notice_bomb_defused'
		}
	]
];

testLogs('team_triggered', logs);