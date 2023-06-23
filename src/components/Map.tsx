import { IParkingSpace } from '../interfaces/IParkingSpace';
import ParkingSpace from './ParkingSpace';
// Redux
import { useSelector } from 'react-redux';
import { selectParkingList } from '../redux/parkingSlice';

const Map = () => {

    // Getting list with Redux
    const parkingList: IParkingSpace[] = useSelector(selectParkingList);

    return (
        <div className="map">
            <h2 className='map__header'>Carte du parking :</h2>
            <h3 className='map__helper'>
                <span>{parkingList.filter(x => x.isOccupied == 0).length} Places libres </span>
                 / 
                <span> {parkingList.filter(x => x.isOccupied == 1).length} Places occupées</span>
            </h3>
            <div className='map__rows'>
                <div className="map__rows__firstRow">
                    {parkingList && parkingList
                        .filter(space => space.id <= 8)
                        .map(space => <ParkingSpace {...space} row={1} key={space.id} />)
                    }
                </div>
                <div className="map__rows__secondRow">
                    {parkingList && parkingList
                        .filter(space => space.id > 8)
                        .map(space => <ParkingSpace {...space} row={2} key={space.id} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Map;