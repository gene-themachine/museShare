import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../controllers/auth';
import userController from '../../controllers/user';

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
          const user = await signUpUser(email, password); 

          
          const response = await userController.createUser(email, name, username, user.data.uid);

          navigate('/');          
        } catch (error) {
          console.error('Error during sign-up:', error.message);
        }
      };
    
    

    return (
        <form id = "register" className = "register" onSubmit = {handleSignUp}>
            <h1>Register</h1>

            <input type = "text" placeholder = "name" 
            value = {name}
            onChange={ev => setName(ev.target.value) } />

            <input type = "text" placeholder = "username" 
            value = {username}
            onChange={ev => setUsername(ev.target.value) } />

            <div id = "divider"></div>

            <input type = "text" placeholder = "email" 
            value = {email}
            onChange={ev => setEmail(ev.target.value) } />
                
            <input className = "auth-input" type = "password" placeholder = "password" value = {password}
            onChange={ev => setPassword(ev.target.value)} />
            <button className = "auth">Register</button>
        </form>
    )

} 


export default RegisterPage

