class City {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.theatres = []
    }

    getTheaters(){
        return this.theatres
    }

    addTheater(theatre){
        this.theatres.push(theatre)
    }

}

module.exports = City
