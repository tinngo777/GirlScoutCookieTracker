import "./Messages.css";
import 'boxicons'

import { useAuth } from "../../../auth/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../../../../config/firebase"
import { doc, getDocs, collection, updateDoc, deleteDoc, setDoc} from 'firebase/firestore';
import { UserCheck, UserX } from "../../../../assets/Icons"

export const Messages = () => {
    const { user, loading, UserData} = useAuth();

    if (loading) return <p>Loading...</p>;

    const [MemberRequests, setMemberRequests] = useState([]);
    const [TableUpdate, setTableUpdate] = useState("false");

    const MembersRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "Members")
    const MemberRequestsRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "MemberRequests")

    useEffect(() => {
        if (!UserData.TroopNumber) return;

        const getMemberRequests = async () => {
            try{
                const data = await getDocs(MemberRequestsRef);
                const filteredData = data.docs
                    .filter(doc => doc.id !== "PlaceholderRequest")
                    .map(doc => ({id: doc.id, ...doc.data() }));

                setMemberRequests(filteredData);
                setTableUpdate(false);
            }catch (err){
                console.error(err);
            }
        }

        getMemberRequests();
    }, [UserData.TroopNumber, TableUpdate]);

    
    const AcceptRequest = async (requestID, requesterName) => {
        //Update the members collection in the troop
        await setDoc(doc(MembersRef, requestID), {
            Name: requesterName,
            Role: "Member",
        });
        
        //Update the troop number and role 
        const MemberRef = doc(db, "Users", requestID);
        await updateDoc(MemberRef, {
            "TroopNumber": UserData.TroopNumber,
            "TroopRole": "Member",
        });

        //delete request
        await deleteDoc(doc(MemberRequestsRef, requestID));
        
        //recall getmember request to refresh page
        setTableUpdate("true");

        
    }

    const DenyRequest = async (requestID) => {
        //delete request
        
        await deleteDoc(doc(MemberRequestsRef, requestID));
        
        //recall getmember request to refresh page
        setTableUpdate("true");
    }


    return(
        <>
            <div className="MessagesMainContainer">
                {UserData.TroopRole === "Leader" || UserData.TroopRole === "Co-leader" ? (
                    <ul className="MessagesList">
                        {MemberRequests.map((request) => (
                            <li key={request.id}>
                                <span><b>{request.Username}</b> is asking to join the troop!</span>
                                <div>
                                    <UserCheck className="UserCheck" onClick={() => AcceptRequest(request.id, request.Username)}/>
                                    <UserX className="UserX" onClick={() => DenyRequest()}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                ):(
                    <ul className="MessagesList">
                        {MemberRequests.map((request) => (
                            <li key={request.id}>
                                <span><b>{request.Username}</b> is asking to join the troop!</span>
                            </li>
                        ))}
                    </ul>
                )}
                

            </div>
        </>
    );
}