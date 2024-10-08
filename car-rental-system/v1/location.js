class Location {
    constructor(locationId, address, city, state, zipcode, country) {
        this.locationId = locationId
        this.address = address
        this.city = city
        this.state = state
        this.zipcode = zipcode
        this.country = country
    }

    getAddress(){
        return `${this.address}, ${this.city}, ${this.state}, ${this.zipcode}, ${this.country}`
    }

    updateLocation(address, city, state, zipcode, country){
        this.address = address
        this.city = city
        this.state = state
        this.zipcode = zipcode
        this.country = country
    }

}


module.exports = Location
