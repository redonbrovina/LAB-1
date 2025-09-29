const Admin = require('./Admin');
const Aplikimi = require('./Aplikimi');
const AplikimiStatus = require('./AplikimiStatus');
const Cart = require('./Cart');
const Contract = require('./Contract');
const Doza = require('./Doza');
const Employee = require('./Employee');
const Furnitori = require('./Furnitori');
const Kategoria = require('./Kategoria');
const Klienti = require('./Klienti');
const Lecture = require('./Lecture');
const Lecturer = require('./Lecturer');
const MenyraPageses = require('./MenyraPageses');
const Pagesa = require('./Pagesa');
const PagesaStatus = require('./PagesaStatus');
const Planet = require('./Planet');
const Player = require('./Player');
const Porosia = require('./Porosia');
const PorosiaStatus = require('./PorosiaStatus');
const ProduktCart = require('./PrdouktCart');
const Produkti = require('./Produkti');
const ProduktPorosise = require('./ProduktPorosise');
const RefreshToken = require('./RefreshToken');
const Satellite = require('./Satellite');
const Shteti = require('./Shteti');
const Team = require('./Team');
const Student = require('./Student');
const Course = require('./Course');
const Doctor = require('./Doctor');
const Appointment = require('./Appointment');
const Movie = require('./Movie');
const Actor = require('./Actor');
const Teacher = require('./Teacher');
const Subject = require('./Subject');

// Define all models
const models = {
    Admin,
    Aplikimi,
    AplikimiStatus,
    Cart,
    Contract,
    Doza,
    Employee,
    Furnitori,
    Kategoria,
    Klienti,
    Lecture,
    Lecturer,
    MenyraPageses,
    Pagesa,
    PagesaStatus,
    Planet,
    Player,
    Porosia,
    PorosiaStatus,
    ProduktCart,
    Produkti,
    ProduktPorosise,
    RefreshToken,
    Satellite,
    Shteti,
    Team,
    Student,
    Course,
    Doctor,
    Appointment,
    Movie,
    Actor,
    Teacher,
    Subject
};

// Set up all associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Set up Student-Course associations
require('./associations/StudentCourseAssociations');

// Set up Doctor-Appointment associations
require('./associations/DoctorAppointmentAssociations');

// Set up Movie-Actor associations
require('./associations/MovieActorAssociations');

// Set up Teacher-Subject associations
require('./associations/TeacherSubjectAssociations');

module.exports = models;
