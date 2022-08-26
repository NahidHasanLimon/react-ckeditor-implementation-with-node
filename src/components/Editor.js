import React, { Component, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"; 
import { Link } from "react-router-dom";
// import ImageRemoveEventCallbackPlugin from 'ckeditor5-image-remove-event-callback-plugin';
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
  function removeImageAdapter(loader) {
    return {
      imageRemoveEvent: () => {
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
  function ImageRemoveEventCallbackPlugin(editor) {
    editor.plugins.get("FileRepository").CreateImageResizeEditing  = (loader) => {
      // return uploadAdapter(loader);
    };
    console.log('From Image remove')
  }
  // function ImageRemoveEventCallbackPluginCustom(editor) {
  //   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
  //     return uploadAdapter(loader);
  //   };
  // }


const Editor = ({handleClick}) => {
      const handleChange = (e, editor) =>{
        const data = editor.getData();
        handleClick(data)
        console.log('From custom handle change data',JSON.stringify(data));
      }
      
    return (
        <div>
                <CKEditor
                  config={
                    {
                    extraPlugins: [uploadPlugin,ImageRemoveEventCallbackPlugin],
                    
                    image: {
                      resizeOptions: [
                        {
                            name: 'resizeImage:original',
                            value: null,
                            icon: 'original'
                        },
                        {
                            name: 'resizeImage:50',
                            value: '50',
                            icon: 'medium'
                        },
                        {
                            name: 'resizeImage:75',
                            value: '75',
                            icon: 'large'
                        }
                      ],
                      toolbar: [
                          'imageStyle:inline',
                          'imageStyle:block',
                          'imageStyle:side',
                          '|',
                          'toggleImageCaption',
                          'imageTextAlternative'
                      ]
                  },
                    table: {
                      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                    }
                    // builtinPlugins:[ImageRemoveEventCallbackPlugin] 
                  }
                }
                    editor={ ClassicEditor }
                    data= ''
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={handleChange}
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                    imageRemoveEvent={ ( event, editor ) => {
                      console.log( 'imageRemoveEvent.', editor );
                  } }
                    
                />
        </div>
        
    )
}
export default Editor;