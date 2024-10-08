class Store{
    constructor(storeID, name, location) {
        this.storeId = storeID
        this.name = name
        this.location = location
        this.vehicles = []
    }

    addVehicle(vehicle){
        this.vehicles.push(vehicle)
        return vehicle
    }

    removeVehicle(vehicleID){
        this.vehicles = this.vehicles.filter(v=> v.vehicleID !== vehicleID)

    }

    getAvailableVehicle(){
        return this.vehicles.filter(v=>v.status == 'open')
    }


    updateStoreDetails(name, location){
        if(name){
            this.name = name
        }

        if(location){
            this.name = location
        }
    }

}

module.exports = Store
