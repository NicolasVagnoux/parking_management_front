import Actions from "./Actions";
import Listing from "./Listing";
import Map from "./Map";
import { IParkingSpace } from "../interfaces/IParkingSpace";
// Redux
import { useSelector } from 'react-redux';
import { selectParkingList } from '../redux/parkingSlice';

const ParkingManagement = () => {

    // Getting list with Redux
    const parkingList: IParkingSpace[] = useSelector(selectParkingList);

    return (
        <div className="parkingManagement">
            {!parkingList && <p className="loading">Chargement en cours</p>}
            {parkingList &&
            <>
                <Map />
                <Listing />
                <Actions />
            </>
            }
        </div>
    );
};

export default ParkingManagement;