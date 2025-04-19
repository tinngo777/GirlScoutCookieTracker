import React, { useState } from 'react';  
import "./Settings.css";  

export const Settings = () => {  
    const [tshirtSize, setTshirtSize] = useState('');  
    const [scoutName, setScoutName] = useState('');  

    const handleLeaveTroop = () => {  
        // Logic to leave the troop  
        alert("You have left the troop.");  
    };  

    const handleSave = () => {  
        
    };  

    return (  
        <div className="SettingsMainContainer">  
            <h2>Settings</h2>  
            <ul className="SettingsList">  
                <li>  
                    <label>  
                        Scout's T-shirt Size:  
                        <select value={tshirtSize} onChange={(e) => setTshirtSize(e.target.value)}>  
                            <option value="" disabled>Select Size</option>  
                            <option value="S">Small</option>  
                            <option value="M">Medium</option>  
                            <option value="L">Large</option>  
                            <option value="XL">Extra Large</option>  
                        </select>  
                    </label>  
                </li>  
                <li>  
                    <label>  
                        Scout's Name:  
                        <input type="text" onChange={(e) => setScoutName(e.target.value)}/>  
                    </label>  
                </li>  
                <li>  
                    <button className='SaveSettingsButton' onClick={handleSave}>Save Settings</button>  
                </li>  
                <li>  
                    <button className="LeaveTroopButton" onClick={handleLeaveTroop}>Leave Troop</button>  
                </li>  
            </ul>  
        </div>  
    );  
};  