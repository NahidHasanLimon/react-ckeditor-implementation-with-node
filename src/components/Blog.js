import React, { useEffect, useState } from "react"
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
const UsingFetch = () => {
  const [blogs, setBlogs] = useState([])

  const fetchData = () => {
    fetch("http://localhost:5000/api/blog/getBlogs")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setBlogs(data.blogs)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
        <nav style={{borderBottom: "solid 1px",   paddingBottom: "1rem",  }} >
            <Link to="/">Home</Link> |{" "}
            <Link to="/blog">Blogs</Link> |{" "}
            <Link to="/addablog">Add A Blog</Link>
        </nav>
      {blogs.length > 0 && (
        <ul>
          {blogs.map(blog => (
            <div key={blog._id}>
                   <div>
                        <h1>Blog ID : {blog._id}</h1>
                        <div>
                                <div>content : {parse(blog.content)}</div>
                        </div>
                   </div>
                </div>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UsingFetch
