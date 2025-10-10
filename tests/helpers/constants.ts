import type { Vector, PlayerEntity, BotEntity, DynamicPropEntity, WorldEntity } from '../../src/models.ts';
import { Team } from '../../src/models.ts';

// Unix epoch
export const testLogDate = '01/01/1970 - 00:00:00: ';

// World origin
export const testVector: Vector = [0, 0, 0];

// loopback address
export const testAddress = '127.0.0.1';

export const player: PlayerEntity = {
	type: 'player',
	id: 0,
	steamId3: '[U:1:221567857]',
	steamId64: '76561198181833585',
	name: 'dimi',
	team: Team.CounterTerrorists
};

export const positionedPlayer: PlayerEntity = {
	...player,
	position: testVector
};

export const unknownTeamPlayer: PlayerEntity = {
	...player,
	team: Team.Unknown
};

export const bot: BotEntity = {
	type: 'bot',
	id: 0,
	name: 'Panama',
	team: Team.Terrorists
};

export const positionedBot: BotEntity = {
	...bot,
	position: testVector
};

export const positionedDynamicProp: DynamicPropEntity = {
	type: 'prop_dynamic',
	id: 0,
	position: testVector
};

export const world: WorldEntity = {
	type: 'world'
};