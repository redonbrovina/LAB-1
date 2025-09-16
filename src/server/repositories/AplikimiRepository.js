const BaseRepository = require("./BaseRepository");

class AplikimiRepository extends BaseRepository{
    constructor(){
        super('aplikimi', 'aplikimiID');
    }

    async getAllAplikimet(){
        return await this.getAll();
    }

    async getAplikimiById(aplikimiID){
        return await this.getByField('aplikimiID', aplikimiID);
    }

    async getAplikimiByAplikimiStatusID(aplikimiStatusID){
        return await this.getByField('aplikimiStatusID', aplikimiStatusID);
    }

    async createAplikimi(data){
        return await this.insert(data);
    }

    async updateAplikimi(aplikimiID, data){
        return await this.update(aplikimiID, data);
    }

    async deleteAplikimi(aplikimiID){
        return await this.deleteById(aplikimiID);
    }
}

module.exports = AplikimiRepository;