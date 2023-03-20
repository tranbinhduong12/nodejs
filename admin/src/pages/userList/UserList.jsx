import "./userList.css";
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
import OutlinedInput from '@mui/material/OutlinedInput';


export default function UserList() {
  // get data user from http://localhost:8000/v1/user
  document.title = "List user";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // paging data user
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [username, setUsername] = useState("")

  const getData = async () => {
    setLoading(true);
    const res = await axios.get('http://localhost:8000/v1/user');
    setData(res.data);
    setLoading(false);
    setPage(1);
    if (res.data.length % 10 !== 0) {
      setLimit(Math.ceil(res.data.length / 10));
    }else{
      setLimit(res.data.length / 10);
    }
  }

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="userList">
      <div className="userListTitleContainer">
        <h1 className="userListTitle">User List</h1>
        <OutlinedInput onChange={ handleChangeUsername } placeholder="Search for username" />
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Created at</TableCell>
              <TableCell align="center">View</TableCell>
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
              </TableRow>
            ) : (
              // data
              data.filter((item) => {
                if (username === "") {
                  return item;
                } else if (item.username.toLowerCase().includes(username.toLowerCase())) {
                  return item;
                }
              }).reverse().slice((page - 1) * 10, page * 10).map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.username}
                  </TableCell>
                  <TableCell align="left">{item.email}</TableCell>
                  <TableCell align="center">{
                    new Date(item.createdAt).toLocaleDateString()
                  }</TableCell>
                  <TableCell align="center">
                    <Link to={`/user/${item.id}`}>
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
