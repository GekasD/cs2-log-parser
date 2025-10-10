import { describe, it } from 'node:test';
import { ok, deepStrictEqual, strictEqual } from 'node:assert';
import { testLogDate } from './constants.ts';
import { parse } from '../../src/parser.ts';

// For a log to pass a test it must do the following:
//
// 1. Get parsed into an event object (not return null)
//
// 2. event.name needs to match the name of the test's suite
//
// 3. event.payload needs to match the expected payload we provide

export type TestingLog<P> = [string, P];

export function testLogs(expectedName: string, testLogs: TestingLog<unknown>[]): void {

	describe(expectedName, (suite) => {

		it('should correctly parse log', () => {

			for (const [log, expectedPayload] of testLogs) {

				const logWithDate = testLogDate + log;

				const event = parse(logWithDate);

				// 1
				ok(event, 'failed to parse log');
                
				// 2
				strictEqual(event.name, suite.name);
                
				// 3
				deepStrictEqual(event.payload, expectedPayload);
                
			}

		});

	});
    
}