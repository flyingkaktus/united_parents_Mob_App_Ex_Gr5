
import React, {useState} from "react";

import {Form, Button, Card, Alert} from 'react-bootstrap'
import{Link,useNavigate} from 'react-router-dom'
import {useUserAuth} from "../context/UserAuthContext"
import {Switch} from "antd"


const Registration=()=> {
const [email, setEmail] = useState("")
const [postcode, setPostCode] = useState("")
const [studiengang, setStudy] = useState("")
const [hochschule, setStudyLocation] = useState("")
const [username, setUsername] = useState("")
const [toggle, setToggle] = useState(false)
const [password, setPassword] = useState("")
const {register} = useUserAuth()
const [error, setError] = useState("")
const navigate = useNavigate()

const toggler = () => 
{
    toggle ? setToggle(false) : setToggle(true);
}

const handleSubmit = async (e) =>{
    e.preventDefault()
    setError("")
    try{
        await register(email,password,toggle)
        navigate("/")
  

    } catch(err) {
        setError(err.message);

    }
}



    return (
       <div className="login-container">
       <Card>
             <Switch onClick={toggler}/>
             {!toggle ? <span> Student Registrierung </span> : <span> Admin Registrierung </span>}
           <Card.Body>
            <h1 className="text-center mb-4">Registrieren</h1>
            {error && <Alert variant= "danger">{error}</Alert>}
            {!toggle ?  <Form onSubmit = {handleSubmit}>

                <Form.Group id ="postcode" >
                    <Form.Label>Postleitzahl</Form.Label>
                    <Form.Control type="input" placeholder="Postal Code" onChange={(e)=> setPostCode(e.target.value)}/>
                </Form.Group>
                <Form.Group id ="email" >
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control type="email" placeholder="E-Mail Adresse" onChange={(e)=> setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group id ="studiengang" >
                    <Form.Label>Studiengang</Form.Label>
                    <Form.Control type="input" placeholder="Studiengang" onChange={(e)=> setStudy(e.target.value)}/>
                </Form.Group>

                <Form.Group id ="hochschule" >
                    <Form.Label>Hochschule/Standort</Form.Label>
                    <Form.Control type="input" placeholder="Hochschulstandort" onChange={(e)=> setStudyLocation(e.target.value)}/>
                </Form.Group>

                <Form.Group id ="username" >
                    <Form.Label>Benutzername</Form.Label>
                    <Form.Control type="input" placeholder="Benutzername" onChange={(e)=> setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group id ="password" >
                    <Form.Label>Passwort</Form.Label>
                    <Form.Control type="password" placeholder="Passwort" onChange={(e)=> setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group id ="rePassword" >
                    <Form.Label>Passwort Wiederholen</Form.Label>
                    <Form.Control type="Password" placeholder= "Passwort wiederholen" />
                </Form.Group> 

                <div className="d-grid gap-2">
                <Button className = "w-100" varient="primary" type="register">Registrieren</Button>
                </div>
            </Form>
            :          
            <Form onSubmit = {handleSubmit}>  
            <Form.Group id ="email" >
            <Form.Label>E-Mail</Form.Label>
            <Form.Control type="email" placeholder="E-Mail Adresse" onChange={(e)=> setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group id ="password" >
                    <Form.Label>Passwort</Form.Label>
                    <Form.Control type="password" placeholder="Passwort" onChange={(e)=> setPassword(e.target.value)}/>
                </Form.Group>
                         <div className="d-grid gap-2">
                         <Button className = "w-100" varient="primary" type="register">Registrieren</Button>
                         </div>
                     </Form>
        }

           </Card.Body>
           <div className="w-100 text-center mt-2">
               Du hast bereits einen Account?<br></br><Link to ="/">Log dich hier ein</Link>
           </div>
       </Card>
           
       </div> 
    );
}

export default Registration;
/* 
                
<Form.Group id ="firstName" >
<Form.Label>Vorname</Form.Label>
<Form.Control type="firstName" ref = {firstNameref} required/>
</Form.Group>
<Form.Group id ="lastName" >
<Form.Label>Nachname</Form.Label>
<Form.Control type="lastName" ref = {lastNameRef} required/>
</Form.Group>
<Form.Group id ="birthday" >
<Form.Label>GeburtsDatum</Form.Label>
<Form.Control type="birthday" ref = {birthdayRef} required/>
</Form.Group>
<Form.Group id ="uniPlace" >
<Form.Label>Hochschule und Standort</Form.Label>
<Form.Control type="uniPlace" ref = {uniPlaceRef} required/>
</Form.Group>
*/