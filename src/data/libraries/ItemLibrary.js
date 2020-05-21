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
];

export { items };