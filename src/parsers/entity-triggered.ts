import type { Entity, BaseEvent } from '../models.js';
import { defineParser, concatPattern, entityRe, parseEntity } from '../models.js';

type EntityTriggeredSubEvent = 
    | 'game_commencing'
    | 'warmup_start'
    | 'warmup_end'
    | 'match_start'
    | 'round_start'
    | 'round_end'
    | 'begin_bomb_defuse_with_kit'
    | 'begin_bomb_defuse_without_kit'
    | 'defused_the_bomb' // Does not get logged in CS2
    | 'planted_the_bomb'
    | 'got_the_bomb'
    | 'dropped_the_bomb'
    | 'touched_a_hostage'
    | 'rescued_a_hostage';

export interface EntityTriggeredEventPayload {
    entity: Entity;
    event: EntityTriggeredSubEvent;
    value: string | null;
}

export type EntityTriggeredEvent = BaseEvent<'entity_triggered', EntityTriggeredEventPayload>;

export const entityTriggeredParser = defineParser<EntityTriggeredEvent>({
	name: 'entity_triggered',

	patterns: [
		// concatPattern`^(?<entity>${entityRe}) triggered "(?<event>[^"]+)"(?: \\(value "(?<value>[^"]+)"\\))?$`,
		concatPattern`^(?<entity>${entityRe}) triggered "(?<event>[^"]+)"$`,
		concatPattern`^(?<entity>${entityRe}) triggered "(?<event>[^"]+)" on "(?<value>[^"]+)"$`,
		concatPattern`^(?<entity>${entityRe}) triggered "(?<event>[^"]+)" at bombsite (?<value>[^"]+)$`
	],

	parse: ({ entity, event, value }) => {
		return {
			entity: parseEntity(entity),
			event: event.toLowerCase() as EntityTriggeredSubEvent,
			value: value ?? null
		};
	}
});