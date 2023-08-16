import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { status, segment, type, side  } from "../constants";

import './ordersDialog.css';

export default function OrdersDialog(props) {
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
       async function get() {
        //if(!orders)
            await getOrderDetails();
       }
       get();
        
    }, [orders])

    const getOrderDetails = async() => {
        setLoading(true);
        const orderDetails = await props.fyers.get_orders();

        Promise.all([orderDetails]).then(res => {
            let orders = res[0].orderBook?.filter(a => a.status === 2);
            // console.log(orders);
            // let combinedOrders = [];

            // orders.forEach((order, i) => {
            //     combinedOrders.push({
            //         "symbol": order?.symbol,
            //         "side": order?.side,
            //         "segment": order?.segment,
            //         "productType": order?.productType,
            //         "qty": order?.qty,
            //         "buyPrice": order?.tradedPrice,
            //         "sellPrice": order?.tradedPrice,
            //         "status": order?.status === 2 && orders[i+1]?.status === 2 ? 2 : 6,
            //         "orderDateTime": order?.orderDateTime,
            //         "pl": orders[i+1]?.tradedPrice - order?.tradedPrice,
            //     })
            // })

            // for(const i = 0; i < orders?.length; i+2) {
            //     combinedOrders.push({
            //         "symbol": orders[i]?.symbol,
            //         "side": orders[i]?.side,
            //         "segment": orders[i]?.segment,
            //         "productType": orders[i]?.productType,
            //         "qty": orders[i]?.qty,
            //         "buyPrice": orders[i]?.tradedPrice,
            //         "sellPrice": orders[i+1]?.tradedPrice,
            //         "status": orders[i]?.status === 2 && orders[i+1]?.status === 2 ? 2 : 6,
            //         "orderDateTime": orders[i+1]?.orderDateTime,
            //         "pl": orders[i+1]?.tradedPrice - orders[i]?.tradedPrice,

            //     })
            // }

            console.log(orders)
            setOrders(orders);

            //setOrders(res[0].orderBook);
            setLoading(false);
        })
    }

    

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
            <Button 
                icon="pi pi-refresh" 
                rounded 
                raised 
                onClick={getOrderDetails}
                scrollable 
                scrollHeight="400px"
            />
        </div>
    );

    const footer = `Positions P&L: `;

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
                            size='small'
                            showGridlines
                            stripedRows
                            paginator 
                            rows={6} 
                            rowsPerPageOptions={[6, 12, 24, 48]}
                            loading={loading}
                        >
                            <Column field="symbol" header="Symbol"></Column>
                            <Column field="side" header="Buy/Sell" body={sideTemplate}></Column>
                            <Column field="segment" header="Segment" body={segmentTemplate}></Column>
                            <Column field="productType" header="Type"></Column>
                            <Column field="qty" header="Qty"></Column>
                            <Column field="buyPrice" header="Buy Price"></Column>
                            <Column field="sellPrice" header="Sell Price"></Column>
                            <Column field="status" header="Status" body={statusTemplate}></Column>
                            <Column field="orderDateTime" header="Order Time"></Column>
                            <Column field="pl" header="P&L"></Column>
                        </DataTable>
                    }
                    
                </div>
            </div>
        </div>
    )
}