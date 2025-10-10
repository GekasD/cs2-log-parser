import type { Entity, SuicideMethod, BaseEvent } from '../models.js';
import { defineParser, concatPattern, entityRe, vectorRe, parseEntity, parseVector } from '../models.js';

export interface SuicideEventPayload {
    player: Entity;
    method: SuicideMethod;
}

export type SuicideEvent = BaseEvent<'suicide', SuicideEventPayload>;

export const suicideParser = defineParser<SuicideEvent>({
	name: 'suicide',

	patterns: [
		concatPattern`^(?<player>${entityRe}) \\[(?<playerPos>${vectorRe})\\] committed suicide with "(?<how>.+)"$`,
	],

	parse: ({ player, playerPos, how }) => {
		return {
			player: {
				...parseEntity(player),
				position: parseVector(playerPos),
			},

			method: how as SuicideMethod
		};
	}
});