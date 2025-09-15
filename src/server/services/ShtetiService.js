const { ShtetiRepository } = require('../repositories/');

class ShtetiService {
    constructor(shtetiRepository) {
        this.shtetiRepository = new ShtetiRepository()
    }

    async getAllShtetet() {
        try {
            return await this.shtetiRepository.getAllShtetet();
        } catch (error) {
            console.error('Error fetching countries in service:', error);
            throw new Error('Failed to fetch countries'); // rethrow with custom message
        }
    }

}

module.exports = ShtetiService; 