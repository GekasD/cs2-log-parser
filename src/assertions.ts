import type { Vector, ConnectionState } from './models.js';

export function assertValidVector(vectorArray: number[]): asserts vectorArray is Vector {

	if (vectorArray.some((n) => isNaN(n))) {
		throw new Error('Vector contains invalid number(s)');
	}

	if (vectorArray.length !== 3) {
		throw new Error(`Vector must have 3 numbers, got ${vectorArray.length}`);
	}

}

export function assertValidConnectionState(state?: string): asserts state is ConnectionState {

	if (state !== 'connected' && state !== 'entered' && state !== 'disconnected') {
		throw new Error(`Received unknown connection state, got ${state}`);
	}
    
}