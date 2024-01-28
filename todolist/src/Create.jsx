import React, { useState } from "react";
import axios from "axios"
import "./App.css";


function Create() {
  const [task,setTask]=useState("")

  const handleAdd=() => {
    axios.post("http://localhost:5000/add",{task:task})
    .then(result =>{
      location.reload()
    })
    .catch(err => console.log(err))


  }

  return (
    <div>
      <input
        style={{
          width: "300px",
          padding: "10px",
          borderBottom: "2px solid",
          outline: "none",
        }}
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="button" type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
