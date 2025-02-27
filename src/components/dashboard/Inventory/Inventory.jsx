import "./Inventory.css";
import 'boxicons'
import AdventurefulsImg from "../../../assets/CookieImages/AdventurefulsImg.png"
import CaramelChocolateChipImg from "../../../assets/CookieImages/CaramelChocolateChipImg.png"

import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../../../config/firebase"
import { doc, getDoc, collection, updateDoc, deleteDoc, setDoc} from 'firebase/firestore';

export const Inventory = () => {
    const { user, loading, UserData} = useAuth();

    if (loading) return <p>Loading...</p>;

    const [InventoryList, setInventoryList] = useState([]);
    const [TableUpdate, setTableUpdate] = useState("false");

    const CookiesRef = doc(db, "Troops", `Troop#${UserData.TroopNumber}`, "Inventory", "Cookies");

    useEffect(() => {
        if (!UserData.TroopNumber) return;

        const getInventoryList = async () => {
            try{
                const DocSnap = await getDoc(CookiesRef);
                
                setInventoryList(DocSnap.data());
                console.log(DocSnap.data());
                setTableUpdate(false);
            }catch (err){
                console.error(err);
            }
        }

        getInventoryList();
    }, [UserData.TroopNumber, TableUpdate]);

    return(
        <>
            <div className="MainContainer">
                <div className="InventoryButtons">
                    <span>Edit</span><span>Search</span>
                </div>
                {InventoryList ? (
                    <ul className="InventoryList">
                        <li>
                            <img src={AdventurefulsImg}></img>
                            <p><b>Adventurefuls:</b> {InventoryList.Adventurefuls}</p>
                        </li>
                        <li>
                            <img src={CaramelChocolateChipImg}></img>
                            <p><b>Caramel Chocolate Chip: </b>{InventoryList.CaramelChocolateChip}</p>
                        </li>
                    </ul>
                ) : (
                    <p>Loading...</p>
                )}
                
                <ul className="InventoryList">
                    
                </ul>

            </div>
        </>
    );
}