class Porosia {
    constructor({ porosiaID, koha_krijimit, porosia_statusID, cmimi_total, pagesa_statusID, klientiID }) {
        this.porosiaID = porosiaID;
        this.koha_krijimit = koha_krijimit;
        this.porosia_statusID = porosia_statusID;
        this.cmimi_total = cmimi_total;
        this.pagesa_statusID = pagesa_statusID;
        this.klientiID = klientiID;
    }
}

module.exports = Porosia;
