import "./Members.css";

import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../../../config/firebase"
import { doc, getDocs, collection, updateDoc, deleteDoc} from 'firebase/firestore';

export const Members = () => {
    const { user, loading, UserData} = useAuth();
    
    if (loading) return <p>Loading...</p>;

    const [MemberList, setMemberList] = useState([]);
    const [TableUpdate, setTableUpdate] = useState("false");
    const [EditingMember, setEditingMember] = useState("");
    const [NewRole, setNewRole] = useState("");

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

    const CogPress = (Name) => {
        if(Name == EditingMember){
            setEditingMember("");
        }else{
            setEditingMember(Name);
        }
        
    }

    const SaveRoleChange = async (TroopMemberDocId) => {
        if(NewRole !== ""){
            //Creat Doc References
            const UpdatedMemberDocRef = doc(db, "Troops", `Troop#${UserData.TroopNumber}`, "Members", TroopMemberDocId);
            const UpdatedUserDocRef = doc(db, "Users", TroopMemberDocId);

            //Go into troop table and change member list there with updated role
            await updateDoc(UpdatedMemberDocRef, {
                Role: NewRole
            });
        
            //Go into selected member and change their role in the user table 
            await updateDoc(UpdatedUserDocRef, {
                TroopRole: NewRole
            });

            //Rerender the table 
            setTableUpdate(true);
        }
        
        setEditingMember("");
    }

    const RemoveMember = async (TroopMemberDocId) => {
        //Creat Doc References
        const UpdatedMemberDocRef = doc(db, "Troops", `Troop#${UserData.TroopNumber}`, "Members", TroopMemberDocId);
        const UpdatedUserDocRef = doc(db, "Users", TroopMemberDocId);
        
        if (confirm("Are you sure you want to remove this person from the troop?")){
            //Go into troop table and remove doc of the member
            await deleteDoc(UpdatedMemberDocRef);

            //Go into selected member and chair their role and troop to null
            await updateDoc(UpdatedUserDocRef, {
                TroopNumber: null,
                TroopRole: null,
            });

            setTableUpdate(true);
        }

        setEditingMember("");
    }

    return(
        <>
            <div className="MembersPageMainContainer">
                {UserData.TroopRole === "Leader" || UserData.TroopRole ==- "Co-leader" ? (
                    <ul className="MembersPageMembersList">
                    {MemberList.map((Member) => (
                        <li key={Member.id} className={EditingMember === Member.Name ? "SelectedMembersPageMembersListItem" : "InactiveMembersPageMembersListItem"}>
                            {EditingMember == Member.Name ? (
                                <>
                                    <div className="MembersPageTopRow">
                                        <span><b>{Member.Name}:</b> {Member.Role}</span>
                                        <div className={EditingMember === Member.Name ? "rotating" : ""}>
                                            <box-icon name='cog' onClick={() => CogPress(Member.Name)}/>
                                        </div>
                                    </div>
                                    
                                    <div className="MembersPageBottomRow">
                                        <div className="MembersPageEditRoleSection">
                                            <div>
                                                <label><b>Edit Role:  </b></label>
                                                <select name="EditRoleSelection" id="EditRoleSelection" defaultValue="" onChange={(e) => setNewRole(e.target.value)}>
                                                    <option value="" disabled>Choose an Option</option>
                                                    <option value="Member">Member</option>
                                                    <option value="Co-leader" >Co-leader</option>
                                                    
                                                </select>
                                            </div>
                                            <div>
                                                <button className="MemberPageSaveChangesButton" onClick={() => SaveRoleChange(Member.id)}> Save Role Change </button>
                                            </div>
                                            
                                        </div>

                                        <div>
                                            <button className="MemberPageRemoveMemberButton" onClick={() => RemoveMember(Member.id)}>Remove Member</button>
                                        </div>
                                    </div>                  
                                </>
                            ):(
                                <>
                                    <span><b>{Member.Name}:</b> {Member.Role}</span>
                                    {Member.Role === "Leader" ? (
                                        <></>
                                    ):(
                                        <div>
                                            <box-icon name='cog' onClick={() => CogPress(Member.Name)} />
                                        </div>
                                    )}
                                    
                                </>
                            )}
                            
                        </li>
                    ))}
                    
                    </ul>
                ):(
                    <ul className="MembersPageMembersList">
                    {MemberList.map((Member) => (
                        <li key={Member.id} className="InactiveMembersPageMembersListItem">
                            <span><b>{Member.Name}:</b> {Member.Role}</span>
                        </li>
                    ))}
                    
                </ul>
                
                )}
                

            </div>
        </>
    );
}