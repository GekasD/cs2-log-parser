import type { Entity, BaseEvent, Vector } from '../models.js';
import { concatPattern, defineParser, entityRe, vectorRe, parseEntity, parseVector } from '../models.js';

export interface ThrewEventPayload {
    player: Entity;
    grenade: string;
    position: Vector;
    entIndex: number | null;
}

export type ThrewEvent = BaseEvent<'threw', ThrewEventPayload>;

export const threwParser = defineParser<ThrewEvent>({
	name: 'threw',
    
	patterns: [
		concatPattern`^(?<player>${entityRe}) threw (?<grenade>.+) \\[(?<position>${vectorRe})\\]$`,
		concatPattern`^(?<player>${entityRe}) threw (?<grenade>.+) \\[(?<position>${vectorRe})\\] flashbang entindex (?<entIndex>.+)\\)$`
	],

	parse: ({ player, grenade, position, entIndex }) => {
		return {
			player: parseEntity(player),
			position: parseVector(position),
			entIndex: Number(entIndex) || null,
			grenade
		};
	}
});