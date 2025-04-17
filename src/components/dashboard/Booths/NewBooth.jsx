import "./NewBooth.css"

import { useState, useEffect } from "react";
import { doc, collection, addDoc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../auth/AuthContext";
import { getDocs } from "firebase/firestore";

export const NewBooth = ({ setIsCreatingBooth }) => {
    const { user, loading, UserData } = useAuth();
    const BoothsRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "Booths");

    const [formData, setFormData] = useState({
        BoothLocation: "",
        TimeOfBooth: "",
        DayOfBooth: "",
        ClaimedBy: "",
        BoothListingCreated: new Date().toISOString(),
      });

    const handleChange = (e, formField) => {
        setFormData((prev) => ({
            ...prev,
            [formField]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add new booth to Booths collection in Firebase
        await addDoc(BoothsRef, formData);

        // Clear the input fields after submission
        setFormData({
            BoothLocation: "",
            TimeOfBooth: "",
            DayOfBooth: "",
            ClaimedBy: "",
        });

        setIsCreatingBooth(false);
    };

    return(
        <>
            <div className="NewBoothBox">
                <label>Booth Location: </label>
                <br/>
                <input
                    id="BoothLocation"
                    type="text"
                    value={formData.BoothLocation}
                    onChange={(e) => handleChange(e, "BoothLocation") }
                />

                <br/>

                <label>Time Of Booth: </label>
                <br/>
                <input
                    id="TimeOfBooth"
                    type="text"
                    value={formData.TimeOfBooth}
                    onChange={(e) => handleChange(e, "TimeOfBooth") }
                />

                <br/>

                <label>Day Of Booth: </label>
                <br/>
                <input
                    id="DayOfBooth"
                    type="date"
                    value={formData.DayOfBooth}
                    onChange={(e) => handleChange(e, "DayOfBooth") }
                />

                <br/>

                <br/><br/>

                <button id="NewBoothButton" onClick={handleSubmit}>Create</button>

                <br/>

            </div>
        </>
    )
}