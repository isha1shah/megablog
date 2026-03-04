import React, { useState, useEffect } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {
  
  const [post, setPost] = useState(null)

  
  const { slug } = useParams()
  const navigate = useNavigate()

  
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post) 
        }
      })
    } else {
      navigate('/') 
    }
  }, [slug, navigate])

  
  return post ? (
    <div className="py-8 bg-gray-50">
      <Container>
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Post</h1>
        <PostForm post={post} />
      </Container>
    </div>
  ) : (
    <div className="py-8 text-center">
      <p className="text-gray-500">Loading post...</p>
    </div>
  )
}

export default EditPost
