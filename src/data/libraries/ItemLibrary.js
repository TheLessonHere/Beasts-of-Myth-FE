const items = [
    {
        item_id: 1,
        format: "Unrestricted",
        item_name: "Super Crystal",
        search_id: "super crystal",
        type: "activated",
        effect: (beast) => (null),
        description: "Transforms a Beast into a Super Beast. (1 per team)",
        short_description: "Transforms a Beast into a Super Beast.",
        removable: false,
    },
    {
        item_id: 2,
        format: "Unrestricted",
        item_name: "Focus Vest",
        search_id: "focus vest",
        type: "static",
        effect: (beast) => {beast.updateStatStage('pa', 1.5);
                            beast.updateStat('pa');},
        description: "Increases a Beast's Physical Attack by 50%, however, the Beast becomes locked into the first move it chooses.",
        short_description: "Increases a Beast's PA. Locks it into a move.",
        removable: true,
    },
    {
        item_id: 3,
        format: "Unrestricted",
        item_name: "Focus Cap",
        search_id: "focus cap",
        type: "static",
        effect: (beast) => {beast.updateStatStage('ma', 1.5);
                            beast.updateStat('ma');},
        description: "Increases a Beast's Mental Attack by 50%, however, the Beast becomes locked into the first move it chooses.",
        short_description: "Increases a Beast's MA. Locks it into a move.",
        removable: true,
    },
    {
        item_id: 4,
        format: "Unrestricted",
        item_name: "Focus Brace",
        search_id: "focus brace",
        type: "static",
        effect: (beast) => {beast.updateStatStage('sc', 1.5);
                            beast.updateStat('sc');},
        description: "Increases a Beast's Speed Class by 50%, however, the Beast becomes locked into the first move it chooses.",
        short_description: "Increases a Beast's SC. Locks it into a move.",
        removable: true,
    },
    {
        item_id: 5,
        format: "Unrestricted",
        item_name: "Perap Berry",
        search_id: "perap berry",
        type: "consumable",
        effect: (beast) => {const maxHP = beast.init_hp;
                            const healAmount = Math.round(maxHP * 0.25);
                            const healPoints = healAmount * -1;
                            beast.updateHP(healPoints);
                            beast.removeItem();},
        description: "Heals the Beast by 25% of its max HP when it reaches below 50% health.",
        short_description: "Heals the Beast by 25% when eaten.",
        removable: true,
    },
    {
        item_id: 6,
        format: "Unrestricted",
        item_name: "Asayo Berry",
        search_id: "asayo berry",
        type: "consumable",
        effect: (beast) => {beast.removeStatus();
                            beast.removeItem();},
        description: "Cures a Beast of any status if it becomes statused.",
        short_description: "Cures a Beast of any status.",
        removable: true,
    },
    {
        item_id: 7,
        format: "Unrestricted",
        item_name: "Blanto Berry",
        search_id: "blanto berry",
        type: "consumable",
        effect: (beast) => {beast.resetStats();
                            beast.removeItem();},
        description: "Resets a Beast's stat stages if they are lowered by an opponent.",
        short_description: "Resets a Beast's lowered stat stages.",
        removable: true,
    },
    {
        item_id: 8,
        format: "Unrestricted",
        item_name: "Goma Berry",
        search_id: "goma berry",
        type: "consumable",
        effect: (beast) => {const maxHP = beast.init_hp;
                            const quarterHealth = Math.round(maxHP * 0.25);
                            if(beast.curr_hp <= quarterHealth){
                                beast.updateStatStage('ma', 1.5);
                                beast.removeItem();
                            }},
        description: "Boosts a Beast's Mental Attack by one stage when it reaches below 25% health.",
        short_description: "Boosts a Beast's MA by one stage.",
        removable: true,
    },
    {
        item_id: 9,
        format: "Unrestricted",
        item_name: "Granite Berry",
        search_id: "granite berry",
        type: "consumable",
        effect: (beast) => {const maxHP = beast.init_hp;
                            const quarterHealth = Math.round(maxHP * 0.25);
                            if(beast.curr_hp <= quarterHealth){
                                beast.updateStatStage('pa', 1.5);
                                beast.removeItem();
                            }},
        description: "Boosts a Beast's Physical Attack by one stage when it reaches below 25% health.",
        short_description: "Boosts a Beast's PA by one stage.",
        removable: true,
    },
    {
        item_id: 10,
        format: "Unrestricted",
        item_name: "Plume Berry",
        search_id: "plume berry",
        type: "consumable",
        effect: (beast) => {const maxHP = beast.init_hp;
                            const quarterHealth = Math.round(maxHP * 0.25);
                            if(beast.curr_hp <= quarterHealth){
                                beast.updateStatStage('sc', 1.5);
                                beast.removeItem();
                            }},
        description: "Boosts a Beast's Speed Class by one stage when it reaches below 25% health.",
        short_description: "Boosts a Beast's SC by one stage.",
        removable: true,
    },
    {
        item_id: 11,
        format: "Unrestricted",
        item_name: "Spinap Berry",
        search_id: "spinap berry",
        type: "consumable",
        effect: (beast) => {beast.removeItem();},
        description: "Prevents extra damage from an opponent's critical hit.",
        short_description: "Prevents a critical hit.",
        removable: true,
    },
    {
        item_id: 12,
        format: "Unrestricted",
        item_name: "Citrum Berry",
        search_id: "Citrum berry",
        type: "consumable",
        effect: (beast) => {beast.removeItem();},
        description: "Prevents extra damage from an opponent's super effective hit.",
        short_description: "Prevents a super effective hit.",
        removable: true,
    },
    {
        item_id: 13,
        format: "Unrestricted",
        item_name: "Assist Brace",
        search_id: "assist brace",
        type: "consumable",
        effect: (beast) => {beast.removeItem();},
        description: "If at full health, the item user will survive any hit with 1 HP.",
        short_description: "Prevents being OHKOd at full health.",
        removable: true,
    },
    {
        item_id: 14,
        format: "Unrestricted",
        item_name: "Bulky Vest",
        search_id: "bulky vest",
        type: "static",
        effect: (beast) => {beast.updateStatStage('pd', 1.5);
                            beast.updateStat('pd');},
        description: "Increases a Beast's Physical Defense by 50%, however, the Beast cannot use status moves.",
        short_description: "Increases a Beast's PD. Only can use attack moves.",
        removable: true,
    },
    {
        item_id: 15,
        format: "Unrestricted",
        item_name: "Bulky Cap",
        search_id: "bulky cap",
        type: "static",
        effect: (beast) => {beast.updateStatStage('md', 1.5);
                            beast.updateStat('md');},
        description: "Increases a Beast's Mental Defense by 50%, however, the Beast cannot use status moves.",
        short_description: "Increases a Beast's MD. Only can use attack moves.",
        removable: true,
    },
    {
        item_id: 16,
        format: "Unrestricted",
        item_name: "Spikey Vest",
        search_id: "spikey vest",
        type: "static",
        effect: (beast) => {return null;},
        description: "If hit with a Physical move, the opposing Beast takes 1/8th it's HP as damage.",
        short_description: "Deals damage if hit with a Physical move.",
        removable: true,
    },
    {
        item_id: 17,
        format: "Unrestricted",
        item_name: "Spikey Cap",
        search_id: "spikey cap",
        type: "static",
        effect: (beast) => {return null;},
        description: "If hit with a Mental move, the opposing Beast takes 1/8th it's HP as damage.",
        short_description: "Deals damage if hit with a Mental move.",
        removable: true,
    },
    {
        item_id: 18,
        format: "Unrestricted",
        item_name: "Challenge Certificate",
        search_id: "challenge certificate",
        type: "consumable",
        effect: (beast) => {beast.updateStatStage('pa', 2);
                            beast.updateStatStage('ma', 2);
                            beast.removeItem();},
        description: "If Beast survives a super effective move, raises its attack stats by two stages.",
        short_description: "Doubles a Beast's attack stats if hit by super effective damage.",
        removable: true,
    },
    {
        item_id: 19,
        format: "Unrestricted",
        item_name: "First Aid Kit",
        search_id: "first aid kit",
        type: "static",
        effect: (beast) => {const maxHP = beast.init_hp;
                            const healAmount = Math.round(maxHP * 0.0625);
                            const healPoints = healAmount * -1;
                            beast.updateHP(healPoints);},
        description: "Heals a Beast for 1/16th it's max health at the end of every turn.",
        short_description: "Heals a bit of HP at the end of every turn.",
        removable: true,
    },
    {
        item_id: 20,
        format: "Unrestricted",
        item_name: "Evil Contract",
        search_id: "evil contract",
        type: "static",
        effect: (beast) => {const maxHP = beast.init_hp;
                            const damageAmount = Math.round(maxHP * 0.0625);
                            beast.updateHP(damageAmount);},
        description: "Increases attack damage by 30% in exchange for 1/16th of a Beast's max health at the end of each turn.",
        short_description: "Increases damage by 30%. Hurts user at the end of the turn.",
        removable: true,
    },
];

export { items };