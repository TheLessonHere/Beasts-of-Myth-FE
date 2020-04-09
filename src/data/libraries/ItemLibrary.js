const items = [
    {
        item_id: 1,
        item_name: "Super Crystal",
        search_id: "super crystal",
        type: "activated",
        effect: (beast) => (null),
        description: "Does something.",
        short_description: "Does thing.",
        removable: false,
    },
    {
        item_id: 2,
        item_name: "Focus Vest",
        search_id: "focus vest",
        type: "static",
        effect: (beast) => {beast.updateStatStage('pa', 1.5);
                            beast.updateStat('pa');},
        description: "Does something.",
        short_description: "Does thing.",
        removable: true,
    },
    {
        item_id: 3,
        item_name: "Focus Cap",
        search_id: "focus cap",
        type: "static",
        effect: (beast) => {beast.updateStatStage('ma', 1.5);
                            beast.updateStat('ma');},
        description: "Does something.",
        short_description: "Does thing.",
        removable: true,
    },
    {
        item_id: 4,
        item_name: "Focus Brace",
        search_id: "focus brace",
        type: "static",
        effect: (beast) => {beast.updateStatStage('sc', 1.5);
                            beast.updateStat('sc');},
        description: "Does something.",
        short_description: "Does thing.",
        removable: true,
    },
    {
        item_id: 5,
        item_name: "Berry",
        search_id: "berry",
        type: "consumable",
        effect: (beast) => {const maxHP = beast.init_hp;
                            const healAmount = Math.round(maxHP * 0.25);
                            const healPoints = healAmount * -1;
                            beast.updateHP(healPoints);
                            beast.removeItem();},
        description: "Does something.",
        short_description: "Does thing.",
        removable: true,
    },
];

export { items };