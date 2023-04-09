import "./Category.css";
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


export default function UserList() {
  // get data user from http://localhost:8000/v1/user
  document.title = "Category List";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // paging data user
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getData = async () => {
    setLoading(true);
    const res = await axios.get('http://localhost:8000/v1/category');
    setData(res.data);
    setLoading(false);
    setPage(1);
    if (res.data.length % 10 !== 0) {
      setLimit(Math.ceil(res.data.length / 10));
    }else{
      setLimit(res.data.length / 10);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="userList">
      <div className="userListTitleContainer">
        <h1 className="userListTitle">Category List</h1>
        <Link to="/add-category">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell align="center">description</TableCell>
              <TableCell align="center">Product Count</TableCell>
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
              </TableRow>
            ) : (
              // data
              data.slice((page - 1) * 10, page * 10).map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left" >
                    <div className="tdUserList">
                      <img 
                        className="userListImg"
                        src={item.image}
                        alt="" 
                      />
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ maxWidth: "200px" }}>{item.description}</TableCell>
                  <TableCell align="center">{item.products.length}</TableCell>
                  <TableCell align="center">
                    <Link to={`/category/${item.id}`}>
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
