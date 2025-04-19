import "./NewBooth.css"  
import { useState } from "react";  
import { collection, addDoc } from "firebase/firestore";  
import { db } from "../../../../config/firebase";  
import { useAuth } from "../../../auth/AuthContext";  

export const NewBooth = ({ setIsCreatingBooth }) => {  
    const { UserData } = useAuth();  
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
        if (!formData.BoothLocation || !formData.TimeOfBooth || !formData.DayOfBooth) {  
            alert("Please fill all required fields");  
            return;  
        }  

        await addDoc(BoothsRef, formData);  
        setFormData({  
            BoothLocation: "",  
            TimeOfBooth: "",  
            DayOfBooth: "",  
            ClaimedBy: "",  
        });  
        setIsCreatingBooth(false);  
    };  

    return (  
        <div className="NewBoothContainer">  
            <div className="NewBoothBox">  
                <h3>Create New Booth</h3>  
                
                <div className="FormGroup">  
                    <label>Booth Location:</label>  
                    <input  
                        type="text"  
                        value={formData.BoothLocation}  
                        onChange={(e) => handleChange(e, "BoothLocation")}  
                        placeholder="Enter location"  
                        required  
                    />  
                </div>  

                <div className="FormGroup">  
                    <label>Time Of Booth:</label>  
                    <input  
                        type="time"  
                        value={formData.TimeOfBooth}  
                        onChange={(e) => handleChange(e, "TimeOfBooth")}  
                        required  
                    />  
                </div>  

                <div className="FormGroup">  
                    <label>Day Of Booth:</label>  
                    <input  
                        type="date"  
                        value={formData.DayOfBooth}  
                        onChange={(e) => handleChange(e, "DayOfBooth")}  
                        required  
                    />  
                </div>  

                <div className="ButtonGroup">  
                    <button   
                        type="button"   
                        className="CancelButton"  
                        onClick={() => setIsCreatingBooth(false)}  
                    >  
                        Cancel  
                    </button>  
                    <button   
                        type="submit"   
                        className="SubmitButton"  
                        onClick={handleSubmit}  
                    >  
                        Create Booth  
                    </button>  
                </div>  
            </div>  
        </div>  
    )  
}  