import "./OrderList.css";
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


export default function OrderList() {
  // get data user from https://nhat-desu-server.onrender.com/v1/user
  document.title = "Order List";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Filter, setFilter] = useState("All");

  // paging data user
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);

  const getData = async () => {
    setLoading(true);
    const res = await axios.get('https://nhat-desu-server.onrender.com/v1/order');
    setData(res.data);
    setLoading(false);
    setPage(1)
    if (res.data.intents.length % 10 !== 0) {
      setLimit(Math.ceil(res.data.intents.length / 10));
    }else{
      setLimit(res.data.intents.length / 10);
    }
  }

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="userList">
      <div className="userListTitleContainer">
        <h1 className="userListTitle">Order list</h1>
        {/* select option */}
        <div className="userListSelect">
          <select onChange={ handleChangeFilter } className="userListSelectOption" name="active" id="active">
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>user name</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Number product</TableCell>
              <TableCell align="center">Total Price</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Created at</TableCell>
              <TableCell align="center">Action</TableCell>
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
              // data
              data.filter((item) => {
                if (Filter === "All") {
                  return item;
                }else{
                  return item.status === Filter;
                }
              }).slice((page - 1) * 10, page * 10).map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link
                      className="link" 
                      to={`/user/${item.userId}`}>
                      {item.user.username}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    {item.user.address}
                    <br />
                    {item.user.phone}
                  </TableCell>
                  <TableCell align="center">{item.products.length}</TableCell>
                  <TableCell align="center">{item.totalPrice}</TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                  <TableCell align="center">{
                    new Date(item.createdAt).toLocaleDateString()
                  }</TableCell>
                  <TableCell align="center">
                    <Link to={`/order/${item._id}`}>
                      <button className="userListEdit">view</button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="userListPaging">
        <button className="userListPagingBtn" onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
        <span className="userListPagingNumber">{page}</span>
        <button className="userListPagingBtn" onClick={() => setPage(page + 1)} disabled={page === limit}>Next</button>
      </div>
    </div>
  );
}
