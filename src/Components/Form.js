import React, { useContext, useState } from "react";
import { displayContext } from "./Main";
import axios from 'axios'
const Form = () => {
  const { display, setDisplay, setMainList, updateMode, id, setUpdateMode } = useContext(displayContext);
  const [user, setUser] = useState({});

  const handleText = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((olduser) => {
      return { ...olduser, [name]: value }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (updateMode) {
        const res = await axios.post("http://localhost:4000/api/updateuser", { user, id })
        if (res.status === 200) {

          setDisplay('none')
          setUser(
            {
              name: "",
              phone: "",
              email: "",
              hobbies: ""
            }
          )
          setUpdateMode(false)

        }
      } else {
        const res = await axios.post("http://localhost:4000/api/adduser", user)
        if (res.status === 200) {
          setMainList((m) => {
            return [...m, user]
          })
          setDisplay('none')
          setUser(
            {
              name: "",
              phone: "",
              email: "",
              hobbies: ""
            }
          )
        }
      }


    } catch (err) {
      alert("Failed")
    }
  }


  return (
    <div className="form-style-6" style={{ display }}>
      <div className="header">
        <h1>{updateMode ? "Edit User" : "Add user"} </h1>
        <i
          class="fa-solid fa-xmark"
          onClick={() => {
            setDisplay("none");
            setUpdateMode(false)
          }}

        ></i>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" value={user.name} onChange={handleText} name="name" placeholder="Full Name" />
        <input type="email" value={user.email} onChange={handleText} name="email" placeholder="Email" />
        <input type="text" value={user.phone} onChange={handleText} name="phone" placeholder="Phone No" />
        <textarea name="hobbies" value={user.hobbies} onChange={handleText} placeholder="Hobbies" defaultValue={""} />
        <input type="submit" defaultValue="Add" />
      </form>
    </div>
  );
};

export default Form;
