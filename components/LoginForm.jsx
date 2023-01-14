import axios from 'axios';
import {useState, useContext} from 'react';
import {useRouter} from 'next/router';
import styles from './LoginForm.module.scss';
import FilledBtn from './UI/FilledBtn';
import { GloabalCtx } from '../context/gloabalCtx';
import LoadingSpinner from './UI/LoadingSpinner';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

    const ctx = useContext(GloabalCtx)
    const router = useRouter();

    const loginHandler = e => {
        e.preventDefault();
        setLoggingIn(true);
        axios.post('/api/login', {
            username: username,
            password: password
        })
        .then(res => {
            console.log(res.data)
            if(res.data.loggedIn){
                localStorage.setItem('authToken', res.data.authToken);
                ctx.setLoggedIn(true)
                router.push('/')
            }
            setLoggingIn(false)
        })

    }

    const userNameInputChangeHandler = e => setUsername(e.target.value);

    const passwordInputChangeHandler = e => setpassword(e.target.value);

    return (
        <form onSubmit={loginHandler} className={styles.formControl}>
            <h2>Admin Login</h2>
            <input onChange={userNameInputChangeHandler} type="text" placeholder='Enter Username' />
            <input onChange={passwordInputChangeHandler} type="password" placeholder='Enter Password' />

        
            {!loggingIn && <FilledBtn >Login</FilledBtn>}
            {loggingIn && <LoadingSpinner style={{width: '50px', height: '50px'}} />}
        </form>
    );
}

export default LoginForm;
