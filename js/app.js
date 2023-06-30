const clicker = document.querySelector(".clicker")
const moneyText = document.querySelector(".moneyAmount")
const multiplicatorText = document.querySelector(".multiplicatorAmount")
const autoclickAmount = document.querySelector(".autoclickInterval")
const info = document.querySelector(".info")
const achievement = document.querySelector(".notif")
const closeCross = document.querySelector(".cross")
const shopMenu = document.querySelector(".shopMenu")
const shopMenuIcon = document.querySelector(".shop-svg")

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

/**
 * Permet d'obtenir l'affichage en fonction de l'argent du joueur.
 * Par exemple, 1 000 000 se transforme en "1 million"
 */
const getAffichageMoney = (mny, isFloat) => {

    let moneyString;

    if(mny >= 1000000000000000000000000) {
        moneyString = `${parseFloat(mny / 1000000000000000000000000).toFixed(2)} septillions`
    } else if(mny >= 1000000000000000000000) {
        moneyString = `${parseFloat(mny / 1000000000000000000000).toFixed(2)} sextillions`
    } else if(mny >= 1000000000000000000) {
        moneyString = `${parseFloat(mny / 1000000000000000000).toFixed(2)} quintillions`
    } else if(mny >= 1000000000000000) {
        moneyString = `${parseFloat(mny / 1000000000000000).toFixed(2)} quadrillions`
    } else if(mny >= 1000000000000) {
        moneyString = `${parseFloat(mny / 1000000000000).toFixed(2)} trilliards`
    } else if(mny >= 1000000000) {
        moneyString = `${parseFloat(mny / 1000000000).toFixed(2)} milliards`
    } else if(mny >= 1000000){
        moneyString = `${parseFloat(mny / 1000000).toFixed(2)} millions`
    } else if(isFloat) {
        moneyString = parseFloat(mny).toFixed(2)
    } else {
        moneyString = parseInt(mny).toFixed(0)
    }

    return moneyString
}

/**
 * Modifie l'affichage de l'argent pour mettre la money courante.
 */
const miseAJourTexteArgent = () => {

    moneyText.innerText = getAffichageMoney(money, false);
}

const verifSauvegarde = () => {
    
    if (localStorage.getItem("money") !== null) {
        money = parseInt(localStorage.getItem("money"));
        miseAJourTexteArgent();
    
    } else {
        localStorage.setItem("money", parseInt(money))
    }
}

const saveProgress = () => {
    console.log("saved progress")
    localStorage.setItem("money", parseInt(money));
    console.log(`money in localStorage : ${localStorage.getItem("money")}`)
}

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
        const actualNumber = document.createElement("span")
        actualNumber.innerText = shopItem.level
        actualContainer.classList.add("actual")
        actualContainer.innerHTML = `(Actuel : <span>${shopItem.level}</span>)`

        // icon
        const icon = document.createElement("i");
        icon.classList.add("fa-solid");
        icon.classList.add(shopItem.icon)

        // price div and its text
        const price = document.createElement("div")
        price.classList.add("price")
        const priceTextContainer = document.createElement("p")
        priceTextContainer.innerHTML = `<span>${getAffichageMoney(shopItem.price, false)}</span> 💸`

        shopMenu.appendChild(contentAndPrice);
        contentAndPrice.appendChild(content);
        content.appendChild(nameOfContent);
        nameOfContentTextContainer.appendChild(nameOfContentText)
        nameOfContent.appendChild(nameOfContentTextContainer);
        content.appendChild(actualContainer);
        nameOfContent.appendChild(icon);
        contentAndPrice.appendChild(price);
        price.appendChild(priceTextContainer);
    });
}

const miseAJourTexteMultiplicator = () => {
    multiplicatorText.innerText = clickMultiplicator
}

const miseAJourTexteAutoClick = () => {
    autoclickAmount.innerText = getAffichageMoney(clickPerAutoClick, true);
}

const miseAJourShop = (shopItems) => {
    for (let i = 0; i < shop.length; i++) {
        // Mise à jour du texte "(Actuel : ...)"
        shopItems[i].children[0].children[1].children[0].innerText = shop[i].level;
        // Mise à jour du montant du shopitem
        shopItems[i].children[1].children[0].children[0].innerText = getAffichageMoney(shop[i].price);
    }
}

const handleAchievements = () => {
    achievements.forEach(acm => {
        if(acm.isAchieve()){
            $(".notifBox").append(acm.jqElement);
        }
    });
}

const doAClick = () => {
    money += clickMultiplicator
    miseAJourTexteArgent();
    counterClick++;
    handleAchievements();
        
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

const addMultiplicator = (item) => {
    if (money >= item.price) {
        clickMultiplicator *= 2;
        money -= item.price;
        item.gainLevel();
        miseAJourTexteMultiplicator();
        miseAJourTexteArgent();
    } else {
        afficherOuEnleverInfo(true, "Vous n'avez pas assez d'argent !")
        setTimeout(afficherOuEnleverInfo, 5000, false, "")
    }
    
}

const addAutoClick = (item) => {
    if (money >= item.price) {
        money -= item.price
        miseAJourTexteArgent();
        item.gainLevel();
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

const openShop = () => {
    if (!menuOpen) {
        shopMenuIcon.classList.add("shop-svg-active");
        shopMenu.style.display = "initial";
        menuOpen = true;
    } else {
        shopMenuIcon.classList.remove("shop-svg-active");
        shopMenu.style.display = "none";
        menuOpen = false;
    }
}

const determineShopObject = (item, shopItems) => {
    switch (item.category) {
        case 0: // Click multiplier
            addMultiplicator(item);
            
            break;
        case 1:
            addAutoClick(item)
            break;
        default:
            break;
    }
    miseAJourShop(shopItems)
}

const addEventListenerToShopObjects = () => {
    const shopItems = document.querySelectorAll(".content-and-price")
    for (let i = 0; i < shopItems.length; i++) {
        shopItems[i].addEventListener("click", function(){determineShopObject(shop[i], shopItems)})
    }
    miseAJourShop(shopItems)
    
}

clicker.addEventListener("mousedown", doAClick);
shopMenuIcon.addEventListener("click", openShop);
chargerShop();
addEventListenerToShopObjects();


/* Save system - NOT IMPLEMENTED
setInterval(saveProgress, 30000); */