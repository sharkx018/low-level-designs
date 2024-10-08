const Booking = require('./booking')

class User {
    constructor(id, name, email, phone) {
        this.id = id
        this.name = name
        this.email = email
        this.phone = phone
        this.bookings = []
    }

    searchMoviesByCities(city, searchedMovieTitle){

        let result = []
        for(let theatre of city.theatres){
            for(let show of theatre.shows){
                if(show.movie.title.includes(searchedMovieTitle)){
                    result.push({
                        show,
                        theatre
                    })
                }

            }
        }

        return result

    }

    bookTicket(show, selectedSeats){
        let booking = new Booking(this, show, selectedSeats)
        this.bookings.push(booking)
        return booking
    }

}

module.exports = User
