import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function AuthCodeDialog(props) {
    const [visible, setVisible] = useState(false);
    const [authCode, setAuthCode] = useState(null);

    // useEffect(() => {
    //     window.location.href = props.authenticationURL
    //   }, [authCode]);

    const navigateToFyers = () => {
        window.location.href = props.authenticationURL
    }

    return (
        <div className="card flex justify-content-center">
            <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog 
                hidden={!visible}
                header="Header" 
                visible={visible} 
                style={{ width: '50vw' }} 
                onHide={() => setVisible(false)}
                onShow={navigateToFyers}
            >
                
            </Dialog>
        </div>
    )
}