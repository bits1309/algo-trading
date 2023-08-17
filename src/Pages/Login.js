import * as React from 'react';
import { useEffect, useState } from 'react';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import axios from 'axios';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';

import OrdersDialog from './ordersDialog'

const appID="KSSB1AQ631-100";
const secretID="TQFG1O3HIR";
const redirectURL="https://bits1309.github.io/algo-trading/";
const authenticationURL = 'https://api.fyers.in/api/v2/generate-authcode?client_id=KSSB1AQ631-100&redirect_uri=https://bits1309.github.io/algo-trading/&response_type=code&code_challenge=sample_code_challenge&state=sample_state&nonce=sample_nonce&scope=openid'

const fyers   = require("fyers-api-v2")
fyers.setAppId(appID)
fyers.setRedirectUrl(redirectURL)

export default function Login() {

    const [accessToken, setAccessToken] = useState(null);
    const [authCode, setAuthCode] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [activity, setActivity] = useState(null);

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
            if(res[0]?.data?.s == 'ok') {
                setAccessToken(res[0]?.data?.access_token)
                fyers.setAccessToken(res[0]?.data?.access_token)

                getUserDetails(res[0]?.data?.access_token)
            }
        })
    }

    const getUserDetails = async(token) => {
        if(token !== null) {
            const userDetails = await fyers.get_profile();

            Promise.all([userDetails]).then(res => {
                if(res[0].s === 'ok') {
                    setUserDetails(res[0].data)
                }
            }) 
        }
    }

    return (
        <>
            <div>
                <div>
                    <div className="grid grid-nogutter text-800"
                        style={{
                            marginBottom: "20px",
                            background: '#eeebea',
                            borderBottom: '1px solid #1e242b',
                            minHeight: '4rem'
                        }}>
                        <div className="col-6 md:col-6 text-center md:text-left flex align-items-center" style={{ paddingLeft: '10px' }}>
                            <section>
                                <div style={{ fontSize: '22px', fontWeight: 'bold' }}>ALGO TRADING</div>
                            </section>
                        </div>
                        {
                            userDetails && 
                            <div className="col-6 md:col-6" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end', paddingRight: '10px' }}>
                                <section style={{ marginRight: '15px' }}>
                                    <div style={{ fontSize: '16px' }}>Welcome {userDetails?.name}</div>
                                </section>
                            </div>
                        }
                        
                    </div>
                    <div>
                        <TabView>
                            <TabPanel header="Dashboard">
                                {
                                    accessToken 
                                    && <OrdersDialog
                                        fyers={fyers}
                                    />
                                }
                            </TabPanel>
                            <TabPanel header="Live Data">

                            </TabPanel>
                        </TabView>
                        
                    </div>
                </div>            
            </div>
        </>
    );
}


//*[@id="mobile-code"]