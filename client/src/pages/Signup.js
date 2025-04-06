import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Signup = () => {

    const { signup } = useContext(AuthContext);

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

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
        <div>
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