// import ElevatorSystem from "./elevator-system";
// import Direction from "./direction";

const ElevatorSystem = require('./elevator-system');
const Direction = require('./direction');


const elevatorSystem = new ElevatorSystem(10, 3);

elevatorSystem.requestElevator(5, Direction.Up)
elevatorSystem.requestElevator(7, Direction.Down)
elevatorSystem.requestElevator(3, Direction.Up)
elevatorSystem.requestElevator(9, Direction.Down)
elevatorSystem.requestElevator(2, Direction.Up)


setInterval(()=>{
    elevatorSystem.step()
}, 1000)

