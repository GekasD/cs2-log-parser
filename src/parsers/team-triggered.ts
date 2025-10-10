import type { Team, BaseEvent } from '../models.js';
import { parseTeam, defineParser, concatPattern } from '../models.js';

type TeamTriggeredSubEvent =
    | 'sfui_notice_terrorists_win'
    | 'sfui_notice_cts_win'
    | 'sfui_notice_target_bombed'
    | 'sfui_notice_target_saved'
    | 'sfui_notice_bomb_defused'
    | 'sfui_notice_hostages_not_rescued'
    | 'sfui_notice_all_hostages_rescued';

export interface TeamTriggeredEventPayload {
    team: Team;
    event: TeamTriggeredSubEvent;
    tScore: number;
    ctScore: number;
}

export type TeamTriggeredEvent = BaseEvent<'team_triggered', TeamTriggeredEventPayload>;

export const teamTriggeredParser = defineParser<TeamTriggeredEvent>({
	name: 'team_triggered',

	patterns: [
		concatPattern`^Team "(?<team>[^"]+)" triggered "(?<event>[^"]+)" \\(CT "(?<ctScore>\\d+)"\\) \\(T "(?<tScore>\\d+)"\\)$`
	],

	parse: ({ team, tScore, ctScore, event }) => {
		return {
			team: parseTeam(team),
			tScore: Number(tScore),
			ctScore: Number(ctScore),
			event: event.toLowerCase() as TeamTriggeredSubEvent
		};
	}
});