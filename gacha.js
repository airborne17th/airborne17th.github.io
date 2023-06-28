/* 
 In general,  
    Support
    hp: 80,
    er: 20,
   dmg: 20,
   Defense: {
    hp: 120,
    er: 10,
    dmg: 25,
    Offense
    hp: 100,
    er: 15,
    dmg: 30,
  }
*/
let pityCounter = 0;
let tenPullCounter = 0;
let fireworkSingleAudio = new Audio("./assets/sound/firework-single.mp3");
let fireworksAudio = new Audio("./assets/sound/fireworks.mp3");

const char1 = {
    name: "Calvin, Bard of Good Cheer",
    img: "https://i.ibb.co/N6x56QD/calvin.png",
    class: "Support",  
    ultName: "Refreshing Breeze",
    skillName: "Bardic Inspiration",
    ultDesc: "Restore one ultimate point, 20 HP and 20 Energy for everyone in the party.",
    skillDesc: "For next five rounds have a 50% chance for a 20% damage dealt increase or a 10%.",
    charId: 1,
    hp: 80,
    er: 20,
    dmg: 20,
    up: 4,
    skillCost: 50,
    copies: 0,
    element: "Aero",
    desc: "The friendly easy-going bard from the north. He goes where the wind takes him. While in the party, increase critical damage by 10%."
  };
  let CalvinSkillRoundEnd = 0;
  let CalvinSkillActive = false;
  const CalvinMusic = ["bagpipe", "flute", "violin", "drum"];
  
  const char2 = {
    name: "Brian, Warden of the Night",
    img: "https://i.ibb.co/dt8GLSq/brian.png",
    class: "Offense",  
    ultName: "",
    skillName: "",
    ultDesc: "",
    skillDesc: "",
    charId: 2,
    hp: 100,
    er: 15,
    dmg: 30,
    up: 4,
    skillCost: 40,
    copies: 0,
    element: "Hydro",
    desc: "Steadyfast protector of travelers during the night. Honest and reliable."
  };
  
  const char3 = {
    name: "Kristy, Druid for Hope",
    img: "https://i.ibb.co/kK1DW2j/kristy.png",
    class: "Defense",  
    ultName: "Aspect of Owlbear",
    skillName: "Invigorating Herbal Soup",
    ultDesc: "For the next three rounds, gain an additional attack when doing a basic attack. This attack is half damage of a normal attack. Also Reduce enemy damage by 25% taken.",
    skillDesc: "Target character gains 10 HP. For the next three rounds when character is active, block rate increased by 10%.",
    charId: 3,
    hp: 120,
    er: 10,
    dmg: 25,
    up: 4,
    skillCost: 40,
    copies: 0,
    element: "Geo",
    desc: "Will remember the hopes and dreams of her friends and will fight to protect them."
  };
  let KristySkillRoundEnd = 0;
  let KristySkillActive = false;
  let KristyUltRoundEnd = 0;
  let KristyUltActive = false;
  
  const char4 = {
    name: "Maria, Roving Healer",
    img: "https://i.ibb.co/VxvWFMp/maria.png",
    class: "Support",  
    ultName: "",
    skillName: "",
    ultDesc: "",
    skillDesc: "",
    charId: 4,
    hp: 80,
    er: 20,
    dmg: 20,
    up: 4,
    skillCost: 50,
    copies: 0,
    element: "Pyro",
    desc: "Journeys the lands to heal and help the downtrodden."
  };
  
  const char5 = {
    name: "Zach, Protector of Hearth and Home",
    img: "https://i.ibb.co/JsY9j6z/zach.png",
    class: "Defense",  
    ultName: "Consecrated Sun Break",
    skillName: "Rallying Barricade",
    ultDesc: "Smash the enemy with a powerful strike with base damage of 30-50. Give a shield to every member of the party equal to 50% of the damage done.",
    skillDesc: "Cast on target character, give a 25 point shield.",
    charId: 5,
    hp: 120,
    er: 10,
    dmg: 25,
    up: 4,
    skillCost: 50,
    copies: 0,
    element: "Geo",
    desc: "A reowned and respected knight. Defends the south lands against the rising monster threat. With Zach in the party, incoming damage reduction by 10% if there is an active shield."
  };
  
  const char6 = {
    name: "Trevor, Highnoon Gunslinger",
    img: "https://i.ibb.co/B2Cgr1y/trevor.png",
    class: "Offense",  
    ultName: "The Siren Call of Death",
    skillName: "Flourish of Steel",
    ultDesc: "The sound of death rings out. Fire off a shot with a base damage of 80-99, crit rate of 25% and this shot ignores enemy shield.",
    skillDesc: "Fire off six shots. These shots have a max damage of 6 and a crit rate of 25%.",
    charId: 6,
    hp: 100,
    er: 15,
    dmg: 30,
    up: 4,
    skillCost: 50,
    copies: 0,
    element: "Pyro",
    desc: "Mercenary from the east. Has a troubled past with the law. When below 50% of HP, increase crit damage by 10%, when below 25% increase by 20%."
  };
  let trevorSkilltext = ["Each bullet is a song!"];
  let trevorUlttext = ["You will learn what beauty truly is!"];
  let trevorSkillMod = false;
  const char7 = {
    name: "David, Court Mage of Storm's Eye",
    img: "https://i.ibb.co/GvshJC2/david.png",
    class: "Offense",  
    ultName: "",
    skillName: "",
    ultDesc: "",
    skillDesc: "",
    charId: 7,
    hp: 100,
    er: 15,
    dmg: 30,
    up: 4,
    skillCost: 60,
    copies: 0,
    element: "Hydro",
    desc: "The mysterious court wizard of the Duchy of Jalios. While he is assisting against the monsters it is unclear what his true goal or loyalties lay."
  };
  
  const char8 = {
    name: "Korena, Eager Ranger",
    img: "https://i.ibb.co/M9MQ7v9/korena.png",
    class: "Offense",  
    ultName: "",
    skillName: "",
    ultDesc: "",
    skillDesc: "",
    charId: 8,
    hp: 100,
    er: 15,
    dmg: 30,
    up: 4,
    skillCost: 50,
    copies: 0,
    element: "Aero",
    desc: "An energetic scout who has extensive of nature. Takes her duties seriously."
  };
  
  const char9 = {
    name: "Marci, Observer of Tomorrow",
    img: "https://i.ibb.co/xLFM9Lb/marci.png",
    class: "Offense",  
    ultName: "",
    skillName: "",
    ultDesc: "",
    skillDesc: "",
    charId: 9,
    hp: 80,
    er: 20,
    dmg: 20,
    up: 4,
    skillCost: 60,
    copies: 0,
    element: "Aero",
    desc: "A mage from the north. Claims to be from a different dimension and has an odd behavior. Her power is undeniably strong however."
  };
  
  const char10 = {
    name: "Patrick, Stalwart Cavalier",
    img: "https://i.ibb.co/frtDfVx/pat.png",
    class: "Offense",  
    ultName: "",
    skillName: "",
    ultDesc: "",
    skillDesc: "",
    charId: 10,
    hp: 120,
    er: 10,
    dmg: 25,
    up: 4,
    skillCost: 40,
    copies: 0,
    element: "Geo",
    desc: "A chivalrous knight-errant often travels the countryside of Jalios to help anyone he can. While in the party, reduces enemy hit chance by 10%."
  };
  
  const char11 = {
    name: "Melissa, Witch of Ruination",
    img: "https://i.ibb.co/ZzLpS3j/melissa.png",
    class: "Offense",  
    ultName: "",
    skillName: "",
    ultDesc: "",
    skillDesc: "",
    charId: 11,
    hp: 100,
    er: 15,
    dmg: 30,
    up: 4,
    skillCost: 60,
    copies: 0,
    element: "Hydro",
    desc: "The unrecognized protector of the south lands. Despite not receiving any glory she has culled much of the monster threat."
  };
  
  const char12 = {
    name: "John, Obscure Wanderer",
    img: "https://i.ibb.co/kGk9JpC/john.png",
    class: "Offense",  
    ultName: "Unrelenting Regret",
    skillName: "Torrential Downpour",
    ultDesc: "For the next three rounds, gain 20% critical rate and 25% critical damage. Gain an additional attack when doing a basic attack. While ultimate is active, gain 20% damage back in health.",
    skillDesc: "Launch three elemental swords at the enemy. These attacks are at half base damage and a 33% crit rate. When ultimate is active four swords are launched.",
    charId: 12,
    hp: 100,
    er: 15,
    dmg: 30,
    up: 4,
    skillCost: 40,
    copies: 0,
    element: "Pyro",
    desc: "A mysterious voyager armed with an ancient blade. Normally friendly and well-traveled, in battle a fearsome warrior. After using his ultimate generate 10 energy for party members in reserve."
  };
  let JohnUltRoundEnd = 0;
  let JohnUltActive = false;

  const c1 = {
    id: 1,
    rarity: "Common",
    type: 1,
    name: "Thrilling Thunder Tome",
    img: "https://i.ibb.co/LCZG0CT/sword.jpg",
    desc: "After swapping to a new character, the new character taking the field has their next attack increased by 25%."
  };
  const c2 = {
    id: 2,
    rarity: "Common",
    type: 1,
    name: "Blade of the Dawn",
    img: "https://i.ibb.co/LCZG0CT/sword.jpg",
    desc: "Increased crit rate by 15% if HP is above 75%."
  };
  const c3 = {
    id: 3,
    rarity: "Common",
    type: 1,
    name: "Raven's Kiss",
    img: "https://i.ibb.co/LCZG0CT/sword.jpg",
    desc: "If the opponent is Pyro or Hydro do an additional 2 damage of a sucessful hit."
  };
  const c4 = {
    id: 4,
    rarity: "Common",
    type: 1,
    name: "Skullcracker",
    img: "https://i.ibb.co/LCZG0CT/sword.jpg",
    desc: "Do an additional 2 damage for each successful basic attack."
  };
  const c5 = {
    id: 5,
    rarity: "Common",
    type: 2,
    name: "Lunar Cloak",
    img: "https://i.ibb.co/7V9gnJr/shield.jpg",
    desc: "For the first four rounds after taking the field, have a 25% chance to avoid an attack."
  };
  const c6 = {
    id: 6,
    rarity: "Common",
    type: 2,
    name: "Adventuring Gear",
    img: "https://i.ibb.co/7V9gnJr/shield.jpg",
    desc: "Increase energy regeneration by 20%."
  };
  const c7 = {
    id: 7,
    rarity: "Common",
    type: 2,
    name: "Wanderer's Cap",
    img: "https://i.ibb.co/7V9gnJr/shield.jpg",
    desc: "At the end of each round gain 5 HP."
  };
  const c8 = {
    id: 8,
    rarity: "Common",
    type: 2,
    name: "Deepwood Shield",
    img: "https://i.ibb.co/7V9gnJr/shield.jpg",
    desc: "Reduce damage taken by randomly 1 to 10."
  };
  const c9 = {
    id: 9,
    rarity: "Common",
    type: 3,
    name: "Calvin, Bard of Good Cheer",
    img: "https://i.ibb.co/N6x56QD/calvin.png",
    char: char1,
    element: "Aero",
    desc: "The friendly easy-going bard from the north. He goes where the wind takes him. While in the party, increase critical damage by 20%."
  };
  const c10 = {
    id: 10,
    rarity: "Common",
    type: 3,
    name: "Kristy, Druid for Hope",
    img: "https://i.ibb.co/kK1DW2j/kristy.png",
    char: char3,
    element: "Geo",
    desc: "Will remember the hopes and dreams of her friends and will fight to protect them."
  };
  const c11 = {
    id: 11,
    rarity: "Common",
    type: 3,
    name: "Maria, Roving Healer",
    img: "https://i.ibb.co/VxvWFMp/maria.png",
    char: char4,
    element: "Pyro",
    desc: "Journeys the lands to heal and help the downtrodden."
  };
  const c12 = {
    id: 12,
    rarity: "Common",
    type: 3,
    name: "Brian, Warden of the Night",
    img: "https://i.ibb.co/dt8GLSq/brian.png",
    char: char2,
    element: "Hydro",
    desc: "Steadyfast protector of travelers during the night. Honest and reliable."
  };
  const u1 = {
    id: 13,
    rarity: "Uncommon",
    type: 3,
    name: "Zach, Protector of Hearth and Home",
    img: "https://i.ibb.co/JsY9j6z/zach.png",
    char: char5,
    element: "Geo",
    desc: "A reowned and respected knight. Defends the south lands against the rising monster threat."
  };
  const u2 = {
    id: 14,
    rarity: "Uncommon",
    type: 3,
    name: "Trevor, Highnoon Gunslinger",
    img: "https://i.ibb.co/B2Cgr1y/trevor.png",
    char: char6,
    element: "Pyro",
    desc: "Mercenary from the east. Has a troubled past with the law. When below 50% of HP, increase crit rate by 10%, when below 25% increase by 20%."
  };
  const u3 = {
    id: 15,
    rarity: "Uncommon",
    type: 3,
    name: "David, Court Mage of Storm's Eye",
    img: "https://i.ibb.co/GvshJC2/david.png",
    char: char7, 
    element: "Hydro",
    desc: "The mysterious court wizard of the Duchy of Jalios. While he is assisting against the monster it is unclear what his true goal or loyalties lay."
  };
  const u4 = {
    id: 16,
    rarity: "Uncommon",
    type: 2,
    name: "Korena, Eager Ranger",
    img: "https://i.ibb.co/M9MQ7v9/korena.png",
    char: char8,
    element: "Aero",
    desc: "An energetic scout who has extensive of nature. Takes her duties seriously."
  };
  const u5 = {
    id: 17,
    rarity: "Uncommon",
    type: 2,
    name: "Berserker Greaves",
    img: "https://i.ibb.co/7V9gnJr/shield.jpg",
    desc: "When doing a basic attack increase crit rate by 10%."
  };
  const u6 = {
    id: 18,
    rarity: "Uncommon",
    type: 2,
    name: "Chivalric Helm",
    img: "https://i.ibb.co/7V9gnJr/shield.jpg",
    desc: "Reduce damage taken by 10%. When below 50% HP this effect is increased to 20%."
  };
  const u7 = {
    id: 19,
    rarity: "Uncommon",
    type: 1,
    name: "Back Alley Flash",
    img: "https://i.ibb.co/LCZG0CT/sword.jpg",
    desc: "Increase crit rate by 5%. Stack 10% crit damage per round this effect resets after a critical hit."
  };
  const u8 = {
    id: 20,
    rarity: "Uncommon",
    type: 1,
    name: "Festering Bloodlust",
    img: "https://i.ibb.co/LCZG0CT/sword.jpg",
    desc: "When doing a basic attack. Increase damage by 25% and take 10 damage."
  };
  const r1 = {
    id: 21,
    rarity: "Rare",
    type: 3,
    name: "Marci, Observer of Tomorrow",
    img: "https://i.ibb.co/xLFM9Lb/marci.png",
    char: char9,
    element: "Aero",
    desc: "A mage from the north. Claims to be from a different dimension and has an odd behavior. Her power is undeniably strong however."
  };
  const r2 = {
    id: 22,
    rarity: "Rare",
    type: 3,
    name: "Patrick, Stalwart Cavalier",
    img: "https://i.ibb.co/frtDfVx/pat.png",
    char: char10,
    element: "Geo",
    desc: "A chivalrous knight-errant often travels the countryside of Jalios to help anyone he can. While in the party, reduces enemy hit chance by 10%."
  };
  const r3 = {
    id: 23,
    rarity: "Rare",
    type: 1,
    name: "Everlasting Tides",
    img: "https://i.ibb.co/LCZG0CT/sword.jpg",
    desc: ""
  };
  const r4 = {
    id: 24,
    rarity: "Rare",
    type: 1,
    name: "Freedom-Sworn",
    img: "https://i.ibb.co/LCZG0CT/sword.jpg",
    desc: ""
  };
  const r5 = {
    id: 25,
    rarity: "Rare",
    type: 2,
    name: "Remembrance Cloak of Lost Prayers",
    img: "https://i.ibb.co/7V9gnJr/shield.jpg",
    desc: ""
  };
  const r6 = {
    id: 26,
    rarity: "Rare",
    type: 2,
    name: "Helm of Severed Fate",
    img: "https://i.ibb.co/7V9gnJr/shield.jpg",
    desc: ""
  };
  const m1 = {
    id: 27,
    rarity: "Mythic",
    type: 3,
    name: "John, Obscure Wanderer",
    img: "https://i.ibb.co/kGk9JpC/john.png",
    char: char12,
    element: "Pyro",
    desc: "A mysterious voyager armed with an ancient blade. Normally friendly and well-traveled, in battle a fearsome warrior. After using his ultimate generate an ultimate point for all members of the party."
  };
  const m2 = {
    id: 28,
    rarity: "Mythic",
    type: 3,
    name: "Melissa, Witch of Ruination",
    img: "https://i.ibb.co/ZzLpS3j/melissa.png",
    char: char11,
    element: "Hydro",
    desc: "The unrecognized protector of the south lands. Despite not receiving any glory she has culled much of the monster threat."
  };
  const m3 = {
    id: 29,
    rarity: "Mythic",
    type: 1,
    name: "Vanquisher of Demons",
    img: "https://i.ibb.co/LCZG0CT/sword.jpg",
    desc: ""
  };
  const m4 = {
    id: 30,
    rarity: "Mythic",
    type: 2,
    name: "Harbringer of Life",
    img: "https://i.ibb.co/7V9gnJr/shield.jpg",
    desc: ""
  };

  const enem1 = {
    name: "Goblin",
    img: "",
    class: "Normal",  
    skillName: "",
    skillDesc: "",
    enemId: 1,
    hp: 75,
    base_dmg: 5,
    max_dmg: 10,
    element: "Pyro",
    desc: "Gobo"
  }

  const enem2 = {
    name: "Testing Dummy",
    img: "",
    class: "Normal",  
    skillName: "",
    skillDesc: "",
    enemId: 1,
    hp: 999,
    base_dmg: 1,
    max_dmg: 5,
    element: "None",
    desc: "It's used for training"
  }
  
  
/* Weapon: 1
* Armor: 2
* Character: 3
* Enemy: 4
*/

let enemyArray = [enem1, enem2];
let charArray = [char1, char2, char3, char4, char5, char6, char7, char8, char9, char10, char11, char12];
let fullDrops = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, u1, u2, u3, u4, u5, u6, u7, u8, r1, r2, r3, r4, r5, r6, m1, m2, m3, m4];
// Define the chances for each character rarity
const chances = {
  common: 0.5,
  uncommon: 0.4,
  rare: 0.08,
  mythic: 0.02,
};

// Define the arrays of drops for each rarity
let drops = {
  common: [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12],
  uncommon: [u1, u2, u3, u4, u5, u6, u7, u8],
  rare: [r1, r2, r3, r4, r5, r6],
  mythic: [m1, m2, m3, m4],
};


// Define a function to perform a single ticket pull
function singleTicketPull() {
  const rand = Math.random();
  let result;
  if (rand < chances.mythic) {
      result = drops.mythic[Math.floor(Math.random() * drops.mythic.length)];
  } else if (rand < chances.mythic + chances.rare) {
      result = drops.rare[Math.floor(Math.random() * drops.rare.length)];
  } else if (rand < chances.mythic + chances.rare + chances.uncommon) {
      result = drops.uncommon[Math.floor(Math.random() * drops.uncommon.length)];
  } else {
      result = drops.common[Math.floor(Math.random() * drops.common.length)];
  }

  if (result.rarity != "Rare" || result.rarity != "Mythic") {
    tenPullCounter++;
  }
  
  if(tenPullCounter >= 9){
    result = drops.rare[Math.floor(Math.random() * drops.rare.length)];
    tenPullCounter = 0;
  }

  console.log("Ten Pull Pity Counter " + tenPullCounter);

  // Checks for Pity Count, if hits pity next pull is a mythic
  if (pityCount(result) == true) {
      if (result.rarity != "Mythic") {
          result = drops.mythic[Math.floor(Math.random() * drops.mythic.length)];
      }
  }
  console.log("Max Pity Counter " + pityCounter);
  displayResult(result);
  return result;
}

// Define a function to perform a ten ticket pull
function tenTicketPull() {
  let hasRare = false;
  const results = [];
  for (let i = 0; i < 10; i++) {
      const result = singleTicketPull();
      results.push(result);
      if (result.rarity == "Rare" || result.rarity == "Mythic") {
          hasRare = true;
      }
  }
  if (!hasRare) {
      let pityResult = drops.rare[Math.floor(Math.random() * drops.rare.length)];
      results.splice(-1, 1); // Remove the last ticket
      results.push(pityResult); // Add a new ticket with the guaranteed rare chance
  }
  if(results.includes("Mythic")){
    fireworksAudio.play();
  } else {
    fireworkSingleAudio.play();
  }
  displayResults(results);
  return results;
}

// Define a function to perform a ticket pull
function pityCount(result) {

  if (result.rarity == "Mythic" || pityCounter >= 50) {
      pityCounter = 0;
      return true;
  } else {
      pityCounter++;
      return false;
  }
}

function displayResults(results) {
  document.getElementById('results').innerHTML = "";
  let html = '<table>';

  for (let i = 0; i < results.length; i++) {
    if (i % 5 === 0) {
      html += '<tr>';
    }

    html += '<td>';
    html += "<img src=" + results[i].img + " width=320 height=320><br />";
    html += '<b>' + results[i].name + '</b><br />' + results[i].rarity;
    html += '</td>';

    if ((i + 1) % 5 === 0) {
      html += '</tr>';
    }
  }

  html += '</table>';
  document.getElementById('results').innerHTML = html;
}


function displayResult(result) {
  document.getElementById('results').innerHTML = "";
  let html = '<table><tr>';
  html += '<td>';
    html += "<img src=" + result.img + " width=320 height=320><br />";
    html += '<b>' + result.name + '</b><br />' + result.rarity;
    html += '</td>';
  html += '</tr></table>';
  document.getElementById('results').innerHTML = html;
}

function displayDrop() {
  // Get the dropdown menu element
  const dropdown = document.getElementById("drops");
  // Get the selected option value
  let sv = dropdown.value;
  parseInt(sv);
  console.log(fullDrops[sv]);
  let type;
  switch (fullDrops[sv].type) {
      case 1:
          type = "Weapon";
          break;
      case 2:
          type = "Armor";
          break;
      case 3:
          type = "Character";
          break;
  }

  document.getElementById('info').innerHTML = "";
  let html = '<table>';
  html += '<tr><td>' + fullDrops[sv].name + '</td></tr>';
  html += "<tr><td><img src=" + fullDrops[sv].img + " width=320 height=320></td></tr>";
  html += '<tr><td>' + type + '</td></tr>';
  html += '<tr><td>' + fullDrops[sv].rarity + '</td></tr>';
  if (fullDrops[sv].type == 3) {
      html += '<tr><td>' + fullDrops[sv].element + '</td></tr>';
  }
  html += '<tr><td>' + fullDrops[sv].desc + '</td></tr>';
  html += '</table>';
  document.getElementById('info').innerHTML = html;
}

function initializeDrop(){
  document.getElementById("informationSection").innerHTML = "";
  let html = '<label for="drops">Choose a drop for more details: </label>';
  html += '<select id="drops" onchange="displayDrop()">';
  html += '<option value="">Select a card</option>';
  for (let i = 0; i < fullDrops.length; i++) {
    html += '<option value=' + (i) + ">" + fullDrops[i].name + '</option>';
  }
  document.getElementById("informationSection").innerHTML = html;
}
