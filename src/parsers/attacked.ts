import type { BaseEvent, Entity, HitGroup } from '../models.js';
import { defineParser, concatPattern, entityRe, vectorRe, parseEntity, parseVector, parseHitGroup } from '../models.js';

export interface AttackedEventPayload {
    attacker: Entity;
    victim: Entity;
    weapon: string;
    damage: number;
    damageArmor: number;
    remainingHealth: number;
    remainingArmor: number;
    hitGroup: HitGroup;
}

export type AttackedEvent = BaseEvent<'attacked', AttackedEventPayload>;

export const attackedParser = defineParser<AttackedEvent>({
	name: 'attacked',

	patterns: [
		concatPattern`^(?<attacker>${entityRe}) \\[(?<attackerPos>${vectorRe})\\] attacked (?<victim>${entityRe}) \\[(?<victimPos>${vectorRe})\\] with "(?<weapon>[^"]+)" \\(damage "(?<damageAmount>[^"]+)"\\) \\(damage_armor "(?<damageArmorAmount>[^"]+)"\\) \\(health "(?<remainingHealth>[^"]+)"\\) \\(armor "(?<remainingArmor>[^"]+)"\\) \\(hitgroup "(?<hitGroup>[^"]+)"\\)$`,
	],

	parse: ({ attacker, attackerPos, victim, victimPos, weapon, damageAmount, damageArmorAmount, remainingHealth, remainingArmor, hitGroup }) => {
		return {
			attacker: {
				...parseEntity(attacker),
				position: parseVector(attackerPos)
			},

			victim: {
				...parseEntity(victim),
				position: parseVector(victimPos)
			},

			damage: Number(damageAmount),
			damageArmor: Number(damageArmorAmount),
			remainingHealth: Number(remainingHealth),
			remainingArmor: Number(remainingArmor),
			hitGroup: parseHitGroup(hitGroup),
			weapon
		};
	}
});