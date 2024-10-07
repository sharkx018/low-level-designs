// import Elevator from "./elevator";
// import Request from "./request";
// import Direction from "./direction";

const Direction = require('./direction');
const Elevator = require('./elevator');
const Request = require('./request');

class ElevatorSystem {

    constructor(numFloors, numElevators) {
        this.numFloors = numFloors
        this.elevators = []
        this.pendingRequest = [];

        for(let i=0; i<numElevators; i++){
            this.elevators.push(new Elevator(i, this))
        }
    }

    requestElevator(floor, direction){

        console.log(`Received request for elevator at floor ${floor} going ${direction}`)
        let bestElevator =  this.findBestElevator(floor, direction)

        if(bestElevator){
            bestElevator.addTargetFloor(floor, direction)
            console.log(`Assigned Elevator ${bestElevator.id} to floor ${floor}`)
        }else{
            this.pendingRequest.push( new Request(floor, direction))
            console.log(`No Immidiate elevator available. Added to pending requests:, floor ${floor}, direction ${direction}`)
        }
    }

    findBestElevator(floor, direction){

        let minDistance = Infinity
        let bestElevator = null

        this.elevators.forEach(elevator=>{

            let distance = Math.abs(elevator.currentFloor - floor)

            if(
                (elevator.direction == Direction.Idle || elevator.direction == direction) &&
                 ((elevator.direction == Direction.Up && elevator.currentFloor <= floor) ||
                     (elevator.direction == Direction.Down && elevator.currentFloor >= floor) ||
                     (elevator.direction == Direction.Idle)
                 )
            ){
                if(distance < minDistance){
                    minDistance = distance
                    bestElevator = elevator
                }
            }
        })

        return bestElevator

    }

    handlePendingRequest(elevator){

        let remainingRequest = []
        this.pendingRequest.forEach(request=>{

            const {floor, direction} = request

            if(direction == elevator.direction &&
                ( (elevator.direction == Direction.Up && elevator.currentFloor <= floor) || (elevator.direction == Direction.Down && elevator.currentFloor >= floor) )
                || elevator.direction == Direction.Idle
            ){
                elevator.addTargetFloor(floor, direction)
                console.log(`Assigned pending request: Elevator ${elevator.id} to floor ${floor}`)

            }else{
                remainingRequest.push(request)
            }
        })

        this.pendingRequest = remainingRequest

    }


    step(){
        this.elevators.forEach((elevator) => {
            elevator.updateState()
        })
    }

}

module.exports = ElevatorSystem
