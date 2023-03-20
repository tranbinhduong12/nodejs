import "./chatList.css";
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


export default function ChatList() {
  // get data user from http://localhost:8000/v1/user
  document.title = "Tag chat List";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // paging data user
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [tagName, setTagName] = useState("")

  const getData = async () => {
    setLoading(true);
    const res = await axios.get('http://localhost:8000/v1/chat');
    setData(res.data.intents);
    setLoading(false);
    setPage(1)
    if (res.data.intents.length % 10 !== 0) {
      setLimit(Math.ceil(res.data.intents.length / 10));
    }else{
      setLimit(res.data.intents.length / 10);
    }
  }

  const handleChangeTagName = (e) => {
    setTagName(e.target.value);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="userList">
      <div className="userListTitleContainer">
        <h1 className="userListTitle">Tag chat List</h1>
        <OutlinedInput onChange={ handleChangeTagName } placeholder="Search for tag name" />
        <Link to="/add-tag">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tag name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Number patterns</TableCell>
              <TableCell align="center">Number responses</TableCell>
              <TableCell align="center">Update last</TableCell>
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
              data.filter((item) => {
                if (tagName === "") {
                  return item
                } else if (item.tag.toLowerCase().includes(tagName.toLowerCase()) || item.description.toLowerCase().includes(tagName.toLowerCase())) {
                  return item
                }
              }).sort((a, b) => {
                return new Date(b.updatedAt) - new Date(a.updatedAt);
              }).slice((page - 1) * 10, page * 10).map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.tag}
                  </TableCell>
                  <TableCell align="left">{item.description}</TableCell>
                  <TableCell align="center">{item.patterns.length}</TableCell>
                  <TableCell align="center">{item.responses.length}</TableCell>
                  <TableCell align="center">{
                    new Date(item.updatedAt).toLocaleDateString()
                  }</TableCell>
                  <TableCell align="center">
                    <Link to={`/chat/${item.id}`}>
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
