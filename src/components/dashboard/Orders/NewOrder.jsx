import "./NewOrder.css"

import { useState, useEffect } from "react";
import { doc, collection, addDoc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../auth/AuthContext";
import { getDocs } from "firebase/firestore";

export const NewOrder = () => {
    const { user, loading, UserData } = useAuth();
    const OutstandingOrdersRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "OutstandingOrders");


    const [formData, setFormData] = useState({
        PlacedBy: UserData.Name,
        TimeOfOrder: "",
        OrderReadey: false,
        CustomerName: "",
        CustomerEmail: "",
        Adventurefuls: "",
        CaramelChocolateChip: "",
        CarameldeLites: "",
        Samoas: "",
        PeanutButterSandwhich: "",
        Dosidos: "",
        GirlScoutSmores: "",
        Lemonades: "",
        LemonUps: "",
        PeanutButterPatties: "",
        Tagalongs: "",
        ThinMints: "",
        ToastYays: "",
        ToffeeTastic: "",
        Trefoils: "",
      });

    const handleChange = (e, cookieType) => {
        setFormData((prev) => ({
            ...prev,
            [cookieType]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Set Time Of Order
        setFormData({
            TimeOfOrder: new Date().toISOString()
        })

        //Add order to Outstanding orders in firebase
        await addDoc(OutstandingOrdersRef, formData);

        // Clear the input fields after submission
        setFormData({
            CustomerName: "",
            CustomerEmail: "",
            Adventurefuls: "",
            CaramelChocolateChip: "",
            CarameldeLites: "",
            Samoas: "",
            PeanutButterSandwhich: "",
            Dosidos: "",
            GirlScoutSmores: "",
            Lemonades: "",
            LemonUps: "",
            PeanutButterPatties: "",
            Tagalongs: "",
            ThinMints: "",
            ToastYays: "",
            ToffeeTastic: "",
            Trefoils: "",
        });
      };

    return(
        <>
            <div className="NewOrderBox">
                <label>Customer Name: </label>
                <br/>
                <input
                    id="CustomerName"
                    type="text"
                    value={formData.CustomerName}
                    onChange={(e) => handleChange(e, "CustomerName") }
                />

                <br/>

                <label>Customer Email: </label>
                <br/>
                <input
                    id="CustomerEmail"
                    type="email"
                    value={formData.CustomerEmail}
                    onChange={(e) => handleChange(e, "CustomerEmail") }
                />

                <br/>

                <label>Number of Adventurefuls: </label>
                <br/>
                <input
                    id="AdventurefulsOrder"
                    type="number"
                    value={formData.Adventurefuls}
                    onChange={(e) => handleChange(e, "Adventurefuls") }
                />

                <br/>

                <label>Number of Caramel Chocolate Chip: </label>
                <br/>
                <input
                    id="CaramelChocolateChipOrder"
                    type="number"
                    value={formData.CaramelChocolateChip}
                    onChange={(e) => handleChange(e, "CaramelChocolateChip") }
                />

                <br/>

                <label>Number of Caramel deLites: </label>
                <br/>
                <input
                    id="CarameldeLitesOrder"
                    type="number"
                    value={formData.CarameldeLites}
                    onChange={(e) => handleChange(e, "CarameldeLites") }
                />

                <br/>

                <label>Number of Samoas: </label>
                <br/>
                <input
                    id="Samoas"
                    type="number"
                    value={formData.Samoas}
                    onChange={(e) => handleChange(e, "Samoas") }
                />

                <br/>

                <label>Number of Peanut Butter Sandwhich: </label>
                <br/>
                <input
                    id="PeanutButterSandwhich"
                    type="number"
                    value={formData.PeanutButterSandwhich}
                    onChange={(e) => handleChange(e, "PeanutButterSandwhich") }
                />

                <br/>

                <label>Number of Do-si-dos: </label>
                <br/>
                <input
                    id="Dosidos"
                    type="number"
                    value={formData.Dosidos}
                    onChange={(e) => handleChange(e, "Dosidos") }
                />

                <br/>

                <label>Number of Girl Scout S'mores: </label>
                <br/>
                <input
                    id="GirlScoutSmores"
                    type="number"
                    value={formData.GirlScoutSmores}
                    onChange={(e) => handleChange(e, "GirlScoutSmores") }
                />

                <br/>

                <label>Number of Lemonades: </label>
                <br/>
                <input
                    id="Lemonades"
                    type="number"
                    value={formData.Lemonades}
                    onChange={(e) => handleChange(e, "Lemonades") }
                />

                <br/>

                <label>Number of Lemon-Ups: </label>
                <br/>
                <input
                    id="LemonUps"
                    type="number"
                    value={formData.LemonUps}
                    onChange={(e) => handleChange(e, "LemonUps") }
                />

                <br/>

                <label>Number of Peanut Butter Patties: </label>
                <br/>
                <input
                    id="PeanutButterPatties"
                    type="number"
                    value={formData.PeanutButterPatties}
                    onChange={(e) => handleChange(e, "PeanutButterPatties") }
                />

                <br/>

                <label>Number of Tagalongs: </label>
                <br/>
                <input
                    id="Tagalongs"
                    type="number"
                    value={formData.Tagalongs}
                    onChange={(e) => handleChange(e, "Tagalongs") }
                />

                <br/>

                <label>Number of Thin Mints: </label>
                <br/>
                <input
                    id="ThinMints"
                    type="number"
                    value={formData.ThinMints}
                    onChange={(e) => handleChange(e, "ThinMints") }
                />

                <br/>

                <label>Number of Toast-Yays: </label>
                <br/>
                <input
                    id="ToastYaysOrder"
                    type="number"
                    value={formData.ToastYays}
                    onChange={(e) => handleChange(e, "ToastYays") }
                />

                <br/>

                <label>Number of Toffee-Tastic: </label>
                <br/>
                <input
                    id="ToffeeTastic"
                    type="number"
                    value={formData.ToffeeTastic}
                    onChange={(e) => handleChange(e, "ToffeeTastic") }
                />

                <br/>

                <label>Number of Trefoils: </label>
                <br/>
                <input
                    id="Trefoils"
                    type="number"
                    value={formData.Trefoils}
                    onChange={(e) => handleChange(e, "Trefoils") }
                />

                <br/><br/>

                <button id="NewOrderButton" onClick={handleSubmit}>Submit</button>

            </div>
        </>
    )
}