import axios from "axios";
import React, { useEffect, useState } from "react";
import '../Form-Styles/CreatingFormData.scss'
import { useNavigate, useParams } from "react-router-dom";
import logo from '../Assets/images/forms-logo.png'
function CreatingFormData() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");


  const { id } = useParams()



  useEffect(() => {
    if (id)
      formGetId(id)
  }, [id])

  async function postdata() {
    let url = `${process.env.REACT_APP_API_URL}`;
    await axios.post(url, {
      "title": title,
      "author": author
    })
  }

  const navigate = useNavigate();

  const handleclick = () => {
    id ? formEditData(id) : postdata()
    navigate('/')
  }


  async function formGetId(id) {
    let url = `http://localhost:3000/posts/${id}`
    const res = await axios.get(url)
    setTitle(res.data.title);
    setAuthor(res.data.author)
  }


  async function formEditData(id) {

    let url = `http://localhost:3000/posts/${id}`
    await axios.put(url, { id, title, author })
  }

  return (
    <div className="App">

      <div className="header">

        <img className="header-logo p-1" src={logo} alt="logo" /><span className="forms">Forms</span>
      </div>
      <form className="form container w-50 p-3 position-fixed top-50 start-50 translate-middle rounded" >
        <div className="form-group ">
          <label htmlFor="formGroupExampleInput" className="text-dark">Title</label>
          <input
            type="text"
            className="form-control mt-3 mb-3"
            placeholder="Book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group mx-auto">
          <label htmlFor="formGroupExampleInput2" className="text-dark">Author</label>
          <input
            type="text"
            className="form-control mt-3 mb-3 "
            placeholder="Author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <button className="btn btn-outline-danger" onClick={handleclick}>{id ? "Edit Changes" : "Create"}</button>
      </form>
    </div>
  );





}


export default CreatingFormData;
