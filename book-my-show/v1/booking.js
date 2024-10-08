
class Booking{
    constructor(user, show, selectedSeats) {
        this.id = `booking-id:${Date.now()}`
        this.user = user
        this.show = show
        this.paymentStatus = 'pending'
        this.seats = selectedSeats
    }

    confirmBooking(){
        if(this.show.bookSeats(this.seats)){
            this.paymentStatus = "confirmed"
        }else{
            this.paymentStatus = "failed"
        }
    }

    cancelBooking(){
        this.seats.forEach(seat =>seat.releaseSeat())
        this.paymentStatus = "failed"
    }

}

module.exports = Booking
