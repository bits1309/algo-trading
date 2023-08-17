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
    const [totalPL, setTotalPL] = useState(0);


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
            let orders = res[0].orderBook?.sort((a,b) => {return new Date(a.orderDateTime) - new Date(b.orderDateTime)});
            setOrders(orders);
            setOrderLoading(false);
        })
    }

    const getPositionDetails = async() => {
        setPositionLoading(true);

        const positionDetails = await props.fyers.get_positions();

        Promise.all([positionDetails]).then(res => {
            let positions = res[0].netPositions;

            let tpl = 0;
            positions?.forEach(a => {
                tpl += a?.pl
            })

            console.log(positions);
            setPositions(positions);
            setTotalPL(tpl?.toFixed(2));
            setPositionLoading(false);
        })
    }

    const sideTemplate = (order) => {
        return side[order?.side];
    };

    const segmentTemplate = (order) => {
        return segment[order?.segment];
    };

    const statusTemplate = (order) => {
        return status[order?.status];
    };

    const buyAvgTemplate = (order) => {
        return order?.buyAvg?.toFixed(2);
    }

    const sellAvgTemplate = (order) => {
        return order?.sellAvg?.toFixed(2);
    }

    const totalPLTemplate = (order) => {
        return order?.pl?.toFixed(2);
    }

    const unrealisedPLTemplate = (order) => {
        return order?.unrealized_profit?.toFixed(2);
    }

    const realisedPLTemplate = (order) => {
        return order?.realized_profit?.toFixed(2);
    }

    const footer = `Total P&L: ${totalPL}`;

    return (
        <div>
            <div className="datatable-doc-demo">
                <div className="card">
                    <TabView>
                        <TabPanel header="Orders">
                            {   orders && 
                                <DataTable 
                                    value={orders} 
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
                            }
                        </TabPanel>
                        <TabPanel header="Positions">
                            {
                                positions &&
                                <DataTable 
                                    value={positions} 
                                    tableStyle={{ minWidth: '60rem' }}
                                    footer={footer}
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
                                    <Column field="buyAvg" header="Buy Avg" body={buyAvgTemplate}></Column>
                                    <Column field="sellQty" header="Sell Qty"></Column>
                                    <Column field="sellAvg" header="Sell Avg" body={sellAvgTemplate}></Column>
                                    <Column field="unrealized_profit" header="Unrealised P&L" body={unrealisedPLTemplate}></Column>
                                    <Column field="realized_profit" header="Realised P&L" body={realisedPLTemplate}></Column>
                                    <Column field="pl" header="Total P&L" body={totalPLTemplate}></Column>
                                </DataTable>
                            }
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    )
}