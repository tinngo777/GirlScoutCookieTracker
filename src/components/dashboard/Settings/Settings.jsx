import React, { useState } from 'react';  
import './Settings.css';  

const Settings = () => {  
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
        <div className="settings-container">  
            <h2>Settings</h2>  
            <div className="SettingsList">  
                <label>  
                    T-shirt Size:  
                    <select value={tshirtSize} onChange={(e) => setTshirtSize(e.target.value)}>  
                        <option value="">Select Size</option>  
                        <option value="S">Small</option>  
                        <option value="M">Medium</option>  
                        <option value="L">Large</option>  
                        <option value="XL">Extra Large</option>  
                    </select>  
                </label>  
                <label>  
                    Other Info:  
                    <input  
                        type="text"  
                        value={otherInfo}  
                        onChange={(e) => setOtherInfo(e.target.value)}  
                        placeholder="Enter other info"  
                    />  
                </label>  
                <button onClick={handleSave}>Save Settings</button>  
                <button className="leave-troop" onClick={handleLeaveTroop}>Leave Troop</button>  
            </div>  
        </div>  
    );  
};  

export default Settings;  