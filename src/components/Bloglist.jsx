import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Bloglist = () =>{

  const defaultPost = {
    title: ``,
    content:``,
    image:``,
    tags: []
  }

  const tagsOptions = [
    "Dolci",
    "Torte",
    "Ricette vegetariane",
    "Ricette al forno",
    "Antipasti",
    "Primi piatti",
    "Dolci veloci",
    "Ricette veloci",
    "Dolci al cioccolato",
    "Secondi piatti"
  ]



  const baseApiUrl = "http://localhost:3000"

  const [newPost, setNewPost] = useState(defaultPost);
  const [posts, setPosts] = useState ([]);

  const fetchPosts = () => {
    axios.get(`${baseApiUrl}/posts`)
      .then(res => {
        console.log(res.data);
        setPosts(res.data)
      })
      .catch(error => {
        console.error('Errore durante il caricamento dei post:', error)
      })
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleInputChange = (e) => {
    const {name, value,type,checked} = e.target;
    if (type === "checkbox" && name === "tags"){
      setNewPost( (newForm) => ({
        ...newForm,
        tags: checked ? [...newForm.tags,value]: data.tags.filter((tag)=>tag !== value),
      }))
    } else {
      setNewPost({...newPost, [name]:value})
    }
    
  }

  const handleAddPost = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.image) {
        // imposto l'oggetto da inviare all'API
        const newPostPosted = newPost
        axios.post(`${baseApiUrl}/posts`, newPostPosted)
            .then(res => {
            setPosts(res.data)
            setNewPost(defaultPost);
                })
      
    } else {
      alert('Please fill in the title and image URL.');
    }

  };

  const handleDeletePost = (title) => {
    
    axios.delete(`${baseApiUrl}/posts/${title}`)
    .then(res => {
      fetchPosts()
    })
    .catch(error => {
      console.error("Errore ", error)
    })
  };




  return (
    <div className="container my-5">
            <h1 className="text-center mb-4">Post List</h1>

    <div className="row">
      {posts.map((post) => (
        <div className="col-md-4 mb-4" key={post.id}>
          <div className="card">
            <img src={post.image} className="card-img-top" alt={post.title} />
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">
                {post.tags.map((tag, index) => (
                  <span key={index} className="badge bg-primary me-1">
                    {tag}
                  </span>
                ))}
              </p>
              <button className="btn btn-danger" onClick={() => handleDeletePost(post.id)}>
                  Delete
                </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    <h2 className="text-center mt-5">Add New Post</h2>
      <form onSubmit={handleAddPost} className="mt-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={newPost.image}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="3"
            value={newPost.content}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Tags</label>
          <div>
            {tagsOptions.map((tag) => (
              <div className="form-check form-check-inline" key={tag}>
                <input
                  className="form-check-input"
                  name='tags'
                  type="checkbox"
                  id={`tag-${tag}`}
                  value={tag}
                  checked={newPost.tags.includes(tag)}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor={`tag-${tag}`}>
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Post
        </button>
      </form>
    </div>
  )


}



export default Bloglist