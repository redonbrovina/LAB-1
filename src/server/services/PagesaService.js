const PagesaRepository = require("../repositories/PagesaRepository");
const PorosiaService = require("./PorosiaService");
const { Porosia, MenyraPageses } = require("../models");
const PorosiaService = require("./PorosiaService");

class PagesaService {
    constructor() {
        this.pagesaRepo = new PagesaRepository();
        this.porosiaService = new PorosiaService();
    }

    async getAll() {
        return await this.pagesaRepo.getAllPagesat();
    }

    async getPaginated(options) {
        return await this.pagesaRepo.getPaginated({
            include: [
                {
                    model: Porosia,
                    as: 'porosia',
                    attributes: ['porosiaID', 'cmimi_total']
                },
                {
                    model: MenyraPageses,
                    as: 'menyraPageses',
                    attributes: ['menyra_pageses']
                }
            ],
            order: [['koha_pageses', 'DESC']],
            ...options
        });
    }

    async getById(id) {
        const pagesa = await this.pagesaRepo.getPagesaById(id);
        if (!pagesa) throw new Error("Pagesa nuk u gjet");
        return pagesa;
    }

    async getByPorosia(porosiaID) {
        return await this.pagesaRepo.getPagesatByPorosia(porosiaID);
    }

    async getByKlientiID(klientiID) {
        return await this.pagesaRepo.getPagesatByKlientiID(klientiID);
    }

    async getThisMonthByKlientiID(klientiID) {
        return await this.pagesaRepo.getPagesatThisMonthByKlientiID(klientiID);
    }

    async create(data) {
        return await this.pagesaRepo.createPagesa(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.pagesaRepo.updatePagesa(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.pagesaRepo.deletePagesa(id);
    }

    async getOrderById(porosiaID) {
        return await this.porosiaService.getPorosiaById(porosiaID);
    }


    async getOrderItems(porosiaID) {
        return await this.porosiaService.getOrderItems(porosiaID);
    }

}

module.exports = PagesaService;
