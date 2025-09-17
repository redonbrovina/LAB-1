const { DataTypes } = require("sequelize");

// repositories/BaseRepository.js
class BaseRepository {
    constructor(model) {
      this.model = model;
    }
  
    async getAll(options = {}) {
      return await this.model.findAll(options);
    }
  
    async getById(id) {
      return await this.model.findByPk(id);
    }
  
    async getByField(field, value, options = {}) {
      return await this.model.findAll({ 
        where: { [field]: value },
        ...options 
      });
    }
  
    async getOneByField(field, value, options = {}) {
      return await this.model.findOne({ 
        where: { [field]: value },
        ...options 
      });
    }
  
    async insert(data) {
      return await this.model.create(data);
    }
  
    async updateById(id, data) {
      const [updated] = await this.model.update(data, { 
        where: { [this.getPrimaryKey()]: id } 
      });
      return updated ? await this.getById(id) : null;
    }
  
    async deleteById(id) {
      return await this.model.destroy({ 
        where: { [this.getPrimaryKey()]: id } 
      });
    }
  
    async deleteByField(field, value) {
      return await this.model.destroy({ where: { [field]: value } });
    }
  
    async count(where = {}) {
      return await this.model.count({ where });
    }

    getPrimaryKey() {
      // Get the primary key field name from the model
      const primaryKeys = this.model.primaryKeyAttributes;
      return primaryKeys[0] || 'id';
    }
}
  
module.exports = BaseRepository;
  