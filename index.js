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

// hold monsters [as objects - in an array]
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];

// hold weapons [as objects - in an array]
const weapons = [
  {
    name: "stick", //The value of the currentWeaponIndex variable corresponds to an index in the weapons array. The player starts with a "stick", since currentWeaponIndex starts at 0 and weapons[0] is the "stick" weapon.
    power: 5,
  },
  {
    name: "dagger",
    power: 30,
  },
  {
    name: "claw hammer",
    power: 50,
  },
  {
    name: "sword",
    power: 100,
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
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;", //emoticon text. Need to use the innerHTML property on text in the update function
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none"; // so no text appears
  button1.innerText = location["button text"][0]; //property of the location (const) object passed into the function. Shows only first.
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
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

//order of const monsters
function fightSlime() {
  fighting = 0; //already declared so don't need to use let
  goFight(); // call goFight
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  // Call the update function with the fourth object in the locations array
  update(locations[3]);
  // Set monsterHealth to be the health of the current monster
  monsterHealth = monsters[fighting].health;
  //monster's stats has been hidden with CSS. When the player clicks the "Fight dragon" button, the monster's stats should be displayed.
  const monsterStats = document.querySelector("p");
  monsterStats.style.display = "block"; //style = access the inline style of an element, display = the visibility
  // Update the text for the current monster's name and health
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks."; // name of monster
  text.innerText +=
    " You attack it with your " + weapons[currentWeaponIndex].name + "."; // weapon
  health -= getMonsterAttackValue(monsters[fighting].level); //health equal to health minus the return value of the getMonsterAttackValue function, and passes the level of the monster as an argument
  if (isMonsterHit()) {
    monsterHealth -= //monsterHealth to monsterHealth minus the power of the player's current weapon
      weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1; // add a random number between 1 and the value of xp to your monsterHealth -= weapons[currentWeaponIndex].power
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health; // update health status
  monsterHealthText.innerText = monsterHealth; // update monster health status
  if (health <= 0) {
    //check if health is less than or equal to 0. If it is, call the lose function
    lose();
  } else if (monsterHealth <= 0) {
    // check if monsterHealth is less than or equal to 0. If the player is fighting the dragon (fighting would be 2), call the winGame function. Move the defeatMonster() call to the else block.
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    //&& add a second condition to your if statement. The player's weapon should only break if inventory.length does not equal (!==) on (only weapon not to break)
    // weapon breaks
    text.innerText += " Your " + inventory.pop() + " breaks."; //remove the last item in the array AND return it so it appears in your string
    currentWeaponIndex--; //Decrement the value of currentWeaponIndex by 1
  }
}

function getMonsterAttackValue(level) {
  // The attack of the monster will be based on the monster's level and the player's xp
  const hit = level * 5 - Math.floor(Math.random() * xp); // This will set the monster's attack to five times their level minus a random number between 0 and the player's xp
  return hit > 0 ? hit : 0; // notice a bug. If your xp is high enough, the getMonsterAttackValue function will return a negative number, which will actually add to your total health when fighting a monster! Fix by using ternary operator is a conditional operator and can be used as a one-line if-else statement. The syntax is: condition ? expressionIfTrue : expressionIfFalse
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20; // return a boolean value (true or false) to be used in your if statement in attach function. player should hit if either Math.random() > .2 OR (||) if the player's health is less than 20
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7); //set gold equal to gold plus the monster's level times 6.7
  xp += monsters[fighting].level;
  goldText.innerText = goldText;
  xpText.innerText = xpText;
  update(locations[4]); //calling the update function with locations[4]
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["stick"];
  // update innerText properties
  goldText.innerText = goldText;
  healthText.innerText = healthText;
  xpText.innerText = xpText;
  goTown(); //call function
}
