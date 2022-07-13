import { getDocs } from "@firebase/firestore";
import React, { useState } from "react";
import Database from "../data/db";
import { auth } from "../Firebase";



function Content(props) {
    const [admin, setAdmin] = useState(false);
    const user_email = auth.currentUser.email;
    var adminFlag;
    console.log("" + user_email);

    var dbref = new Database;
  dbref.setReferenceData("users");

    const getUser = async () => 
    {
        const data = await getDocs(dbref.referenceData);
        console.log(data);
        //is current user a admin?
        data.forEach((doc) => {
          console.log("email: " + doc.data().user)
            if(doc.data().user == user_email && user_email != null) 
            {
               adminFlag = doc.data().admin;
               setAdmin(adminFlag);
              console.log("Admin Flag: " + adminFlag);
      
            }
            
          });
       // setContent(data.docs.map((doc) => ({title: doc.title, content: doc.content}) ))
    };

        getUser();

    const handleContentRemove = (index) => 
    {
        try {
            dbref.setReferenceData("homeContent"); 
            dbref.deleteContentData(index);
            alert("removed successfully");
            } catch (e) {
            console.log('error removing content')
            }

    }

    const modifyContent = (index) => 
    {
        try {
            let desc = prompt("Please enter the text you want to change.");
            dbref.updateContentData(index, props.title, desc);
            alert("updated successfully");
            } catch (e) {
            console.log('error updating content')
            }
       
    }

    return (       
        <div className = "home-content1">
            <h2>{props.title}</h2>
            <p>{props.desc}</p>
            {admin &&
        <button type = "button" className="btn" id="modifyContent" onClick={() => modifyContent(props.idx)}>
        <span className="span1">Modify Content</span>
        </button>
        }

                        {admin && 
                        <button type = "button" onClick={() => handleContentRemove(props.idx)}className="btn" id="addContent">
                        <span className="span2">Remove Content</span>
                        </button>
                        }  

       </div>
    );
}

export default Content;
