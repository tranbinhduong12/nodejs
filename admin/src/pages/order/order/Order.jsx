import "./Order.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';


export default function Order() {
  // get data user from http://localhost:8000/v1/user
  document.title = "Order details";
  const id = window.location.pathname.split("/")[2];
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const res = await axios.get(`http://localhost:8000/v1/order/${id}`);
    setData(res.data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleClickAccepted = async () => {
    let statusOrder = "Accepted";
    const res = await axios.put(`http://localhost:8000/v1/order/${id}`, {
      status: statusOrder
    });
    getData();
  }

  const handleClickRejected = async () => {
    let statusOrder = "Rejected";
    const res = await axios.put(`http://localhost:8000/v1/order/${id}`, {
      status: statusOrder
    });

    getData();
  }



  return (
    <div className="userList">
      <div className="userListTitleContainer">
        <h1 className="userListTitle">Order list</h1>
      </div>
      <div className="inforProduct">
        <div className="inforProductinfor">
          <Link to="/orders">Trở về</Link>
          <p>
            <span>Order ID: </span> 
            {data._id}
          </p>
          <p>
            <span>Order date: </span>
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span>Order status: </span>
            {data.status}
          </p>
          <p>
            <span>Order total: </span>
            {data.totalPrice}$
          </p>
          {/* button */}
          {
            data.status === "Pending" ? (
              <div>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={ handleClickAccepted } endIcon={<DoneIcon />}>
                      Accept
                    </Button>
                    <Button variant="outlined" onClick={ handleClickRejected } startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                  </Stack>
              </div>
            ) : (
              <Button variant="contained" disabled endIcon={<DoneIcon />}>
                Order has been {data.status}
              </Button>
            )
          }
        </div>
        <div className="inforProductinforUser">
          <p>
            <span>id: </span>
            {data.user ? data.userId : "No data"}
          </p>
          <p>
            <span>User name: </span>
            {data.user ? data.user.username : "No data"}
          </p>
          <p>
            <span>User email: </span>
            {data.user ? data.user.email : "No data"}
          </p>
          <p>
            <span>User phone: </span>
            {data.user ? data.user.phone : "No data"}
          </p>
          <p>
            <span>User address: </span>
            {data.user ? data.user.address : "No data"}
          </p>
        </div>

      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>productId</TableCell>
              <TableCell align="center">name product</TableCell>
              <TableCell align="center">price</TableCell>
              <TableCell align="center">quantity</TableCell>
              <TableCell align="center">total price</TableCell>
              <TableCell align="center">View product</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* loading */}
            {loading ? (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Loading...
                </TableCell>
                <TableCell align="center">Loading...</TableCell>
                <TableCell align="center">Loading...</TableCell>
                <TableCell align="center">Loading...</TableCell>
                <TableCell align="center">Loading...</TableCell>
                <TableCell align="center">Loading...</TableCell>
              </TableRow>
            ) : (
              // data map
              data.products ? (data.products.map((item) => (
                <TableRow
                  key={item.productId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.productId}
                  </TableCell>
                  <TableCell 
                    align="center" 
                    style={{display: "flex", alignItems: "center"}}
                  >
                    <img 
                      style={{width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
                      src={item.image} 
                      alt={item.name} />
                    {item.name}
                  </TableCell>
                  <TableCell align="center">{item.price}$</TableCell>
                  <TableCell align="center">
                    {item.quantity} product
                  </TableCell>
                  <TableCell align="center">
                    {item.price * item.quantity}$
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/product/${item.productId}`} style={{textDecoration: 'none'}}>
                      <Button variant="contained">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))) : (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    No data
                  </TableCell>
                  <TableCell align="center">No data</TableCell>
                  <TableCell align="center">No data</TableCell>
                  <TableCell align="center">No data</TableCell>
                  <TableCell align="center">No data</TableCell>
                  <TableCell align="center">No data</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
