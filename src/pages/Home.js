import React, {useState, useEffect} from "react";
import Content from "../components/Content";
import Database from "../data/db";
import {getDatabase, ref, set, onValue} from "firebase/database"
import { getDocs } from "@firebase/firestore";
import {auth, databaseData} from "../Firebase"




//TODO: Only Admin can Modify, Add Content!
//Next steps: Implement User Login!
 function Home() {
    const [content, setContent] = useState([
        { id: '', title: '', content: ''},
    ]);
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

    dbref.setReferenceData("homeContent");       //setReferenceData collection depended by the  current context
    const homeContentRef = dbref.referenceData;

    const getContent = async () => 
    {
        const data = await getDocs(homeContentRef);
        console.log(data);
        
        data.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setContent(data.docs.map((doc) => ({id: doc.id, title: doc.data().title, content: doc.data().content}) ))
          });
       // setContent(data.docs.map((doc) => ({title: doc.title, content: doc.content}) ))
    };

    
    useEffect(() => 
    {
        //retrieve home content data

        getContent();
       /// console.log("getContent() : " + homeContentRef);
    }, []);

    
    const handleContentAdd = (index) => 
    {
        
        let newTitle = prompt('What title do you want to write?');
        let description = prompt('What description do you want to write on the new component?');
        //dbref.setReferenceContent(index);
        dbref.writeContentData(index, newTitle, description);     
       //window.location.reload();
    }


        return (
            <div>  
                
               {content.map((Singlecontent, index) => (
                <div>
                <Content
                title={Singlecontent.title}
                desc={Singlecontent.content}
                idx={Singlecontent.id}
                />
                   
                    {content.length - 1 === index && content.length < 4 && admin &&
                        (<button type = "button" onClick={() => handleContentAdd(index)}className="btn" id="addContent">
                        <span>Add Content</span>
                        </button>)
                        }
                         </div>
               ))}            
                      
               </div>

        );    
}

export default Home;