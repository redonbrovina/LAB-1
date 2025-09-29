const BaseRepository = require('./BaseRepository');
const { Lecturer } = require('../models');

class LecturerRepository extends BaseRepository {
    constructor() {
        super(Lecturer);
    }

    async getAllLecturers() {
        return await this.model.findAll({
            include: [{
                model: require('../models').Lecture,
                as: 'lectures'
            }]
        });
    }

    async getLecturerById(id) {
        return await this.model.findByPk(id, {
            include: [{
                model: require('../models').Lecture,
                as: 'lectures'
            }]
        });
    }

    async createLecturer(lecturerData) {
        return await this.model.create(lecturerData);
    }

    async updateLecturer(id, lecturerData) {
        const lecturer = await this.model.findByPk(id);
        if (!lecturer) {
            throw new Error('Lecturer not found');
        }
        return await lecturer.update(lecturerData);
    }

    async deleteLecturer(id) {
        const lecturer = await this.model.findByPk(id);
        if (!lecturer) {
            throw new Error('Lecturer not found');
        }
        return await lecturer.destroy();
    }
}

module.exports = new LecturerRepository();
