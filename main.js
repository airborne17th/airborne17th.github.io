let roundCounter = 1;
let enemyType = "Normal";
let baseDamage = 10;
let damageCap = 20;
let baseEnemyDamage = 5;
let damageEnemyCap = 10;
let validTurn = true;
let tempHP;
let dieAudio = new Audio('./assets/sound/dice.mp3');
let coinAudio = new Audio('./assets/sound/coin-flip.mp3');
let swordAudio = new Audio("./assets/sound/sword-schwing.mp3");
let revolverAudio = new Audio("./assets/sound/revolver-spin.mp3");
let snipeAudio = new Audio("./assets/sound/snipe.mp3");
let rainAudio = new Audio("./assets/sound/rain.mp3");
let spa = [0, 0, 0];
let rolls = [];
let dmgResult = [];
let rollResults = [];
let roll;
let rollCount;
let isAttack;
let isSkill;
let isUlt;
let damage = 0;
let finalDamage = 0;
let finalPlayerDamage = 0;
let finalEnemyDamage = 0;

let activeChar = {
    id: 0,
    name: "",
    cur_hp: 0,
    max_hp: 0,
    cur_e: 50,
    max_e: 100,
    er: 0,
    dmg: 0,
    cur_up: 0,
    max_up: 0,
    shield: 0,
    ultName: "",
    skillName: "",
    ultDesc: "",
    skillDesc: "",
    skillCost: 0,
    weaponID: 0,
    armorID: 0,
    desc: "",
    element: ""
};

let reserveChar = {
    id: 0,
    name: "",
    cur_hp: 0,
    max_hp: 0,
    cur_e: 50,
    max_e: 100,
    er: 0,
    dmg: 0,
    cur_up: 0,
    max_up: 0,
    shield: 0,
    ultName: "",
    skillName: "",
    ultDesc: "",
    skillDesc: "",
    skillCost: 0,
    weaponID: 0,
    armorID: 0,
    desc: "",
    element: ""
};

let reserve2Char = {
    id: 0,
    name: "",
    cur_hp: 0,
    max_hp: 0,
    cur_e: 50,
    max_e: 100,
    er: 0,
    dmg: 0,
    cur_up: 0,
    max_up: 0,
    shield: 0,
    ultName: "",
    skillName: "",
    ultDesc: "",
    skillDesc: "",
    skillCost: 0,
    weaponID: 0,
    armorID: 0,
    desc: "",
    element: ""
};

let tempChar;

let activeEnem = {
    id: 0,
    name: "",
    cur_hp: 0,
    max_hp: 0,
    base_dmg: 0,
    max_dmg: 0,
    shield: 0,
    ultName: "",
    skillName: "",
    ultDesc: "",
    skillDesc: "",
    desc: "",
    element: ""
};

let playerActive = true;
let enemyActive = false;

function playerTurn(option) {
    playerActive = true;
    switch (parseInt(option)) {
        case 0:
            playerAttack();
            break;
        case 1:
            playerSkill();
            break;
        case 2:
            playerUlt();
            break;
        case 3:
            playerSwap(0);
            break;
        case 4:
            playerSwap(1);
            break;
    }
    if (validTurn == true) {
        playerActive = false;
        enemyActive = true;
        enemyTurn();
        enemyActive = false;
    }
}

function partySelect(){
  // To Do: Also for party selection
  spa[0] = 5;
  spa[1] = 2;
  spa[2] = 11;
}
function initializeParty() {
    partySelect();
    // Selected Character
    activeChar.id = charArray[spa[0]].charId;
    activeChar.name = charArray[spa[0]].name;
    activeChar.img = charArray[spa[0]].img;
    activeChar.cur_hp = charArray[spa[0]].hp;
    activeChar.max_hp = charArray[spa[0]].hp;
    activeChar.er = charArray[spa[0]].er;
    activeChar.dmg = charArray[spa[0]].dmg;
    activeChar.max_up = charArray[spa[0]].up;
    activeChar.ultName = charArray[spa[0]].ultName;
    activeChar.skillName = charArray[spa[0]].skillName;
    activeChar.ultDesc = charArray[spa[0]].ultDesc;
    activeChar.skillDesc = charArray[spa[0]].skillDesc;
    activeChar.skillCost = charArray[spa[0]].skillCost;
    activeChar.desc = charArray[spa[0]].desc;
    activeChar.element = charArray[spa[0]].element;

    reserveChar.id = charArray[spa[1]].charId;
    reserveChar.name = charArray[spa[1]].name;
    reserveChar.img = charArray[spa[1]].img;
    reserveChar.cur_hp = charArray[spa[1]].hp;
    reserveChar.max_hp = charArray[spa[1]].hp;
    reserveChar.er = charArray[spa[1]].er;
    reserveChar.dmg = charArray[spa[1]].dmg;
    reserveChar.max_up = charArray[spa[1]].up;
    reserveChar.ultName = charArray[spa[1]].ultName;
    reserveChar.skillName = charArray[spa[1]].skillName;
    reserveChar.ultDesc = charArray[spa[1]].ultDesc;
    reserveChar.skillDesc = charArray[spa[1]].skillDesc;
    reserveChar.skillCost = charArray[spa[1]].skillCost;
    reserveChar.desc = charArray[spa[1]].desc;
    reserveChar.element = charArray[spa[1]].element;

    reserve2Char.id = charArray[spa[2]].charId;
    reserve2Char.name = charArray[spa[2]].name;
    reserve2Char.img = charArray[spa[2]].img;
    reserve2Char.cur_hp = charArray[spa[2]].hp;
    reserve2Char.max_hp = charArray[spa[2]].hp;
    reserve2Char.er = charArray[spa[2]].er;
    reserve2Char.dmg = charArray[spa[2]].dmg;
    reserve2Char.max_up = charArray[spa[2]].up;
    reserve2Char.ultName = charArray[spa[2]].ultName;
    reserve2Char.skillName = charArray[spa[2]].skillName;
    reserve2Char.ultDesc = charArray[spa[2]].ultDesc;
    reserve2Char.skillDesc = charArray[spa[2]].skillDesc;
    reserve2Char.skillCost = charArray[spa[2]].skillCost;
    reserveChar.desc = charArray[spa[1]].desc;
    reserveChar.element = charArray[spa[1]].element;
    document.getElementById('reserveCharName').innerHTML = reserveChar.name;
    document.getElementById('reserveChar2Name').innerHTML = reserve2Char.name;

      // Populate select menu with options
  var selectMenu = document.getElementById('charSelect');
  
  var activeOption = document.createElement('option');
  activeOption.value = activeChar.id;
  activeOption.text = activeChar.name;
  selectMenu.appendChild(activeOption);

  var reserveOption = document.createElement('option');
  reserveOption.value = reserveChar.id;
  reserveOption.text = reserveChar.name;
  selectMenu.appendChild(reserveOption);

  var reserve2Option = document.createElement('option');
  reserve2Option.value = reserve2Char.id;
  reserve2Option.text = reserve2Char.name;
  selectMenu.appendChild(reserve2Option);

  // Set default selected option
  selectMenu.value = activeChar.id;
    updateActiveCharInfo();
}

function updateActiveCharInfo() {
    // Reset values if above max.
    if (activeChar.cur_hp > activeChar.max_hp) {
        activeChar.cur_hp = activeChar.max_hp;
    }
    if (activeChar.cur_e > 100) {
        activeChar.cur_e = 100;
    }
    if (activeChar.cur_up > activeChar.max_up) {
        activeChar.cur_up = activeChar.max_up;
    }
    document.getElementById('characterInfoArea').innerHTML = "";
    let html = '<table>';
    html += '<tr><td>' + activeChar.name + '</td></tr>';
    html += '<tr><td>Element: ' + activeChar.element + '</td></tr>';
    html += '<tr><td>Description: ' + activeChar.desc + '</td></tr>';
    html += "<tr><td><img src=" + activeChar.img + " width=320 height=320></td></tr>";
    html += '<tr><td>HP: ' + activeChar.cur_hp + "/" + activeChar.max_hp + ' Shield: ' + activeChar.shield + '</td></tr>';
    html += '<tr><td>Energy: ' + activeChar.cur_e + "/" + activeChar.max_e + ' Ultimate: ' + activeChar.cur_up + "/" + activeChar.max_up + '</td></tr>';
    html += '</table>';
    document.getElementById('characterInfoArea').innerHTML = html;
    document.getElementById('skillName').innerHTML = activeChar.skillName;
    document.getElementById('skillCost').innerHTML = "Skill Cost: " + activeChar.skillCost;
    document.getElementById('skillDesc').innerHTML = activeChar.skillDesc;
    document.getElementById('ultName').innerHTML = activeChar.ultName;
    document.getElementById('ultDesc').innerHTML = activeChar.ultDesc;
    if (activeChar.id == 5) {
        document.getElementById('skillSelectContainer').style.display = 'block';
    } else{
        document.getElementById('skillSelectContainer').style.display = 'none';
    }
}

function initializeEnemy() {
    // Selected Character
    activeEnem.id = enemyArray[1].enemId;
    activeEnem.name = enemyArray[1].name;
    activeEnem.img = enemyArray[1].img;
    activeEnem.cur_hp = enemyArray[1].hp;
    activeEnem.max_hp = enemyArray[1].hp;
    activeEnem.base_dmg = enemyArray[1].base_dmg;
    activeEnem.max_dmg = enemyArray[1].max_dmg;
    activeEnem.ultName = enemyArray[1].ultName;
    activeEnem.skillName = enemyArray[1].skillName;
    activeEnem.ultDesc = enemyArray[1].ultDesc;
    activeEnem.skillDesc = enemyArray[1].skillDesc;
    activeEnem.desc = enemyArray[1].desc;
    activeEnem.element = enemyArray[1].element;
    updateActiveEnemyInfo();
}

function updateActiveEnemyInfo() {
    document.getElementById('enemyInfoArea').innerHTML = "";
    let html = '<table>';
    html += '<tr><td>' + activeEnem.name + '</td></tr>';
    html += '<tr><td>Element: ' + activeEnem.element + '</td></tr>';
    html += '<tr><td>Description: ' + activeEnem.desc + '</td></tr>';
    html += "<tr><td><img src=" + activeEnem.img + " width=320 height=320></td></tr>";
    html += '<tr><td>HP: ' + activeEnem.cur_hp + "/" + activeEnem.max_hp + '</td></tr>';
    html += '<tr><td>Shield: ' + activeEnem.shield + '</td></tr>';
    html += '</table>';
    document.getElementById('enemyInfoArea').innerHTML = html;
}

function enemyTurn() {
    let enemyAction = Math.floor(Math.random() * 5);
    switch (enemyType) {
        case "Normal":
            switch (parseInt(enemyAction)) {
                case 0:
                    enemyAttack();
                    break;
                case 1:
                    enemyAttack();
                    break;
                case 2:
                    enemyAttack();
                    break;
                case 3:
                    enemyAttack();
                    break;
                case 4:
                    enemyAttack();
                    break;
                case 5:
                    enemySkill();
                    break;
            }
            break;
        case "Elite":
            switch (parseInt(enemyAction)) {
                case 0:
                    enemyAttack();
                    break;
                case 1:
                    enemyAttack();
                    break;
                case 2:
                    enemyAttack();
                    break;
                case 3:
                    enemyAttack();
                    break;
                case 4:
                    enemySkill();
                    break;
                case 5:
                    enemySkill();
                    break;
            }
            break;
        case "Boss":
            switch (parseInt(enemyAction)) {
                case 0:
                    enemyAttack();
                    break;
                case 1:
                    enemyAttack();
                    break;
                case 2:
                    enemyAttack();
                    break;
                case 3:
                    enemySkill();
                    break;
                case 4:
                    enemySkill();
                    break;
                case 5:
                    enemyUlt();
                    break;
            }
            break;
    }
    roundCleanUp();
}

function roundCleanUp() {
    // check for defeated
    if (activeEnem.cur_hp <= 0) {
        activeEnem.cur_hp = 0;
        window.alert("Enemy defeated!");
    }

    if (activeChar.cur_hp <= 0) {
        activeChar.cur_hp = 0;
        window.alert("Active character defeated!");
    }

    playerActive = true;
    roundCounter++;
    // check to remove status
    if (roundCounter > KristySkillRoundEnd) {
        KristySkillActive = false;
    }
    if (roundCounter > KristyUltRoundEnd) {
        KristyUltActive = false;
    }
    if (roundCounter > CalvinSkillRoundEnd) {
        CalvinSkillActive = false;
    }
    if (roundCounter > JohnUltRoundEnd) {
        JohnUltActive = false;
    }
    document.getElementById('statusEffectArea').innerHTML = "";
    let html = "<table>";

    if (KristySkillActive == true) {
        html += "<tr><td>You are invigorated by the power of soup!</td></tr>";
    }

    if (KristyUltActive == true) {
        html += "<tr><td>Aspect of Owlbear</td></tr>";
    }

    if (CalvinSkillActive == true) {
        let randMusic = Math.floor(Math.random() * 3);
        html += "<tr><td>Inspired through stirring " + CalvinMusic[randMusic] + "!</td></tr>";
    }

    if (JohnUltActive == true && activeChar.id == 12) {
        html += "<tr><td>Regret fuels the desperate need to survive.</td></tr>";
    }

    html += "</table>";
    document.getElementById('statusEffectArea').innerHTML = html;

    // Update Ultimate and Energy
    activeChar.cur_up++;
    if (activeChar.cur_up > activeChar.max_up) {
        activeChar.cur_up = activeChar.max_up;
    }

    activeChar.cur_e = activeChar.cur_e + activeChar.er;
    if (activeChar.cur_e > 100) {
        activeChar.cur_e = 100;
    }

    updateActiveCharInfo();
    updateActiveEnemyInfo();
}

function enemyAttack() {
    isAttack = true;
    roll4dmg();
    finalEnemyDamage = damageCalc(rolls);
    console.log(finalEnemyDamage);
    enemyDamageUpdate(finalEnemyDamage);
    isAttack = false;
}

function enemySkill() {

}

function enemyUlt() {

}

function enemyDamageUpdate(finalDamage) {
    if (activeChar.shield > 0) {
        activeChar.shield = activeChar.shield - finalDamage;
        if (activeChar.shield < 0) {
            activeChar.cur_hp = activeChar.cur_hp + activeChar.shield; // Subtract remaining damage from cur_hp
            activeChar.shield = 0; // Reset shield to 0
        }
    } else {
        activeChar.cur_hp = activeChar.cur_hp - finalDamage;
    }
}

function playerDamageUpdate(finalPlayerDamage) {
    if (activeEnem.shield > 0) {
        if(isUlt == true && activeChar.id == 6){
            activeEnem.cur_hp = activeEnem.cur_hp - finalPlayerDamage;
        } else{
            activeEnem.shield = activeEnem.shield - finalPlayerDamage;
            if (activeEnem.shield < 0) {
            activeEnem.cur_hp = activeEnem.cur_hp + activeEnem.shield; // Subtract remaining damage from cur_hp
            activeEnem.shield = 0; // Reset shield to 0
            }
        }
    } else {
        activeEnem.cur_hp = activeEnem.cur_hp - finalPlayerDamage;
    }
}


function playerSkill() {
    let curPlayer = activeChar.id;
    let curRound = roundCounter;
    switch (curPlayer) {
        case 3:
            if (activeChar.cur_e < activeChar.skillCost) {
                validTurn = false;
                window.alert("Not Enough Energy!");
            } else {
                if (KristySkillActive != true) {
                    KristySkillRoundEnd = curRound + 3;
                    KristySkillActive = true;
                    activeChar.cur_e = activeChar.cur_e - activeChar.skillCost;
                    activeChar.cur_hp = activeChar.cur_hp + 10;
                    if (activeChar.cur_hp > activeChar.max_hp) {
                        activeChar.cur_hp = activeChar.max_hp;
                    }
                    validTurn = true;
                } else {
                    validTurn = false;
                    window.alert("Skill is already active!");
                }
            }
            break;
        case 1:
            if (activeChar.cur_e < activeChar.skillCost) {
                validTurn = false;
                window.alert("Not Enough Energy!");
            } else {
                if (CalvinSkillActive != true) {
                    CalvinSkillRoundEnd = curRound + 5;
                    CalvinSkillActive = true;
                    activeChar.cur_e = activeChar.cur_e - activeChar.skillCost;
                    validTurn = true;
                } else {
                    validTurn = false;
                    window.alert("Skill is already active!");
                }
            }
            break;
        case 5:
                if (activeChar.cur_e < activeChar.skillCost) {
                    validTurn = false;
                    window.alert("Not Enough Energy!");
                } else {
                        zachSkill();
                        activeChar.cur_e = activeChar.cur_e - activeChar.skillCost;
                        validTurn = true;
                    } 
                break;
        case 12:
            if (activeChar.cur_e < activeChar.skillCost) {
                validTurn = false;
                window.alert("Not Enough Energy!");
            } else {
                johnSkill();
                activeChar.cur_e = activeChar.cur_e - activeChar.skillCost;
                validTurn = true;
            }
            break;
            case 6:
              if (activeChar.cur_e < activeChar.skillCost) {
                  validTurn = false;
                  window.alert("Not Enough Energy!");
              } else {
                  trevorSkill();
                  activeChar.cur_e = activeChar.cur_e - activeChar.skillCost;
                  validTurn = true;
              }
              break;
        default:
            // code block
    }
}

function playerUlt() {
    let curPlayer = activeChar.id;
    let curRound = roundCounter;
    switch (curPlayer) {
        case 3:
            if (activeChar.cur_up < 4) {
                validTurn = false;
                window.alert("Not Enough Ultimate Points!");
            } else {
                if (KristyUltActive != true) {
                    KristyUltRoundEnd = curRound + 3;
                    KristyUltActive = true;
                    activeChar.cur_up = -1;
                    validTurn = true;
                } else {
                    validTurn = false;
                    window.alert("Ultimate is already active!");
                }
            }
            break;
        case 1:
            if (activeChar.cur_up < 4) {
                validTurn = false;
                window.alert("Not Enough Ultimate Points!");
            } else {
                calvinUlt();
                activeChar.cur_up = -1;
                validTurn = true;
            }
            break;
            case 6:
                if (activeChar.cur_up < 4) {
                    validTurn = false;
                    window.alert("Not Enough Ultimate Points!");
                } else {
                    trevorUlt();
                    activeChar.cur_up = -1;
                    validTurn = true;
                }
                break;
                case 5:
                    if (activeChar.cur_up < 4) {
                        validTurn = false;
                        window.alert("Not Enough Ultimate Points!");
                    } else {
                        zachUlt();
                        activeChar.cur_up = -1;
                        validTurn = true;
                    }
                    break;
        case 12:
            if (activeChar.cur_up < 4) {
                validTurn = false;
                window.alert("Not Enough Ultimate Points!");
            } else {
                if (JohnUltActive != true) {
                    JohnUltRoundEnd = curRound + 3;
                    JohnUltActive = true;
                    activeChar.cur_up = -1;
                    reserveChar.cur_e = reserveChar.cur_e + 10;
                    reserve2Char.cur_e = reserve2Char.cur_e + 10;
                    rainAudio.play();
                    document.getElementById('displayActionResult').innerHTML = "";
                    document.getElementById('displayActionResult').innerHTML = "These so called foes...not even worth drawing my sword.";
                    validTurn = true;
                } else {
                    validTurn = false;
                    window.alert("Ultimate is already active!");
                }
            }
            break;
        default:
            // code block
    }
}

function playerSwap(i) {
    switch (i) {
        case 0:
            tempChar = {
                ...activeChar
            }; // Create a copy of activeChar

            activeChar = {
                ...reserveChar
            }; // Copy reserve2Char into activeChar

            reserveChar = {
                ...tempChar
            }; // Copy the stored values from activeChar into reserve2Char
            break;
        case 1:
            tempChar = {
                ...activeChar
            }; // Create a copy of activeChar

            activeChar = {
                ...reserve2Char
            }; // Copy reserve2Char into activeChar

            reserve2Char = {
                ...tempChar
            }; // Copy the stored values from activeChar into reserve2Char
            break;
        default:
            // code block
    }
    // Handle any modifications made 

    // Change out buttons
    document.getElementById('reserveCharName').innerHTML = reserveChar.name;
    document.getElementById('reserveChar2Name').innerHTML = reserve2Char.name;
    document.getElementById('displayActionResult').innerHTML = "Swapped out to " + activeChar.name;
    updateActiveCharInfo();
    validTurn = true;
    return validTurn;
}

function rollDie() {
    // Generate a random number between 1 and 20
    var result = Math.floor(Math.random() * 20) + 1;
    dieAudio.play();
    document.getElementById("die").innerHTML = result;
    return result;
};

function rollEnemyDie() {
    // Generate a random number between 1 and 20
    var result = Math.floor(Math.random() * 20) + 1;
    document.getElementById("enemyDie").innerHTML = result;
    return result;
};

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

function initializeDrop() {
    document.getElementById("informationSection").innerHTML = "";
    let html = '<label for="drops">Choose a drop for more details: </label>';
    html += '<select id="drops" onchange="displayDrop()">';
    html += '<option value="">Select a card</option>';
    for (let i = 0; i < fullDrops.length; i++) {
        html += '<option value=' + (i) + ">" + fullDrops[i].name + '</option>';
    }
    document.getElementById("informationSection").innerHTML = html;
}

function johnSkill() {
    swordAudio.play();
    isSkill = true;
    roll4dmg();
    finalPlayerDamage = damageCalc(rolls);
    console.log(finalPlayerDamage);
    playerDamageUpdate(finalPlayerDamage);
    isSkill = false;
    validTurn = true; 
}

function calvinUlt() {
    activeChar.cur_hp = activeChar.cur_hp + 20;
    reserveChar.cur_hp = reserveChar.cur_hp + 20;
    reserve2Char.cur_hp = reserve2Char.cur_hp + 20;
    activeChar.cur_e = activeChar.cur_e + 20;
    reserveChar.cur_e = reserveChar.cur_e + 20;
    reserve2Char.cur_e = reserve2Char.cur_e + 20;
    reserveChar.cur_up++;
    reserve2Char.cur_up++;
    if (activeChar.cur_hp > activeChar.max_hp) {
        activeChar.cur_hp = activeChar.max_hp;
    }
    if (activeChar.cur_e > 100) {
        activeChar.cur_e = 100;
    }
    if (activeChar.cur_up > activeChar.max_up) {
        activeChar.cur_up = activeChar.max_up;
    }

    document.getElementById('displayActionResult').innerHTML = "A warm refreshing breeze comes over the party.";
}

function trevorSkill(){
    revolverAudio.play();
    isSkill = true;
    roll4dmg();
    finalPlayerDamage = damageCalc(rolls);
    console.log(finalPlayerDamage);
    playerDamageUpdate(finalPlayerDamage);
    isSkill = false;
    validTurn = true; 
}

function trevorUlt(){
    snipeAudio.play();
    isUlt = true;
    roll4dmg();
    finalPlayerDamage = damageCalc(rolls);
    console.log(finalPlayerDamage);
    playerDamageUpdate(finalPlayerDamage);
    isUlt = false;
    validTurn = true; 
}

function roll4dmg(){
    rolls.length = 0;
    let criticalRange = 20;
    let critFailRange = 1;
    let playerMLB = 1;
    let playerMHB = 7;
    let playerHLB = 8;
    let playerHHB = 20;
    if(isAttack == true){
        rollCount = 1;
        if(KristyUltActive == true){
            rollCount = 2;
        }
    }

    if(isSkill == true){
        if(activeChar.id == 12){
            if (JohnUltActive == true) {
                rollCount = 4;
            } else {
                rollCount = 3;
            }
        }
        if(activeChar.id == 6){
            rollCount = 6;
            criticalRange = criticalRange - 5;
        }
    }

    if(isUlt == true){
        if(activeChar.id == 6){
            rollCount = 1;
            criticalRange = criticalRange - 5;
        }
    }
    if(playerActive == true){
        for (let i = 0; i < rollCount; i++) {
            roll = rollDie();
            rolls.push(roll);
        }
    }

    if(enemyActive == true) {
        for (let i = 0; i < rollCount; i++) {
            roll = rollEnemyDie();
            rolls.push(roll);
        }
    }

    // Modify Hit Chance 
    if (JohnUltActive == true && activeChar.id == 12) {
        criticalRange = criticalRange - 5;
    }

    for (let i = 0; i < rollCount; i++) {
        // Determine the outcome based on the roll and critical hit status
        if (rolls[i] >= criticalRange) {
            rollResults[i] = 3;
        } else if (rolls[i] <= critFailRange) {
            rollResults[i] = 4;
        } else if (rolls[i] >= playerMLB && rolls[i] <= playerMHB) {
            // Block
            rollResults[i] = 1;
        } else if (rolls[i] >= playerHLB && rolls[i] <= playerHHB) {
            // Hit
            rollResults[i] = 2;
        }
    }
}


function playerAttack() {
    isAttack = true;
    roll4dmg();
    finalPlayerDamage = damageCalc(rolls);
    console.log(finalPlayerDamage);
    playerDamageUpdate(finalPlayerDamage);
    isAttack = false;
    validTurn = true;
}

function damageCalc(rolls) {
    if(playerActive == true){
        document.getElementById('displayActionResult').innerHTML = "";
    }
    if(enemyActive == true){
        document.getElementById('displayEnemyActionResult').innerHTML = "";  
    }
    let html = ""; 
    let html2 = "";
    dmgResult.length = 0;
    finalDamage = 0;
    finalEnemyDamage = 0;
    let critDmg = 1.5;
    let dc = activeChar.dmg;
    let edc = activeEnem.max_dmg;
    let bed = activeEnem.base_dmg;
    if(isAttack == true){

    } 

    if(isSkill == true){
        if(activeChar.id == 6){
        baseDamage = 1;
        dc = 6;
        html += trevorSkilltext[0] + " ";
        } 
    } 

    if(isUlt == true){
        if(activeChar.id == 6){
            baseDamage = 80;
            dc = 99;
            html += trevorUlttext[0] + " ";
        } 
        if(activeChar.id == 5){
            baseDamage = 30;
            dc = 50;
            html += "The dawn has arrived! ";
        } 
    }

    if(activeChar.id == 6){
        if (activeChar.cur_hp <= (activeChar.max_hp * .25)) {
            critDmg = critDmg + .2;
          } else if (activeChar.cur_hp <= (activeChar.max_hp * .5)){
            critDmg = critDmg + .1;
          } else {
        }
    }

    if (JohnUltActive == true && activeChar.id == 12) {
        critDmg = critDmg + .25;
    }
    if (activeChar.id == 1 || reserveChar.id == 1 || reserve2Char.id == 1) {
        critDmg = critDmg + .1;
    }

    for (let i = 0; i < rolls.length; i++) {
    
        if (playerActive == true) {
            damage = Math.floor(Math.random() * (dc - baseDamage + 1)) + baseDamage;
        }
        if (enemyActive == true) {
            damage = Math.floor(Math.random() * (edc - bed + 1)) + bed;
        }


        switch (rollResults[i]) {
            case 1:
                // Block
                damage = damage / 2;
                break;
            case 2:
                // Hit
                break;
            case 3:
                // Critical Hit
                damage = damage * critDmg;
                break;
            case 4:
                // Critical Failure
                damage = 0;
                break;
        }
        dmgResult[i] = Math.round(damage);
        finalDamage += Math.round(damage);
    }

    if(isAttack == true){
        if(playerActive == true){
        for (let i = 0; i < rollCount; i++) {
            switch(rollResults[i]){
                case 1:
                    html += "Your attack was blocked. ";
                    break;
                case 2:
                    html += "Your attack hit. ";
                    break;
                case 3:
                    html += "Your attack was a Critical Hit! ";
                    break;
                case 4:
                    html += "Your attack was a Critical Failure! ";
                    break;
                }
            }
        }
        if(enemyActive == true){
            for (let i = 0; i < rollCount; i++) {
                switch(rollResults[i]){
                    case 1:
                        html2 += "The enemy attack was blocked. ";
                        break;
                    case 2:
                        html2 += "The enemy attack hit. ";
                        break;
                    case 3:
                        html2 += "The enemy attack was a Critical Hit! ";
                        break;
                    case 4:
                        html2 += "The enemy attack was a Critical Failure! ";
                        break;
                    }
            }
        }
    }
    
    if(isSkill == true){
        if(activeChar.id == 12){
            for (let i = 0; i < rollCount; i++) {
                if (rollResults[i] == 3) {
                    html += ("Critical sword damage dealt " + dmgResult[i] + "! ");
                } else {
                    html += ("Sword damage dealt " + dmgResult[i] + ". ");
                }
            }
        }
    }

    if(isUlt == true){
        if(activeChar.id == 5){
            activeChar.shield = activeChar.shield + Math.round(finalDamage * .5);
            reserveChar.shield = reserveChar.shield + Math.round(finalDamage * .5);
            reserve2Char.shield = reserve2Char.shield + Math.round(finalDamage * .5);
            html += "The brillant dawn has shielded the party for " + Math.round(finalDamage * .5) + ". ";
        }
    }
    // To Do: Check for post modifications
    if (KristyUltActive == true) {
        dmgResult[1] = Math.round(dmgResult[1] * .5);
        html += ("Swiped as an owlbear, damage dealt " + dmgResult[1] + "! ");
    }
    if (JohnUltActive == true && activeChar.id == 12) {
        activeChar.cur_hp = Math.round(activeChar.cur_hp + (finalDamage * .2));
        if (activeChar.cur_hp > activeChar.max_hp) {
            activeChar.cur_hp = activeChar.max_hp;
        }
        html += "You healed " + Math.round(finalDamage * .2) + ". ";
    }
    if (CalvinSkillActive == true) {
        coinAudio.play();
        if (Math.random() > 0.5) {
            finalDamage = Math.round(finalDamage * 1.2);
        } else {
            finalDamage = Math.round(finalDamage * 1.1);
        }
    }
    if(playerActive == true){
        html += ("Final damage dealt " + finalDamage + "!");
        document.getElementById("displayActionResult").innerHTML = html;
    }
    if(enemyActive == true){
        html2 += ("Damage dealt " + finalDamage + "!");
        document.getElementById("displayEnemyActionResult").innerHTML = html2;
    }
    return finalDamage;
}

function zachSkill(){
    let selectElement = document.getElementById("charSelect");
    let selectedValue = selectElement.value;
    selectedValue = parseInt(selectedValue);
    switch(selectedValue) {
        case activeChar.id:
        activeChar.shield = activeChar.shield + 25;
          break;
        case reserveChar.id:
          reserveChar.shield = reserveChar.shield + 25;
          break;
        case reserve2Char.id:
            reserve2Char.shield = reserve2Char.shield + 25;
          break;
      }
}

function zachUlt(){
    isUlt = true;
    roll4dmg();
    finalPlayerDamage = damageCalc(rolls);
    console.log(finalPlayerDamage);
    playerDamageUpdate(finalPlayerDamage);
    isUlt = false;
    validTurn = true; 
}