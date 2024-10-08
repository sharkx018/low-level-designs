const Vehicle = require('./vehicle')

class Car extends Vehicle{

    constructor(vehicleId, brand, model, year, pricePerDay, storeId, type, seatingCapacity, fuelType, transmissionType, status = 'available') {
        super(vehicleId, brand, model, year, pricePerDay, storeId, status);
        this.type = type
        this.seatingCapacity = 5
        this.fuelType = fuelType
        this.transmissionType = transmissionType

    }

    getCarDetails(){
        return {
            ...this.getDetails(),
            type: this.type,
            seatingCapacity: this.seatingCapacity,
            fuelType: this.fuelType,
            transmissionType: this.transmissionType
        }
    }

    isLuxury(){
        return this.type === 'SUV' || this.type === 'convertible';
    }

}

module.exports = Car

