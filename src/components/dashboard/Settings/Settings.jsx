import React, { useState } from 'react';  
import "./Settings.css";  

export const Settings = () => {  
    const [tshirtSize, setTshirtSize] = useState('');  
    const [otherInfo, setOtherInfo] = useState('');  

    const handleLeaveTroop = () => {  
        // Logic to leave the troop  
        alert("You have left the troop.");  
    };  

    const handleSave = () => {  
        // Logic to save settings  
        alert(`Saved: Size - ${tshirtSize}, Info - ${otherInfo}`);  
    };  

    return (  
        <div className="SettingsMainContainer">  
            <h2>Settings</h2>  
            <ul className="SettingsList">  
                <li>  
                    <label>  
                        T-shirt Size:  
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
                        Other Info:  
                        <input  
                            type="text"  
                            value={otherInfo}  
                            onChange={(e) => setOtherInfo(e.target.value)}  
                            placeholder="Enter other info"  
                        />  
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