console.log("Clyker game is werkn sur!");

/* ------ Variables ------*/
//Damage Variables
const basePlayerClickDamage = 1;
const basePLayerBotNetSize = 1;
let clickDamage = 1;
let dps = 1;

//Data Variables

let damageDone = 0; // Record Total Damage done [Probably call this hacking attempts to user]
let numberObjectsHacked = 0;

let objectHP = 5; // Set with function in later levels
let maxObjectHP = 5; //Set with function in later levels
let currentLevel = 1;
const objectsinLevel = 10 // I do not want this to change - 10 per level 
let hackedinLevel = 0; // Starts at 0 then increases to 9 then resets to zero

let objectTypeArray = ["webserver", "crypto", "machine", "phishing"];

//Resources - Players Rig - Players Botnet - Players Money

let sizeOfBotnet = basePLayerBotNetSize; //Your own computer is part of the botnet network 
let sizeWallet = 100000;

//Player rig data

let currentGPU = { value: "None" };
let currentCPU = 0;
let currentRAM = 0;
let currentHD = 0;

/* ------ Upgrade Objects ------*/

//Click Damage upgrades - I will just do Nvidia GPU for now because can do so much with this
//Sorry for underscores but looks better to me :)
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

//DPS damage upgrades -- Will make this a %increase in damage done by your botnet - botnet increases passively




/* ------ Game Logic ------*/

// Function to test Event Listeners when added

function ibeenClicked() {
  console.log("i been clicked");
}

//This function checks if a current item can be upgraded - passes by reference

function canUpgradeItem(playerItem, UpgradeObject) {

  const possibleItem = Object.keys(UpgradeObject);
  const numAvailItems = possibleItem.length;
  let testOne = false;
  let testTwo = false;

  //First Check if current GPU is not the last member of the list?
  const currentItemIndex = possibleItem.indexOf(playerItem.value);
  
  if (currentItemIndex < numAvailItems-1) {
    testOne = true;
    const nextItemPrice = UpgradeObject[possibleItem[currentItemIndex+1]].price;
    //Second check inside first to prevent checking price for non existent next item. 
    if ( nextItemPrice <= sizeWallet ) {
      testTwo = true;
    }
  }

  if (testOne && testTwo) {
    return true;
  }
  else {
    return false;
  }

}

//This function upgrades player GPU - Includes check that the GPU can be upgraded

function upgradeItem(playerItem, UpgradeObject) {

  let canUpgradeItemCheck = canUpgradeItem(playerItem, UpgradeObject);
  //Get Array of GPU Names and number of GPU's available
  const possibleItem = Object.keys(UpgradeObject);
  const currentItemIndex = possibleItem.indexOf(playerItem.value);

  //If can upgrade then do it and pay price
  if (canUpgradeItemCheck) {
    sizeWallet -= UpgradeObject[possibleItem[currentItemIndex+1]].price
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

  //Calculate Total Click Damage

  clickDamage = basePlayerClickDamage + gpuDamage;

  /* --- Console Logging --- */
  // console.log(arrayGPU);
  // console.log("my current GPU is indexed at: ", currentGPUindex);
  console.log("My gpu damage is: ", gpuDamage);
  console.log("click damage is", clickDamage);
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
const currentGPUContainer = document.getElementById("currentGPU");


/* ------ User Input Buttons ------*/

const hackingButton = document.getElementById("objectHacker");
const upgradeGPUButton = document.getElementById("upgradeGPU");

/* ------ RENDER ------*/

function render() {

  //Basic data entry in the page
  dpsCounter.textContent = dps;
  clickDamageCounter.textContent = clickDamage;
  objectHPContainer.textContent = `${objectHP} / ${maxObjectHP}`;
  hackingAttempts.textContent = numberObjectsHacked;
  levelContainer.textContent = currentLevel;
  sizeBotnetContainer.textContent = sizeOfBotnet;
  sizeWalletContainer.textContent = sizeWallet;

  //GPU
  const gpuKey = currentGPU.value;
  const gpuName = GCardUpgrades[gpuKey].name;
  currentGPUContainer.textContent = gpuName;
  let buyNewGPU = canUpgradeItem(currentGPU, GCardUpgrades);
  if (buyNewGPU) {
    upgradeGPUButton.style.opacity = 1;
  }
  else {
    upgradeGPUButton.style.opacity = 0;
  }
}

// Run it once to make sure - especially since you will need to run it if reloading data from storage
render();

/* ------ Event Listeners & SetInterval ------*/

//Upgrades

upgradeGPUButton.addEventListener("click", function () {
  upgradeItem(currentGPU, GCardUpgrades);
});

//Damage 

setInterval(damageObject.bind(null, "dps"), 1000);
hackingButton.addEventListener("click", damageObject.bind(null, "click"));