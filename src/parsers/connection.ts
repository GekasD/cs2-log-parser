import type { ConnectionState, BaseEvent, Entity } from '../models.js';
import { defineParser, concatPattern, entityRe, parseEntity, parseConnectionState } from '../models.js';

interface BaseConnectionEvent {
    state: ConnectionState;
    client: Entity;
}

interface ConnectedEvent extends BaseConnectionEvent {
    state: 'connected';
    address: string;
}

interface EnteredEvent extends BaseConnectionEvent {
    state: 'entered';
}

interface DisconnectedEvent extends BaseConnectionEvent {
    state: 'disconnected';
    reason: string;
}

export type ConnectionEventPayload = ConnectedEvent | EnteredEvent | DisconnectedEvent;

export type ConnectionEvent = BaseEvent<'connection', ConnectionEventPayload>;

const basePattern = concatPattern`^(?<client>${entityRe})`;

export const connectionParser = defineParser<ConnectionEvent>({
	name: 'connection',

	patterns: [
		concatPattern`${basePattern} (?<state>entered) the game$`,
		concatPattern`${basePattern} (?<state>connected), address "(?<address>[^"]*)"$`,
		concatPattern`${basePattern} (?<state>disconnected) \\(reason "(?<reason>[^"]*)"\\)$`,
	],

	parse: ({ client: rawClient, state: rawState, address, reason }) => {

		const state = parseConnectionState(rawState);
		const client = parseEntity(rawClient);

		if (state === 'connected') {

			return {
				state,
				client,
				address
			};

		} else if (state === 'entered') {

			return {
				state,
				client
			};

		} else {

			return {
				state,
				client,
				reason
			};

		}

	}
});