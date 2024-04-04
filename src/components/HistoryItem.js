import React from "react";
import '../css/style.css';
import moment from "moment";

const HistoryItem = (props) => {
    let strDate = moment(props.data.date).format('DD/MM/YYYY')
    console.log(strDate)
    return (
        <tr>
            <td>{strDate}</td>
            <td>{props.data.name}</td>
            <td>${Number(props.data.price).toFixed(2)}</td>
        </tr>
    )
}

export default HistoryItem;