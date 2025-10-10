import type { TestingLog } from './helpers/tester.ts';
import type { ScoredEventPayload } from '../src/parsers/index.ts';
import { Team } from '../src/models.ts';
import { testLogs } from './helpers/tester.ts';

const logs: TestingLog<ScoredEventPayload>[] = [
	[
		'Team "CT" scored "11" with "5" players',
		{
			team: Team.CounterTerrorists,
			score: 11,
			playerCount: 5
		}
	]
];

testLogs('scored', logs);