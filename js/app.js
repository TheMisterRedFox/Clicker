const clicker = document.querySelector(".clicker")
const moneyText = document.querySelector(".moneyAmount")
const multiplicatorText = document.querySelector(".multiplicatorAmount")
const multiplicatorShop = document.querySelector(".multiplicatorShop")
const multiplicatorPrice = document.querySelector(".multiplicatorShopPrice")
const autoClickShop = document.querySelector(".autoClickShop")
const autoClickShopPrice = document.querySelector(".autoClickShopPrice")
const autoclickAmount = document.querySelector(".autoclickInterval")
const info = document.querySelector(".info")
const achievement = document.querySelector(".notif")
const closeCross = document.querySelector(".cross")
const shopMenu = document.querySelector(".shopMenu")
const shopMenuIcon = document.querySelector(".shopping-svg")

let money = 0;
let clickMultiplicator = 1;
let clickPerAutoClick = 0;
let priceOfMultiplicator = 50;
let priceOfAutoClick = 50;
let interval = 1000;
let autoClickActive = false;
let toFixedActuel = 2;
let counterClick = 0
let menuOpen = false;

let shop = [
    new ShopElement("Multiplicateur de clic", 250, 5, "fa-hand-pointer"),
    new ShopElement("Amélioration de l'autoclicker", 250, 5, "fa-arrow-pointer")
]

const chargerShop = () => {
    shop.forEach(shopItem => {
        // content and price div
        const contentAndPrice = document.createElement("div");
        contentAndPrice.classList.add("content-and-price");

        // content div
        const content = document.createElement("div");
        content.classList.add("content");


        // name of content div and its text
        const nameOfContent = document.createElement("div");
        nameOfContent.classList.add("nameOfContent");
        const nameOfContentTextContainer = document.createElement("p")
        const nameOfContentText = document.createTextNode(`${shopItem.name}`);

        // actual items in player pocket
        const actualContainer = document.createElement("p");
        actualContainer.classList.add("actual")
        const actualContainerText = document.createTextNode(`(Actuel : ${shopItem.level})`)

        // icon
        const icon = document.createElement("i");
        icon.classList.add("fa-solid");
        icon.classList.add(shopItem.icon)

        // price div and its text
        const price = document.createElement("div")
        price.classList.add("price")
        const priceTextContainer = document.createElement("p")
        const priceText = document.createTextNode(`${shopItem.price} 💸`)

        shopMenu.appendChild(contentAndPrice);
        contentAndPrice.appendChild(content);
        content.appendChild(nameOfContent);
        nameOfContentTextContainer.appendChild(nameOfContentText)
        nameOfContent.appendChild(nameOfContentTextContainer);
        actualContainer.appendChild(actualContainerText);
        content.appendChild(actualContainer);
        nameOfContent.appendChild(icon);
        contentAndPrice.appendChild(price);
        priceTextContainer.appendChild(priceText);
        price.appendChild(priceTextContainer);
    });
}

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
    counterClick++
    if (counterClick === 10) {
        achievement.style.display = "initial";
    }
        
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

const closeModal = () => {
    achievement.style = "display:none;";
}

const openShop = () => {
    if (!menuOpen) {
        shopMenuIcon.classList.add("shopping-svg-active");
        shopMenu.style.display = "initial";
        menuOpen = true;
    } else {
        shopMenuIcon.classList.remove("shopping-svg-active");
        shopMenu.style.display = "none";
        menuOpen = false;
    }
}

clicker.addEventListener("click", doAClick);
multiplicatorShop.addEventListener("click", addMultiplicator);
autoClickShop.addEventListener("click", addAutoClick);
closeCross.addEventListener("click", closeModal)
shopMenuIcon.addEventListener("click", openShop)
chargerShop()