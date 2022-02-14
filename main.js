let upgrades = {
    reinforcePick:
        { name: "Reinforce Pick", cost: 50, baseCost: 50, image: "", level: 1, currency: "Ore" },
    unionizeMiners:
        { name: "Rank-Up Miners", cost: 300, baseCost: 300, image: "", level: 1, currency: "Iron" },
    upgradeOreSmelter:
        { name: "Upgrade Ore Smelters", cost: 500, baseCost: 500, image: "", level: 1, currency: "Iron" },
    enrichOreVeins:
        { name: "Enrich Ore Veins", cost: 1500, baseCost: 1500, image: "", level: 1, currency: "Gold" }
}

let totals = {
    ore:
        { name: "Ore", total: 0, current: 0 },

    iron:
        { name: "Iron", total: 0, current: 0 },

    gold:
        { name: "Gold", total: 0, current: 0 },

    platinum:
        { name: "Platinum", total: 0, current: 0 },

    diamond:
        { name: "Diamond", total: 0, current: 0 },

    vibranium:
        { name: "Vibranium", total: 0, current: 0 }
}


let special = {
    oreSmelter:
        { name: "Ore Smelter", cost: 50, image: "", bought: 0 },
    miners:
        { name: "Miners", cost: 350, image: "", bought: 0 }
}

let minePower = upgrades.reinforcePick.level // This doesn't update with pick level
let minerPower = special.miners.level
let veinPower = upgrades.enrichOreVeins.level


/// NEED TO MAKE STATS TABLE INDICATING HOW MUCH ORE PER CLICK AND PER SECOND
// PROBABLY SHOULD MAKE THE SHOP ITEMS BUTTONS
// ADD MINER AND ENRICHED ORE FUNCTIONALITY
// STYLE IT UP
// ADD CURRENCY FUNCTIONALITY TO THINGS THAT REQUIRE DIFFERENT CURRENCY



// !!!!
// // DO NOT FORGET YOUR JOURNALS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!


function mineClick() {
    totals['ore'].current = totals['ore'].current += (minePower * veinPower)
    totals['ore'].total = totals['ore'].total += (minePower * veinPower)
    drawTotals()
}

function buyUpgrade(name) {
    for (key in upgrades) {
        if (upgrades[key].name == name) {
            if (name == "Upgrade Ore Smelters") {
                if (special.oreSmelter.bought == 0)
                    console.log("You have not bought any Ore Smelters yet");
            } else {
                if (upgrades[key].cost <= totals['ore'].current) {
                    totals['ore'].current = totals['ore'].current -= upgrades[key].cost
                    upgrades[key].level++
                    upgrades[key].cost = (upgrades[key].baseCost * upgrades[key].level)
                    drawTotals()
                    drawUpgrades()
                }
                else {
                    console.log("Not enough Ore");
                }
            }
        }
    }
}


// THIS DOESNT BUY MINERS

function buySpecial(name) {
    for (key in special) {
        if (special[key].name == name) {
            if (special[key].cost <= totals['ore'].current) {
                totals['ore'].current = (totals['ore'].current -= special[key].cost)
                special[key].bought++
                if (name == "Ore Smelter") {
                    document.getElementById("smelter-h").classList.remove("hidden")
                }
            } else {
                console.log("Not enough Ore");
            }
        }
    }
    drawSpecialShop()
    drawTotals()
    drawUpgrades()
}

function minersWork() {
    let workDone = (special.miners.bought * upgrades.unionizeMiners.level)
    totals.ore.current += workDone
    totals.ore.total += workDone
    console.log(totals.ore.current);
    drawSpecialShop()
    drawTotals()
    drawUpgrades
}


function buyMiner() {
    if (totals.iron.current >= special.miners.cost) {
        totals.iron.current = (totals.iron.current -= special.miners.cost)
        if (special.miners.bought == 0) {
            setInterval(minersWork, 3000)
        }
        drawSpecialShop()
        drawTotals()
        drawUpgrades()
    } else {
        console.log("You don't have enough Iron");
    }
}


function smeltOre() {
    let cost = (upgrades.upgradeOreSmelter.level * 10)
    if (special.oreSmelter.bought == 0) {
        console.log("You have not bought any Ore Smelters yet");
    } else {
        if (totals['ore'].current >= cost) {
            totals['ore'].current = totals['ore'].current -= cost
            console.log(cost);
            console.log(totals['ore'].current);
            drawTotals()
            setTimeout(giveBars, 5000)
            document.getElementById("smelter").classList.add("disabled")
        }
    }
}

function giveBars() {
    let cost = (upgrades.upgradeOreSmelter.level * special.oreSmelter.bought * 10)
    let givenIron = Math.floor(cost / 10)
    let givenGold = Math.floor(cost / 20)
    let givenPlatinum = Math.floor(cost / 500)
    let givenDiamond = Math.floor(cost / 1000)
    let givenVibranium = Math.floor(cost / 100000)
    totals.iron.current += givenIron
    totals.iron.total += givenIron
    totals.gold.current += givenGold
    totals.gold.total += givenGold
    totals.platinum.current += givenPlatinum
    totals.platinum.total += givenPlatinum
    totals.diamond.current += givenDiamond
    totals.diamond.total += givenDiamond
    totals.vibranium.current += givenVibranium
    totals.vibranium.total += givenVibranium

    drawTotals()
    document.getElementById("smelter").classList.remove("disabled")
}

function drawTotals() {
    let template = "<tr><th>LIFETIME TOTALS:</th></tr>"
    for (let key in totals) {
        if (totals[key].total > 0) {
            template += `<tr id="${totals[key].name}"><td>${totals[key].name}: ${totals[key].total}</td></tr>`
            document.getElementById("totals-lt-table").innerHTML = template
        }
    }
    let templateTwo = "<tr><th>CURRENT TOTALS:</th></tr>"
    for (let key in totals) {
        if (totals[key].current > 0) {
            templateTwo += `<tr id="${totals[key].name}"><td>${totals[key].name}: ${totals[key].current}</td></tr>`
            document.getElementById("totals-ct-table").innerHTML = templateTwo
        }
    }
}

function drawSpecialShop() {
    let template = "<tr><th>SPECIAL SHOP:</th></tr>"
    for (let key in special) {
        template += `<tr id="${special[key].name}" class="btn btn-outline-primary w-100" onclick="buySpecial('${special[key].name}')"><td>${special[key].name}: ${special[key].cost} Ore -- Bought: ${special[key].bought}</td></tr>`
    }
    document.getElementById("special-table").innerHTML = template
}

function drawUpgrades() {
    let template = "<tr><th>UPGRADE SHOP:</th></tr>"
    for (let key in upgrades) {
        template += `<tr id="${upgrades[key].name}" class="btn btn-outline-success w-100" onclick="buyUpgrade('${upgrades[key].name}')"><td>${upgrades[key].name}: ${upgrades[key].cost} Ore -- Level: ${upgrades[key].level}</td></tr>`
        document.getElementById("upgrades-table").innerHTML = template
    }
}

function cheatMoney() {
    totals['ore'].current = totals['ore'].current += 500000
    totals['ore'].total = totals['ore'].total += 500000
    drawUpgrades()
    drawTotals()
}

function cheatSmelter() {
    upgrades.upgradeOreSmelter.level = 5000
    special.oreSmelter.bought = 50
    drawUpgrades()
    drawTotals()
    drawSpecialShop()
}



drawUpgrades()
drawTotals()
drawSpecialShop()