import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { environment } from '../service/environment';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check for OAuth2 redirect with tokens
        const handleOAuth2Redirect = () => {
            const queryParams = new URLSearchParams(location.search);
            const accessToken = queryParams.get('access_token');
            const refreshToken = queryParams.get('refresh_token');

            if (accessToken && refreshToken) {
                // Store tokens in localStorage
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);

                // Clear the query parameters and redirect to home
                navigate('/', { replace: true });
            }
        };

        handleOAuth2Redirect();
    }, [location, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }

        const payload = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(`${environment.apiUrl}/signin`, payload);
            console.log("Login response:", response.data);
            
            // Assuming the response contains access_token and refresh_token
            const { access_token, refresh_token } = response.data;
            
            // Store the tokens in localStorage
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            // Redirect to home page
            navigate('/');
        } catch (error) {
            console.error("Login error:", error);
            setError('Login failed. Please check your credentials.');
        }
    };

    const handleOAuthLogin = (provider) => {
        // Redirect to backend OAuth2 authorization endpoint
        window.location.href = `${environment.apiUrl}/oauth2/authorize/${provider}`;
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='border-2 border-black rounded-xl p-4 flex flex-col w-1/3'>
                <div>
                    <h1 className='font-bold'>Welcome to masQani</h1>
                    <h4 className='font-thin'>Please sign in to continue</h4>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className='flex-col flex'>
                        <label>Email</label>
                        <input
                            name='email'
                            id='email'
                            type='email'
                            value={email}
                            onChange={handleChange}
                            className='border rounded p-1 mb-2'
                            required
                        />
                        
                        <label>Password</label>
                        <input
                            name='password'
                            id='password'
                            type='password'
                            value={password}
                            onChange={handleChange}
                            className='border rounded p-1 mb-2'
                            required
                        />
                        
                        {error && <p className='text-red-500'>{error}</p>}
                        
                        <button type='submit' className='bg-black text-white rounded-lg p-2'>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className='mt-4 flex flex-col'>
                    <h4 className='font-thin'>Or sign in with:</h4>
                    <button
                        onClick={() => handleOAuthLogin('google')}
                        className='text-black rounded-lg p-2 mr-2 text-start underline'
                    >
                        Google
                    </button>
                    <button
                        onClick={() => handleOAuthLogin('github')}
                        className='text-black rounded-lg p-2 text-start underline'
                    >
                        GitHub
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;