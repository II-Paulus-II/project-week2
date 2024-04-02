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
    price: 0,
    damage: 0,
  },
  GeForceGT_640: {
    name: "GeForce GT640",
    price: 100,
    damage: 1,
  },
  GeForceGTX_460: {
    name: "GeForce GTX460",
    price: 225,
    damage: 2,
  },
  GeForceGTX_660Ti: {
    name: "GeForce GTX660Ti",
    price: 425,
    damage: 4,
  },
  GeForceGTX_960: {
    name: "GeForce GTX960",
    price: 700,
    damage: 6,
  },
  GeForceGTX_1650SUPER: {
    name: "GeForce GTX1650 Super",
    price: 900,
    damage: 10,
  },
  GeForceGTX_1070Ti: {
    name: "GeForce GTX1070Ti",
    price: 1250,
    damage: 14,
  },
  GeForceRTX_2080: {
    name: "GeForce RTX2080",
    price: 1380,
    damage: 18,
  },
  GeForceRTX_3070: {
    name: "GeForce RTX3070",
    price: 1600,
    damage: 22,
  },
  GeForceRTX_3080: {
    name: "GeForce RTX3080",
    price: 1850,
    damage: 26,
  },
  GeForceRTX_3090Ti: {
    name: "GeForce RTX3090Ti",
    price: 2100,
    damage: 30,
  },
  GeForceRTX_4080: {
    name: "GeForce RTX4080",
    price: 2300,
    damage: 35,
  },
  GeForceRTX_4090: {
    name: "GeForce RTX4090",
    price: 2500,
    damage: 40,
  },
};

export const cpuUpgrades = {
  PentiumThree: {
    name: "Pentium 3",
    price: 0,
    damage: 0,
  },
  PentiumFour: {
    name: "Pentium 4",
    price: 40,
    damage: 1,
  },
  Core2Duo: {
    name: "Core 2 Duo",
    price: 80,
    damage: 2,
  },
  I5_2400S: {
    name: "i5 2400S",
    price: 120,
    damage: 3,
  },
  I7_3770: {
    name: "i7 3770",
    price: 180,
    damage: 5,
  },
  Test: {
    name: "Test",
    price: 3000,
    damage: 2,
  },
};

export const hdUpgrades = {
  Small: {
    name: "Small",
    price: 0,
    damage: 0,
  },
  Test: {
    name: "Bad Drive",
    price: 100,
    damage: 1,
  },
};

export const ramUpgrades = {
  First: {
    name: "First",
    price: 0,
    damage: 0,
  },
  mb256: {
    name:"256 MB",
    price: 50,
    damage: 1,
  },
  mb512: {
    name: "512 MB",
    price: 100,
    damage: 2,
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