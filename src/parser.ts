import type { BaseParser } from './models.js';

import type {
	AssistedEvent,
	AttackedEvent,
	BlindedEvent,
	ConnectionEvent,
	EntityTriggeredEvent,
	KilledByBombEvent,
	KilledEvent,
	LeftBuyzoneEvent,
	PickedUpEvent,
	PurchasedEvent,
	RconEvent,
	SayEvent,
	ScoredEvent,
	SuicideEvent,
	SwitchedTeamEvent,
	TeamTriggeredEvent,
	ThrewEvent
} from './parsers/index.js';

import {
	assistedParser,
	attackedParser,
	blindedParser,
	connectionParser,
	entityTriggeredParser,
	killedByBombParser,
	killedParser,
	leftBuyzoneParser,
	pickedUpParser,
	purchasedParser,
	rconParser,
	sayParser,
	scoredParser,
	suicideParser,
	switchedTeamParser,
	teamTriggeredParser,
	threwParser
} from './parsers/index.js';

export type Event =
	| AssistedEvent
	| AttackedEvent
	| BlindedEvent
	| ConnectionEvent
	| EntityTriggeredEvent
	| KilledByBombEvent
	| KilledEvent
	| LeftBuyzoneEvent
	| PickedUpEvent
	| PurchasedEvent
	| RconEvent
	| SayEvent
	| ScoredEvent
	| SuicideEvent
	| SwitchedTeamEvent
	| TeamTriggeredEvent
	| ThrewEvent;

export const defaultParsers = [
	assistedParser,
	attackedParser,
	blindedParser,
	connectionParser,
	entityTriggeredParser,
	killedByBombParser,
	killedParser,
	leftBuyzoneParser,
	pickedUpParser,
	purchasedParser,
	rconParser,
	sayParser,
	scoredParser,
	suicideParser,
	switchedTeamParser,
	teamTriggeredParser,
	threwParser
];

export interface ParseOptions {
    parsers?: BaseParser<Event>[];
    format?: 'file' | 'http';
}

// mm/dd/yyyy

const { length: LENGTH_OF_DATE_FILE } = '01/01/1970 - 00:00:00: ';
const { length: LENGTH_OF_DATE_HTTP } = '01/01/1970 - 00:00:00.000 - ';

function parseTimestamp(timestamp: string): Date {
	
	const [dateStr, timeStr] = timestamp.split(' - ');
	const [month, day, year] = dateStr.split('/');
	const [hours, minutes, seconds] = timeStr.split(':');

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
	const dateTimeStringFormat = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

	const date = new Date(dateTimeStringFormat);

	return date;

}

export function parse(rawLog: string, parseOptions?: ParseOptions): Event | null {

	if (parseOptions === undefined) {
		parseOptions = {
			parsers: defaultParsers,
			format: 'file'
		};
	}

	if (parseOptions.parsers === undefined) {
		parseOptions.parsers = defaultParsers;
	}

	if (parseOptions.format === undefined) {
		parseOptions.format = 'file';
	}
	
	let log: string;
	let timestamp: string;

	if (parseOptions.format === 'file') {

		timestamp = rawLog.substring(0, LENGTH_OF_DATE_FILE - 2);
		log = rawLog.substring(LENGTH_OF_DATE_FILE);

	} else if (parseOptions.format === 'http') {

		timestamp = rawLog.substring(0, LENGTH_OF_DATE_HTTP - 3);
		log = rawLog.substring(LENGTH_OF_DATE_HTTP);

	} else {

		throw new Error('Invalid CS2 log date format specified.');

	}

	for (const parser of parseOptions.parsers) {

		const pattern = parser.patterns.find((pattern) => pattern.test(log));

		if (pattern === undefined) {
			continue;
		}

		const groups = log.match(pattern)!.groups!;

		const receivedAt = parseTimestamp(timestamp);

		const payload = parser.parse(groups);

		return {
			name: parser.name,
			receivedAt: receivedAt,
			payload
		} as Event;
		
	}

	return null;

}