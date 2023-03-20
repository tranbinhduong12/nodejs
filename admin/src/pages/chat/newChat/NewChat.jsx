import "./NewChat.css";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

export default function NewChat() {
  document.title = "New tag chat";
  const [Responses, setResponses] = useState([]);
  const [Patterns, setPatterns] = useState([]);
  const [Tag, setTag] = useState("");
  const [Description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();  
    const data = {
      tag: Tag,
      description: Description,
      patterns: Patterns,
      responses: Responses
    }
    // config header
    var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNWZhODVlNDBiYTI1OTk0NWMyNmI3NyIsImFkbWluIjp0cnVlLCJpYXQiOjE2NzQ4OTk5MzAsImV4cCI6MTcwNjQzNTkzMH0.7m9wDOtRxcEbirIfL0r2rE-l4GkjDbeLX8AqxqJRCzM");

  var raw = JSON.stringify(data);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:8000/v1/chat/create", requestOptions)
    .then(response => response.text())
    .then(result => alert("Create tag chat success"))
    .catch(error => console.log('error', error));
  setTag("");
  setDescription("");
  setPatterns([]);
  setResponses([]);
  };

  const handleAddResponse = (e) => {
    const value = document.getElementById("handleAddResponse").value;
    if (value === "") return;
    setResponses([...Responses, value]);
    document.getElementById("handleAddResponse").value = "";
  }

  const handleAddPatern = (e) => {
    const value = document.getElementById("handleAddPatern").value;
    if (value === "") return;
    setPatterns([...Patterns, value]);
    document.getElementById("handleAddPatern").value = "";
  }

  const removeReponse = (e) => {
    const value = e.target.parentElement.innerText;
    const index = Responses.indexOf(value);
    const newResponses = Responses.filter((item, i) => i !== index);
    setResponses(newResponses);
  }

  const removePattern = (e) => {
    const value = e.target.parentElement.innerText;
    const index = Patterns.indexOf(value);
    const newPatterns = Patterns.filter((item, i) => i !== index);
    setPatterns(newPatterns);
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Tag chat</h1>
      <form className="newUserForm" onSubmit={ handleSubmit }>
        <div className="newUserItem">
          <label>TagName</label>
          <input type="text" name="tag" defaultValue={Tag} required onChange={
            (e) => {
              setTag(e.target.value);
            }
          } placeholder="tag name...." />
        </div>
        <div className="newUserItem">
          <label>description</label>
          <input type="text" name="description" required defaultValue={Description} onChange={
            (e) => {
              setDescription(e.target.value);
            }
          } placeholder="description..." />
        </div>
        <div className="newUserItem newUserItem-add">
          <label>patterns</label>
          <div className="add-input">
            <input type="text" name="patterns" id="handleAddPatern" placeholder="patterns" />
            <button type="button" className="newUserButton" onClick={handleAddPatern}>add patterns</button>
          </div>
        </div>
        <div className="newUserItem newUserItem-add">
          <label>responses</label>
          <div className="add-input">
            <input type="text" name="responses" id="handleAddResponse" placeholder="responses" />
            <button type="button" className="newUserButton" onClick={handleAddResponse}>add responses</button>
          </div>
          
        </div>

        <div className="newUserItem">
          <button className="newUserButton">Create new tag</button>
        </div>
      </form>
      <Link to="/chats">
        <button className="button-back">Back to list tag</button>
      </Link>

      {/* table */}
      <div className="newUserTable">
        <div className="table-right-left">
          <h2>
            <span className="table-title">Patterns</span>
          </h2>
          <ol type="1">
            {
              Patterns.map((item, index) => {
                return (
                  <li key={index}>
                    {item}
                    <CloseIcon className="icon-close" onClick={removePattern}/>
                  </li>
                )
              })
            }
          </ol>
        </div>
        
        <div className="table-right-left">
          <h2>
            <span className="table-title">Responses</span>
          </h2>
          <ol>
          {
            Responses.map((item, index) => {
              return (
                <li key={index}>
                  {item}
                  <CloseIcon className="icon-close" onClick={removeReponse} />
                </li>
              )
            })
          }
          </ol>
        </div>
      </div>

    </div>
  );
}
