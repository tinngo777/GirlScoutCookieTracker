import "./Members.css";

import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../../../config/firebase"
import { doc, getDocs, collection, updateDoc, deleteDoc, setDoc} from 'firebase/firestore';

export const Members = () => {
    const { user, loading, UserData} = useAuth();
    
    if (loading) return <p>Loading...</p>;

    const [MemberList, setMemberList] = useState([]);
    const [TableUpdate, setTableUpdate] = useState("false");

    const MembersRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "Members")

    useEffect(() => {
        if (!UserData.TroopNumber) return;

        const getMemberList = async () => {
            try{
                const data = await getDocs(MembersRef);
                const filteredData = data.docs.map(doc => ({id: doc.id, ...doc.data() }));
                const sortedData = filteredData.sort((a, b) => (b.Role === "Leader") - (a.Role === "Leader"));


                setMemberList(sortedData);
                setTableUpdate(false);
            }catch (err){
                console.error(err);
            }
        }

        getMemberList();
    }, [UserData.TroopNumber, TableUpdate]);

    return(
        <>
            <div className="MembersMainContainer">
                <ul className="MembersList">
                    {MemberList.map((Member) => (
                        <li key={Member.id}>
                            <span><b>{Member.Name}:</b> {Member.Role}</span>
                        </li>
                    ))}
                    
                </ul>

            </div>
        </>
    );
}