import React from 'react';
import { Link } from 'react-router-dom';

import { usePosts } from '../components/PostProvider';
import Button from '../components/Button/Button';

import styles from './Home.module.css';

function HomePage() {
  const { posts, deletePost, addPost, persist } = usePosts();
  const [text, setText] = React.useState('');

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost(text);
        }}
      >
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <Button>Submit</Button>
      </form>

      <Button onClick={() => persist(posts || [])}>Save</Button>

      <ul className={styles.listPost}>
        {posts?.map(({ id, text, image }) => (
          <li className={styles.post} key={id}>
            <Link to={id}>{text}</Link>
            <img src={image} alt="post" />
            <Button
              className={styles.deleteButton}
              onClick={() => deletePost(id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
