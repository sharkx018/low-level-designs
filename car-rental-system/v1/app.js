const Location = require('./location')
const Store = require('./store')
const Car = require('./car')
const User = require('./user')
const Admin = require('./admin')
const Search = require('./search')
const Booking = require('./booking')
const CreditCardPayment = require('./payment/credit-card')
const Payment = require('./payment/payment')


const userList = []
const storeList = []
const bookingList = []
const paymentList = []

function main(){
    // create Location and Store

    const l1 = new Location(1, '123 Main St', 'New York', 'NK', '100001', 'USA' )
    const store1 = new Store(1, 'NY Car Rentals', l1)

    storeList.push(store1)

    const l2 = new Location(2, '334 Make', 'Los Angeles', 'CA', '12222', 'USA')
    const store2 = new Store(2, 'LA Car Rentals', l2)


    // create admin
    const admin = new Admin(1, 'John', 'admin@gmail.com', '321eqwe')
    admin.register(userList)


    // admin adds vechiles to the stores
    const car1 = new Car(1, 'Toyota', 'Corolla', 2018, 40, store1.storeId, 'sedan', 5, 'petrol', 'automatic')
    const car2 = new Car(1, 'Tesla', 'Model 3', 2021, 100, store1.storeId, 'sedan', 5, 'electric', 'automatic')
    const car3 = new Car(1, 'Honda', 'Civic', 2019, 50, store2.storeId, 'sedan', 5, 'petrol', 'manual')
    const car4 = new Car(1, 'Ford', 'Mustang', 2020, 120, store2.storeId, 'convertiable', 4, 'petrol', 'automatic')

    admin.addVehicleToStore(store1, car1)
    admin.addVehicleToStore(store1, car2)
    admin.addVehicleToStore(store2, car3)
    admin.addVehicleToStore(store2, car4)

    const search  = new Search(storeList, bookingList)

    const searchCriteria = {
        brand: 'Toyota',
        type: 'sedan',
        startDate: '2023-10-10',
        endDate: '2023-10-15',
        location: 'New York',
    }

    console.log(`Searching vehicles with criteria: ${searchCriteria}`)
    const availableVechiles = search.searchVehicles(searchCriteria)
    console.log(`Available vehicles:`, availableVechiles.map(vehicles=>vehicles.getDetails()));


    const user = new User(2, 'Jenifer', 'jan@gmail.com', '098989898', 'password@123')

    if(availableVechiles.length > 0){
        const booking =  Booking.createBooking(bookingList, user, availableVechiles[0], searchCriteria.startDate, searchCriteria.endDate)
        console.log(`Booking created: `, booking)

        // process Payment using Credit card
        const creditCardProcessor = new CreditCardPayment('123456781234', 'jon', '12/34', '400')
        const payment1 = new Payment(1, booking.bookingId, booking.totalPrice, creditCardProcessor)

        payment1.processPayment()
        paymentList.push(payment1)

        console.log(`All Payments:`, paymentList.map(payment=>payment.getPaymentStatus()))

        // Refund the payment
        payment1.refundPayment();

    }else{
        console.log(`No available vehicles matched for the search criteria.`)
    }

}


main()
