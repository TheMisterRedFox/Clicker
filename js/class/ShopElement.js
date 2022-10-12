class ShopElement {
    constructor(name, price, multiplicatorAtEachLevel, icon) {
        this.name = name;
        this.price = price;
        this.multiplicatorAtEachLevel = multiplicatorAtEachLevel;
        this.icon = icon

    }

    // level of shop element at start
    level = 1;

    gainLevel() {
        this.price *= this.multiplicatorAtEachLevel
        this.level++
    }
}