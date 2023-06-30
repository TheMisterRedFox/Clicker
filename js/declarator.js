const achievements = [
    new Achievement('Clicker débutant', 'Vous avez cliqué 10 fois !', () => {return counterClick === 10}),
    new Achievement('Clicker novice', 'Vous avez cliqué 100 fois !', () => {return counterClick === 100}),
    new Achievement('Clicker novice +', 'Vous avez cliqué 500 fois !', () => {return counterClick === 500}),
    new Achievement("J'aime les clicks !", 'Vous avez cliqué 1000 fois !', () => {return counterClick === 1000}),
    new Achievement('Clicker expert', 'Vous avez cliqué 10000 fois !', () => {return counterClick === 10000}),
    new Achievement("Vous n'avez pas mal au doigt ?", 'Vous avez cliqué 100000 fois ! Vous êtes fou ?', () => {return counterClick === 100000}),
]

const shop = [
    new ShopElement("Multiplicateur de clic", 50, 4, "fa-hand-pointer", Category.ClickMultiplier),
    new ShopElement("Amélioration de l'autoclicker", 50, 2, "fa-arrow-pointer", Category.AutoclickerMultiplier)
]