class Seat {
    constructor(id, seatNumber) {
        this.id = id
        this.seatNumber = seatNumber
        this.isAvailable = true
    }

    bookSeat(){
        if(this.isAvailable){
            this.isAvailable = false
            return true;
        }
        return false;
    }


    releaseSeat(){
        this.isAvailable = true;
    }
}

module.exports = Seat
