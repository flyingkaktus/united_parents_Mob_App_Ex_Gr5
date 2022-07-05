import React, {useState} from "react";
import Content from "../components/Content";
import Database from "../data/db";
import {getDatabase, ref, set, onValue} from "firebase/database"



//TODO: Only Admin can Modify, Add Content!
//Next steps: Implement User Login!
 function Home() {
    const [content, setContent] = useState([
        { title: '', desc: ''},
    ]);

    var dbref = new Database;

    const handleDataBaseEntries = () => 
    {
        
        //TODO:handle database entries so if you refresh the page,
        //you see the added components!
      //  dbref.pushToDataList();
        for(var i = 0; i < 4; i++) 
        {
            dbref.setReferenceContent(i);       
            var dbData = dbref.readContentData();
            setContent([...content, {title: dbData.title, desc: dbData.description}]);
        }
    }
    
    const handleContentAdd = (index) => 
    {
        let newTitle = prompt('What title do you want to write?');
        let description = prompt('What description do you want to write on the new component?');
        dbref.setReferenceContent(index);
        dbref.writeContentData(index, newTitle, description);
        var dbData = dbref.readContentData();
        setContent([...content, {title: dbData.title, desc: dbData.description}]);
    }

    const handleContentRemove = (index) => 
    {
        const list = [...content];
        list.splice(index, 1);
        setContent(list);
    }
        return (
            <div>  
                {handleDataBaseEntries}
               {content.map((Singlecontent, index) => (
                <div>
                <Content
                title={Singlecontent.title}
                desc={Singlecontent.desc}
                idx={index}
                />
                   
                    {content.length - 1 === index && content.length < 4 && 
                        (<button type = "button" onClick={() => handleContentAdd(index)}className="btn" id="addContent">
                        <span>Add Content</span>
                        </button>)
                        }
                        {content.length > 1 && 
                        (<button type = "button" onClick={() => handleContentRemove(index)}className="btn" id="addContent">
                        <span className="span2">Remove Content</span>
                        </button>)
                        }   
                         </div>
               ))}            
                      
               </div>

        );    
}

export default Home;