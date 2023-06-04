import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../stylesheets/login.css'

function Login() {
  const [mail,setMail] = useState('');
  const [password,setPassword] = useState('');
  const navigate=useNavigate();

  async function loginUser(e){
    e.preventDefault();
    const response = await fetch('https://ill-tan-snapper-sock.cyclic.app/api/login',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        mail,
        password
      }),
    })

    const data = await response.json();
    
    if(data.user){
        // console.log(data);
        localStorage.setItem('token', data.user)
        window.location.href = '/Dashboard';
    }
    else{
        alert('Please Check your username and password');
    }
  }


  return (
    <div className='main-screen'>
        <div className="login-form">
      <h1>LOGIN / SIGNIN </h1>
      <form onSubmit={loginUser}>
        <input value={mail} onChange={(e)=>{setMail(e.target.value)}} type="mail" placeholder="ENTER YOUR EMAIL" />
        <br/>
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="ENTER YOUR PASSWORD" />
        <br/>
        <button type="submit">Login</button>
        {/* <a onClick={()=>{navigate("/register")}}>Click Here to Register</a> */}
        <a href="/register">OR Click Here to Register</a>
      </form>
    </div>
    </div>
  );
}

export default Login;