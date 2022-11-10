import React, { createContext, useState } from 'react'
import Form from './Form'
import Table from './Table'
export const displayContext = createContext();
const Main = () => {
    const [display, setDisplay] = useState("none");
    const [updateMode, setUpdateMode] = useState(false);
    const [mainList, setMainList] = useState([]);
    const [id, setId] = useState()
    return (
        <displayContext.Provider value={{ display, setDisplay, mainList, setMainList, updateMode, setUpdateMode, id, setId }}>
            <div className='main-container'>
                <Table />
                <Form />
            </div>
        </displayContext.Provider>

    )
}

export default Main