import React, { useEffect, useState } from "react";
import { doc, setDoc, getFirestore, addDoc, collection, query, where, getDocs } from "firebase/firestore"; 

   const ChatContacts = function(props) {

        const [querySnapshot, setQuerySnapshot] = useState([]);
        const db_firestore = props.db_firestore;
        // const user = props.user;
     
        useEffect(async () => {
            const docRef = collection(db_firestore,"student@test.de AND otherstudent@test.de");
            const q = query(docRef, where("name", "!=", ""));
            const querySnapshot = await getDocs(q);
            setQuerySnapshot(querySnapshot);
            
            }, [])

        function getthat(newString) {
            const thatString = newString;
            return thatString
        }

        return (
            <div>
            <h1>{getthat("hallo1")}</h1>  
            {querySnapshot.forEach((doc) => {
            <div className="chat-contact">  
            {getthat("hallo2")}
            {console.log("Aus ChatContacts: " + doc.data().msg)}
            </div>
            })}
            </div>
            )
        }        
  

    export default ChatContacts;