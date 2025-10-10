import type { SwitchedTeamEventPayload } from '../src/parsers/index.ts';
import type { TestingLog } from './helpers/tester.ts';
import { unknownTeamPlayer } from './helpers/constants.ts';
import { Team } from '../src/models.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<SwitchedTeamEventPayload>[] = [
	[
		'"dimi<0><[U:1:221567857]>" switched from team <TERRORIST> to <CT>',
		{
			player: unknownTeamPlayer,
			fromTeam: Team.Terrorists,
			toTeam: Team.CounterTerrorists
		}
	]
];

testLogs('switched_team', logs);