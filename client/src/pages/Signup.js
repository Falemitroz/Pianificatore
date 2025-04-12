import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';

const Signup = () => {

    const { signup } = useContext(AuthContext);

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    
    const navigate=useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(name, email, password);
            console.log("Registrazione effettuata con successo");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="logintext">  
          <IoIosCloseCircleOutline onClick={() => navigate("/")} className="hometext" />
            <h2>Signup</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSignup}>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome Utente" 
                    required/>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" 
                    required/>            
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" 
                    required/>
                <button type="submit">Registrati</button>            
            </form>
            <a href="/login">Hai già un account? Accedi.</a>
        </div>
    );
};

export default Signup;