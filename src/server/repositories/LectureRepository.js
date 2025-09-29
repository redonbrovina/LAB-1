const BaseRepository = require('./BaseRepository');
const { Lecture, Lecturer } = require('../models');

class LectureRepository extends BaseRepository {
    constructor() {
        super(Lecture);
    }

    async getAllLectures() {
        return await this.model.findAll({
            include: [{
                model: Lecturer,
                as: 'lecturer'
            }]
        });
    }

    async getLectureById(id) {
        return await this.model.findByPk(id, {
            include: [{
                model: Lecturer,
                as: 'lecturer'
            }]
        });
    }

    async createLecture(lectureData) {
        return await this.model.create(lectureData);
    }

    async updateLecture(id, lectureData) {
        const lecture = await this.model.findByPk(id);
        if (!lecture) {
            throw new Error('Lecture not found');
        }
        return await lecture.update(lectureData);
    }

    async deleteLecture(id) {
        const lecture = await this.model.findByPk(id);
        if (!lecture) {
            throw new Error('Lecture not found');
        }
        return await lecture.destroy();
    }

    async getLecturesByLecturer(lecturerId) {
        return await this.model.findAll({
            where: { LecturerID: lecturerId },
            include: [{
                model: Lecturer,
                as: 'lecturer'
            }]
        });
    }
}

module.exports = new LectureRepository();
