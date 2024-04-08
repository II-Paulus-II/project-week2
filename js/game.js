/* ----- Imports ----- */
import * as Constants from "./constants.js";

/* ----- Rig Upgrade Functions ----- */

//Function to quickly get an item name 
export function itemName(playerItem, upgradeObject) {
  const itemKey = playerItem.value;
  const itemName = upgradeObject[itemKey].name;
  return itemName;
}

//This function checks if a current rig items can be upgraded - passes by reference
//Seperated because used by the rendering function

export function canUpgradeItem(playerItem, UpgradeObject, sizeWallet) {
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

/* ----- Gang Hire Functions ----- */

//Function to check if one can pay the hire fee

export function canHire(gangMember, sizeWallet) {
  let canAfford = false;
  const hirePrice = gangMember.price;
  if (hirePrice <= sizeWallet) {
    canAfford = true;
  }
  return canAfford
}

/* ----- Damage Functions ----- */

// Function to calculate Botnet Efficiency and i love my brackets

export function getBotNetEfficiency(numAdmins, numScripters) {
  const baseEfficiency = 0.2;
  return (numAdmins * ((Constants.botnetAdmin.efficiency)/100)) + (numScripters*(Constants.scripter.efficiency/100)) + baseEfficiency;
}

export function getGangDamage(numResearchers, numScripters) {
  let researcherDamage = numResearchers * Constants.researcher.damage;
  let scripterDamage = numScripters * Constants.scripter.damage;
  return researcherDamage + scripterDamage;
}