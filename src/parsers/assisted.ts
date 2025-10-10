import type { BaseEvent, Entity } from '../models.js';
import { defineParser, concatPattern, entityRe, parseEntity } from '../models.js';

export interface AssistedEventPayload {
    assistant: Entity;
    victim: Entity;
    flashAssist: boolean;
};

export type AssistedEvent = BaseEvent<'assisted', AssistedEventPayload>;

export const assistedParser = defineParser<AssistedEvent>({
	name: 'assisted',

	patterns: [
		concatPattern`^(?<assistant>${entityRe}) (?<assistType>assisted|flash-assisted) killing (?<victim>${entityRe})$`
	],

	parse({ assistant, victim, assistType }) {
		return {
			assistant: parseEntity(assistant),
			victim: parseEntity(victim),
			flashAssist: assistType === 'flash-assisted'
		};
	},
});