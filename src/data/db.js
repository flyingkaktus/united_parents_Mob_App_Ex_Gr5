import React from "react";
import {getDatabase, ref, set, onValue} from "firebase/database"



class Database 
{
    constructor() {
        this.db = getDatabase();
        this.id = 0;
        this.referenceContent = ref(this.db, 'content/');
        this.data = "";
        this.dataList = [];
    }  

        setReferenceContent(id) 
        {
            this.referenceContent = ref(this.db, 'content/' + id);
        }
    
        writeContentData(id, title, desc) 
        {
            set(this.referenceContent, 
                {
                  titleContent: title,
                  description: desc        
                });
        }
       
        readContentData() 
        {
            var title;
            var description;

            onValue(this.referenceContent, (snapshot) =>
            {
                title = snapshot.child("titleContent").val();
                description = snapshot.child("description").val();
            })
            return {title, description};
        }

        pushToDataList() 
        {

            onValue(ref(this.db, 'content/'), (snapshot) =>
            {
                snapshot.forEach((child)=> {
                this.dataList.push(child.val());
            })
            })
                   
               // console.log(this.dataList, this.dataList.length); 
            
        }

        getContentSize () 
        {
            return this.dataList.length;
        }
}

export default Database;