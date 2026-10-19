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

// [Server] L 10/18/2026 - 23:52:05: "dimi<1><[U:1:221567857]><CT>" money change 16000-4750 = $11250 (tracked)
// [Server] L 10/18/2026 - 23:52:05: "dimi<1><[U:1:221567857]><CT>" money change 16000-4750 = $11250 (tracked) (purchase: weapon_awp)
// [Server] L 10/18/2026 - 23:58:12: "dimi<1><[U:1:221567857]><CT>" money change 150+650 = $800 (tracked) (acquire: sellback)

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
