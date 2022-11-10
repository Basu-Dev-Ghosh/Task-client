import React, { useContext, useEffect, useRef, useState } from "react";
import { displayContext } from "./Main";
import axios from "axios"

const Table = () => {
  const { setDisplay, mainList, setMainList, setUpdateMode, setId, updateMode } = useContext(displayContext);
  const checkboxRef = useRef();
  const allcheckboxRef = useRef();
  const [dataToBeSend, setDataToBeSend] = useState([]);

  // Getting users from mongo DB
  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/getusers')
      if (res.status === 200) {
        const data = res.data;
        setMainList(data);
      }
    } catch (err) {
      alert("Not getting User")
    }
  }

  // Updating user
  const updateUser = async (user) => {
    try {
      setId(user._id)
      setUpdateMode(true);
      setDisplay("block")
    } catch (err) {

    }
  }

  // Deleting User
  const deleteUser = async (id) => {
    try {

      const res = await axios.delete(`http://localhost:4000/api/deleteuser/${id}`)
      if (res.status === 200) {
        setMainList((m) => {
          return m.filter((n) => n._id !== id)
        })
      }
    } catch (err) {

    }
  }

  // Getting data to be send
  const getData = async () => {
    let mark = false;
    checkboxRef.current.childNodes.forEach(element => {
      if (element.children[0].children[0].children[0].checked) {
        setDataToBeSend((d) => [...d, element.children[0].children[0].children[0].value])
        mark = true;
      }
    });
    if (!mark) {
      alert("Please select first")
    }
  }

  // Sending Data
  const sendData = async () => {
    await getData();
    if (dataToBeSend.length !== 0) {
      try {
        const res = await axios.post('http://localhost:4000/api/senddata', { dataToBeSend })
        if (res.status === 200) {
          alert("Mail Sent")
          setDataToBeSend([]);
        }
      } catch (err) {
        alert("Mail Sent failed ")
      }

    } else {
      alert("Click again")
    }

  }

  useEffect(() => {
    getUsers()
  }, [updateMode]);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <table
          className="table"
          style={{
            width: "1000px",
          }}
        >
          <thead>
            <tr>
              <th scope="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    ref={allcheckboxRef}
                    id="flexCheckDefault"
                    onClick={() => {

                      if (allcheckboxRef.current.checked) {
                        checkboxRef.current.childNodes.forEach(element => {
                          element.children[0].children[0].children[0].checked = true
                        });
                      } else {
                        checkboxRef.current.childNodes.forEach(element => {
                          element.children[0].children[0].children[0].checked = false
                        })
                      }
                    }
                    }
                  />
                </div>
              </th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Phone No</th>
              <th scope="col">Email</th>
              <th scope="col">Hobbies</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody ref={checkboxRef}>
            {
              mainList.length === 0 ? <h1>Please add user</h1> : mainList.map((user, index) => {
                return (
                  <>
                    <tr >
                      <th scope="row">
                        <div className="form-check" >
                          <input
                            value={`Name: ${user.name},Phone: ${user.phone},Email: ${user.email},Hobbies: ${user.hobbies}`}
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                          />
                        </div>
                      </th>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td>{user.hobbies}</td>
                      <td>
                        <button onClick={(e) => {
                          updateUser(user)
                        }} style={{ backgroundColor: "#000", color: "#fff", padding: "6px", width: "70px", margin: "0 10px" }}>Edit</button>
                        <button onClick={(e) => {
                          deleteUser(user._id)
                        }} style={{ backgroundColor: "#000", color: "#fff", padding: "6px", width: "80px", margin: "0 10px" }}>Delete</button>
                      </td>
                    </tr>
                  </>
                )
              })
            }
          </tbody>
        </table>
        <div className="buttons" style={{ display: "flex", marginTop: "40px" }}>
          <button onClick={() => setDisplay("block")}>Add</button>
          <button onClick={sendData}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Table;
