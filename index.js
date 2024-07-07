let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0; //The value of the currentWeaponIndex variable corresponds to an index in the weapons array. The player starts with a "stick", since currentWeaponIndex starts at 0 and weapons[0] is the "stick" weapon.
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// hold weapons [as objects - in an array]
const weapons = [
  {
    name: "stick", //The value of the currentWeaponIndex variable corresponds to an index in the weapons array. The player starts with a "stick", since currentWeaponIndex starts at 0 and weapons[0] is the "stick" weapon.
    power: "5",
  },
  {
    name: "dagger",
    power: "30",
  },
  {
    name: "claw hammer",
    power: "50",
  },
  {
    name: "sword",
    power: "100",
  },
];

// hold different locations like store, cave and town square [as objects - in an array]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  button1.innerText = location["button text"][0]; //property of the location (const) object passed into the function. Shows only first.
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]); //only the first location from const locations = town square
}

function goStore() {
  update(locations[1]); //only the second location from const locations = store
}

function goCave() {
  update(locations[2]); //only the third location from const locations = cave
}

function fightDragon() {
  console.log("Fighting dragon.");
}

function buyHealth() {
  //actions the player takes
  if (gold >= 10) {
    gold -= 10; //using compound assignment -=/+=
    health += 10;
    goldText.innerText = gold; //the displayed text for gold is updated immediately after modifying the variables
    healthText.innerText = health; //the displayed text for health is updated immediately after modifying the variables
  } else {
    text.innerText = "You do not have enough gold to buy health."; //change text
  }
}

function buyWeapon() {
  // Check if the currentWeaponIndex is less than the index of the last weapon
  if (currentWeaponIndex < weapons.length - 1) {
    //array indexing starts at zero, the index of the last element in an array is one less than the length of the array. Therefore, the condition should check if currentWeaponIndex is less than weapons.length - 1. {
    //actions the player takes
    if (gold >= 30) {
      gold -= 30; // gold equal to 30 less than its current value
      currentWeaponIndex++; // add 1 to currentWeaponIndex - the user is buying the next weapon in the weapons array
      goldText.innerText = gold; //update new value of gold
      let newWeapon = weapons[currentWeaponIndex].name; //tell the player what weapon they bought
      text.innerText = "You now have a " + newWeapon + "."; //update text
      inventory.push(newWeapon); //Add the newWeapon to the end of the inventory array
      text.innerText += " In your inventory you have: " + inventory; //use the += operator to add text to the end of text.innerText
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift(); //remove first array
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory + ".";
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {}

function fightBeast() {}
