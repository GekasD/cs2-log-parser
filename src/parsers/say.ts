import type { BaseEvent, Entity, SayTo } from '../models.js';
import { defineParser, concatPattern, entityRe, parseEntity } from '../models.js';

export interface SayEventPayload {
    player: Entity;
    to: SayTo;
    message: string;
}

export type SayEvent = BaseEvent<'say', SayEventPayload>;

export const sayParser = defineParser<SayEvent>({
	name: 'say',

	patterns: [
		concatPattern`^(?<player>${entityRe}) (?<to>say|say_team) "(?<message>.+)"$`
	],

	parse: ({ player, to, message }) => {
        
		return {
			player: parseEntity(player),
			to: to === 'say_team' ? 'team' : 'all',
			message
		};

	}
});