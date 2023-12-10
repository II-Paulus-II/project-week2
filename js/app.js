console.log("Clyker game is werkn sur!");

/* ------ Variables ------ */
//Base const Variables
const basePlayerClickDamage = 1;
const basePLayerBotNetSize = 1;
const basePlayerGang = 0;
const objectsinLevel = 10 // I do not want this to change - 10 per level 
const firstLevelHP = 5;
const startingWallet = 0;
const objectTypeArray = ["webserver", "crypto", "machine", "phishing"]; //Unused

//Base Game Variables that need to change but need to be initialised
let hackedinLevel = 0; // Starts at 0 then increases to 9 then resets to zero
let objectHP = 5; // Set with function in later levels
let maxObjectHP = 5; //Set with function in later levels

//Game variables that are calculated from base values. 
let clickDamage, dps;

//Game variables saved & reloaded
let damageDone, numberObjectsHacked, sizeWallet, currentLevel, sizeOfBotnet;

//Player's rig, gang, initialise the rig as objects to prevent errors

let currentCPU = {value: " "};
let currentGPU = {value: " "};
let currentRAM = {value: " "};
let currentHD = {value: " "};
let numAdmins;
let numScripters;
let numResearchers;
let numMules;

/* ------ Upgrade Objects ------ */

//Click Damage upgrades
//Sorry for underscores for GPUs but looks better to me :)
const GCardUpgrades = {
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
}

const cpuUpgrades = {
  PentiumThree: {
    name: "Pentium 3",
    price: 0,
    damage: 0,
  },
  PentiumFour: {
    name: "Pentium 4",
    price: 50,
    damage: 1,
  },
  Test: {
    name:"Test",
    price: 3000,
    damage: 2,
  },
}

const hdUpgrades = {
  Small: {
    name: "Small",
    price: 0,
    damage: 0,
  },
  Test: {
    name:"Test",
    price: 100,
    damage: 1,
  },
}

const ramUpgrades = {
  First: {
    name: "First",
    price: 0,
    damage: 0,
  },
  Test: {
    name:"Test",
    price: 100,
    damage: 1,
  },
}

//Gang upgrades -- Will make this a %increase in damage done by your botnet - botnet increases passively

const botnetAdmin = {
  name: "Admins",
  price: 1000,
  efficiency: 10,
}

const scripter = {
  name: "Scripters",
  price: 1200,
  damage: 25,
  efficiency: 2,
}

const researcher = {
  name: "Researchers",
  price: 600,
  damage: 15,
}

const mule = {
  name: "Mules",
  price: 1000,
  money: 1,
}

/* ----- Save Game Function ----- */

function saveGame() {
  let saveGameObject = {
    damage : damageDone,
    hacks: numberObjectsHacked,
    money: sizeWallet,
    level: currentLevel,
    botnet: sizeOfBotnet,
    rig: {
      currentCPU,
      currentRAM,
      currentGPU,
      currentHD,
    },
    gang: [numAdmins, numScripters, numResearchers, numMules],
  }
  const stringifiedSave = JSON.stringify(saveGameObject);

  // localStorage only wants strings, so we give it a stringified object
  localStorage.setItem("Save", stringifiedSave);
}

/* ------ Game Logic ------ */

// Function to test Event Listeners when added

function ibeenClicked() {
  console.log("i been clicked");
}

/* ----- Rig Upgrade Functions ----- */

//Function to quickly get an item name 
function itemName(playerItem, upgradeObject) {
  const itemKey = playerItem.value;
  const itemName = upgradeObject[itemKey].name;
  return itemName;
}

//This function checks if a current rig items can be upgraded - passes by reference
//Seperated because used by the rendering function

function canUpgradeItem(playerItem, UpgradeObject) {

  const possibleItem = Object.keys(UpgradeObject);
  const numAvailItems = possibleItem.length;
  let canUpgrade = false;

  //First Check if current object is not the last member of the list?
  const currentItemIndex = possibleItem.indexOf(playerItem.value);
  
  if (currentItemIndex < numAvailItems-1) {
    const nextItemPrice = UpgradeObject[possibleItem[currentItemIndex+1]].price;
    //Second check inside first to prevent checking price for non existent next item. 
    if ( nextItemPrice <= sizeWallet ) {
      canUpgrade = true;
    }
  }

  return canUpgrade;
}

//This function upgrades player Items

function upgradeItem(playerItem, upgradeObject) {

  let canUpgradeItemCheck = canUpgradeItem(playerItem, upgradeObject);
  //Get Array of object Names and number of Objects's available
  const possibleItem = Object.keys(upgradeObject);
  const currentItemIndex = possibleItem.indexOf(playerItem.value);

  //If can upgrade then do it and pay price
  if (canUpgradeItemCheck) {
    sizeWallet -= upgradeObject[possibleItem[currentItemIndex+1]].price
    playerItem.value = possibleItem[currentItemIndex + 1];
  }
  // Now recalculate Click Damage and render
  setClickDamage();
  render();

  /* --- Console Logging --- */
//   console.log("number of available GPU: ", numAvailGPU);
//   console.log("Array of GPUS", possibleGPU);
//   console.log("current index of GPU", currentGPUIndex);
//   console.log("current GPU is now: ", currentGPU);
}

/* ----- Gang Hire Functions ----- */

//Function to check if one can pay the hire fee

function canHire(gangMember) {
  let canAfford = false;
  const hirePrice = gangMember.price;
  if (hirePrice <= sizeWallet) {
    canAfford = true;
  }
  return canAfford
}

//Function to Hire Gang members -- I am sure this can be optimised slightly better but its fine for now 

function hireGangMember(gangMember) {
  let canHireGM = canHire(gangMember);
  if (canHireGM) {
    if(gangMember.name == "Admins") {
      numAdmins++;
    }
    else if (gangMember.name == "Scripters") {
      numScripters++;
    }
    else if (gangMember.name == "Researchers") {
      numResearchers++;
    }
    else if (gangMember.name == "Mules") {
      numMules++;
    }
    sizeWallet -= gangMember.price
  }
}

// Function to Calculate Click Damage

function setClickDamage() {
  //Get GPU damage
  //Get Individal GPU Objects as array
  // very bad way to do it rip life
  // let arrayGPU = Object.values(GCardUpgrades);
  // let possibleGPU = Object.keys(GCardUpgrades);
  // let currentGPUindex = possibleGPU.indexOf(currentGPU);
  // let damageGPU = arrayGPU[currentGPUindex].damage;

  //refactor
  const gpuKey = currentGPU.value;
  const gpuDamage = GCardUpgrades[gpuKey].damage;
  const cpuKey = currentCPU.value;
  const cpuDamage = cpuUpgrades[cpuKey].damage;

  //Calculate Total Click Damage

  clickDamage = basePlayerClickDamage + gpuDamage + cpuDamage;

  /* --- Console Logging --- */
  // console.log("My gpu damage is: ", gpuDamage);
  // console.log("My cpu damage is: ", cpuDamage);
  // console.log("click damage is: ", clickDamage);
}

//Function to calculate DPS Damage

function setDPSDamage() {
  //Gonna do more with this later
  dps = sizeOfBotnet;

  /* --- Console Logging --- */
  // console.log("dps is", dps);
}


//This function provides a new object and/or new level when an objects hack is completed. 
//If make a boss do it here. 

function getNextObject() {
  //If website hacked have chance of adding to botnet
  let newBotNetChance = Math.random();

  if (newBotNetChance > 0.85 ) {
    sizeOfBotnet++;
    setDPSDamage();
  }
  //If website hacked have chance of getting money
  //Mules increase this amount
  let chanceOfMoney = Math.random();
  if (chanceOfMoney < 0.15) {
    sizeWallet+=(maxObjectHP*3); //May change this amount. 
  }
  //Check if level complete
  if (hackedinLevel == objectsinLevel) {
    //incremement level
    currentLevel++;
    //reset level counter
    hackedinLevel = 0;
    //Calculate new max HP for website
    maxObjectHP = 2*clickDamage + 4*dps; //May change this later
    //Save Game after completing Level
    saveGame();
  }

  objectHP = maxObjectHP;

  /* --- Console Logging --- */
  // console.log("Your level is: ", currentLevel);
  // console.log("Max Object HP: ", maxObjectHP);
  // console.log("my new bot net chance was: ", newBotNetChance)
}

//This calculates the damage done to the object determined by current clickDamage or dps 
//Called by either the dps listerner or the clickingDone function 

function damageObject(eventParam) {

  if (eventParam == "click") {
  //Record all damage done anyway
  damageDone += clickDamage;

  //Do damage to current object
  objectHP -= clickDamage;
  }
  else if (eventParam == "dps") {
    damageDone += dps;
    objectHP -= dps;
  }

  //check if object killed [i mean hacked]
  if (objectHP <= 0) {
    //Increase objects hacked
    numberObjectsHacked += 1;
    hackedinLevel += 1;

    getNextObject();
  }

  render();
  /* --- Console Logging --- */
  // console.log("calculated damage", clickDamage);
  // console.log("Damage Done is now", damageDone);
  // console.log("Number of objects Hacked is: ", numberObjectsHacked);
}

/* ----- HTML Data IDS ----- */

const dpsCounter = document.getElementById("dpsCounter");
const clickDamageCounter = document.getElementById("clickDamageCounter");
const objectHPContainer = document.getElementById("objectHP");
const hackingAttempts = document.getElementById("hackingAttempts");
const levelContainer = document.getElementById("currentLevel");
const sizeWalletContainer = document.getElementById("sizeWallet");
const sizeBotnetContainer = document.getElementById("sizeBotnet");
const currentCPUContainer = document.getElementById("currentCPU");
const currentRAMContainer = document.getElementById("currentRAM");
const currentGPUContainer = document.getElementById("currentGPU");
const currentHDContainer = document.getElementById("currentHD");
const numAdminsContainer = document.getElementById("numAdmins");
const numScriptersContainer = document.getElementById("numScripters");
const numResearchersContainer = document.getElementById("numResearchers");
const numMulesContainer = document.getElementById("numMules");

/* ------ User Input Buttons ------*/

const newGameButton = document.getElementById("newGame");
const hackingButton = document.getElementById("objectHacker");
const upgradeCPUButton = document.getElementById("upgradeCPU");
const upgradeRAMButton = document.getElementById("upgradeRAM");
const upgradeGPUButton = document.getElementById("upgradeGPU");
const upgradeHDButton = document.getElementById("upgradeHD");
const hireAdminButton = document.getElementById("hireAdmin");
const hireScripterButton = document.getElementById("hireScripter");
const hireResearcherButton = document.getElementById("hireResearcher");
const hireMuleButton = document.getElementById("hireMule");

/* ------ RENDER ------*/

//Two functions just to check if items can be upgraded or gang members can be hired. 

function canRenderUpgrade(playerItem, upgradeObject) {
  let buyNewItem = canUpgradeItem(playerItem, upgradeObject);
  if (buyNewItem) {
    return 1;
  }
  else {
    return 0;
  }
}

function canRenderHire(gangMember) {
  let canHireGM = canHire(gangMember);
  if (canHireGM) {
    return 1;
  }
  else {
    return 0;
  }
}

function render() {
  //Basic data entry in the page
  dpsCounter.textContent = dps;
  clickDamageCounter.textContent = clickDamage;
  objectHPContainer.textContent = `${objectHP} / ${maxObjectHP}`;
  hackingAttempts.textContent = numberObjectsHacked;
  levelContainer.textContent = currentLevel;
  sizeBotnetContainer.textContent = sizeOfBotnet;
  sizeWalletContainer.textContent = sizeWallet;

  //Rig
  //CPU
  currentCPUContainer.textContent = itemName(currentCPU, cpuUpgrades);
  upgradeCPUButton.style.opacity = canRenderUpgrade(currentCPU, cpuUpgrades);

  //RAM
  currentRAMContainer.textContent = itemName(currentRAM, ramUpgrades);
  upgradeRAMButton.style.opacity = canRenderUpgrade(currentRAM, ramUpgrades);

  //GPU
  currentGPUContainer.textContent = itemName(currentGPU, GCardUpgrades);
  upgradeGPUButton.style.opacity = canRenderUpgrade(currentGPU, GCardUpgrades);

  //HD
  currentHDContainer.textContent = itemName(currentHD, hdUpgrades);
  upgradeHDButton.style.opacity = canRenderUpgrade(currentHD, hdUpgrades);

  //Gang
  //Admins
  numAdminsContainer.textContent = numAdmins;
  hireAdminButton.style.opacity = canRenderHire(botnetAdmin);

  //Scripters 
  numScriptersContainer.textContent = numScripters;
  hireScripterButton.style.opacity = canRenderHire(scripter);

  //Researchers
  numResearchersContainer.textContent = numResearchers;
  hireResearcherButton.style.opacity = canRenderHire(researcher);

  //Mules
  numMulesContainer.textContent = numMules;
  hireMuleButton.style.opacity = canRenderHire(mule);
}

/* ----- Begin & Reset Game functions ----- */

function beginGame() {
  const mySavedJSON = localStorage.getItem("Save");
  if (mySavedJSON) {
    //If its here set the game variables 
    const gameSave = JSON.parse(mySavedJSON);
    //Set up the Game 
    damageDone = gameSave.damage;
    numberObjectsHacked = gameSave.hacks;
    sizeWallet = gameSave.money;
    currentLevel = gameSave.level;
    sizeOfBotnet = gameSave.botnet;
    //Rig
    currentCPU = gameSave.rig.currentCPU;
    currentRAM = gameSave.rig.currentRAM;
    currentGPU = gameSave.rig.currentGPU;
    currentHD = gameSave.rig.currentHD;
    //Gang
    numAdmins = gameSave.gang[0];
    numScripters = gameSave.gang[1];
    numResearchers = gameSave.gang[2]; 
    numMules = gameSave.gang[3];

  }
  else {
    damageDone = 0;
    numberObjectsHacked = 0;
    sizeWallet = startingWallet+10000;
    currentLevel = 1;
    sizeOfBotnet = basePLayerBotNetSize;
    //Rig
    currentCPU.value = Object.keys(cpuUpgrades)[0];
    currentRAM.value = Object.keys(ramUpgrades)[0];
    currentGPU.value = Object.keys(GCardUpgrades)[0];
    currentHD.value = Object.keys(hdUpgrades)[0];
    //Gang
    numAdmins = 0;
    numScripters = 0;
    numResearchers = 0;
    numMules = 0;
  }

  setClickDamage();
  setDPSDamage();
  render();
  /* --- Console Logging --- */
  // console.log("gamesave rig ", gameSave.rig);
  // console.log("gpu is ", gameSave.rig.currentGPU);
  // console.log("Begin Function");
  // console.log("My current GPU is: ",currentGPU);
  // console.log(mySavedJSON);
  // console.log(gameSave);
}

function resetGame(event) {
  event.preventDefault();
  localStorage.removeItem("Save");
  hackedinLevel = 0; // reset
  objectHP = 5; 
  maxObjectHP = 5; 
  beginGame();
}

/* ----- Begin Game function that needs to run once ----- */

beginGame();

/* ------ Event Listeners & SetInterval ------ */

//Upgrades
upgradeCPUButton.addEventListener("click", function () {
  upgradeItem(currentCPU, cpuUpgrades);
});
upgradeRAMButton.addEventListener("click", function () {
  upgradeItem(currentRAM, ramUpgrades);
});
upgradeGPUButton.addEventListener("click", function () {
  upgradeItem(currentGPU, GCardUpgrades);
});
upgradeHDButton.addEventListener("click", function () {
  upgradeItem(currentHD, hdUpgrades);
});

//Hire Gang Members
hireAdminButton.addEventListener("click", function () {
  hireGangMember(botnetAdmin);
});
hireScripterButton.addEventListener("click", function () {
  hireGangMember(scripter);
});
hireResearcherButton.addEventListener("click", function () {
  hireGangMember(researcher);
});
hireMuleButton.addEventListener("click", function () {
  hireGangMember(mule);
});

//Damage -- could do this the above way as well. 

setInterval(damageObject.bind(null, "dps"), 1000);
hackingButton.addEventListener("click", damageObject.bind(null, "click"));

//NewGameButton
newGameButton.addEventListener("click", resetGame);