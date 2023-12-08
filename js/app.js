console.log("Clyker game is werkn sur!");

/* ------ User Input Buttons ------*/

const hackingButton = document.getElementById("objectHacker");
const upgradeGPUButton = document.getElementById("upgradeGPU");

/* ------ Variables ------*/
//Damage Variables
const basePlayerClickDamage = 1;
const basePLayerBotNetSize = 1;
let clickDamage = 1;
let dps = 1;

//Data Variables

let damageDone = 0; // Record Total Damage done [Probably call this hacking attempts to user]
let numberObjectsHacked = 0;

let objectHP = 10; // Set with function in later levels
let maxObjectHP = 5; //Set with function in later levels
let currentLevel = 1;
const objectsinLevel = 10 // I do not want this to change - 10 per level 
let hackedinLevel = 0; // Starts at 0 then increases to 9 then resets to zero

let objectTypeArray = ["webserver", "crypto", "machine", "phishing"];

//Resources - Players Rig - Players Botnet - Players Money

let sizeOfBotnet = basePLayerBotNetSize; //Your own computer is part of the botnet network 

//Player rig data

let currentGPU = "None";

/* ------ Upgrade Objects ------*/

//Click Damage upgrades - I will just do Nvidia GPU for now because can do so much with this
//Sorry for underscores but looks better to me :)
const GCardUpgrades = {
  None: {
    name: "iGPU",
    price: 0,
    damage: 0,
  },
  GeForceGT_640: {
    name: "GeForce GT640",
    price: 1,
    damage: 1,
  },
  GeForceGTX_460: {
    name: "GeForce GTX460",
    price: 1,
    damage: 2,
  },
  GeForceGTX_660Ti: {
    name: "GeForce GTX660Ti",
    price: 1,
    damage: 4,
  },
  GeForceGTX_960: {
    name: "GeForce GTX960",
    price: 1,
    damage: 6,
  },
  GeForceGTX_1650SUPER: {
    name: "GeForce GTX1650 Super",
    price: 1,
    damage: 10,
  },
  GeForceGTX_1070Ti: {
    name: "GeForce GTX1070Ti",
    price: 1,
    damage: 14,
  },
  GeForceRTX_2080: {
    name: "GeForce RTX2080",
    price: 1,
    damage: 18,
  },
  GeForceRTX_3070: {
    name: "GeForce RTX3070",
    price: 1,
    damage: 22,
  },
  GeForceRTX_3080: {
    name: "GeForce RTX3080",
    price: 1,
    damage: 26,
  },
  GeForceRTX_3090Ti: {
    name: "GeForce RTX3090Ti",
    price: 1,
    damage: 30,
  },
  GeForceRTX_4080: {
    name: "GeForce RTX4080",
    price: 1,
    damage: 35,
  },
  GeForceRTX_4090: {
    name: "GeForce RTX4090",
    price: 1,
    damage: 40,
  },
}

//DPS damage upgrades -- Will make this a %increase in damage done by your botnet - botnet increases passively




/* ------ Game Logic ------*/

// Function to test Event Listeners when added

function ibeenClicked() {
  console.log("i been clicked");
}

//This function upgrades player GPU - Includes check that the GPU can be upgraded

function upgradeGPU() {
  //Get Array of GPU Names and number of GPU's available
  let possibleGPU = Object.keys(GCardUpgrades);
  let numAvailGPU = possibleGPU.length;

  //Upgrade GPU if its possible
  let currentGPUIndex = possibleGPU.indexOf(currentGPU);
  if (currentGPUIndex < numAvailGPU-1) {
    currentGPU = possibleGPU[currentGPUIndex + 1];
  }

  // Now recalculate Click Damage
  setClickDamage();

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
  const gpuKey = currentGPU;
  const gpuDamage = GCardUpgrades[gpuKey].damage;

  //Calculate Total Click Damage

  clickDamage = basePlayerClickDamage + gpuDamage;

  /* --- Console Logging --- */
  // console.log(arrayGPU);
  // console.log("my current GPU is indexed at: ", currentGPUindex);
  console.log("My gpu damage is: ", gpuDamage);
  console.log("click damage is", clickDamage);
}

//Function to make Ortunado happy

function setDPSDamage() {
  //Gonna do more with this later
  dps = sizeOfBotnet;
  console.log("dps is", dps);
}


//This function provides a new object and/or new level when an objects hack is completed. 

function getNextObject() {
  //If website hacked have chance of adding to botnet
  let newBotNetChance = Math.random();
  console.log("my new bot net chance was: ", newBotNetChance)
  if (newBotNetChance > 0.9 ) {
    sizeOfBotnet++;
    setDPSDamage();
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
  console.log("Number of objects Hacked is: ", numberObjectsHacked);
}

/* ----- HTML Data IDS ----- */

const dpsCounter = document.getElementById("dpsCounter");
const clickDamageCounter = document.getElementById("clickDamageCounter");
const objectHPContainer = document.getElementById("objectHP");
const levelContainer = document.getElementById("currentLevel");
const currentGPUContainer = document.getElementById("currentGPU");

/* ------ RENDER ------*/

function render() {
  dpsCounter.textContent = dps;
  clickDamageCounter.textContent = clickDamage;
  objectHPContainer.textContent = `${objectHP} / ${maxObjectHP}`;
  levelContainer.textContent = currentLevel;

  const gpuKey = currentGPU;
  const gpuName = GCardUpgrades[gpuKey].name;
  currentGPUContainer.textContent = gpuName;
}
/* ------ Event Listeners & SetInterval ------*/

upgradeGPUButton.addEventListener("click", upgradeGPU);

//Damage 

setInterval(damageObject.bind(null, "dps"), 1000);
hackingButton.addEventListener("click", damageObject.bind(null, "click"));