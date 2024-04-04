import React, { useState, useEffect } from "react";
import '../css/style.css';
import HistoryItem from "./HistoryItem";

const History = (props) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getData() {
            setLoading(true)
            await fetch(`https://plushop-server.onrender.com/orders/${localStorage.getItem('username')}`)
                .then((orders) => orders.json())
                .then((orders) => { 
                    setData(orders)
                    setLoading(false)
                })
        }
        getData();
    }, []);

    const noItem = () => {
        if (loading) {
            return (
                <p>Getting your purchase history...</p>
            )
        }
        else if (data.length > 0) {
            console.log(data)
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Purchase Date</th>
                            <th>Plushie</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(plush => <HistoryItem data={plush} key={plush._id}/>)}
                    </tbody>
                </table>
            )
        } else {
            return (
                <p>You have not purchased any plushies yet</p>
            )
                
            
        }
    }
    
    return (
        <div className="history-container">
            <h2>Your Purchase History</h2>
            {noItem()}
        </div>
    )
}

export default History;