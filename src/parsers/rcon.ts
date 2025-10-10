import type { BaseEvent } from '../models.js';
import { defineParser, concatPattern } from '../models.js';

export interface RconEventPayload {
    address: string;
    command: string;
}

export type RconEvent = BaseEvent<'rcon', RconEventPayload>;

export const rconParser = defineParser<RconEvent>({
	name: 'rcon',

	patterns: [
		concatPattern`^rcon from "(?<address>.+)": command "(?<command>.+)"$`,
	],

	parse: ({ address, command }) => {
		return {
			address,
			command
		};
	}
});