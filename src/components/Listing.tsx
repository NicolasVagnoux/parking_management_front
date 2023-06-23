import axios from 'axios';
import { useState, useEffect } from 'react';
import { IParkingSpace } from '../interfaces/IParkingSpace';

interface Props {
    flag: boolean;
}

const Listing = ({flag}: Props) => {

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
        <div className="listing">
            <h2 className="listing__header1">Liste des places libres :</h2>
            <div className="listing__available">
                {parkingSpaces && parkingSpaces
                    .filter(space => space.isOccupied == 0)
                    .map(space => <p key={space.id}>n° {space.id}</p>)
                }
            </div>
            <h2 className="listing__header2">Liste des places occupées :</h2>
            <div className="listing__occupied">
                {parkingSpaces && parkingSpaces
                    .filter(space => space.isOccupied == 1)
                    .map(space => <p key={space.id}>n° {space.id}</p>)
                }
            </div>
        </div>
    );
};

export default Listing;