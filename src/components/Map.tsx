import axios from 'axios';
import { useState, useEffect } from 'react';
import { IParkingSpace } from '../interfaces/IParkingSpace';
import ParkingSpace from './ParkingSpace';

interface Props {
    flag: boolean;
}

const Map = ({flag}: Props) => {

    const [parkingSpaces, setParkingSpaces] = useState<IParkingSpace[]>([]);

    useEffect(() => {
        const getParkingList = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}`);
            setParkingSpaces(data);
        };
        getParkingList();
        console.log(parkingSpaces);
    }, [flag]);

    return (
        <div className="map">
            <h2 className='map__header'>Carte du parking :</h2>
            <h3 className='map__helper'>
                <span>{parkingSpaces.filter(x => x.isOccupied == 0).length} Places libres </span>
                 / 
                <span> {parkingSpaces.filter(x => x.isOccupied == 1).length} Places occupées</span>
            </h3>
            <div className='map__rows'>
                <div className="map__rows__firstRow">
                    {parkingSpaces && parkingSpaces
                        .filter(space => space.id <= 8)
                        .map(space => <ParkingSpace {...space} row={1} key={space.id} />)
                    }
                </div>
                <div className="map__rows__secondRow">
                    {parkingSpaces && parkingSpaces
                        .filter(space => space.id > 8)
                        .map(space => <ParkingSpace {...space} row={2} key={space.id} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Map;