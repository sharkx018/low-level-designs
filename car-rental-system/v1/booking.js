class Booking{
    constructor(bookingId, userId, vehicle, storeId, startDate, endDate, totalPrice, status= 'confirmed') {
        this.bookingId = bookingId
        this.userId = userId
        this.vehicle = vehicle
        this.storeId = storeId
        this.startDate = startDate
        this.endDate = endDate
        this.totalPrice = totalPrice
        this.status = status
    }

    static isVehicleAvailable(vehicle, startDate, endDate, bookingList){
        let isConflicting = bookingList.some((booking)=>{
            if(booking.vehicle.vehicleId == vehicle.vehicleId && booking.status == 'confirmed'){

                let bookingStart = booking.startDate
                let bookingEnd = booking.endDate

                if(
                    (bookingStart <= startDate && startDate <= bookingEnd) ||
                    (bookingStart <= endDate && endDate <= bookingEnd) ||
                    (startDate <= bookingStart && bookingEnd <= endDate)
                ){
                    return true
                }

                return false
            }
        })

        return !isConflicting

    }

    static createBooking(bookingList, user, vehicle, startDate, endDate){
        if(!this.isVehicleAvailable(vehicle, startDate, endDate, bookingList)){
            throw new Error('Vehicle is not available for the selected data range')
        }

        const bookingId = bookingList.length + 1
        const totalPrice = vehicle.calculateRentalCost(startDate, endDate)
        const newBooking = new Booking(bookingId, user.userId, vehicle, vehicle.storeId, startDate, endDate, totalPrice)

        vehicle.changeStatus('booked')
        user.bookings.push(newBooking)
        bookingList.push(newBooking)

        return newBooking
    }

    cancelBooking(){
        this.status = 'canceled'
    }

    completeBooking(){
        this.status = 'completed'
    }


}

module.exports = Booking
