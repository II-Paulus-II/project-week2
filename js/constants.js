/* ------ Upgrade Objects ------ */

//Base const Variables
export const basePlayerClickDamage = 1;
export const basePLayerBotNetSize = 1;
export const basePlayerGang = 0;
export const objectsinLevel = 10 // I do not want this to change - 10 per level 
export const firstLevelHP = 5;
export const startingWallet = 0;
export const objectTypeArray = ["webserver", "crypto", "machine", "phishing"]; //Unused

//Click Damage upgrades
//Sorry for underscores for GPUs but looks better to me :)
export const GCardUpgrades = {
  None: { //Integreated Graphics doesn't count for damage
    name: "iGPU",
    details: "Shared",
    price: 0,
    damage: 0,
  },
  GeForce_9400GT : {
    name: "GeForce 9400GT",
    details: "512MB GDDR3",
    price: 100,
    damage: 1,
  },
  GeForceGTX_460: {
    name: "GeForce GTX460",
    details: "1GB GDDR5",
    price: 225,
    damage: 2,
  },
  GeForceGTX_660Ti: {
    name: "GeForce GTX660Ti",
    details: "2GB GDDR5",
    price: 425,
    damage: 4,
  },
  GeForceGTX_960: {
    name: "GeForce GTX960",
    details: "4GB GDDR5",
    price: 700,
    damage: 6,
  },
  GeForceGTX_1060: {
    name: "GeForce GTX1060",
    details: "6GB GDDR5",
    price: 900,
    damage: 10,
  },
  GeForceGTX_1660Ti: {
    name: "GeForce GTX1660Ti",
    details: "6GB GDDR6",
    price: 1100,
    damage: 14,
  },
  GeForceRTX_2080: {
    name: "GeForce RTX2080",
    details: "8GB GDDR6",
    price: 1380,
    damage: 18,
  },
  GeForceRTX_3070Ti: {
    name: "GeForce RTX3070Ti",
    details: "8GB GDDR6X",
    price: 1600,
    damage: 22,
  },
  GeForceRTX_3080Ti: {
    name: "GeForce RTX3080Ti",
    details: "12GB GDDR6X",
    price: 1850,
    damage: 26,
  },
  GeForceRTX_3090Ti: {
    name: "GeForce RTX3090Ti",
    details: "24GB GDDR6X",
    price: 2100,
    damage: 30,
  },
  GeForceRTX_4090: {
    name: "GeForce RTX4090",
    details: "24GB GDDR6X",
    price: 2500,
    damage: 40,
  },
};

export const cpuUpgrades = {
  PentiumThree: {
    name: "Pentium 3",
    details: "800MHZ",
    price: 0,
    damage: 0,
  },
  PentiumFour: {
    name: "Pentium 4",
    details: "1300MHZ",
    price: 40,
    damage: 1,
  },
  Core2Duo: {
    name: "Core 2 Duo",
    details: "2Ghz; 2Cores",
    price: 80,
    damage: 2,
  },
  I5_2400S: {
    name: "i5 2400S",
    details: "2.5Ghz; 4 Cores",
    price: 120,
    damage: 3,
  },
  I7_3570K: {
    name: "i7 3570K",
    details: "3.4GHZ; 4 Cores",
    price: 180,
    damage: 5,
  },
  I5_4690: {
    name: "i5 4690",
    details: "3.9GHz; 4 Cores",
    price: 260,
    damage: 7,
  },
  I7_6700K: {
    name: "i7 6700K",
    details: "4GHz; 8 Threads",
    price: 350,
    damage: 10,
  },
  I7_7700K: {
    name: "i7 7700K",
    details: "4.2GHz; 8 Threads",
    price: 500,
    damage: 14,
  },
  I7_8700K: {
    name: "i7 8700K",
    details: "3.7GHz; 12 Threads",
    price: 600,
    damage: 18,
  },
  I7_10700K: {
    name: "i7 10700K",
    details: "3.8GHz; 16 Threads",
    price: 700,
    damage: 23,
  },
  I9_12900K: {
    name: "i9 12900K",
    details: "3.9GHz; 24 Threads",
    price: 900,
    damage: 27,
  },
  I9_14900K: {
    name: "i9 14900K",
    details: "3.2GHz; 32 Threads",
    price: 1000,
    damage: 30,
  },
};

export const hdUpgrades = {
  WD_CAVIAR: {
    name: "Western Digital Caviar",
    details: "HDD; 8GB",
    price: 0,
    damage: 0,
  },
  SEAGATE_20GB: {
    name: "Seagate ST920",
    details: "HDD; 20GB",
    price: 40,
    damage: 1,
  },
  SEAGATE_100GB: {
    name: "Seagate Momentus",
    details: "HDD; 100GB",
    price: 90,
    damage: 3,
  },
  WD_500GB: {
    name: "Western Digital 500GB",
    details: "HDD; 500GB",
    price: 140,
    damage: 7,
  },
  SEAGATE_1TB: {
    name: "Seagate ST1000",
    details: "HDD; 1TB",
    price: 175,
    damage: 11,
  },
  SAMSUNG_256GB: {
    name: "Samsung 860 EVO",
    details: "SSD; 240GB",
    price: 270,
    damage: 14,
  },
  SAMSUNG_1TB: {
    name: "Samsung 870 EVO",
    details: "SSD; 1TB",
    price: 350,
    damage: 17,
  },
  SAMSUNG_2TB: {
    name: "Samsung 980 PRO",
    details: "NVMe SSD; 2TB",
    price: 500,
    damage: 20,
  },
};

export const ramUpgrades = {
  mb512: {
    name: "Corsair CM2X512",
    details: "800MHz; 512MB",
    price: 0,
    damage: 0,
  },
  mb1024: {
    name: "Corsair CM2X1024",
    details: "800MHz; 1024MB",
    price: 50,
    damage: 2,
  },
  mb2gb: {
    name: "Kingston KVR1333D3N9",
    details: "1333MHz; 2GB",
    price: 90,
    damage: 5,
  },
  mb8gb: {
    name: "Crucial PC3-12800",
    details: "1600MHz; 2 * 4GB",
    price: 120,
    damage: 8,
  },
  mb16gb: {
    name: "Kingston FURY",
    details: "3200MHz; 2 * 6GB",
    price: 160,
    damage: 10,
  },
  mb32gb: {
    name: "G Skill Trident",
    details: "4000MHz; 2 * 16GB",
    price: 240,
    damage: 13,
  },
  mb64gb: {
    name: "Corsair Vengeance",
    details: "6000MHz; 2 * 32GB",
    price: 360,
    damage: 17,
  },
  mb128gb: {
    name: "Team Group Delta",
    details: "7800MHz; 4 * 16GB",
    price: 500,
    damage: 20,
  },
};
  
//Gang upgrades -- Will make effiency affect botnet base damage and gang-member damage is flat
  
export const botnetAdmin = {
  name: "Admins",
  price: 1000,
  efficiency: 10,
};

export const scripter = {
  name: "Scripters",
  price: 1200,
  damage: 25,
  efficiency: 2,
};

export const researcher = {
  name: "Researchers",
  price: 600,
  damage: 15,
};

export const mule = {
  name: "Mules",
  price: 1000,
  money: 5,
};