import type { BaseEvent, Entity, KillModifier } from '../models.js';
import { defineParser, concatPattern, entityRe, vectorRe, parseEntity, parseVector, parseKillModifiers, baseEntityRe } from '../models.js';

export interface KilledEventPayload {
    attacker: Entity;
    victim: Entity;
    weapon: string;
    modifiers: KillModifier[];
}

export type KilledEvent = BaseEvent<'killed', KilledEventPayload>;

export const killedParser = defineParser<KilledEvent>({
	name: 'killed',

	patterns: [
		concatPattern`^(?<attacker>${entityRe}) \\[(?<attackerPos>${vectorRe})\\] killed (?<victim>${entityRe}) \\[(?<victimPos>${vectorRe})\\] with "(?<weapon>[^"]+)"(?: \\((?<modifiers>[^\\)]+)\\))?$`,
		concatPattern`^(?<attacker>${entityRe}) \\[(?<attackerPos>${vectorRe})\\] killed other (?<victim>${baseEntityRe}) \\[(?<victimPos>${vectorRe})\\] with "(?<weapon>[^"]+)"(?: \\((?<modifiers>[^\\)]+)\\))?$`,
	],

	parse: ({ attacker, attackerPos, victim, victimPos, weapon, modifiers }) => {
		return {
            
			attacker: {
				...parseEntity(attacker),
				position: parseVector(attackerPos)
			},

			victim: {
				...parseEntity(victim),
				position: parseVector(victimPos)
			},

			modifiers: parseKillModifiers(modifiers),

			weapon
            
		};
	}
});