import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { status, segment, type, side  } from "../constants";

export default function OrdersDialog(props) {
    const [orders, setOrders] = useState(null);


    useEffect(async() => {
        const orderDetails = await props.fyers.get_orders();

        Promise.all([orderDetails]).then(res => {
            setOrders(res[0].orderBook)
        })
    }, [])

    const sideTemplate = (product) => {
        return side[product];
    };

    const segmentTemplate = (product) => {
        return segment[product];
    };

    const statusTemplate = (product) => {
        return status[product];
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Orders</span>
            <Button icon="pi pi-refresh" rounded raised />
        </div>
    );

    const footer = `Positions P&L`;

    return (
        <div>
            <div className="datatable-doc-demo">
                <div className="card">
                    <DataTable />

                    {
                        orders && 
                        <DataTable 
                            value={orders} 
                            header={header} 
                            footer={footer} 
                            tableStyle={{ minWidth: '60rem' }}
                        >
                            <Column field="symbol" header="Symbol"></Column>
                            <Column field="side" header="Buy/Sell" body={sideTemplate}></Column>
                            <Column field="segment" header="Segment" body={segmentTemplate}></Column>
                            <Column field="productType" header="Type"></Column>
                            <Column field="qty" header="Qty"></Column>
                            <Column field="tradedPrice" header="Traded Price"></Column>
                            <Column field="status" header="Status" body={statusTemplate}></Column>
                            <Column field="orderDateTime" header="Order Time"></Column>
                        </DataTable>
                    }
                    
                </div>
            </div>
        </div>
    )
}