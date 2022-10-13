class ShopElement {
    constructor(name, price, multiplicatorAtEachLevel, icon, category) {
        this.name = name;
        this.price = price;
        this.multiplicatorAtEachLevel = multiplicatorAtEachLevel;
        this.icon = icon
        this.category = category // 0 -> Clic multiplier
                                 // 1 -> Autoclicker upgrade

    }

    // level of shop element at start
    level = 0;

    gainLevel() {
        this.price *= this.multiplicatorAtEachLevel
        this.level++
    }
}