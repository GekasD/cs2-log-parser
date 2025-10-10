import type { BaseEvent, Entity } from '../models.js';
import { concatPattern, defineParser, entityRe, parseEntity } from '../models.js';

export interface BlindedEventPayload {
    attacker: Entity;
    victim: Entity;
    blindDuration: number;
    flashbangIndex: number;
}

export type BlindedEvent = BaseEvent<'blinded', BlindedEventPayload>;

export const blindedParser = defineParser<BlindedEvent>({
	name: 'blinded',

	patterns: [
		concatPattern`^(?<victim>${entityRe}) blinded for (?<blindDuration>[^"]+) by (?<attacker>${entityRe}) from flashbang entindex (?<entIndex>[^"]+)$`
	],

	parse: ({ attacker, victim, blindDuration, entIndex }) => {
		return {
			attacker: parseEntity(attacker),
			victim: parseEntity(victim),
			blindDuration: Number(blindDuration),
			flashbangIndex: Number(entIndex)
		};
	}
});