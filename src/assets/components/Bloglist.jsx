import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Bloglist = () =>{



  const baseApiUrl = "http://localhost:3000"

  const fetchPosts = () => {
    axios.get(`${baseApiUrl}/posts`)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error('Errore durante il caricamento dei post:', error)
      })
  }

  useEffect(() => {
    fetchPosts()
  }, [])


  return (
    <div className="container my-5">

    </div>
  )


}



export default Bloglist