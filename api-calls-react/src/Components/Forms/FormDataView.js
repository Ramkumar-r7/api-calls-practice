import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { MdDeleteSweep } from 'react-icons/md'
import '../Form-Styles/FormDataView.scss'
import logo from '../Assets/images/forms-logo.png'
function FormDataView() {

  const [data, setData] = useState([]);
  const [deleteshow, setDeleteShow] = useState(false)
  const [databyID, setDatabyID] = useState({
    id: "",
    title: "",
    author: ""

  });
  useEffect(() => {
    getData();
  }, [])

  const navigate = useNavigate();
  const handleclick = () => {
    navigate('/forms')
  }


  const handleDelete = () => {
    setDeleteShow(true)
  }

  async function getData() {
    let url = 'http://localhost:3000/posts';
    const res = await axios.get(url);
    setData(res.data);
  }

  async function formGetId(id) {
    let url = `http://localhost:3000/posts/${id}`
    const res = await axios.get(url)
    setDatabyID(res.data)
  }


  async function formDeleteData(id) {
    let url = `http://localhost:3000/posts/${id}`
    await axios.delete(url, databyID)
    getData()
  }

  return (

    <div className='formDataview'>
      <div className="header2">
        <img className="header2-logo p-1" src={logo} alt="logo" /><span className="forms">Forms</span>
        <button className='btn btn-outline-danger float-right' onClick={handleclick}>New form</button>
      </div>

      <table className="table table-striped ">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Title of the Book</th>
            <th scope="col">Author of the Book</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {data.map((value, index) =>
          <tbody key={value.id}>
            <tr style={{ height: '1rem' }} >

              <th scope="row" >{index + 1}</th>
              <td> {value.title} </td>
              <td>{value.author}</td>
              <td><span className=' edit fs-4'><AiFillEdit onClick={() => { navigate(`/${value.id}`); formGetId(value.id) }} /></span><span className=' delete fs-4 p-3'><MdDeleteSweep onClick={() => { handleDelete(); formGetId(value.id) }} /></span></td>
            </tr>

          </tbody>
        )}
      </table>
      {deleteshow ? <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <p>Are you sure you want to Delete this item?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-danger" onClick={() => {  formDeleteData(databyID.id) ; setDeleteShow(false) }}>Delete</button>
              <button type="button" className="btn btn-secondary" onClick={() => setDeleteShow(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div> : null}

    </div>
  )
}

export default FormDataView
