import "./Inventory.css";
import 'boxicons'

import AdventurefulsImg from "../../../assets/CookieImages/AdventurefulsImg.png"
import CaramelChocolateChipImg from "../../../assets/CookieImages/CaramelChocolateChipImg.png"
import CarameldeLitesImg from "../../../assets/CookieImages/CarameldeLitesImg.png"
import GirlScoutSmoresImg from "../../../assets/CookieImages/GirlScoutSmoresImg.png"
import LemonadesImg from "../../../assets/CookieImages/LemonadesImg.png"
import LemonUpsImg from "../../../assets/CookieImages/LemonUpsImg.png"
import PeanutButterPattiesImg from "../../../assets/CookieImages/PeanutButterPattiesImg.png"
import PeanutButterSandwichImg from "../../../assets/CookieImages/PeanutButterSandwichImg.png"
import ThinMintsImg from "../../../assets/CookieImages/ThinMintsImg.png"
import ToastYayImg from "../../../assets/CookieImages/ToastYayImg.png" 
import ToffeetasticImg from "../../../assets/CookieImages/ToffeetasticImg.png"
import TrefoilsImg from "../../../assets/CookieImages/TrefoilsImg.png"

import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../../../config/firebase"
import { doc, getDoc, collection, updateDoc, deleteDoc, setDoc} from 'firebase/firestore';

export const Inventory = () => {
    const { user, loading, UserData} = useAuth();

    if (loading) return <p>Loading...</p>;

    const [InventoryList, setInventoryList] = useState([]);
    const [TableUpdate, setTableUpdate] = useState(false);
    const [IsEditing, setIsEditing] = useState(false);

    const CookiesRef = doc(db, "Troops", `Troop#${UserData.TroopNumber}`, "Inventory", "Cookies");

    useEffect(() => {
        if (!UserData.TroopNumber) return;

        const getInventoryList = async () => {
            try{
                const DocSnap = await getDoc(CookiesRef);
                setInventoryList(DocSnap.data());
                setTableUpdate(false);
            }catch (err){
                console.error(err);
            }
        }

        getInventoryList();
    }, [UserData.TroopNumber, TableUpdate]);

    const InventoryEdit = async () => {
        //If the stop edit button is pressed then the inventory counts will be updated
        if(IsEditing){
            await updateDoc(CookiesRef, Object.fromEntries(
                Object.entries(InventoryList).map(([key, value]) => [key, Number(value)])
            ));
            setTableUpdate(true);
        }
        setIsEditing(!IsEditing);
    }

    const handleChange = (e, cookieType) => {
        setInventoryList((prev) => ({
            ...prev,
            [cookieType]: e.target.value
        }));
    };

    return(
        <>
            <div className="IventoryMainContainer">
                <div className="InventoryButtonBar">
                    {IsEditing ? (
                        <button className="InventoryEditButtons" onClick={InventoryEdit}><b>Stop Editing</b></button>
                    ) : (
                        <button className="InventoryEditButtons" onClick={InventoryEdit}><b>Edit Inventory Counts</b></button>
                    )}
                    
                </div>

                <div className="InventoryListDiv">
                {InventoryList ? (
                    <ul className="InventoryList">

                        <li id="Adventurefuls">
                            <img src={AdventurefulsImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Adventurefuls:</b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["Adventurefuls"]} onChange={(e) => handleChange(e, "Adventurefuls") } onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Adventurefuls: </b> {InventoryList.Adventurefuls}</p>
                            )}
                        </li>

                        <li id="CaramelChocolateChip">
                            <img src={CaramelChocolateChipImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Caramel Chocolate Chip:</b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["CaramelChocolateChip"]} onChange={(e) => handleChange(e, "CaramelChocolateChip")} onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Caramel Chocolate Chip: </b> {InventoryList.CaramelChocolateChip}</p>
                            )}
                        </li>

                        <li id="CarameldeLites">
                            <img src={CarameldeLitesImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Caramel deLites: </b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["CarameldeLites"]} onChange={(e) => handleChange(e, "CarameldeLites")} onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Caramel deLites: </b> {InventoryList.CarameldeLites}</p>
                            )}
                        </li>

                        <li id="Samoas">
                            <img src={CarameldeLitesImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Samoas: </b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["Samoas"]} onChange={(e) => handleChange(e, "Samoas")} onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Samoas: </b> {InventoryList.Samoas}</p>
                            )}
                        </li>

                        <li id="PeanutButterSandwich">
                            <img src={PeanutButterSandwichImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Peanut Butter Sandwich: </b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["PeanutButterSandwich"]} onChange={(e) => handleChange(e, "PeanutButterSandwich")} onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Peanut Butter Sandwich: </b> {InventoryList.PeanutButterSandwich}</p>
                            )}
                        </li>

                        <li>
                            <img src={PeanutButterSandwichImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Do-si-dos: </b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["Dosidos"]} onChange={(e) => handleChange(e, "Dosidos")} onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Do-si-dos: </b> {InventoryList.Dosidos}</p>
                            )}
                        </li>

                        <li>
                            <img src={GirlScoutSmoresImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Girl Scout S'mores: </b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["GirlScoutSmores"]} onChange={(e) => handleChange(e, "GirlScoutSmores")} onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Girl Scout S'mores: </b> {InventoryList.GirlScoutSmores}</p>
                            )}
                        </li>

                        <li>
                            <img src={LemonadesImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Lemonades: </b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["Lemonades"]} onChange={(e) => handleChange(e, "Lemonades")} onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Lemonades: </b> {InventoryList.Lemonades}</p>
                            )}
                        </li>

                        <li>
                            <img src={LemonUpsImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Lemon-Ups: </b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["LemonUps"]} onChange={(e) => handleChange(e, "LemonUps")} onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Lemon-Ups: </b> {InventoryList.LemonUps}</p>
                            )}
                        </li>

                        <li>
                            <img src={PeanutButterPattiesImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Peanut Butter Patties: </b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["PeanutButterPatties"]} onChange={(e) => handleChange(e, "PeanutButterPatties")} onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Peanut Butter Patties: </b> {InventoryList.PeanutButterPatties}</p>
                            )}
                        </li>

                        <li>
                            <img src={PeanutButterPattiesImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Tagalongs: </b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["Tagalongs"]} onChange={(e) => handleChange(e, "Tagalongs")} onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Tagalongs: </b> {InventoryList.Tagalongs}</p>
                            )}
                        </li>

                        <li>
                            <img src={ThinMintsImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Thin Mints: </b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["ThinMints"]} onChange={(e) => handleChange(e, "ThinMints")} onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Thin Mints: </b> {InventoryList.ThinMints}</p>
                            )}
                        </li>

                        <li>
                            <img src={ToastYayImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Toast-Yays!: </b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["ToastYays"]} onChange={(e) => handleChange(e, "ToastYays")} onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Toast-Yay!: </b> {InventoryList.ToastYays}</p>
                            )}
                        </li>

                        <li>
                            <img src={ToffeetasticImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Toffee-tastic: </b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["ToffeeTastic"]} onChange={(e) => handleChange(e, "ToffeeTastic")} onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Toffee-tastic: </b> {InventoryList.ToffeeTastic}</p>
                            )}
                        </li>

                        <li>
                            <img src={TrefoilsImg}></img>
                            {IsEditing ? (
                                <>
                                    <p><b>Trefoils: </b></p>
                                    <input type="number" className="InventoryInput" value={InventoryList["Trefoils"]} onChange={(e) => handleChange(e, "Trefoils")} onKeyDown={(e) => e.key === "Enter" && InventoryEdit()}/> 
                                </>
                            ) : (
                                <p><b>Trefoils: </b> {InventoryList.Trefoils}</p>
                            )}
                        </li>

                    </ul>
                ) : (
                    <p>Loading...</p>
                )}
                </div>
                

            </div>
        </>
    );
}