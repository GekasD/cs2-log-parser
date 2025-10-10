import type { BaseEvent, Entity } from '../models.js';
import { defineParser, concatPattern, entityRe, parseEntity } from '../models.js';

export interface PurchasedEventPayload {
    player: Entity;
    weapon: string;
}

export type PurchasedEvent = BaseEvent<'purchased', PurchasedEventPayload>;

export const purchasedParser = defineParser<PurchasedEvent>({
	name: 'purchased',

	patterns: [
		concatPattern`^(?<player>${entityRe}) purchased "(?<weapon>[^"]+)"$`
	],

	parse: ({ player, weapon }) => {

		return {
			player: parseEntity(player),
			weapon
		};
        
	}
});