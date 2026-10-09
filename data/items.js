const primaryWeapons = [
    // Infantry
    { name: "A-91", cost: 0, role: "Infantry" },
    { name: "Bushmaster M17S", cost: 0, role: "Infantry" },
    { name: "KH-2002", cost: 0, role: "Infantry" },
    { name: "T-21", cost: 600, role: "Infantry" },
    { name: "AK74", cost: 1600, role: "Infantry" },
    { name: "Galil", cost: 2200, role: "Infantry" },
    { name: "M4", cost: 2800, role: "Infantry" },
    { name: "FAL", cost: 6500, role: "Infantry" },

    // Medic
    { name: "AMP-9", cost: 900, role: "Medic" },
    { name: "PP-19 Vityaz", cost: 1200, role: "Medic" },
    { name: "MP5", cost: 1500, role: "Medic" },
    { name: "Super-45", cost: 2600, role: "Medic" },

    // Recon
    { name: "Compound Bow", cost: 800, role: "Recon" },
    { name: "Scout Rifle TD", cost: 1100, role: "Recon" },
    { name: "SKS", cost: 2400, role: "Recon" },
    { name: "Mosin Nagant", cost: 4500, role: "Recon" },
    { name: "SVD", cost: 4800, role: "Recon" },
    { name: "SV98", cost: 5200, role: "Recon" },
    { name: "BMR-308", cost: 6000, role: "Recon" },
    { name: "MK22", cost: 6400, role: "Recon" },
    { name: "AMR 50", cost: 8800, role: "Recon" },

    // Support
    { name: "MP43", cost: 400, role: "Support" },
    { name: "M249 SAW", cost: 3200, role: "Support" },
    { name: "PKM", cost: 4500, role: "Support" }
];

const secondaryWeapons = [
    // Infantry
    { name: "GGX 17", cost: 200, role: "Infantry" },
    { name: "Judge", cost: 250, role: "Infantry" },
    { name: "M1911", cost: 300, role: "Infantry" },
    { name: "GGX 18", cost: 800, role: "Infantry" },
    { name: "Deagle", cost: 900, role: "Infantry" },

    // Support
    { name: "9K333 Verba", cost: 800, role: "Support" },
    { name: "RPG-7", cost: 2000, role: "Support" },
    { name: "MAAWS", cost: 2600, role: "Support" },
    { name: "MGL-40", cost: 6000, role: "Support" }
];

const equipment = [
    // Infantry
    { name: "M67 Frag Grenade", cost: 200, role: "Infantry" },
    { name: "Halligan Bar", cost: 1100, role: "Infantry" },

    // Medic
    { name: "Emergency Resuscitator", cost: 0, role: "Medic" },
    { name: "Bandage", cost: 200, role: "Medic" },
    { name: "Adrenaline Pen", cost: 250, role: "Medic" },
    { name: "Field Resuscitator", cost: 500, role: "Medic" },
    { name: "Individual First Aid Kit", cost: 800, role: "Medic" },
    { name: "Defibrillator", cost: 1600, role: "Medic" },
    { name: "Medical Bag", cost: 2000, role: "Medic" },

    // Recon
    { name: "Binoculars", cost: 75, role: "Recon" },
    { name: "Monocular", cost: 150, role: "Recon" },
    { name: "Range Finder", cost: 400, role: "Recon" },
    { name: "Infrared Range Finder", cost: 1200, role: "Recon" },

    // Support
    { name: "Small Hammer", cost: 100, role: "Support" },
    { name: "Fuel Can", cost: 150, role: "Support" },
    { name: "Wrench", cost: 150, role: "Support" },
    { name: "C4 Charge", cost: 250, role: "Support" },
    { name: "Improvised Explosive Device", cost: 300, role: "Support" },
    { name: "Remote Detonator", cost: 550, role: "Support" },
    { name: "Light Drill", cost: 600, role: "Support" },
    { name: "AT Mine", cost: 650, role: "Support" },
    { name: "Medium Hammer", cost: 800, role: "Support" },
    { name: "Claymore", cost: 900, role: "Support" },
    { name: "Heavy Drill", cost: 1300, role: "Support" },
    { name: "Large Hammer", cost: 2400, role: "Support" },

    // No Role
    { name: "Ammo Supplies", cost: 10, role: "No Role" },
    { name: "Build Supplies", cost: 10, role: "No Role" },
    { name: "Fuel Supplies", cost: 10, role: "No Role" },
    { name: "Mechanical Supplies", cost: 10, role: "No Role" },

    { name: "M18 Signal Grenade: Alert", cost: 50, role: "No Role" },
    { name: "M18 Signal Grenade: Damaged Vehicle", cost: 50, role: "No Role" },
    { name: "M18 Signal Grenade: Friendly", cost: 50, role: "No Role" },
    { name: "M18 Signal Grenade: Hostile", cost: 50, role: "No Role" },
    { name: "M18 Signal Grenade: Landing Zone", cost: 50, role: "No Role" },
    { name: "M18 Signal Grenade: Supply Request", cost: 50, role: "No Role" },

    { name: "M18 Smoke Grenade: Black", cost: 100, role: "No Role" },
    { name: "M18 Smoke Grenade: White", cost: 100, role: "No Role" },

    { name: "Battery", cost: 150, role: "No Role" },
    { name: "High Capacity Battery", cost: 300, role: "No Role" },
    { name: "Flares", cost: 750, role: "No Role" },
    { name: "Forward Operating Base", cost: 7500, role: "No Role" }
];

const parachutes = [
    { name: "Basic Parachute", cost: 100, role: "No Role" },
    { name: "Sport Parachute", cost: 1000, role: "No Role" }
];

const helmets = [
    { name: "Level 1 Helmet", cost: 200, role: "No Role" },
    { name: "Level 2 Helmet", cost: 500, role: "No Role" },
    { name: "Level 3 Helmet", cost: 1500, role: "No Role" },
    { name: "Level 4 Helmet", cost: 3000, role: "No Role" }
];

const armor = [
    { name: "Level 1 Armor", cost: 400, role: "No Role" },
    { name: "Level 2 Armor", cost: 1000, role: "No Role" },
    { name: "Level 3 Armor", cost: 2000, role: "No Role" },
    { name: "Level 4 Armor", cost: 4000, role: "No Role" }
];

const vests = [
    { name: "Small Tac Vest", cost: 100, role: "No Role" },
    { name: "Medium Tac Vest", cost: 250, role: "No Role" },
    { name: "Large Tac Vest", cost: 400, role: "No Role" }
];

const backpacks = [
    { name: "Pouch", cost: 0, role: "No Role" },
    { name: "Scout Backpack", cost: 350, role: "No Role" },
    { name: "Field Backpack", cost: 650, role: "No Role" },
    { name: "Operator Backpack", cost: 800, role: "No Role" },
    { name: "Assault Backpack", cost: 1200, role: "No Role" },
    { name: "Ruck Backpack", cost: 2400, role: "No Role" },
    { name: "Gunner Backpack + Sling", cost: 3500, role: "No Role" },
    { name: "Arsenal Backpack + 2 Slings", cost: 5000, role: "No Role" }
];

const vehicles = [
    // Driver
    { name: "Bobcat", cost: 500, role: "Driver" },
    { name: "Dune Buggy", cost: 1500, role: "Driver" },
    { name: "Kodiak", cost: 2500, role: "Driver" },
    { name: "Humvee", cost: 3000, role: "Driver" },
    { name: "Kodiak [Pickup]", cost: 3000, role: "Driver" },
    { name: "Humvee [M249]", cost: 3750, role: "Driver" },
    { name: "Kodiak [M249]", cost: 3750, role: "Driver" },
    { name: "Humvee [Minigun]", cost: 4500, role: "Driver" },
    { name: "Ural", cost: 5000, role: "Driver" },
    { name: "Ural Defender", cost: 6000, role: "Driver" },
    { name: "Ural Defender [M249]", cost: 6750, role: "Driver" },
    { name: "L2A6", cost: 14000, role: "Driver" },

    // Pilot
    { name: "MH-6", cost: 6250, role: "Pilot" },
    { name: "AH-6M [Miniguns]", cost: 7000, role: "Pilot" },
    { name: "Z20 Lakota", cost: 7400, role: "Pilot" },
    { name: "Z20 Lakota [Miniguns]", cost: 8000, role: "Pilot" },
    { name: "AH-6R [Rockets]", cost: 12500, role: "Pilot" },
    { name: "Havoc", cost: 18000, role: "Pilot" },

    // Support
    { name: "SPH-2", cost: 8000, role: "Support" }
];

module.exports = {
    primaryWeapons,
    secondaryWeapons,
    equipment,
    parachutes,
    helmets,
    armor,
    vests,
    backpacks,
    vehicles
};