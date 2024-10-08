const Booking = require('./booking')

class Search{
    constructor(stores, bookingList) {
        this.stores = stores
        this.bookingList = bookingList
    }

    searchVehicles({brand, model, type, seatingCapacity, fuelType, startDate, endDate, location}){
        let availableVehicles = []

        this.stores.forEach(store=>{
            if(store.location.city.toLowerCase() !== location.toLowerCase()){
                return
            }

            let vehicles = store.vehicles

            vehicles = vehicles.filter(vehicle=>{
                let matchesBrand = brand ? vehicle.brand.toLowerCase() === brand.toLowerCase() : true;
                let matchesMode = model ? vehicle.model.toLowerCase() === model.toLowerCase() : true;
                let matchesType = type ? vehicle.type.toLowerCase() === type.toLowerCase() : true;
                let matchesSeatingCapacity = seatingCapacity ? vehicle.seatingCapacity.toLowerCase() === seatingCapacity.toLowerCase() : true;
                let matchesFuelType = fuelType ? vehicle.fuelType.toLowerCase() === fuelType.toLowerCase() : true;

                return matchesBrand && matchesMode && matchesType && matchesSeatingCapacity && matchesFuelType

            })

            vehicles = vehicles.filter(vehicle=>{
                return Booking.isVehicleAvailable(vehicle, startDate, endDate, this.bookingList)
            })

            availableVehicles.push(...vehicles)

        })

        return availableVehicles

    }

}

module.exports = Search
