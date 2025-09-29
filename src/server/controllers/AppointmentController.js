const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

class AppointmentController {
  // Get all appointments
  static async getAllAppointments(req, res) {
    try {
      const appointments = await Appointment.findAll({
        include: [{
          model: Doctor,
          as: 'doctor'
        }],
        order: [['AppointmentId', 'ASC']]
      });
      res.json(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Error fetching appointments' });
    }
  }

  // Get appointment by ID
  static async getAppointmentById(req, res) {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByPk(id, {
        include: [{
          model: Doctor,
          as: 'doctor'
        }]
      });
      
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      
      res.json(appointment);
    } catch (error) {
      console.error('Error fetching appointment:', error);
      res.status(500).json({ message: 'Error fetching appointment' });
    }
  }

  // Create new appointment
  static async createAppointment(req, res) {
    try {
      const { PatientName, Date: appointmentDateString, DoctorId } = req.body;
      
      console.log('Creating appointment with data:', { PatientName, Date: appointmentDateString, DoctorId });
      
      if (!PatientName || !appointmentDateString || !DoctorId) {
        return res.status(400).json({ message: 'PatientName, Date, and DoctorId are required' });
      }

      // Check if doctor exists
      const doctor = await Doctor.findByPk(DoctorId);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }

      // Parse and validate the date
      const appointmentDate = new Date(appointmentDateString);
      if (isNaN(appointmentDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
      }

      const appointment = await Appointment.create({
        PatientName,
        Date: appointmentDate,
        DoctorId
      });

      // Return appointment with doctor info
      const appointmentWithDoctor = await Appointment.findByPk(appointment.AppointmentId, {
        include: [{
          model: Doctor,
          as: 'doctor'
        }]
      });

      res.status(201).json(appointmentWithDoctor);
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ message: 'Error creating appointment', error: error.message });
    }
  }

  // Update appointment
  static async updateAppointment(req, res) {
    try {
      const { id } = req.params;
      const { PatientName, Date: appointmentDateString, DoctorId } = req.body;

      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }

      // If DoctorId is being updated, check if doctor exists
      if (DoctorId && DoctorId !== appointment.DoctorId) {
        const doctor = await Doctor.findByPk(DoctorId);
        if (!doctor) {
          return res.status(404).json({ message: 'Doctor not found' });
        }
      }

      // Parse and validate the date if provided
      let appointmentDate = appointment.Date;
      if (appointmentDateString) {
        appointmentDate = new Date(appointmentDateString);
        if (isNaN(appointmentDate.getTime())) {
          return res.status(400).json({ message: 'Invalid date format' });
        }
      }

      await appointment.update({
        PatientName: PatientName || appointment.PatientName,
        Date: appointmentDate,
        DoctorId: DoctorId || appointment.DoctorId
      });

      // Return updated appointment with doctor info
      const updatedAppointment = await Appointment.findByPk(id, {
        include: [{
          model: Doctor,
          as: 'doctor'
        }]
      });

      res.json(updatedAppointment);
    } catch (error) {
      console.error('Error updating appointment:', error);
      res.status(500).json({ message: 'Error updating appointment' });
    }
  }

  // Delete appointment
  static async deleteAppointment(req, res) {
    try {
      const { id } = req.params;
      
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }

      await appointment.destroy();
      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      res.status(500).json({ message: 'Error deleting appointment' });
    }
  }

  // Get all appointments with their doctors
  static async getAllAppointmentsWithDoctors(req, res) {
    try {
      const appointments = await Appointment.findAll({
        include: [{
          model: Doctor,
          as: 'doctor'
        }],
        order: [['AppointmentId', 'ASC']]
      });
      res.json(appointments);
    } catch (error) {
      console.error('Error fetching appointments with doctors:', error);
      res.status(500).json({ message: 'Error fetching appointments with doctors' });
    }
  }
}

module.exports = AppointmentController;
