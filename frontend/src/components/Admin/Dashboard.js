import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut,Line} from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
// import {Chart} from "chart.js"

import MetaData from "../layout/MetaData";

const Dashboard = () => {

  const dispatch=useDispatch();
  const { products} =  useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  let totalAmount= 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

orders &&
 orders.forEach((item) =>{
 totalAmount+= item.totalPrice;
 });
    

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);



    const labels=["initial amount","Amount Earned"];

    
  const lineState ={
    labels,
    datasets:[{
      label:"Total Amount",
      borderColor:["#00A6B4"],
      backgroundColor:["tomato"],
      hoverBackgroundColor:["blue"],
     
      data:[0, totalAmount]
    }],
  };

  const doughnutState={
    labels:["Out of Stock", "InStock"],
    datasets:[
      {
        backgroundColor:["#6B00B4","#00A6B4"],
        hoverBackgroundColor:["#35014F","#4B5000"],
        data: [outOfStock, products.length - outOfStock],

      }
    ]
  }


  

  return (
    <div className="dashboard">
        <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">

      <Typography component="h1">Dashboard</Typography>

<div className="dashboardSummary">
  <div>
    <p>
      Total Amount <br /> रु.{totalAmount}
    </p>
  </div>
  <div className="dashboardSummaryBox2">
    <Link to="/admin/products">
      <p>Product</p>
      <p>{products && products.length}</p>
    
    </Link>
    <Link to="/admin/orders">
      <p>Orders</p>
      <p>{orders && orders.length}</p>
      
    </Link>
    <Link to="/admin/users">
      <p>Users</p>
      <p>{users && users.length}</p>
    
    </Link>
  </div>
</div>

<div className="linechart">
  <Line data={lineState}></Line>
</div>
<div className="doughnutChart">
<Doughnut data={doughnutState}></Doughnut>
</div>

      </div>

    </div>
  )
}

export default Dashboard