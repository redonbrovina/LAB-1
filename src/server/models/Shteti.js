//Will be removed in the future, placeholder for how classes should look like
//This class has only static data, it cant be changed cause only a certain number of countries exist
//Only add class models that have create, update, delete operations
//This class is just for reference
//This class is not used in the code
class Shteti {
    #shtetiID;
    #emriShtetit;
    #iso_kodi;

    constructor(shtetiID, emriShtetit, iso_kodi) {
        this.#shtetiID = shtetiID;
        this.#emriShtetit = emriShtetit;
        this.#iso_kodi = iso_kodi;
    }

    getShtetiID() {
        return this.#shtetiID;
    }

    getEmriShtetit() {
        return this.#emriShtetit;
    }   
    getIso_kodi() {
        return this.#iso_kodi;
    }

    setShtetiID(shtetiID) {
        this.#shtetiID = shtetiID;
    }

    setIsokodi(iso_kodi) {
        this.#iso_kodi = iso_kodi;
    }
}

module.exports = Shteti;
