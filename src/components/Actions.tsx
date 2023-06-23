// import React from 'react';
import axios from 'axios';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { IParkingSpace } from '../interfaces/IParkingSpace';

interface Props {
    flag: boolean;
    setFlag: Dispatch<SetStateAction<boolean>>;
}

const Actions = ({ flag, setFlag }: Props) => {

    // Liste
    const [parkingSpaces, setParkingSpaces] = useState<IParkingSpace[]>([]);

    // Free parking spaces
    const [idToFree, setIdToFree] = useState<string>('');
    const [isConfirmationOpened, setIsConfirmationOpened] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    // Create ticket
    const [isTicketOpened, setIsTicketOpened] = useState<boolean>(false);
    const [idTicket, setIdTicket] = useState<string>('');

    useEffect(() => {
        const getParkingList = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}`);
            setParkingSpaces(data);
        };
        getParkingList();
    }, [flag]);

    const freeParkingSpace = async (e: React.FormEvent<HTMLButtonElement>, id: string): Promise<void> => {
        try {
            e.preventDefault();
            await axios.put(`${import.meta.env.VITE_API_URL}/${id}`);
            setIsConfirmationOpened(false);
            setFlag(!flag);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setIdToFree('');
            }, 3000);
          } catch (err) {
            console.error(err);
          }
    };

    // Fisher-Yates algorithm to shuffle an array
    const shuffle = (array: Array<number>) => {
        let currentIndex = array.length,  randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];  
        }
        return array;
    };

    const createTicket = async (e: React.FormEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            const availableIds: Array<number> = [];
            parkingSpaces.filter(x => x.isOccupied == 0).map(x => availableIds.push(x.id));
            const randomId: number = shuffle(availableIds)[0];
            await axios.put(`${import.meta.env.VITE_API_URL}/${randomId}`);
            setIdTicket(randomId.toLocaleString());
            setIsTicketOpened(true);
            setFlag(!flag);
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <>
        <div className='actions'>
            <h2 className='actions__header1'>Prendre une place :</h2>
            <button className='actions__createTicket' onClick={(e: React.FormEvent<HTMLButtonElement>) => createTicket(e)} type='button'>
                Générer un nouveau ticket
            </button>
            <h2 className='actions__header2'>Libérer une place :</h2>
            <h3 className='actions__helper'>Sélectionnez une place parmi les places actuellement occupées :</h3>
            <div className="actions__freeParkingSpace">
                {parkingSpaces && parkingSpaces
                    .filter(space => space.isOccupied == 1)
                    .map(space => <button key={space.id} type='button' onClick={() => {setIsConfirmationOpened(true); setIdToFree(space.id.toLocaleString())}}>n° {space.id}</button>)
                }
            </div>
            {isConfirmationOpened && <div className='actions__freeParkingSpace__confirmation'>
                <p>Êtes-vous sûr(e) de vouloir libérer la place ?</p>
                <div>
                    <button type='button' onClick={(e: React.FormEvent<HTMLButtonElement>) => freeParkingSpace(e, idToFree)}>Oui</button>
                    <button type='button' onClick={() => setIsConfirmationOpened(false)}>Non</button>
                </div>
            </div>}
            {success && <p>La place n°{idToFree} a bien été libérée !</p>}
        </div>
        {isTicketOpened && 
        <div className='ticket'>
            <p>Ticket de stationnement</p>
            <p>Place n°{idTicket}</p>
            <p>Merci ! 🚘</p>
            <button type='button' onClick={() => {setIsTicketOpened(false); setIdTicket('')}}>X</button>
        </div>}
        </>
    );
};

export default Actions;