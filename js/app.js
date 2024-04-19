/* ----- Imports ----- */
import * as Constants from "./constants.js";
import * as Game from "./game.js";

console.log("Clyker game is werkn sur!");

/* ----- Correct Github Home Link ----- */

const HOME = "https://ii-paulus-ii.github.io/project-week2/";
const HOMELINK = document.getElementById("homeLink");

if(window.location.href === "https://ii-paulus-ii.github.io/project-week2/play.html") {
  HOMELINK.href = `${HOME}`;
}

/* ------ Variables ------ */

//Base Game Variables that need to change but need to be initialised
let hackedinLevel = 0; // Starts at 0 then increases to 9 then resets to zero
let objectHP = 5; // Set with function in later levels
let maxObjectHP = 5; //Set with function in later levels

//Game variables that are calculated from base values. 
let clickDamage, dps;

//Game variables saved & reloaded
let damageDone, numberObjectsHacked, sizeWallet, currentLevel, sizeOfBotnet, botnetEfficiency;

//Player's rig, gang, initialise the rig as objects to prevent errors

let currentCPU = {value: " "};
let currentGPU = {value: " "};
let currentRAM = {value: " "};
let currentHD = {value: " "};
let numAdmins;
let numScripters;
let numResearchers;
let numMules;

//Current Displayed Information Variable 
let currentDisplayedInformation = "rig";


/* ----- Save Game Function ----- */

function saveGame() {
  const saveGameObject = {
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
};

/* ------ Game Logic ------ */

// Function to test Event Listeners when added

function ibeenClicked() {
  console.log("i been clicked");
}

/* ----- Rig Upgrade Functions ----- */

//This function upgrades player Items

function upgradeItem(playerItem, upgradeObject) {

  let canUpgradeItemCheck = Game.canUpgradeItem(playerItem, upgradeObject, sizeWallet);
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

}

/* ----- Gang Hire Functions ----- */

//Function to Hire Gang members -- I am sure this can be optimised slightly better but its fine for now 

function hireGangMember(gangMember) {
  let canHireGM = Game.canHire(gangMember, sizeWallet);
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
  //Recalculate DPS
  setDPSDamage();
}

/* ----- Damage Functions ----- */

// Function to Calculate Click Damage

function setClickDamage() {

  //refactor
  const gpuKey = currentGPU.value;
  const gpuDamage = Constants.GCardUpgrades[gpuKey].damage;
  const cpuKey = currentCPU.value;
  const cpuDamage = Constants.cpuUpgrades[cpuKey].damage;

  //Calculate Total Click Damage

  clickDamage = Constants.basePlayerClickDamage + gpuDamage + cpuDamage;
};

//Function to calculate DPS Damage

function setDPSDamage() {
  //Already Declared
  botnetEfficiency = Game.getBotNetEfficiency(numAdmins, numScripters);
  const damageIncrease = Game.getGangDamage(numResearchers, numScripters);
  if (sizeOfBotnet <= 5) {
    dps = sizeOfBotnet + damageIncrease;
  }
  else {
    dps = 5 + ((sizeOfBotnet - 5) * botnetEfficiency) + damageIncrease;
  }
  
  /* --- Console Logging --- */
  // console.log(botnetEfficiency, "is botnet efficiency")
  // console.log("dps is", dps);
}

//This function provides a new object and/or new level when an objects hack is completed. 
//If make a boss do it here. 

function getNextObject() {
  //If website hacked have chance of adding to botnet
  const newBotNetChance = Math.random();

  if (newBotNetChance > 0.85 ) {
    sizeOfBotnet++;
    setDPSDamage();
  }
  //If website hacked have chance of getting money
  //Mules increase this amount
  let chanceOfMoney = Math.random();
  if (chanceOfMoney < 0.15) {
    sizeWallet+=(maxObjectHP*(3+(numMules*Constants.mule.money))); //May change this amount. 
  }
  //Check if level complete
  if (hackedinLevel == Constants.objectsinLevel) {
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
    damageDone += (dps/10);
    objectHP -= (dps/10);
  }

  //check if object killed [i mean hacked]
  if (objectHP <= 0) {
    //Increase objects hacked
    numberObjectsHacked += 1;
    hackedinLevel += 1;

    getNextObject();
  }

  render();
}

/* ----- HTML Data IDS ----- */

const dpsCounter = document.getElementById("dpsCounter");
const clickDamageCounter = document.getElementById("clickDamageCounter");
const objectHPContainer = document.getElementById("objectHP");
const progressBar = document.getElementById("progressBar");
const hackingAttempts = document.getElementById("hackingAttempts");
const levelContainer = document.getElementById("currentLevel");
const sizeWalletContainer = document.getElementById("sizeWallet");
const sizeBotnetContainer = document.getElementById("sizeBotnet");
const efficiencyBotnetContainer = document.getElementById("efficiencyBotnet");
const showRig = document.getElementById("showRig");
const rigDisplay = document.getElementById("rigDisplay")
const showGang = document.getElementById("showGang");
const gangDisplay = document.getElementById("gangDisplay")
const showInfo = document.getElementById("showInfo");
const infoDisplay = document.getElementById("infoDisplay")

const currentCPUContainer = document.getElementById("currentCPU");
const currentRAMContainer = document.getElementById("currentRAM");
const currentGPUContainer = document.getElementById("currentGPU");
const currentHDContainer = document.getElementById("currentHD");
const adminHoverContainer = document.getElementById("adminContainer")
const numAdminsContainer = document.getElementById("numAdmins");
const scripterHoverContainer = document.getElementById("scripterContainer")
const numScriptersContainer = document.getElementById("numScripters");
const researcherHoverContainer = document.getElementById("researcherContainer")
const numResearchersContainer = document.getElementById("numResearchers");
const muleHoverContainer = document.getElementById("mulesContainer")
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

function showInformation(param) {
  //if (param === currentDisplayedInformation)
  switch(currentDisplayedInformation)
  {
    case "rig":
      rigDisplay.classList.add("hidden");
      showRig.classList.remove("selectedSection");
      break;
    case "gang":
      gangDisplay.classList.add("hidden");
      showGang.classList.remove("selectedSection");
      break; 
    case "info":
      infoDisplay.classList.add("hidden");
      showInfo.classList.remove("selectedSection");
      break;
  }
  switch(param)
  {
    case "rig":
      rigDisplay.classList.remove("hidden");
      showRig.classList.add("selectedSection");
      currentDisplayedInformation = "rig";
      break;
    case "gang":
      gangDisplay.classList.remove("hidden");
      showGang.classList.add("selectedSection");
      currentDisplayedInformation = "gang";
      break; 
    case "info":
      infoDisplay.classList.remove("hidden");
      showInfo.classList.add("selectedSection");
      currentDisplayedInformation = "info";
      break;
  }
}

function showDetails(event, playerItem, upgradeObject) {
  const itemDetails = event.target.parentElement.querySelector("div.hoveredDetails");
  const itemDetailsName = itemDetails.querySelector("p.deviceName");
  const itemDetailsDamage = itemDetails.querySelector("p.deviceDamage")
  itemDetailsName.textContent = Game.itemName(playerItem, upgradeObject);
  itemDetailsDamage.textContent = `Damage: ${upgradeObject[playerItem.value].damage}`
  itemDetails.classList.remove("hidden");
}

function hideDetails(event) {
  const itemDetails = event.target.parentElement.querySelector("div.hoveredDetails");
  itemDetails.classList.add("hidden");
}

function showGangDetails(event, gangMember) {
  const gangDetails = event.target.querySelector(".hoveredDetails");
  if(gangDetails) {
    const gangDetailsName = gangDetails.querySelector(".deviceName");
    const gangDetailsDamage = gangDetails.querySelector(".deviceDamage");
    const gangDetailsPrice = gangDetails.querySelector(".devicePrice");

    gangDetailsName.textContent = gangMember.name;
    gangDetailsPrice.textContent = `Hire Price: £${gangMember.price}`;
    gangDetails.classList.remove("hidden");
  }
}

function hideGangDetails(event) {
  const itemDetails = event.target.querySelector(".hoveredDetails");
  if(itemDetails) {
    itemDetails.classList.add("hidden");
  }
}

function canRenderUpgrade(playerItem, upgradeObject, sizeWallet) {
  let buyNewItem = Game.canUpgradeItem(playerItem, upgradeObject, sizeWallet);
  if (buyNewItem) {
    return 1;
  }
  else {
    return 0;
  }
}

function canRenderHire(gangMember, sizeWallet) {
  let canHireGM = Game.canHire(gangMember, sizeWallet);
  if (canHireGM) {
    return 1;
  }
  else {
    return 0;
  }
}

function renderProgress() {
  let widthPercentage = 100 - (100 * (objectHP/maxObjectHP));
  progressBar.style.width = widthPercentage + "%";
}

function render() {
  //Basic data entry in the page
  dpsCounter.textContent = parseFloat(dps).toFixed(0);
  clickDamageCounter.textContent = parseFloat(clickDamage).toFixed(0);
  hackingAttempts.textContent = numberObjectsHacked;
  levelContainer.textContent = currentLevel;
  sizeBotnetContainer.textContent = sizeOfBotnet;
  sizeWalletContainer.textContent = parseFloat(sizeWallet).toFixed(2);
  efficiencyBotnetContainer.textContent = parseFloat(botnetEfficiency*100).toFixed(0);

  renderProgress();
  //Rig
  //CPU
  currentCPUContainer.textContent = Game.itemName(currentCPU, Constants.cpuUpgrades);
  upgradeCPUButton.style.opacity = canRenderUpgrade(currentCPU, Constants.cpuUpgrades, sizeWallet);

  //RAM
  currentRAMContainer.textContent = Game.itemName(currentRAM, Constants.ramUpgrades);
  upgradeRAMButton.style.opacity = canRenderUpgrade(currentRAM, Constants.ramUpgrades, sizeWallet);

  //GPU
  currentGPUContainer.textContent = Game.itemName(currentGPU, Constants.GCardUpgrades);
  upgradeGPUButton.style.opacity = canRenderUpgrade(currentGPU, Constants.GCardUpgrades, sizeWallet);

  //HD
  currentHDContainer.textContent = Game.itemName(currentHD, Constants.hdUpgrades);
  upgradeHDButton.style.opacity = canRenderUpgrade(currentHD, Constants.hdUpgrades, sizeWallet);

  //Gang
  //Admins
  numAdminsContainer.textContent = numAdmins;
  hireAdminButton.style.opacity = canRenderHire(Constants.botnetAdmin, sizeWallet);

  //Scripters 
  numScriptersContainer.textContent = numScripters;
  hireScripterButton.style.opacity = canRenderHire(Constants.scripter, sizeWallet);

  //Researchers
  numResearchersContainer.textContent = numResearchers;
  hireResearcherButton.style.opacity = canRenderHire(Constants.researcher, sizeWallet);

  //Mules
  numMulesContainer.textContent = numMules;
  hireMuleButton.style.opacity = canRenderHire(Constants.mule, sizeWallet);
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
    sizeWallet = Constants.startingWallet;
    currentLevel = 1;
    sizeOfBotnet = Constants.basePLayerBotNetSize;
    //Rig
    currentCPU.value = Object.keys(Constants.cpuUpgrades)[0];
    currentRAM.value = Object.keys(Constants.ramUpgrades)[0];
    currentGPU.value = Object.keys(Constants.GCardUpgrades)[0];
    currentHD.value = Object.keys(Constants.hdUpgrades)[0];
    //Gang
    numAdmins = Constants.basePlayerGang;
    numScripters = Constants.basePlayerGang;
    numResearchers = Constants.basePlayerGang;
    numMules = Constants.basePlayerGang;
  }

  setClickDamage();
  setDPSDamage();
  if (currentLevel >= 2) {
    maxObjectHP = 2*clickDamage + 4*dps;
    objectHP = maxObjectHP;
  }
  render();
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

//Information Display
showRig.addEventListener("click", function () {
  showInformation("rig");
});
showGang.addEventListener("click", function () {
  showInformation("gang");
});
showInfo.addEventListener("click", function () {
  showInformation("info");
});

//Hovering 
currentCPUContainer.addEventListener("mouseover", function (event) {
  showDetails(event, currentCPU, Constants.cpuUpgrades);
});
currentCPUContainer.addEventListener("mouseout", function (event) {
  hideDetails(event);
});
currentRAMContainer.addEventListener("mouseover", function (event) {
  showDetails(event, currentRAM, Constants.ramUpgrades);
});
currentRAMContainer.addEventListener("mouseout", function (event) {
  hideDetails(event);
});
currentGPUContainer.addEventListener("mouseover", function (event) {
  showDetails(event, currentGPU, Constants.GCardUpgrades);
});
currentGPUContainer.addEventListener("mouseout", function (event) {
  hideDetails(event);
});
currentHDContainer.addEventListener("mouseover", function (event) {
  showDetails(event, currentHD, Constants.hdUpgrades);
});
currentHDContainer.addEventListener("mouseout", function (event) {
  hideDetails(event);
});

adminHoverContainer.addEventListener("mouseover", function (event) {
  showGangDetails(event, Constants.botnetAdmin);
});
adminHoverContainer.addEventListener("mouseout", function (event) {
  hideGangDetails(event);
});
scripterHoverContainer.addEventListener("mouseover", function (event) {
  showGangDetails(event, Constants.scripter);
});
scripterHoverContainer.addEventListener("mouseout", function (event) {
  hideGangDetails(event);
});
researcherHoverContainer.addEventListener("mouseover", function (event) {
  showGangDetails(event, Constants.researcher);
});
researcherHoverContainer.addEventListener("mouseout", function (event) {
  hideGangDetails(event);
});
muleHoverContainer.addEventListener("mouseover", function (event) {
  showGangDetails(event, Constants.mule);
});
muleHoverContainer.addEventListener("mouseout", function (event) {
  hideGangDetails(event);
});

//Upgrades
upgradeCPUButton.addEventListener("click", function () {
  upgradeItem(currentCPU, Constants.cpuUpgrades);
});
upgradeRAMButton.addEventListener("click", function () {
  upgradeItem(currentRAM, Constants.ramUpgrades);
});
upgradeGPUButton.addEventListener("click", function () {
  upgradeItem(currentGPU, Constants.GCardUpgrades);
});
upgradeHDButton.addEventListener("click", function () {
  upgradeItem(currentHD, Constants.hdUpgrades);
});

//Hire Gang Members
hireAdminButton.addEventListener("click", function () {
  hireGangMember(Constants.botnetAdmin);
});
hireScripterButton.addEventListener("click", function () {
  hireGangMember(Constants.scripter);
});
hireResearcherButton.addEventListener("click", function () {
  hireGangMember(Constants.researcher);
});
hireMuleButton.addEventListener("click", function () {
  hireGangMember(Constants.mule);
});

//Damage -- could do this the above way as well. 

setInterval(damageObject.bind(null, "dps"), 100);
hackingButton.addEventListener("click", damageObject.bind(null, "click"));

//NewGameButton
newGameButton.addEventListener("click", resetGame);

// for(let i=0; i< 99_999; i++) {
//   (function foo() {
//     damageObject("dps");
//     requestAnimationFrame(foo);
//   })();
// }
