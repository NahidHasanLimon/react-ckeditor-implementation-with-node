import React, { Component, useState } from 'react';

import Editor from './Editor';
import parse from 'html-react-parser';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"; 
import { Link } from "react-router-dom";
const API_URL = "http://localhost:5000";
const UPLOAD_ENDPOINT = "api/product/upload_files";



const AddBlog = () => {
    const [content, setVal] = useState();
    const handleClick = content => {
        // 👇️ take parameter passed from Child component
        setVal(current =>  content);
        // setVal(current => current + content);
        console.log('handle clicked', content)
      };

     const handleSubmit = event => {
        event.preventDefault();
        console.log('You have submitted the form.',JSON.stringify('addData'))
        const blog = {
          content: content,
          userID: '63039e0eb641a2cadf1abd9e'
        }
        axios.post('http://localhost:5000/api/blog/createPost', { blog })
          .then(res=>{
            console.log(res);
            console.log(res.data);
            
          })


      }
    return (
        <div>
        <header> 
        <nav style={{borderBottom: "solid 1px",   paddingBottom: "1rem",  }} >
            <Link to="/">Home</Link> |{" "}
            <Link to="/blog">Blogs</Link> |{" "}
            <Link to="/addablog">Add A Blog</Link>
        </nav>
        <h1>This is a AddBlog Component</h1>
        </header>
        <form encType='multipart/form-data' method='post'  onSubmit={handleSubmit}>
                <h2>Using CKEditor 5 build in React </h2>
                <Editor handleClick={handleClick}></Editor>
                <input className='btn-primary' type='submit' value='Submit ' />
                   
                </form>
        </div>
        
    )
}
export default AddBlog;