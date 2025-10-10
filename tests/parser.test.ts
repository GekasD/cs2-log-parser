import { describe, it } from 'node:test';
import { ok, strictEqual } from 'node:assert';
import { parse } from '../src/parser.ts';

describe('parser', () => {

	it('should correctly parse the log\'s timestamp in file date format', () => {
        
		const log = '01/01/1970 - 00:00:00: World triggered "Round_End"';
            
		const event = parse(log);

		ok(event, `Failed to parse log: ${log}`);

		ok(event.receivedAt instanceof Date, 'event.receivedAt is not a valid Date object');
            
		const timestamp = event.receivedAt.getTime();

		strictEqual(event.receivedAt.getTime(), 0, `Expected Unix epoch time (0), got ${timestamp}`);

	});

	it('should correctly parse the log\'s timestamp in http date format', () => {

		const log = '01/01/1970 - 00:00:00.000 - World triggered "Round_End"';
            
		const event = parse(log, { format: 'http' });

		ok(event, `Failed to parse log: ${log}`);

		ok(event.receivedAt instanceof Date, 'event.receivedAt is not a valid Date object');
            
		const timestamp = event.receivedAt.getTime();

		strictEqual(event.receivedAt.getTime(), 0, `Expected Unix epoch time (0), got ${timestamp}`);

	});

});