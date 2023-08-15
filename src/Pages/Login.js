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
        async function getCode() {
            const url = window.location.href;
            const urlParams = new URLSearchParams(url);
            const authenticationCode = urlParams.get('auth_code');

            if(authenticationCode === null) {
                window.location.href = authenticationURL
            } else {
                setAuthCode(authenticationCode);
                await getAccessToken(authenticationCode)
            }  
        }
        getCode();
    }, [authCode]);

    const getAccessToken = async(code) => {
        let body = {
            "grant_type":"authorization_code",
            "appIdHash":"aa6fc6f83659d0eb8a9e040f0b08e35b07278175ad94d987792073c78f13a427",
            "code":code
        }

        let resp = await axios.post('https://api.fyers.in/api/v2/validate-authcode', body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(resp);

        setAccessToken(resp['access_token'])
    }

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