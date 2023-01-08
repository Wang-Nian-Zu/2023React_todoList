import React, { useState, useEffect } from 'react';
import CheckEventButton from './CheckEventButton';
import EditEventButton from './EditEventButton';
import DeleteEventButton from './DeleteEventButton';


function ToDoTableData(props) {
    const { item } = props;
    const { changeUpdate } = props;
    const [remainDaysTXT, setRemainDaysTXT] = useState("");//紀錄
    const [overDeadline, setOverDeadline] = useState(false);//判斷是否過期

    useEffect(() => {
        const DateDiff = (date1, date2) => {
            let strDate, oDate1, oDate2, result;
            strDate = date1.split("-");
            oDate1 = new Date(strDate[1] + '/' + strDate[2] + '/' + strDate[0]);
            strDate = date2.split("-");
            oDate2 = new Date(strDate[1] + '/' + strDate[2] + '/' + strDate[0]);
            result = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
            return result;
        }
        var today = new Date();
        var todayFormat = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        let diff = DateDiff(item.dueDate, todayFormat);
        var message;
        if (Date.parse(item.dueDate) < Date.parse(todayFormat)) { //避免格式不一，先用Date.parse()格式化時間後再進行比較
            message = "過期";
            setOverDeadline(true);
        } else {
            message = "剩餘";
            setOverDeadline(false);
            diff = diff + 1;//剩餘天數 :  加1表示前後天數皆有算
        }
        setRemainDaysTXT(message + diff.toString() + "天")
    }, [item]);
    return (
        <>
            <tr>
                <td>{item.title}</td>
                <td>{item.dueDate}</td>
                <td>{
                    (overDeadline)
                        ? (<p style={{ color: "red" }}>{remainDaysTXT}</p>)
                        : (<p style={{ color: "black" }}>{remainDaysTXT}</p>)
                }</td>
                <td>
                    <CheckEventButton item={item} changeUpdate={changeUpdate} />&nbsp;
                    <EditEventButton item={item} changeUpdate={changeUpdate} />&nbsp;
                    <DeleteEventButton id={item.id} changeUpdate={changeUpdate} />
                </td>
            </tr>
        </>
    );
}
export default ToDoTableData;