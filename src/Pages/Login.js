import * as React from 'react';
import { useEffect, useState } from 'react';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import axios from 'axios';

import { Button } from 'primereact/button';
const appID="KSSB1AQ631-100";
const secretID="TQFG1O3HIR";
const redirectURL="https://bits1309.github.io/algo-trading/";
const authenticationURL = 'https://api.fyers.in/api/v2/generate-authcode?client_id=KSSB1AQ631-100&redirect_uri=https://bits1309.github.io/algo-trading/&response_type=code&code_challenge=sample_code_challenge&state=sample_state&nonce=sample_nonce&scope=openid'

const fyers   = require("fyers-api-v2")
fyers.setAppId(appID)
fyers.setRedirectUrl(redirectURL)

export default function Login() {

    const [accessToken, setAccessToken] = useState(null);
    const [authCode, setAuthCode] = useState(null)

    useEffect(() => {
        const url = window.location.href;
        const urlParams = new URLSearchParams(url);
        const authenticationCode = urlParams.get('auth_code');

        if(authenticationCode === null) {
            window.location.href = authenticationURL
        } else {
            setAuthCode(authenticationCode);
            getAccessToken(authenticationCode)
        }  
    }, [accessToken]);

    const getAccessToken = async(code) => {
        let body = {
            "grant_type":"authorization_code",
            "appIdHash":"10655c201dfc6f8126d66dcc962cc6228f5cd0a6548246b570758cb7019cb3d2",
            "code":code
        }

        let resp = await axios.post('https://api.fyers.in/api/v2/validate-authcode', body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        Promise.all([resp]).then(res => {
            console.log('res start', res);
            if(res[0]['data']['s'] == 'ok') {
                console.log('res if', res);
                setAccessToken(res[0]['data']['access_token'])
                fyers.setAccessToken(res[0]['data']['access_token'])
            }
        })
    }

    const getUserDetails = async() => {
        if(accessToken !== null) {
            const userDetails = fyers.get_profile();

            Promise.all([userDetails]).then(res => {
                console.log('user details', res)
            })
        }
        
    }

    return (
        <>
            <div className="flex align-items-center justify-content-center" style={{top: '7rem' , position: 'relative' }}>
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-10">
                        <div className='grid'>
                            <div 
                                className='col-12 flex align-items-center justify-content-center'>
                                <span className='text-4xl font-semibold'>ALGO TRADING</span>
                                {
                                    accessToken &&
                                    <Button 
                                        label="User Details" 
                                        icon="pi pi-external-link" 
                                        onClick={getUserDetails} 
                                    />
                                }
                            </div>
                        </div>
                    </div>              
            </div>
        </>
    );
}


//*[@id="mobile-code"]