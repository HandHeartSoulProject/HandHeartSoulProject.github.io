import { Link } from 'react-router-dom';

function Login() {
    return (
        <div>
            <label><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" required/>

            <label><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required/>

            <Link to="/Events">
                <button>Login</button>
            </Link>
        </div>

        
    )
}
export default Login;