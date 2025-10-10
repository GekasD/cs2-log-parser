import type { BaseEvent, Team } from '../models.js';
import { defineParser, parseTeam, concatPattern } from '../models.js';

export interface ScoredEventPayload {
    team: Team;
    score: number;
    playerCount: number;
}

export type ScoredEvent = BaseEvent<'scored', ScoredEventPayload>;

export const scoredParser = defineParser<ScoredEvent>({
	name: 'scored',

	patterns: [
		concatPattern`^Team "(?<team>[^"]+)" scored "(?<score>[^"]+)" with "(?<playerCount>[^"]+)" players$`
	],

	parse: ({ team, score, playerCount }) => {
		return {
			team: parseTeam(team),
			score: Number(score),
			playerCount: Number(playerCount)
		};
	}
});