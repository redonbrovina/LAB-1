const lectureRepository = require('../repositories/LectureRepository');

class LectureController {
    async getAllLectures(req, res) {
        try {
            const lectures = await lectureRepository.getAllLectures();
            res.json(lectures);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getLectureById(req, res) {
        try {
            const { id } = req.params;
            const lecture = await lectureRepository.getLectureById(id);
            if (!lecture) {
                return res.status(404).json({ error: 'Lecture not found' });
            }
            res.json(lecture);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createLecture(req, res) {
        try {
            const lectureData = req.body;
            const lecture = await lectureRepository.createLecture(lectureData);
            res.status(201).json(lecture);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateLecture(req, res) {
        try {
            const { id } = req.params;
            const lectureData = req.body;
            const lecture = await lectureRepository.updateLecture(id, lectureData);
            res.json(lecture);
        } catch (error) {
            if (error.message === 'Lecture not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    async deleteLecture(req, res) {
        try {
            const { id } = req.params;
            await lectureRepository.deleteLecture(id);
            res.json({ message: 'Lecture deleted successfully' });
        } catch (error) {
            if (error.message === 'Lecture not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    async getLecturesByLecturer(req, res) {
        try {
            const { lecturerId } = req.params;
            const lectures = await lectureRepository.getLecturesByLecturer(lecturerId);
            res.json(lectures);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new LectureController();
