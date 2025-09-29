const lecturerRepository = require('../repositories/LecturerRepository');

class LecturerController {
    async getAllLecturers(req, res) {
        try {
            const lecturers = await lecturerRepository.getAllLecturers();
            res.json(lecturers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getLecturerById(req, res) {
        try {
            const { id } = req.params;
            const lecturer = await lecturerRepository.getLecturerById(id);
            if (!lecturer) {
                return res.status(404).json({ error: 'Lecturer not found' });
            }
            res.json(lecturer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createLecturer(req, res) {
        try {
            const lecturerData = req.body;
            const lecturer = await lecturerRepository.createLecturer(lecturerData);
            res.status(201).json(lecturer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateLecturer(req, res) {
        try {
            const { id } = req.params;
            const lecturerData = req.body;
            const lecturer = await lecturerRepository.updateLecturer(id, lecturerData);
            res.json(lecturer);
        } catch (error) {
            if (error.message === 'Lecturer not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    async deleteLecturer(req, res) {
        try {
            const { id } = req.params;
            await lecturerRepository.deleteLecturer(id);
            res.json({ message: 'Lecturer deleted successfully' });
        } catch (error) {
            if (error.message === 'Lecturer not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new LecturerController();
