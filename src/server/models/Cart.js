class Cart {
    constructor({ cartID, koha_krijimit, cmimi_total, klientiID }) {
        this.cartID = cartID;
        this.koha_krijimit = koha_krijimit;
        this.cmimi_total = cmimi_total;
        this.klientiID = klientiID;
    }
}

module.exports = Cart;
