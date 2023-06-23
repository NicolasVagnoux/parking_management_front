
interface Props {
    id: number,
    isOccupied: number,
    row: number
}

const ParkingSpace = ({id, isOccupied, row}: Props) => {

    return (
        <div className='parkingSpace' 
             style={{color: `${isOccupied ? 'red' : 'green'}`, justifyContent: `${row == 1 ? 'flex-end' : 'flex-start'}` }}
        >
            <p>n° {id < 10 ? '0'+id : id}</p>
        </div>
    );
};

export default ParkingSpace;