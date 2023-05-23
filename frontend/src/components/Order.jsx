import React from "react";
import {publicRequest, userRequest} from "../requestMethod"


const Order = (props) => {
    const pendingImg = 'https://cdn3.iconfinder.com/data/icons/car-services-3/58/car_waiting_delay_pending_progress_repairs-512.png';
    const approveImg = 'data:image/png;base64,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';

    const {item, handleGetOrder} = props;
    const status = item?.status === 'pending' ? 'btn btn-primary' : 'btn btn-success'
    const linkImg = item?.status === 'pending' ? pendingImg : approveImg

    const onDeletOrder = async () => {
        const rs = await userRequest.delete(`/orders/${item?._id}`);
        if(rs?.status === 200) {
            await handleGetOrder();
            alert(`Đơn hàng ${item?._id} đã được xoá`);
        }
    }
    return (
        <div key={item?._id}>
            <div className="card" style={{display: "flex"}}>
                <img className="card-img-top" src={linkImg} alt="Card image cap" style={{width: "80px", height: "80px"}}/>
                <div className="card-body">
                    <h3 className="card-title">Your Order ID</h3>
                    <h5 className="card-title">{item?._id}</h5>
                    <h3 className="card-title">Receiver</h3>
                    <h4 className="card-title">{item?.fullname}</h4>
                    <h3 className="card-title">Delivery to</h3>
                    <h4 className="card-title">{item?.address}</h4>
                    <h3 className="card-title">Your Phone Number</h3>
                    <h4 className="card-title">{item?.phone}</h4>
                    <div className={status}>{item?.status}</div>
                    {item?.status === 'approve' ? <span onClick={onDeletOrder} className= 'danger font-weight-bold' style={{cursor: 'pointer', color:'red'}}>Delete Order</span> : null}
                    
                </div>
            </div>
        </div>
    )

}


export default Order;