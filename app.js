const clicker = document.querySelector(".clicker")
const moneyText = document.querySelector(".moneyAmount")
const multiplicatorText = document.querySelector(".multiplicatorAmount")
const multiplicatorShop = document.querySelector(".multiplicatorShop")
const multiplicatorPrice = document.querySelector(".multiplicatorShopPrice")
const autoClickShop = document.querySelector(".autoClickShop")
const autoClickShopPrice = document.querySelector(".autoClickShopPrice")
const autoclickAmount = document.querySelector(".autoclickInterval")
const info = document.querySelector(".info")

let money = 0;
let clickMultiplicator = 1;
let clickPerAutoClick = 0;
let priceOfMultiplicator = 50;
let priceOfAutoClick = 50;
let interval = 1000;
let autoClickActive = false;
let toFixedActuel = 2;

const miseAJourTexteArgent = () => {
    moneyText.innerHTML = money.toFixed(0);
}

const miseAJourTexteMultiplicator = () => {
    multiplicatorText.innerHTML =  clickMultiplicator
    multiplicatorPrice.innerHTML = priceOfMultiplicator
}

const miseAJourTexteAutoClick = () => {
    autoClickShopPrice.innerHTML = priceOfAutoClick;
    autoclickAmount.innerHTML = clickPerAutoClick;
}

const doAClick = () => {
    money += clickMultiplicator
    miseAJourTexteArgent();
        
}

const doAAutoClick = () => {
    setTimeout(doAAutoClick, interval);
    money += clickPerAutoClick
    miseAJourTexteArgent();
}

const afficherOuEnleverInfo = (isAfficher, message) => {
    if (isAfficher) {
        info.innerHTML = `<p>${message}</p>`
    } else {
        info.innerHTML = ""
    }
}

const addMultiplicator = () => {
    if (money >= priceOfMultiplicator) {
        clickMultiplicator *= 2;
        money -= priceOfMultiplicator;
        priceOfMultiplicator *= 5;
        miseAJourTexteMultiplicator();
        miseAJourTexteArgent();
    } else {
        afficherOuEnleverInfo(true, "Vous n'avez pas assez d'argent !")
        setTimeout(afficherOuEnleverInfo, 5000, false, "")
    }
    
}

const addAutoClick = () => {
    if (money >= priceOfAutoClick) {
        money -= priceOfAutoClick
        miseAJourTexteArgent();
        priceOfAutoClick *= 5;
        if (clickPerAutoClick !== 0) {
            clickPerAutoClick *= 2;
        } else {
            clickPerAutoClick = 0.2
        }
        miseAJourTexteAutoClick();
        if (autoClickActive === false) {
            setTimeout(doAAutoClick, interval);
            autoClickActive = true;
        }
    } else {
        afficherOuEnleverInfo(true, "Vous n'avez pas assez d'argent !")
        setTimeout(afficherOuEnleverInfo, 5000, false, "")
    }

}

clicker.addEventListener("click", doAClick)
multiplicatorShop.addEventListener("click", addMultiplicator)
autoClickShop.addEventListener("click", addAutoClick)