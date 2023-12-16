const cardWrappers = document.querySelectorAll(".card-wrapper");
const startButton = document.querySelector(".start-game");
const gameStatus = document.querySelector(".game-status");
const reStartButton = document.querySelector(".restart-game");

startButton.addEventListener("click", startButtonHandler, { once: true })
reStartButton.addEventListener("click", reStartHandler)

let correctCard = [];
let currenTry = [];

let wrongAttemptyCounter = 0;


cardWrappers.forEach(cardWrapper => {
    cardWrapper.addEventListener("click", () => {
        // check if the game has been started or not
        if (startButton.dataset.isstrated === "false") return;

        // check if the current chosed card is already was correctly chosed
        let checker = correctCard.find(el => {
            return el.dataset.animal === cardWrapper.dataset.animal
        });
        if (checker) return;

        console.log(cardWrapper.dataset.animal)

        cardWrapper.querySelector(".card").classList.add("open")
        currenTry.push(cardWrapper)

        if (currenTry.length === 2) {
            if (currenTry[0].dataset.animal === currenTry[1].dataset.animal) {
                correctCard.push(...currenTry)
                currenTry = [];
            } else {
                setTimeout(() => {
                    currenTry.forEach(chance => {
                        chance.querySelector(".card").classList.remove("open")
                    })
                    wrongAttemptyCounter++;
                    currenTry = [];
                }, 1000)
            }
        }

        winChecker()
    })
})



window.addEventListener("load", () => {
    randomizeCardOrder()
})

function winChecker() {
    let winChecker = correctCard.length === cardWrappers.length;
    if (winChecker) {
        gameStatus.innerHTML = "Congratulations, You Win. after " + wrongAttemptyCounter + " wrong attempts";
        return
    }
}

function randomizeCardOrder() {
    let orders = [];
    for (let i = 0; i < 16; i++) {
        orders[i] = i + 1;
    }

    shuffleArray(orders)

    cardWrappers.forEach((card, index) => {
        card.style.order = `${orders[index]}`;
    })
}

function startButtonHandler() {
    cardWrappers.forEach(cardWrapper => {
        cardWrapper.querySelector(".card").classList.add("open")
    })

    let counter = 5;

    let interval = setInterval(() => {
        startButton.innerHTML = `${counter}`;
        counter--
        if (counter === -1) {
            clearInterval(interval)
        }
    }, 1000);

    setTimeout(() => {
        cardWrappers.forEach(cardWrapper => {
            cardWrapper.querySelector(".card").classList.remove("open")
        })
        startButton.dataset.isstrated = "true"
        startButton.innerHTML = `The game has started`;
        startButton.style.opacity = ".4";
    }, 6500)
}

function reStartHandler() {
    window.location.reload()
}



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}