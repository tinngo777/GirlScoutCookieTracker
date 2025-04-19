import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

//import './Settings.css';

export const Settings = () => {  
    
    const [tshirtSize, setTshirtSize] = useState('');  
    const [scoutsName, setScoutsName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    return (  
        <div className="SettingsMainContainer">  
            <h2>Settings</h2>  
            <ul className="SettingsList">  
                <li>  
                    <label>  
                        T-shirt Size:  
                        <select 
                            value={tshirtSize} 
                            //onChange={(e) => setTshirtSize(e.target.value)}
                            //disabled={loading}
                        >  
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
                        <input  
                            type="text"  
                            value={scoutsName}  
                            //onChange={(e) => setScoutsName(e.target.value)}  
                            placeholder="Enter scout's name"  
                            //disabled={loading}
                        />  
                    </label>  
                </li>  
                <li>  
                    <button 
                        className='SaveSettingsButton' 
                        //onClick={handleSave}
                        //disabled={loading}
                    >  
                        
                    </button>  
                </li>  
                <li>  
                    <button 
                        className="LeaveTroopButton" 
                        //onClick={handleLeaveTroop}
                        //disabled={loading}
                    >  
                        Leave Troop  
                    </button>  
                </li>  
            </ul>  
        </div>  
    );  
};  