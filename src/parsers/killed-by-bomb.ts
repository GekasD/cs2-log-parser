import type { BaseEvent, Entity } from '../models.js';
import { defineParser, concatPattern, entityRe, vectorRe, parseEntity, parseVector } from '../models.js';

export type KilledByBombEventPayload = Entity;

export type KilledByBombEvent = BaseEvent<'killed_by_bomb', KilledByBombEventPayload>;

export const killedByBombParser = defineParser<KilledByBombEvent>({
	name: 'killed_by_bomb',

	patterns: [
		concatPattern`^(?<victim>${entityRe}) \\[(?<victimPos>${vectorRe})\\] was killed by the bomb.$`
	],

	parse: ({ victim, victimPos }) => {
		return {
			...parseEntity(victim!),
			position: parseVector(victimPos!)
		};
	}
});