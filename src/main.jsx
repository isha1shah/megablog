
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store.js';
import App from './App.jsx';
import './index.css';

// Pages
import Home from './pages/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './pages/Signup.jsx';
import AllPosts from './pages/AllPosts.jsx';
import AddPost from './pages/AddPost.jsx';
import EditPost from './pages/EditPost.jsx';
import Post from './pages/Post.jsx';
import { AuthLayout } from './components/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* REMOVE basename="/megablog/" */}
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} /> {/* Fixed capitalization */}
            <Route path="all-posts" element={<AllPosts />} />
            <Route path="add-post" element={<AddPost />} />
            <Route path="edit-post/:slug" element={<EditPost />} />
            <Route path="post/:slug" element={<Post />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);