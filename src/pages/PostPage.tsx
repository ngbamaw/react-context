import React from 'react';
import { useParams, useNavigate } from 'react-router';

import { usePosts } from '../components/PostProvider';
import Button from '../components/Button/Button';

import styles from './PostPage.module.css';

function PostPage() {
  const { deletePost, getPost } = usePosts();
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const deletePostHandler = () => {
    deletePost(id);
    navigate('/');
  };

  const post = getPost(id);

  return (
    <div className={styles.post}>
      <Button className={styles.backBtn} onClick={() => navigate('/')}>
        Back
      </Button>
      <div className={styles.content}>
        <p>{post?.text}</p>
        <Button onClick={deletePostHandler}>Delete</Button>
        <Button onClick={() => navigate('edit')}>Edit</Button>
      </div>
    </div>
  );
}

export default PostPage;
