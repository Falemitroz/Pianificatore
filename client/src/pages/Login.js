import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { login } = useContext(AuthContext);

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ error, setError ] = useState("");
    const [ showDetails, setShowDetails ] = useState(true);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            console.log("Login effettuato con successo");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Modal
            isOpen={showDetails}
            onClose={() => {setShowDetails(false); navigate("/")}}
            title="Login">

            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>            
            </form>
            <a href="/signup">Non hai un account? Registrati.</a>
        </Modal>
    );
};

export default Login;