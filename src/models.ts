import { assertValidConnectionState, assertValidVector } from './assertions.js';
import { convertSteamIdTo64Dec } from './helpers.js';

// ----------------------------
// Regular expressions
// ----------------------------

const baseWorldRe = /World/;
export const baseEntityRe = /"(?<entityType>chicken|prop_physics_multiplayer|prop_dynamic)<(?<entityId>\d+)>"/;
export const basePlayerRe = /"(?<name>.+)<(?<entityId>\d*)><(?<steamId>(?:\[U:[01]:\d+\]|STEAM_[0-5]:[01]:\d+|BOT|Console))>(?:<(?<team>[^>]*)>)?"/;
export const vectorRe = /\[?[-.\d]+ [-.\d]+ [-.\d]+\]?/;
export const entityRe = /".+<\d*><(?:\[U:[01]:\d+\]|STEAM_[0-5]:[01]:\d+|BOT|Console)>(?:<[^>]*>)?"|"chicken<\d+>"|World/;

// ----------------------------
// Enums
// ----------------------------

export enum Team {
    Unassigned = 0,
    Spectators = 1,
    Terrorists = 2,
    CounterTerrorists = 3,

    Unknown = 999
}

// ----------------------------
// Mappings
// ----------------------------

export const teamMapping: Record<string, Team> = {
	Unassigned: Team.Unassigned,
	Spectator: Team.Spectators,
	TERRORIST: Team.Terrorists,
	CT: Team.CounterTerrorists
};

// ----------------------------
// Types
// ----------------------------

export type EntityID = number;

export type KillModifier = 'attackerblind' | 'attackerinair' | 'headshot' | 'penetrated' | 'throughsmoke' | 'noscope';

export type SuicideMethod = 'world' | 'hegrenade' | 'inferno';

export type ConnectionState = 'connected' | 'entered' | 'disconnected';

export type HitGroup = 'generic' | 'head' | 'chest' | 'stomach' | 'left_arm' | 'right_arm' | 'left_leg' | 'right_leg';

export type SayTo = 'all' | 'team';

export type LogTimestampFormat = 'file' | 'http';

export type Entity = WorldEntity | ConsoleEntity | ChickenEntity | PlayerEntity | BotEntity | MultiplayerPhysicsPropEntity | DynamicPropEntity;

export type Vector = [number, number, number];

// ----------------------------
// Interfaces
// ----------------------------

export interface BaseEvent<T, P> {
    name: T;
    payload: P;
    receivedAt: Date;
}

export interface BaseParser<T extends BaseEvent<string, unknown>> {
    name: T['name'];
    patterns: RegExp[];
    parse(groups: Record<string, string>): T['payload'];
}

interface BaseEntity {
    type: string;
}

interface IdentifiedEntity extends BaseEntity {
    id: EntityID;
}

interface PositionedEntity extends IdentifiedEntity {
    position?: Vector;
}

export interface MultiplayerPhysicsPropEntity extends PositionedEntity {
    type: 'prop_physics_multiplayer';
}

export interface DynamicPropEntity extends PositionedEntity {
    type: 'prop_dynamic';
}

export interface WorldEntity extends BaseEntity {
    type: 'world';
}

export interface ConsoleEntity extends BaseEntity {
    type: 'console';
}

export interface ChickenEntity extends PositionedEntity {
    type: 'chicken';

    id: EntityID;
}

export interface BasePlayerEntity extends PositionedEntity {
    id: EntityID;
    name: string;
    position?: Vector;
    team: Team;
}

export interface PlayerEntity extends BasePlayerEntity {
    type: 'player';
    steamId3: string;
    steamId64: string;
}

export interface BotEntity extends BasePlayerEntity {
    type: 'bot';
}

// ----------------------------
// Base parsers
// ----------------------------

export function parseTeam(rawTeam: string): Team {
    
	const mappedTeam = teamMapping[rawTeam] ?? Team.Unknown;

	return mappedTeam;

}

export function parseKillModifiers(rawModifiers?: string): KillModifier[] {

	const modifiersArr = rawModifiers?.split(' ') ?? [];
    
	return modifiersArr as KillModifier[];

}

export function parseConnectionState(rawState?: string): ConnectionState {

	assertValidConnectionState(rawState);

	return rawState;

}

export function parseHitGroup(rawHitGroup: string): HitGroup {
    
	// We don't want spaces in our values, and CS2 returns hitgroups with spaces:
	// ("left leg", "right arm" etc), so we join them with underscores here
	const formattedHitGroup = rawHitGroup.split(' ').join('_');

	return formattedHitGroup as HitGroup;

}

export function parseEquipmentList(rawEquipmentList: string): string[] {

	const equipmentStr = rawEquipmentList.replaceAll('[', '').replaceAll(']', '').trim();

	let equipment: string[];

	if (equipmentStr.length > 0) {

		equipment = equipmentStr.split(' ');

	} else {

		equipment = [];

	}

	return equipment;

}

export function parseEntity(rawEntity: string): Entity {

	// Test for "world" entity
	if (baseWorldRe.test(rawEntity)) {
		return {
			type: 'world',
		};
	}

	// Test for base entities (chicken, prop_dynamic & prop_physics_multiplayer)
	if (baseEntityRe.test(rawEntity)) {

		const baseEntityMatch = rawEntity.match(baseEntityRe)!;
		const entityType = baseEntityMatch[1];
		const entityId = Number(baseEntityMatch[2]);

		if (entityType === 'chicken' || entityType === 'prop_dynamic' || entityType === 'prop_physics_multiplayer') {

			return {
				type: entityType,
				id: entityId
			};

		} else {

			throw new Error(`Unknown base entity type "${rawEntity}"`);

		}

	}

	if (basePlayerRe.test(rawEntity)) {

		const { entityId: rawEntityId, steamId, name, team: rawTeam } = rawEntity.match(basePlayerRe)!.groups as {
            entityId: string;
            steamId: string;
            name: string;
            team: string;
        };

		// Test for "Console" entity
		if (steamId === 'Console') {
			return {
				type: 'console',
			};
		}        

		const entityId = Number(rawEntityId);
		const team = parseTeam(rawTeam);

		// Test for BOT entity
		if (steamId === 'BOT') {
			return {
				type: 'bot',
				id: entityId,
				name,
				team,
			};
		}

		return {
			type: 'player',
			id: entityId,
			steamId3: steamId,
			steamId64: convertSteamIdTo64Dec(steamId),
			name,
			team,
		};
	}

	throw new Error(`Failed to parse entity "${rawEntity}"`);

}

export function parseVector(rawVector?: string): Vector {
	const vectorStrings = rawVector?.split(' ') ?? [];
	const vectorNumbers = vectorStrings.map(Number);

	assertValidVector(vectorNumbers);

	return vectorNumbers;
}

export function concatPattern(literals: TemplateStringsArray, ...placeholders: (string | RegExp)[]): RegExp {
	let result = '';

	for (let i = 0; i < placeholders.length; i += 1) {
		result += literals[i];
		const { [i]: placeholder } = placeholders;
		result += placeholder instanceof RegExp ? placeholder.source : placeholder;
	}

	result += literals[literals.length - 1];

	return new RegExp(result);
}

export function defineParser<T extends BaseEvent<string, unknown>>(parser: BaseParser<T>): BaseParser<T> {
	return parser;
}