const User = require('./user')

class Admin extends User{

    constructor(userId, name, email, phone, password) {
        super(userId, name, email, phone, password, 'admin');
    }

    addStores(storesList, store){
        storesList.push(store)

    }

    addVehicleToStore(store, vehicle){
        return store.addVehicle(vehicle)
    }

    removeVehicleFromStore(store, vehicleId){
        store.removeVehicleFromStore(store, vehicleId)
    }

    viewAllBookings(bookingsList){
        return bookingsList
    }

}

module.exports = Admin
