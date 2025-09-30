const BaseRepository = require("./BaseRepository");
const { Book, Author } = require("../models");

/**
 * BOOK REPOSITORY
 * 
 * Menaxhon operacionet për Book (Child entity)
 */
class BookRepository extends BaseRepository {
    constructor() {
        super(Book);
    }

    /**
     * MERR TË GJITHË LIBRAT
     * - Me informacion për autorin (JOIN)
     * - Vetëm ato që nuk janë të fshirë
     */
    async getAllBooks() {
        return await this.getAll({
            where: {
                IsDeleted: false
            },
            include: [
                {
                    model: Author,
                    as: 'author',  // Përfshin autorin e librit
                    attributes: ['AuthorID', 'Name', 'Email', 'Country']
                }
            ],
            order: [['Title', 'ASC']]
        });
    }

    /**
     * MERR LIBRAT E FSHIRË
     */
    async getDeletedBooks() {
        return await this.model.findAll({
            where: { IsDeleted: true },
            include: [
                {
                    model: Author,
                    as: 'author',
                    attributes: ['AuthorID', 'Name']
                }
            ]
        });
    }

    /**
     * MERR LIBËR SIPAS ID
     */
    async getBookById(bookId) {
        return await this.getOneByField('BookID', bookId, {
            include: [
                {
                    model: Author,
                    as: 'author',
                    attributes: ['AuthorID', 'Name', 'Email', 'Country']
                }
            ]
        });
    }

    /**
     * KËRKO LIBRA SIPAS TITULLIT
     * KY ËSHTË PËR: "Gjej librat që titulli përmban 'Harry'"
     */
    async searchByTitle(searchTerm) {
        const { Op } = require('sequelize');
        
        return await this.model.findAll({
            where: {
                Title: {
                    [Op.like]: `%${searchTerm}%`
                },
                IsDeleted: false
            },
            include: [
                {
                    model: Author,
                    as: 'author',
                    attributes: ['AuthorID', 'Name']
                }
            ]
        });
    }

    /**
     * FILTRO SIPAS AUTORIT
     * KY ËSHTË PËR: "Shfaq të gjithë librat e autorit me ID = 5"
     */
    async filterByAuthor(authorId) {
        return await this.model.findAll({
            where: {
                AuthorID: authorId,
                IsDeleted: false
            },
            order: [['PublishYear', 'DESC']]  // Më i riu në fillim
        });
    }

    /**
     * FILTRO SIPAS VITIT TË PUBLIKIMIT
     * KY ËSHTË PËR: "Shfaq librat e publikuar pas vitit 2000"
     */
    async filterByYear(year, operator = '>=') {
        const { Op } = require('sequelize');
        
        // Operator mund të jetë: '>=', '<=', '=', '>', '<'
        const operatorMap = {
            '>=': Op.gte,  // Greater than or equal
            '<=': Op.lte,  // Less than or equal
            '=': Op.eq,    // Equal
            '>': Op.gt,    // Greater than
            '<': Op.lt     // Less than
        };
        
        return await this.model.findAll({
            where: {
                PublishYear: {
                    [operatorMap[operator]]: year
                },
                IsDeleted: false
            },
            include: [
                {
                    model: Author,
                    as: 'author',
                    attributes: ['Name']
                }
            ]
        });
    }

    /**
     * FILTRO SIPAS ÇMIMIT
     * KY ËSHTË PËR: "Shfaq librat që çmimi është midis 10 dhe 50 dollarë"
     */
    async filterByPriceRange(minPrice, maxPrice) {
        const { Op } = require('sequelize');
        
        return await this.model.findAll({
            where: {
                Price: {
                    [Op.between]: [minPrice, maxPrice]  // BETWEEN minPrice AND maxPrice
                },
                IsDeleted: false
            }
        });
    }

    /**
     * MERR LIBRAT NË STOK
     * KY ËSHTË PËR: "Shfaq vetëm librat që janë në stok"
     */
    async getBooksInStock() {
        return await this.model.findAll({
            where: {
                InStock: true,
                IsDeleted: false
            },
            include: [
                {
                    model: Author,
                    as: 'author',
                    attributes: ['Name']
                }
            ]
        });
    }

    /**
     * NUMËRO LIBRAT E NJË AUTORI
     * KY ËSHTË PËR: "Sa libra ka autori me ID = 3?"
     */
    async countBooksByAuthor(authorId) {
        return await this.model.count({
            where: {
                AuthorID: authorId,
                IsDeleted: false
            }
        });
    }

    /**
     * CREATE - Shto libër të ri
     */
    async createBook(data) {
        return await this.insert(data);
    }

    /**
     * UPDATE - Përditëso librin
     */
    async updateBook(bookId, data) {
        return await this.updateById(bookId, data);
    }

    /**
     * SOFT DELETE - Marko si të fshirë
     */
    async softDeleteBook(bookId) {
        return await this.updateById(bookId, { IsDeleted: true });
    }

    /**
     * HARD DELETE - Fshi përfundimisht
     */
    async hardDeleteBook(bookId) {
        return await this.deleteById(bookId);
    }

    /**
     * BULK DELETE - Fshi shumë libra njëherësh
     * KY ËSHTË PËR: "Fshi të gjithë librat e autorit X"
     */
    async bulkSoftDeleteByAuthor(authorId) {
        return await this.model.update(
            { IsDeleted: true },  // Çfarë të përditësojë
            { where: { AuthorID: authorId } }  // Kushti
        );
    }

    /**
     * RESTORE - Rikthe librin e fshirë
     */
    async restoreBook(bookId) {
        return await this.updateById(bookId, { IsDeleted: false });
    }
}

module.exports = BookRepository;
