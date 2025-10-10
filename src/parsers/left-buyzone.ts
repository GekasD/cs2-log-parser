import type { BaseEvent, Entity } from '../models.js';
import { concatPattern, defineParser, entityRe, parseEntity, parseEquipmentList } from '../models.js';

export interface LeftBuyzoneEventPayload {
    player: Entity;
    equipment: string[];
}

export type LeftBuyzoneEvent = BaseEvent<'left_buyzone', LeftBuyzoneEventPayload>;

export const leftBuyzoneParser = defineParser<LeftBuyzoneEvent>({
	name: 'left_buyzone',

	patterns: [
		concatPattern`^(?<player>${entityRe}) left buyzone with (?<equipment>\\[.*\\])$`
	],

	parse: ({ player, equipment }) => {

		return {
			player: parseEntity(player),
			equipment: parseEquipmentList(equipment)
		};

	}
});