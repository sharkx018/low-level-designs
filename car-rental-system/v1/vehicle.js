

// Base class
class Vehicle{
    constructor(vehicleId, brand, model, year, pricePerDay, storeId, status = 'available') {
        this.vehicleId = vehicleId
        this.brand = brand
        this.model = model
        this.year = year
        this.pricePerDay = pricePerDay
        this.storeId = storeId
        this.status = status
    }

    getDetails(){
        return {
            vehicleId: this.vehicleId,
            brand: this.brand,
            model: this.model,
            year: this.year,
            pricePerDay: this.pricePerDay,
            storeId: this.storeId,
            status: this.status,
        }
    }


    changeStatus(status){
        this.status = status
    }

    calculateRentalCost(startDate, endDate){
        const diff = new Date(endDate) - new Date(startDate)
        const days = Math.ceil(diff)/ (1000*60*60*24)
        return days* this.pricePerDay

    }

}


module.exports = Vehicle
