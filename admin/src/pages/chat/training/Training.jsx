import "./training.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


export default function Training() {
  // set title
  document.title = "Training";
  const [Runing, setRuning] = useState(false);

  const handleSetupData = (e) => {
    if (Runing) return;
    setRuning(true);
    // setup header
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/craw", requestOptions)
      .then(response => response.text())
      .then(result => {
        setRuning(false);
      }
      )
      .catch(error => console.log('error', error));
      
  }

  const handleRunTraining = (e) => {
    if (Runing) return;
    setRuning(true);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:5000/training", requestOptions)
      .then(response => response.text())
      .then(result => {
        setRuning(false);
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className="userList">
      <div className="userListTitleContainer">
        <h1 className="userListTitle">Tag chat List</h1>
      </div>
      {/* if runing to show */}
      {Runing && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <div className="Training-btn">
        <button 
          className="userAddButton" 
          style={{
            backgroundColor: Runing ? "red" : "green",
            cursor: Runing ? "not-allowed" : "pointer"
          }} 
          onClick={handleSetupData}
          >Setup data training</button>
        <button 
          className="userAddButton" 
          style={{
            backgroundColor: Runing ? "red" : "green",
            cursor: Runing ? "not-allowed" : "pointer"
          }}
          onClick={handleRunTraining}
        >Run Training</button>
      </div>
      
    </div>
  );
}
