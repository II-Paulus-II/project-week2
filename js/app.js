console.log("Clyker game is werkn sur!");

/* ------ User Input Buttons ------*/

const hackingButton = document.getElementById("object-hacker");
const upgradeGPUButton = document.getElementById("upgradeGPU");

//Variables 
//Damage Variables

let clickDamage = 1;
let dps = 1;

//Data Variables

let damageDone = 0; // Record Total Damage done [Probably call this hacking attempts to user]
let numberObjectsHacked = 0;

let objectHP = 10; // Set with function in later levels
let maxObjectHP = 10; //Set with function in later levels
let currentLevel = 1;
const objectsinLevel = 10 // I do not want this to change - 10 per level 
let hackedinLevel = 0; // Starts at 0 then increases to 9 then resets to zero

let sizeOfBotnet = 1; //Your own computer is part of the botnet network 

/* ------ Upgrade Variables ------*/

//Click Damage upgrades - I will just do Nvidia GPU for now because can do so much with this
//Sorry for underscores but looks better to me :)
const GPUclickDamageUpgrades = {
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


//This function provides a new object and/or new level when an objects hack is completed. 
function getNewObject() {
  //Check if level complete
  if (hackedinLevel == objectsinLevel) {
    //incremement level
    currentLevel ++;
    //Log level to console.
    console.log("Your level is: ", currentLevel);
    //reset level counter
    hackedinLevel = 0;
    //Calculate new max HP for website
    maxObjectHP = 10*clickDamage + 3*dps; //May change this later
    console.log("Max Object HP: ", maxObjectHP);
  }
  objectHP = maxObjectHP;
}

//This calculates the damage done to the object determined by current clickDamage or dps 
//Called by either the dps listerner or the clickingDone function 
function damageObject(calculatedDamage) {
  //Click Damage iterator and console log
  //Record all damage done anyway
  damageDone += calculatedDamage;
  console.log("Damage Done is now",damageDone);

  //Do damage to current object
  objectHP -= calculatedDamage;

  //check if object killed or hacked
  if (objectHP <= 0) {
    //Increase Total objects hacked and increase number of objects hacked in level 
    numberObjectsHacked += 1;
    hackedinLevel += 1;

    //Console log increase in number of objects hacked
    console.log("Number of objects Hacked is: ", numberObjectsHacked);
    getNewObject();
  }
}

/*Dont need this anymore
function clickingDone (event) {
  //Test log of function 
  console.log("i have been hacked by the clicker");

  //Send click damage to damageWebsite function
  damageWebsite(clickDamage);
}*/

//Do dps and click damage to websites. 
setInterval(damageObject.bind(null, dps), 1000);
hackingButton.addEventListener("click", damageObject.bind(null, clickDamage));