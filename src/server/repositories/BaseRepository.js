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
      console.log('BaseRepository.insert called with data:', data);
      console.log('Model name:', this.model.name);
      try {
        const result = await this.model.create(data);
        console.log('BaseRepository.insert result:', result);
        return result;
      } catch (error) {
        console.error('Error in BaseRepository.insert:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        throw error;
      }
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

    async getPaginated(options = {}) {
      const { page = 1, limit = 5, ...queryOptions } = options;
      const offset = (page - 1) * limit;
      
      const { count, rows } = await this.model.findAndCountAll({
        ...queryOptions,
        limit: parseInt(limit),
        offset: parseInt(offset)
      });
      
      return {
        data: rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit),
          hasNextPage: page < Math.ceil(count / limit),
          hasPrevPage: page > 1
        }
      };
    }

    getPrimaryKey() {
      // Get the primary key field name from the model
      const primaryKeys = this.model.primaryKeyAttributes;
      if (primaryKeys && primaryKeys.length > 0) {
        return primaryKeys[0];
      }
      
      // Fallback: try to get the primary key from the model definition
      const attributes = this.model.rawAttributes;
      for (const [key, attr] of Object.entries(attributes)) {
        if (attr.primaryKey) {
          return key;
        }
      }
      
      // Last fallback
      return 'id';
    }
}
  
module.exports = BaseRepository;
  