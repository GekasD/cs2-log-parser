export function convertSteamIdTo64Dec (steamId: string): string {
    
	// old steam id format: STEAM_1:0:12345
	if (steamId.includes('STEAM')) {
		const steamIdSplit = steamId.split(':');
		let commId = parseInt(steamIdSplit[2]) * 2;

		if (steamIdSplit[1] === '1') {
			commId += 1;
		}
		const newCommId = BigInt(commId) + BigInt(76561197960265728);
		return newCommId.toString();
	}

	// new steam id format: [U:1:230970467]
	const cleanedSteamId = steamId.replaceAll(/\[|\]/g, '');
	const uSteamIdSplit = cleanedSteamId.split(':');
	const commId = BigInt(uSteamIdSplit[2]) + BigInt(76561197960265728);
	return commId.toString();
  
};