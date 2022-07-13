import React, { useState, useEffect, useRef } from "react";
import { database } from "../Firebase";
import { ref, onValue } from "firebase/database";

/* additional components / context */
import ChatLog from "../components/ChatLog";
import ChatContacts from "../components/ChatContacts";
import { useUserAuth } from "../context/UserAuthContext";
import { doc, setDoc, getFirestore, addDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore"; 



function Chats() {
    const user = useUserAuth();
    const [msg, sendMsg] = useState("");
    const [msgs, sendMsgAll] = useState([]);
    const dummy = useRef();
    const db_firestore = getFirestore();

    // const userCombi = user.email+" AND "+msg.usr;
    
    const userCombi = "student@test.de AND student@test.de";
    const coRef = collection(db_firestore, userCombi);
    const [usersContact, setusersContact] = useState([]);
    const q = query(coRef, where("name", "!=", ""));

    // async function userSuche2() {

    //     const docRef = doc(db_firestore, user.user.email+" AND " + msg.usr, "neu");
    //     setDoc(docRef, userInfo);

    //     const q = query(userRef, where("name", "==", ""));
    //     const querySnapshot = await getDocs(q);

    //     querySnapshot.forEach((doc) => {

    //         console.log(doc.id, ' => ', doc.data());

    //     });
    // }

    // function userSuche() {
    //     collection("cities").where("name", "==", true)
    //     .get()
    //     .then(function(querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(doc.id, " => ", doc.data());
    //         });
    //     })
    //     .catch(function(error) {
    //         console.log("Error getting documents: ", error);
    //     });
    // }

    useEffect(() => {

        onValue(ref(database), (snapshot) => {
        sendMsgAll([]);

        const data = snapshot.val(); 

        if (data !== null) {
            Object.values(data).map((msg) => {
                sendMsgAll((oldArray) => [...oldArray, msg]);      
            });
        }

        });
    }, [])

    useEffect(() => {
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            /* Outputs the private chat contacts */
            querySnapshot.forEach((doc) => {
                usersContact.push(doc.data().name);
                console.log("Current usersContact: ", usersContact.toString());
            });
          });

        // const docRef = collection(db_firestore,"student@test.de AND otherstudent@test.de");
        // const q = query(docRef, where("name", "!=", ""));
        // const querySnapshot = await getDocs(q);
        // setQuerySnapshot(querySnapshot);

    }, [q])

    return (
        <div className="parent-ChatView">

        <div className="child-Chatpartners">
        <div>
            {usersContact.map((userContact) => (
                <div>
                <p></p>
                {console.log("aus der div: "+ userContact)}
                <h4>-------</h4>
                <button>{userContact}</button> 
                </div>
            ))}
            </div>
        </div>

        <div className="child-Chat">
        <ChatLog 
        msg = {msg} 
        msgs = {msgs}
        user = {user.user}
        sendMsg = {sendMsg}
        dummy = {dummy}
        db_firestore = {db_firestore}
        />
        </div>

        </div>
        )
};
//        <button onClick={() => userSuche2()}>Suche!</button>
export default Chats;