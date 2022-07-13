import React from "react";
import {getDatabase, ref, set, onValue} from "firebase/database"
import {databaseData} from "../Firebase";
import {collection, doc, setDoc, getDoc, deleteDoc} from "firebase/firestore";




class Database 
{
    constructor() {
        this.db = databaseData;
        this.id = this.getIndex();
        this.referenceContent = this.getReferenceContent();
        this.title = this.getTitle ();
        this.referenceData = "";
    }  

        getReferenceContent() 
        {
            var referenceContent = doc(this.db, "homeContent", "content");
            const docSnap =  getDoc(referenceContent);
            if (docSnap.exists) {
                console.log("Document data:", docSnap.data);
                return docSnap.data;
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return 0;
              }       
        }

        getTitle() 
        {
            var referenceContent = doc(this.db, "homeContent", "title");
            const docSnap =  getDoc(referenceContent);
            if (docSnap.exists) {
                console.log("Document data:", docSnap.data);
                return docSnap.data;
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return 0;
              }  
        }

        getIndex() 
        {
            var referenceContent = doc(this.db, "homeContent", "index");
            const docSnap =  getDoc(referenceContent);
            if (docSnap.exists) {
                console.log("Document data:", docSnap.data);
                return docSnap.data;
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return 0;
              }  
        }
    
        updateContentData(index, title, desc) 
        {
            
            setDoc(doc(this.db, "homeContent", index), 
                {
                  title: title,
                  content: desc,
                  id: index  
                });
                
        }

        writeContentData(index, title, desc) 
        {
            
            setDoc(doc(this.referenceData), 
                {
                  title: title,
                  content: desc,
                  id: index  
                });
                
        }

        writeUserData (users, adminFlag) 
        {
                        
            setDoc(doc(this.referenceData), 
                {
                  user: users,
                  admin: adminFlag,
                });
        }
       
        deleteContentData(id) 
        {

            deleteDoc(doc(this.db, "homeContent", id))
        }


        setReferenceData(context) 
        {
            this.referenceData = collection(this.db, context);
        }

}

export default Database;