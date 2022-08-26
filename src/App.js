import React, { Component, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import Sample from './components/Sample';
import SampleClassComponent from './components/SampleClassComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"; 
import { Link } from "react-router-dom";
const API_URL = "http://localhost:5000";
const UPLOAD_ENDPOINT = "api/product/upload_files";
function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        loader.file.then((file) => {
          body.append("image", file);
          // let headers = new Headers();
          // headers.append("Origin", "http://localhost:3000");
          fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
            method: "post",
            body: body
            // mode: "no-cors"
          })
            .then((res) => res.json())
            .then((res) => {
              resolve({
                // default: `${API_URL}/${res.filename}`
                default: `${API_URL}/uploads/${res.fileName}`
              });
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    }
  };
}
function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

// class App extends Component {
 
//     render() {
  function App(){
      let name ='limo';
      const [addData, setVal] = useState("");
      const [addedData, showData] = useState(0);
      const handleChange = (e, editor) =>{
        const data = editor.getData();
        setVal(data)
        console.log('From custom handle change data',JSON.stringify(data));
      }
      const handleSubmit = event => {
        event.preventDefault();
        console.log('You have submitted the form.',JSON.stringify(addData))
        event.preventDefault();
        const blog = {
          content: addData,
          userID: '63039e0eb641a2cadf1abd9e'
        }
        axios.post('http://localhost:5000/api/blog/createPost', { blog })
          .then(res=>{
            console.log(res);
            console.log(res.data);
            
          })


      }
        return (
            <div className="App">
              <nav
                    style={{
                      borderBottom: "solid 1px",
                      paddingBottom: "1rem",
                    }}
                  >
                    <Link to="/">Home</Link> |{" "}
                    <Link to="/blog">Blogs</Link> |{" "}
                    <Link to="/addablog">Add A Blog</Link>
            </nav>
              <form encType='multipart/form-data' method='post'  onSubmit={handleSubmit}>
                <h2>Using CKEditor 5 build in React {name}</h2>
                <CKEditor
                  config={{
                    extraPlugins: [uploadPlugin]
                  }}
                    editor={ ClassicEditor }
                    data= {addData}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    // onChange={ ( event, editor ) => {
                    //     const data = editor.getData();
                    //     console.log( { event, editor, data } );
                    //     handleChange(event,editor)
                    // } },
                    onChange={handleChange}
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                <input className='btn-primary' type='submit' value='Submit ' />
                   
                </form>
                {/* <button onClick={()=> showData(!addedData)}> {addedData ? 'hide' : 'show'} </button> */}
                <div>Limon div :  {parse(addData) }</div>
            </div>
        );
    }
// }

export default App;
