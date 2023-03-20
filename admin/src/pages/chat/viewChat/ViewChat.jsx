import "./ViewChat.css";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { useEffect } from "react";

export default function ViewChat() {
  const [Responses, setResponses] = useState([]);
  const [Patterns, setPatterns] = useState([]);
  const [Tag, setTag] = useState("");
  const [Description, setDescription] = useState("");
  const [data, setData] = useState({});
  document.title = `view tag ${data.tag}`;

  const id = window.location.pathname.split("/")[2];

  const handleSubmit = (e) => {
    e.preventDefault();  
    const data = {
      tag: Tag,
      description: Description,
      patterns: Patterns,
      responses: Responses
    }
    // config header to update method put
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch(`http://localhost:8000/v1/chat/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        getData();
        alert("Update tag chat success")
      })
      .catch(error => console.log('error', error));
 
  };

  // get data
  const getData = async () => {
    // config header
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:8000/v1/chat/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => setDataRequest(result))
      .catch(error => console.log('error', error));
  };

  function setDataRequest(data){
    setData(data);
    setTag(data.tag);
    setDescription(data.description);
    setPatterns(data.patterns);
    setResponses(data.responses);
  }

  // call getData
  useEffect(() => {
    getData();
  }, []);

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
      <h1 className="newUserTitle">Edit tag {data.tag}</h1>
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
          <button className="newUserButton">Edit tag</button>
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
