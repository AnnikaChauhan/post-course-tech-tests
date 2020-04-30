const hitButton = document.getElementById("hit");
const restartButton = document.getElementById("restart");

class Wasp {
    points = 0;
    losePoints = 7;

    constructor(waspID) {
        this.waspID = waspID
    }

    hit = () => this.points -= this.losePoints;

    waspHTML = () => {
        return `<div id=${this.waspID} class="wasp"><h2>${this.constructor.name}</h2><h2>${this.points}</h2></div>`
    }
}

class Queen extends Wasp {
    points = 80;
}

class Worker extends Wasp {
    points = 68;
    losePoints = 10;
}

class Drone extends Wasp {
    points = 60;
    losePoints = 12;
}

class Hive {
    wasps = [];

    constructor(hiveID) {
        this.hiveID = hiveID;
        this.addWasps(Queen, 1);
        this.addWasps(Worker, 5);
        this.addWasps(Drone, 8);
    }

    addWasps = (TypeOfWasp, numberOfWasps) => {
        for (let i = 0; i < numberOfWasps; i++) {
            let wasp = new TypeOfWasp(TypeOfWasp.name + '-' + i);
            this.wasps.push(wasp);
        }
    }

    removeWasp = (indexOfWasp) => {
        let indexOfSplicedWasp = this.wasps.indexOf(indexOfWasp);
        this.wasps.splice(indexOfSplicedWasp, 1);
    }

    randomWaspIndexFinder = () => {
        let waspIndex = Math.floor(Math.random() * this.wasps.length);
        return waspIndex;
    }

    showAllWasps = () => {
        let hiveHTML = document.getElementById(this.hiveID);
        this.wasps.forEach(wasp => {
            hiveHTML.innerHTML += wasp.waspHTML();
        });
    }

    updateWaspHTML = (wasp, html) => {
        html.innerHTML = `<h2>${wasp.constructor.name}</h2><h2>${wasp.points}</h2>`;
    }

    determineIfItIsQueen = (wasp, html) => {
        if (wasp.constructor.name === "Queen") {
            document.getElementById(this.hiveID).innerHTML = '<p>Game over! The Queen Wasp died!</p>';
        } else {
            html.style.backgroundColor = 'red';
            this.removeWasp(wasp);
        }
    }

    changeTheDOMAccordingly = (specificWasp, html) => {
        if (specificWasp.points > 0) {
            this.updateWaspHTML(specificWasp, html);
        } else {
            specificWasp.points = 0;
            this.updateWaspHTML(specificWasp, html);
            this.determineIfItIsQueen(specificWasp, html);
        }
    }

    hitWasp = () => {
        let index = this.randomWaspIndexFinder();
        let waspHTML = document.getElementById(this.wasps[index].waspID);
        this.wasps[index].hit();
        this.changeTheDOMAccordingly(this.wasps[index], waspHTML);
    }
}
const myHive = new Hive('hive');
myHive.showAllWasps();
hitButton.onclick = () => {myHive.hitWasp()};
restartButton.onclick = () => {location.reload()};