// import React from 'react';
import { useState } from "react";
import Actions from "./Actions";
import Listing from "./Listing";
import Map from "./Map";

const ParkingManagement = () => {

    const [flag, setFlag] = useState<boolean>(false);

    return (
        <div className="parkingManagement">
            <Map flag={flag} />
            <Listing flag={flag} />
            <Actions flag={flag} setFlag={setFlag} />
        </div>
    );
};

export default ParkingManagement;