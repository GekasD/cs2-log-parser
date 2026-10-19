import type { BaseEvent, Entity } from '../models.js';
import { defineParser, concatPattern, entityRe, parseEntity } from '../models.js';

export interface MoneyChangeEventPayload {
  player: Entity;
  oldMoney: number;
  newMoney: number;
  purchase: string | null;
  acquire: string | null;
}

export type MoneyChangeEvent = BaseEvent<'money_change', MoneyChangeEventPayload>;

export const moneyChangeParser = defineParser<MoneyChangeEvent>({

	name: 'money_change',

	patterns: [
		concatPattern`^(?<player>${entityRe}) money change (?<oldMoney>\\d+)[+-](?<difMoney>\\d+) = \\$(?<newMoney>\\d+) \\(tracked\\)$`,
		concatPattern`^(?<player>${entityRe}) money change (?<oldMoney>\\d+)[+-](?<difMoney>\\d+) = \\$(?<newMoney>\\d+) \\(tracked\\) \\(purchase: (?<weaponClass>[^)]+)\\)$`,
		concatPattern`^(?<player>${entityRe}) money change (?<oldMoney>\\d+)[+-](?<difMoney>\\d+) = \\$(?<newMoney>\\d+) \\(tracked\\) \\(acquire: (?<acquireMethod>[^)]+)\\)$`
	],

	parse: ({ player, oldMoney, newMoney, weaponClass, acquireMethod }) => {

		return {
			player: parseEntity(player),
			oldMoney: Number(oldMoney),
			newMoney: Number(newMoney),
			purchase: weaponClass ?? null,
			acquire: acquireMethod ?? null
		};

	}

});
