import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';

import { status, segment, type, side  } from "../constants";

import './ordersDialog.css';

export default function OrdersDialog(props) {
    const [orders, setOrders] = useState(null);
    const [positions, setPositions] = useState(null);
    const [orderLoading, setOrderLoading] = useState(false);
    const [positionLoading, setPositionLoading] = useState(false);


    useEffect(() => {
       async function getOrders() {
        //if(!orders)
            await getOrderDetails();
       }
       
       async function getPositions() {
            await getPositionDetails();
       }

       getOrders();
       getPositions();
        
    }, [])

    const getOrderDetails = async() => {
        setOrderLoading(true);
        const orderDetails = await props.fyers.get_orders();

        Promise.all([orderDetails]).then(res => {
            let orders = res[0].orderBook;
            setOrders(orders);
            setOrderLoading(false);
        })
    }

    const getPositionDetails = async() => {
        setPositionLoading(true);

        const positionDetails = await props.fyers.get_positions();

        Promise.all([positionDetails]).then(res => {
            let positions = res[0].netPositions;
            console.log(positions);
            setPositions(positions);
            setPositionLoading(false);
        })
    }

    const sideTemplate = (product) => {
        return side[product?.side];
    };

    const segmentTemplate = (product) => {
        return segment[product?.segment];
    };

    const statusTemplate = (product) => {
        return status[product?.status];
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
                    <TabView>
                        <TabPanel header="Orders">
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
                                loading={orderLoading}
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
                        </TabPanel>
                        <TabPanel header="Positions">
                            positions &&
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
                                loading={positionLoading}
                            >
                                <Column field="symbol" header="Symbol"></Column>
                                <Column field="productType" header="Product Type" ></Column>
                                <Column field="side" header="Buy / Sell" body={sideTemplate}></Column>
                                <Column field="avgPrice" header="Avg Price"></Column>
                                <Column field="buyQty" header="Buy Qty"></Column>
                                <Column field="buyAvg" header="Buy Avg"></Column>
                                <Column field="sellQty" header="Sell Qty"></Column>
                                <Column field="sellAvg" header="Sell Avg"></Column>
                                <Column field="unrealized_profit" header="Unrealised P&L"></Column>
                                <Column field="realized_profit" header="Realised P&L"></Column>
                                <Column field="pl" header="Total P&L"></Column>
                            </DataTable>
                        </TabPanel>
                    </TabView>
                    <DataTable />

                    {
                        
                    }
                    
                </div>
            </div>
        </div>
    )
}