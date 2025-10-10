import type { Entity, Team, BaseEvent } from '../models.js';
import { defineParser, concatPattern, entityRe, parseEntity, parseTeam } from '../models.js';

export interface SwitchedTeamEventPayload {
    player: Entity;
    fromTeam: Team;
    toTeam: Team;
}

export type SwitchedTeamEvent = BaseEvent<'switched_team', SwitchedTeamEventPayload>;

export const switchedTeamParser = defineParser<SwitchedTeamEvent>({
	name: 'switched_team',

	patterns: [
		concatPattern`^(?<player>${entityRe}) switched from team <(?<fromTeam>[^>]+)> to <(?<toTeam>[^>]+)>$`
	],

	parse: ({ player, fromTeam, toTeam }) => {
		return {
			player: parseEntity(player),
			fromTeam: parseTeam(fromTeam),
			toTeam: parseTeam(toTeam)
		};
	}
});