import * as React from 'react';
import { useEffect, useState } from 'react';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import axios from 'axios';

import { Button } from 'primereact/button';
const appID="KSSB1AQ631-100";
const secretID="VLL035OEWK";
const redirectURL="https://www.google.com/";
const authenticationURL = 'https://api.fyers.in/api/v2/generate-authcode?client_id=KSSB1AQ631-100&redirect_uri=https://www.google.com/&response_type=code&code_challenge=sample_code_challenge&state=sample_state&nonce=sample_nonce&scope=openid'

const fyers   = require("fyers-api-v2")
fyers.setAppId(appID)
fyers.setRedirectUrl(redirectURL)

export default function Login() {

    const [accessToken, setAccessToken] = useState(null);
    const [authCode, setAuthCode] = useState(null)

    useEffect(() => {
        window.location.href = authenticationURL
    }, [authCode]);

    const login = async() => {

        window.location.href = 'https://api.fyers.in/api/v2/generate-authcode?client_id=KSSB1AQ631-100&redirect_uri=https://www.google.com/&response_type=code&code_challenge=sample_code_challenge&state=sample_state&nonce=sample_nonce&scope=openid'

        
        
    }

    const getAuthCode = async() => {
        setTimeout(() => {
            var url = window.location.href;

            var urlParams = new URLSearchParams(url);

            var authCode = urlParams.get('auth_code');

            localStorage.setItem('auth code', authCode)

            console.log('auth code',authCode)

            return authCode;
        }, 3000);
    }

    //auth_code=

    return (
        <>
            <div className="flex align-items-center justify-content-center" style={{top: '7rem' , position: 'relative' }}>
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-10">
                        <div className='grid'>
                            <div 
                                className='col-12 flex align-items-center justify-content-center'>
                                <span className='text-4xl font-semibold'>ALGO TRADING</span>
                                
                            </div>
                        </div>
                    </div>              
            </div>
        </>
    );
}


//*[@id="mobile-code"]