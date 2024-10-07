// import Direction from "./direction";
const Direction = require('./direction');

class Elevator{
    constructor(id, system) {
        this.id = id
        this.system = system
        this.currentFloor = 0
        this.direction = Direction.Idle
        this.state = Direction.Idle
        this.upQueue = []
        this.downQueue = []
    }

    addTargetFloor(floor, direction){
        if(direction == Direction.Up && !this.upQueue.includes(floor)){
            this.upQueue.push(floor)
            this.upQueue.sort((a,b)=> a-b);
        }else if(direction == Direction.Down && !this.downQueue.includes(floor)){
            this.downQueue.push(floor)
            this.downQueue.sort((a, b)=> b-a)
        }

        if(this.direction == Direction.Idle){
            this.direction = (this.currentFloor < floor) ? Direction.Up : Direction.Down
        }
    }

    updateState(){
        if(this.state == 'door_open'){
            return
        }

        let targetQueue = (this.direction == Direction.Up) ? this.upQueue : this.downQueue


        // if the current queue is empty , check the other direction
        if(targetQueue.length == 0){
            // Reverse the direction for LOOK
            this.direction = this.direction == Direction.Up ? Direction.Down : Direction.Up
            targetQueue = this.direction == Direction.Up ? this.upQueue : this.downQueue

            this.system.handlePendingRequest(this)

        }

        if(this.upQueue.length == 0 && this.downQueue == 0){
            this.state = Direction.Idle
            this.direction = Direction.Idle
            return
        }

        //Move to target floor
        let targetFloor = targetQueue[0]
        if(this.currentFloor < targetFloor){
            this.currentFloor++
            this.state = 'moving'
            console.log(`Elevator ${this.id} moving up to floor ${this.currentFloor}`)
        }else if(this.currentFloor > targetFloor){
            this.currentFloor--
            this.state = 'moving'
            console.log(`Elevator ${this.id} moving down to floor ${this.currentFloor}`)
        }else{
            this.openDoor()
            targetQueue.shift()
        }

    }

    openDoor(){

        console.log(`Elevator ${this.id} opening door at floor ${this.currentFloor}`)
        this.state = 'door_open'

        setTimeout(()=> this.closeDoor(), 3000);

    }

    closeDoor(){
        console.log(`Elevator ${this.id} closing door`)
        this.state = 'door_closed'
        this.updateState()
    }



}

module.exports = Elevator
