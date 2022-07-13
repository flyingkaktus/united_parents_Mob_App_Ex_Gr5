import React, { useEffect } from "react";
import { uid } from  "uid";
import { set, ref } from "firebase/database";
import { database } from "../Firebase";
import { doc, setDoc, getFirestore, addDoc, collection, query, where, getDocs, CollectionReference, limit, onSnapshot } from "firebase/firestore"; 


   const ChatLog = (props) => {
        const msg = props.msg;
        const msgs = props.msgs;
        const user = props.user;
        const sendMsg = props.sendMsg;
        const userMail = user.email;
        const dummy = props.dummy;
        const db_firestore = props.db_firestore;

        const userInfo = {
            name: userMail,
            msg: "Hallo! Hier ist " + userMail + "!"
        };

        /* Groups the messages during rendering */
        function checkSide(msgMail) {
            let result;

            if (msgMail !== userMail) {
                result = 'left';
                console.log("result = "+result);
            } else {
                result = 'right';
                console.log("result = "+result);
            }
            return result;
        };

        const handleSubmit = (e) => {
            sendMsg(e.target.value);
        };

        /* Writting message into database, V1 */
        const writeToDatabase = () => {
            const uuid = uid();

            set(ref(database, `/${Date.now()}`), {
                usr : user.email,
                uid : uuid,
                msg : msg,
                time : Date.now()
            });

            sendMsg("");
            
        };

        useEffect(() => {

            console.log("changed");

            setTimeout(() => {
                console.log('This will run after 1.5 seconds!')
                scrollDown();
              }, 1500);

        }, [props.dummy])

        /* In case of a larger number of messages, the chat automatically scrolls to the most recent message */
        function scrollDown() {
            console.log("scrollDown() wurde ausgeführt mit = " + dummy.current + ". Zeit: " + convertUnix(Date.now()) + ". Unix: " + Date.now() + ".");
            return dummy.current.scrollIntoView({behavior: 'smooth'});
        };

        /* Input field for entering messages */
        function chatInput() {

            return (
                <div className="chat-input" align ="right">
                <input type="text" value={msg} onChange={handleSubmit}/>
                <button onClick={writeToDatabase}>Senden</button>
                </div>
            )
        };

        /* Convert unix number code to date string */
        function convertUnix(msMsgTime) {
            const sekMsgTime = msMsgTime/1000;
            var date = new Date(sekMsgTime * 1000);
            let datemsg = date.toString();
            return datemsg;
        };

        /* creates a private chat */
        async function addUser(msg) {
           const userCombi = userMail+" AND "+msg;
           const coRef = collection(db_firestore, userCombi);
           const q = query(coRef, where("name", "!=", ""));

            // if (collection(db_firestore, userCombi) === null) {

            //     return console.log("addUser ausgelöst");
            // } else {
            //     console.log(userCombi + " bereits vorhanden.");
            // }

            // const snap = await query(collection(db_firestore, userCombi), limit(1));

            // if (snap == 0) {
            //     console.log("ist leer = " + snap.data());
            // } else {
            //     console.log("gefunden = " + snap.data());
            // } 

            /* takes a sample and creates a private chat if it is not already in the database */
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
    
                if (querySnapshot.empty) {
                    console.log("Ist leer ");
                    const docRef = doc(db_firestore, userCombi, Date.now().toString());
                    setDoc(docRef, userInfo);
                } else {
                    console.log("nicht leer");
                }
    
              });

        };

        /* Decides whether a message gets a private message button displayedDecides whether a message gets a private message button displayed */
        function buttonCheck(sender) {
            if (user.email === sender) {
                return (
                    <p></p>
                )
            } else {
                return (
                <button onClick={() => addUser(sender)}>Private Nachricht schicken</button>
                )
            }
        }

        return (
            <main>
            {msgs.map((msg) => (
                <div className="chat-log">
                    <p align = {checkSide(msg.usr)}>
                    <h3>{msg.msg}</h3>
                    <h5>User: {msg.usr}</h5>
                    <h5>Gesendet am: {convertUnix(msg.time)}</h5>
                    {buttonCheck(msg.usr)}
                    </p>
                 </div>
                ))}
            <div ref={dummy}></div>
            <p>{chatInput()}</p>
            </main>
        )
    }

    export default ChatLog;

    //<button onClick={() => updateMsg(msg)}>Editieren</button>
    // <button onClick={() => deleteMsg(msg)}>Löschen</button>