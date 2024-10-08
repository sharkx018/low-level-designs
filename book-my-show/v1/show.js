class Show {
    constructor(id, movie, theatre, screen, startTime) {
        this.id = id
        this.movie = movie
        this.theatre = theatre
        this.screen = screen
        this.startTime = startTime
        this.availableSeats = screen.getAvailableSeats()
    }

    getAvailableSeats(){
        return this.availableSeats.filter(seat=>seat.isAvailable)
    }

    bookSeats(seats){
        for(let seat of seats){
            if(!seat.bookSeat()){
                return false
            }
        }

        return true
    }


}

module.exports = Show
