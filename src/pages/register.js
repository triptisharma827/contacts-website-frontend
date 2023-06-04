import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../stylesheets/register.css";

function Register(){
    const [name,setName] = useState('');
  const [mail,setMail] = useState('');
  const [password,setPassword] = useState('');

  const navigate = useNavigate();

  async function registerUser(e){
    
    e.preventDefault();
    const response = await fetch('https://ill-tan-snapper-sock.cyclic.app/api/register',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        name,
        mail,
        password
      }),
    })

    const data = await response.json();
    if(data.status === 'ok'){
        navigate('/login');
    }
  }


  return (
    <div className="main-screen">
    <div className="registraion-form">
      <h1>Create Your Account</h1>
      <form onSubmit={registerUser}>
        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="ENTER YOUR NAME" />
        <br/>
        <input value={mail} onChange={(e)=>{setMail(e.target.value)}} type="mail" placeholder="ENTER YOUR EMAIL" />
        <br/>
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="ENTER PASSWORD" />
        <br/>
        <input type="password" placeholder="CONFIRM PASSWORD" />
        <br/>
        <button type="submit">Register</button>
        <a href="/login">Already have an account?</a>
      </form>
    </div>
    </div>
  );
}

export default Register;