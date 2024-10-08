let City = require('./city')
let Theatre = require('./theatre')
let Screen = require('./screen')
let Seat = require('./seat')
let Show = require('./show')
let Movie= require('./movie')
let User= require('./user')
let Payment= require('./payment')

function main(){

    // --- Real Scenario Simulation ---

    // Step 1: Create a city and theatres
    let city = new City(1, 'kanpur')

    let theatre1 = new Theatre(1, "Z-square-Inox", city)
    let theatre2 = new Theatre(2, "Rave-3", city)
    city.addTheater(theatre1)
    city.addTheater(theatre2)

    // Step 2: Create screens
    let screen1 = new Screen(1, "S1", theatre1)
    let screen2 = new Screen(1, "S2", theatre1)

    // Step 3: Add seats to screens
    for(let i=1; i<=50; i++){
        screen1.addSeat(new Seat(i, `A${i}`))
    }

    for(let i=51; i<=100; i++){
        screen2.addSeat(new Seat(i, `B${i}`))
    }

    // Step 4: Add screens to theatres
    theatre1.addScreen(screen1)
    theatre1.addScreen(screen2)

    // Step 5: Create a movie
    const movie = new Movie(1, "Avengers: Enggame", 180, 'Action', 'English', 4.5)

    // Step 6: Create the show for the movie
    let show1 = new Show(1, movie, theatre1, screen1, '2024-10-08 18:00')
    let show2 = new Show(2, movie, theatre1, screen2, '2024-10-08 20:00')

    movie.addShow(show1)
    movie.addShow(show2)
    theatre1.addShow(show1)
    theatre1.addShow(show2)


    // Step 7: User searches for the movie in their city
    let user1 = new User(1, "Mukul Verma",'mukul.verma@gmail.com', '8318183466')

    let searchedResult = user1.searchMoviesByCities(city, 'Avengers')


    console.log("Search Results:", searchedResult.map((result)=>{
        return {
            theatre: result.theatre.name,
            showTime: result.show.startTime
        }
    }))

    // Step 8: User selects a show and books seats
    let selectedShow = searchedResult[0].show

    let availableSeats = selectedShow.getAvailableSeats();

    let selectedSeats = availableSeats.splice(0,2)
    let booking = user1.bookTicket(selectedShow, selectedSeats)

    booking.confirmBooking()

    if(booking.paymentStatus == "confirmed"){
        let payment = new Payment(1, booking.id, 30, 'creditCard')
        payment.makePayment()
        console.log('Payment Status:', payment.status)
    }else{
        console.log('Booking failed, seats unavailable.')
    }

}

main()
