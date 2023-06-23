import { IParkingSpace } from '../interfaces/IParkingSpace';
// Redux
import { useSelector } from 'react-redux';
import { selectParkingList } from '../redux/parkingSlice';

const Listing = () => {

    // Getting list with Redux
    const parkingList: IParkingSpace[] = useSelector(selectParkingList);

    return (
        <div className="listing">
            <h2 className="listing__header1">Liste des places libres :</h2>
            <div className="listing__available">
                {parkingList && parkingList
                    .filter(space => space.isOccupied == 0)
                    .map(space => <p key={space.id}>n° {space.id}</p>)
                }
            </div>
            <h2 className="listing__header2">Liste des places occupées :</h2>
            <div className="listing__occupied">
                {parkingList && parkingList
                    .filter(space => space.isOccupied == 1)
                    .map(space => <p key={space.id}>n° {space.id}</p>)
                }
            </div>
        </div>
    );
};

export default Listing;