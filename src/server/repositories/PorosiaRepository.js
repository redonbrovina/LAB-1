const BaseRepository = require('./BaseRepository');
const { Porosia, PorosiaStatus, PagesaStatus, Klienti, ProduktPorosise, Produkti } = require("../models");

class PorosiaRepository extends BaseRepository {
    constructor() {
        super(Porosia);
    }

    async getAllPorosite() {
        return await this.getAll({
            include: [
                {
                    model: PorosiaStatus,
                    as: 'porosiaStatus',
                    attributes: ['statusi']
                },
                {
                    model: PagesaStatus,
                    as: 'pagesaStatus',
                    attributes: ['statusi']
                },
                {
                    model: Klienti,
                    as: 'klienti',
                    attributes: ['emri_kompanise', 'email']
                }
            ],
            order: [['koha_krijimit', 'DESC']]
        });
    }

    async getPorosiaById(porosiaID) {
        return await this.getOneByField('porosiaID', porosiaID, {
            include: [
                {
                    model: PorosiaStatus,
                    as: 'porosiaStatus',
                    attributes: ['statusi']
                },
                {
                    model: PagesaStatus,
                    as: 'pagesaStatus',
                    attributes: ['statusi']
                },
                {
                    model: Klienti,
                    as: 'klienti',
                    attributes: ['emri_kompanise', 'email']
                },
                {
                    model: ProduktPorosise,
                    as: 'produktet',
                    include: [{
                        model: Produkti,
                        as: 'produkti',
                        attributes: ['emri', 'pershkrimi']
                    }]
                }
            ]
        });
    }

    async getPorositeByKlientiID(klientiID) {
        return await this.getByField('klientiID', klientiID, {
            include: [
                {
                    model: PorosiaStatus,
                    as: 'porosiaStatus',
                    attributes: ['statusi']
                },
                {
                    model: PagesaStatus,
                    as: 'pagesaStatus',
                    attributes: ['statusi']
                },
                {
                    model: ProduktPorosise,
                    as: 'produktet',
                    include: [{
                        model: Produkti,
                        as: 'produkti',
                        attributes: ['emri', 'pershkrimi']
                    }]
                }
            ],
            order: [['koha_krijimit', 'DESC']]
        });
    }

    async createPorosia(data) {
        return await this.insert(data);
    }

    async updatePorosia(porosiaID, data) {
        try {
            console.log(`PorosiaRepository.updatePorosia called for ID ${porosiaID} with data:`, data);
            
            // Validate ID
            if (!porosiaID) {
                throw new Error('Order ID is required');
            }
            
            // Get primary key
            const primaryKey = this.getPrimaryKey();
            console.log('Primary key:', primaryKey);
            
            // Update the record
            const [updatedRows] = await this.model.update(data, { 
                where: { [primaryKey]: porosiaID } 
            });
            
            console.log(`Updated ${updatedRows} rows`);
            
            if (updatedRows === 0) {
                console.log('No rows were updated');
                return null;
            }
            
            // Return the updated record
            const updatedRecord = await this.getPorosiaById(porosiaID);
            console.log('Updated record:', updatedRecord);
            return updatedRecord;
        } catch (error) {
            console.error('Error in PorosiaRepository.updatePorosia:', error);
            console.error('Error stack:', error.stack);
            throw error;
        }
    }

    async deletePorosia(porosiaID) {
        try {
            console.log(`PorosiaRepository.deletePorosia called for ID ${porosiaID}`);
            
            // Validate ID
            if (!porosiaID) {
                throw new Error('Order ID is required');
            }
            
            // Get primary key
            const primaryKey = this.getPrimaryKey();
            console.log('Primary key:', primaryKey);
            
            // Delete the record
            const deletedRows = await this.model.destroy({ 
                where: { [primaryKey]: porosiaID } 
            });
            
            console.log(`Deleted ${deletedRows} rows`);
            
            if (deletedRows === 0) {
                console.log('No rows were deleted');
                return false;
            }
            
            return true;
        } catch (error) {
            console.error('Error in PorosiaRepository.deletePorosia:', error);
            console.error('Error stack:', error.stack);
            throw error;
        }
    }
}

module.exports = PorosiaRepository;
