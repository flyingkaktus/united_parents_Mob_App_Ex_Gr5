import { getDocs } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Database from "../data/db";
import { auth } from "../Firebase";

function Sidebar() {
  const navigate = useNavigate();
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

  const signout = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <aside className="sidebar">
      <div className="icons">
        
        {admin && 
        <>
        <div className="icons-container">
          <Link to="/home">
            <span className="material-icons">home</span>
            <p>Startseite</p>
          </Link>
        </div>
        <div className="icons-container">
          <Link to="/help-finances">
            <span className="material-icons">contact_support</span>
            <p>Hilfe & Finanzen</p>
          </Link>
        </div>
        </>
        }
        {!admin &&
        <>
                <div className="icons-container">
          <Link to="/home">
            <span className="material-icons">home</span>
            <p>Startseite</p>
          </Link>
        </div>

        <div className="icons-container">
          <Link to="/my-profile">
            <span className="material-icons">account_circle</span>
            <p>Mein Profil</p>
          </Link>
        </div>

        <div className="icons-container">
          <Link to="/search-user">
            <span className=" material-icons">map</span>
            <p>User suchen</p>
          </Link>
        </div>

        <div className="icons-container">
          <Link to="/chats">
            <span className="material-icons">forum</span>
            <p>Chats</p>
          </Link>
        </div>

        <div className="icons-container">
          <Link to="/help-finances">
            <span className="material-icons">contact_support</span>
            <p>Hilfe & Finanzen</p>
          </Link>
        </div>

        <div className="icons-container">
          <Link to="/settings">
            <span className="material-icons">settings</span>
            <p>Einstellungen</p>
          </Link>
        </div>
        </>
}
        <div className="icons-container">
          <a href="#" onClick={signout}>
            <span className="material-icons">logout</span>
            <p>Abmelden</p>
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
