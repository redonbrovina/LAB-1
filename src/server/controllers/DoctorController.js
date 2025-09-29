const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

class DoctorController {
  // Get all doctors
  static async getAllDoctors(req, res) {
    try {
      const doctors = await Doctor.findAll({
        order: [['DoctorId', 'ASC']]
      });
      res.json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ message: 'Error fetching doctors' });
    }
  }

  // Get doctor by ID
  static async getDoctorById(req, res) {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findByPk(id);
      
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      
      res.json(doctor);
    } catch (error) {
      console.error('Error fetching doctor:', error);
      res.status(500).json({ message: 'Error fetching doctor' });
    }
  }

  // Create new doctor
  static async createDoctor(req, res) {
    try {
      const { Name, Specialization } = req.body;
      
      if (!Name || !Specialization) {
        return res.status(400).json({ message: 'Name and Specialization are required' });
      }

      const doctor = await Doctor.create({
        Name,
        Specialization
      });

      res.status(201).json(doctor);
    } catch (error) {
      console.error('Error creating doctor:', error);
      res.status(500).json({ message: 'Error creating doctor' });
    }
  }

  // Update doctor
  static async updateDoctor(req, res) {
    try {
      const { id } = req.params;
      const { Name, Specialization } = req.body;

      const doctor = await Doctor.findByPk(id);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }

      await doctor.update({
        Name: Name || doctor.Name,
        Specialization: Specialization || doctor.Specialization
      });

      res.json(doctor);
    } catch (error) {
      console.error('Error updating doctor:', error);
      res.status(500).json({ message: 'Error updating doctor' });
    }
  }

  // Delete doctor
  static async deleteDoctor(req, res) {
    try {
      const { id } = req.params;
      
      const doctor = await Doctor.findByPk(id);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }

      await doctor.destroy();
      res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
      console.error('Error deleting doctor:', error);
      res.status(500).json({ message: 'Error deleting doctor' });
    }
  }

  // Get doctor with their appointments
  static async getDoctorWithAppointments(req, res) {
    try {
      const { id } = req.params;
      
      const doctor = await Doctor.findByPk(id, {
        include: [{
          model: Appointment,
          as: 'appointments'
        }]
      });

      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }

      res.json(doctor);
    } catch (error) {
      console.error('Error fetching doctor with appointments:', error);
      res.status(500).json({ message: 'Error fetching doctor with appointments' });
    }
  }
}

module.exports = DoctorController;
