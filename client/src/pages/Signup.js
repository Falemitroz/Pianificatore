import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const { signup } = useContext(AuthContext);

    const [ name, setName ] = useState("");
    const [ eta, setEta ] = useState("")
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    const [ showModal, setShowModal ] = useState(true);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(name, eta, email, password);
            console.log("Registrazione effettuata con successo");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Modal
            isOpen={showModal}
            onClose={() => {setShowModal(false); navigate("/")}}
            title="Signup">

            {error && <p>{error}</p>}
            <form onSubmit={handleSignup}>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome Utente" 
                    required/>
                <input 
                    type="integer" 
                    value={eta}
                    onChange={(e) => setEta(e.target.value)}
                    placeholder="Età" 
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
        </Modal>
    );
};

export default Signup;