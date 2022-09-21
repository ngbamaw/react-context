import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import PostsProvider, { usePosts } from './components/PostProvider';
import HomePage from './pages/Home';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';

import './App.css';

function App() {
  return (
    <PostsProvider>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path=":id">
            <Route index element={<PostPage />} />
            <Route path="edit" element={<EditPostPage />} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </PostsProvider>
  );
}

export default App;
