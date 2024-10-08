class Screen {
    constructor(id, number, theatre) {
        this.id = id
        this.number = number
        this.theatre = theatre
        this.seats  = []
    }


    addSeat(seat){
        this.seats.push(seat)
    }

    getAvailableSeats(){
        return this.seats.filter(seat => seat.isAvailable)
    }

}

module.exports = Screen


