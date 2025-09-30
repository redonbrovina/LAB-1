const BaseRepository = require("./BaseRepository");
const { Author, Book } = require("../models");

/**
 * AUTHOR REPOSITORY
 * 
 * Kjo klasë menaxhon të gjitha operacionet me databazën për Author
 * Përdor BaseRepository për funksionet bazë
 */
class AuthorRepository extends BaseRepository {
    constructor() {
        super(Author);  // I kalon modelin Author në BaseRepository
    }

    /**
     * ====================================
     * OPERACIONI 1: MERR TË GJITHË AUTORËT
     * ====================================
     * 
     * KY ËSHTË PËR: Kur kërkon "shfaq të gjithë autorët"
     * - Filtron vetëm ato që NUK janë të fshirë (IsDeleted = false)
     * - I përfshin edhe librat e tyre (JOIN me Book)
     */
    async getAllAuthors() {
        return await this.getAll({
            where: {
                IsDeleted: false  // Merr vetëm ato që nuk janë të fshirë
            },
            include: [
                {
                    model: Book,
                    as: 'books',  // Përfshin librat e autorit
                    attributes: ['BookID', 'Title', 'PublishYear', 'Price']
                }
            ],
            order: [['Name', 'ASC']]  // Rendit sipas emrit A-Z
        });
    }

    /**
     * ====================================
     * OPERACIONI 2: MERR AUTORËT E FSHIRË
     * ====================================
     * 
     * KY ËSHTË PËR: Kur kërkon "shfaq autorët e fshirë"
     * - Merr vetëm ato me IsDeleted = true
     */
    async getDeletedAuthors() {
        return await this.model.findAll({
            where: { IsDeleted: true },  // Vetëm të fshirët
            include: [
                {
                    model: Book,
                    as: 'books',
                    attributes: ['BookID', 'Title']
                }
            ],
            order: [['Name', 'ASC']]
        });
    }

    /**
     * ===================================
     * OPERACIONI 3: MERR AUTOR SIPAS ID
     * ===================================
     * 
     * KY ËSHTË PËR: Kur kërkon "shfaq autorin me ID = X"
     */
    async getAuthorById(authorId) {
        return await this.getOneByField('AuthorID', authorId, {
            include: [
                {
                    model: Book,
                    as: 'books',
                    attributes: ['BookID', 'Title', 'Description', 'PublishYear', 'Price', 'ISBN']
                }
            ]
        });
    }

    /**
     * =====================================
     * OPERACIONI 4: KËRKO SIPAS EMRIT
     * =====================================
     * 
     * KY ËSHTË PËR: Kur kërkon "gjej autorët që emri përmban 'John'"
     * - Përdor LIKE për kërkime të pjesshme
     */
    async searchByName(searchTerm) {
        const { Op } = require('sequelize');  // Operatorë për WHERE conditions
        
        return await this.model.findAll({
            where: {
                Name: {
                    [Op.like]: `%${searchTerm}%`  // LIKE '%searchTerm%'
                },
                IsDeleted: false
            },
            include: [
                {
                    model: Book,
                    as: 'books',
                    attributes: ['BookID', 'Title']
                }
            ]
        });
    }

    /**
     * ==========================================
     * OPERACIONI 5: FILTRO SIPAS VENDIT
     * ==========================================
     * 
     * KY ËSHTË PËR: Kur kërkon "shfaq autorët nga 'USA'"
     */
    async filterByCountry(country) {
        return await this.model.findAll({
            where: {
                Country: country,
                IsDeleted: false
            },
            include: [
                {
                    model: Book,
                    as: 'books',
                    attributes: ['BookID', 'Title']
                }
            ]
        });
    }

    /**
     * ========================================
     * OPERACIONI 6: MERR AUTORËT AKTIVË
     * ========================================
     * 
     * KY ËSHTË PËR: Kur kërkon "shfaq vetëm autorët aktivë"
     */
    async getActiveAuthors() {
        return await this.model.findAll({
            where: {
                IsActive: true,
                IsDeleted: false
            },
            order: [['Name', 'ASC']]
        });
    }

    /**
     * ====================================
     * OPERACIONI 7: NUMËRO AUTORËT
     * ====================================
     * 
     * KY ËSHTË PËR: Kur kërkon "sa autorë ka në total?"
     */
    async countAuthors() {
        return await this.model.count({
            where: { IsDeleted: false }
        });
    }

    /**
     * =============================================
     * OPERACIONI 8: MERR AUTORËT ME LIBRA
     * =============================================
     * 
     * KY ËSHTË PËR: Kur kërkon "shfaq autorët që kanë të paktën një libër"
     */
    async getAuthorsWithBooks() {
        return await this.model.findAll({
            where: { IsDeleted: false },
            include: [
                {
                    model: Book,
                    as: 'books',
                    where: { IsDeleted: false },  // Vetëm librat jo të fshirë
                    required: true  // INNER JOIN - merr vetëm autorët që kanë libra
                }
            ]
        });
    }

    /**
     * ====================================
     * OPERACIONI 9: CREATE (SHTO)
     * ====================================
     * 
     * KY ËSHTË PËR: Kur kërkon "shto autor të ri"
     */
    async createAuthor(data) {
        return await this.insert(data);
    }

    /**
     * ====================================
     * OPERACIONI 10: UPDATE (PËRDITËSO)
     * ====================================
     * 
     * KY ËSHTË PËR: Kur kërkon "përditëso autorin"
     */
    async updateAuthor(authorId, data) {
        return await this.updateById(authorId, data);
    }

    /**
     * ========================================
     * OPERACIONI 11: SOFT DELETE
     * ========================================
     * 
     * KY ËSHTË PËR: Kur kërkon "fshi autorin" (por jo realisht)
     * - Nuk e fshin nga databaza
     * - Vetëm e markon si IsDeleted = true
     */
    async softDeleteAuthor(authorId) {
        return await this.updateById(authorId, { IsDeleted: true });
    }

    /**
     * ========================================
     * OPERACIONI 12: HARD DELETE
     * ========================================
     * 
     * KY ËSHTË PËR: Kur kërkon "fshi përfundimisht autorin"
     * - E fshin realisht nga databaza
     * - CASCADE: Fshihen edhe të gjitha librat e tij
     */
    async hardDeleteAuthor(authorId) {
        return await this.deleteById(authorId);
    }

    /**
     * ==========================================
     * OPERACIONI 13: RESTORE (Rikthe të fshirën)
     * ==========================================
     * 
     * KY ËSHTË PËR: Kur kërkon "rikthe autorin e fshirë"
     * - E kthen IsDeleted në false
     */
    async restoreAuthor(authorId) {
        return await this.updateById(authorId, { IsDeleted: false });
    }
}

module.exports = AuthorRepository;
