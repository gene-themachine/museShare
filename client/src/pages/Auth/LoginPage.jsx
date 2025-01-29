import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../../controllers/auth';
import LoginError from '../../components/LoginError';

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
          const user = await signInUser(email, password);
          setTimeout(() => {
            navigate('/');
          }, 1200); // 1.2 second delay
        } catch (error) {
          console.error('Error during sign-in:', error.message);
          setError(true);
        }
      };
    
    return (
        <form className = "login" onSubmit = {handleSignIn}>
            <h1>Login</h1>
            <input type = "text" placeholder = "email" 
            value = {email}
            onChange={ev => setEmail(ev.target.value) } />
            <input className = "auth-input" type = "password" placeholder = "password" value = {password}
            onChange={ev => setPassword(ev.target.value)} />
            <button className = "auth">Login</button>
            <button className = "forgot-password">Forgot Password?</button> {/*not functional*/}
            {error && <LoginError />}
        </form>
    )
}
export default LoginPage

