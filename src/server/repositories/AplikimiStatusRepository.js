const e = require("express");
const BaseRepository = require("./BaseRepository");

class AplikimiStatusRepository extends BaseRepository {
    constructor() {
        super('aplikimi_status', 'aplikimiStatusID');
    } 
}