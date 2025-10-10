import type { BaseEvent, Entity } from '../models.js';
import { defineParser, concatPattern, entityRe, parseEntity } from '../models.js';

export interface PickedUpEventPayload {
    player: Entity;
    weapon: string;
}

export type PickedUpEvent = BaseEvent<'picked_up', PickedUpEventPayload>;

export const pickedUpParser = defineParser<PickedUpEvent>({
	name: 'picked_up',

	patterns: [
		concatPattern`^(?<player>${entityRe}) picked up "(?<weapon>[^"]+)"$`
	],

	parse: ({ player, weapon }) => {
		return {
			player: parseEntity(player),
			weapon
		};
	}
});