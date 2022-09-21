import React from 'react';
import { useParams, useNavigate } from 'react-router';

import { usePosts } from '../components/PostProvider';
import Button from '../components/Button/Button';
import Snackbar from '../components/Snackbar/Snackbar';

import styles from './EditPostPage.module.css';
import ImagePicker from '../components/ImagePicker/ImagePicker';

function EditPostPage() {
  const { getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const post = getPost(id);
  const [text, setText] = React.useState(post?.text || '');
  const [openSnack, setOpenSnack] = React.useState(false);
  const [image, setImage] = React.useState(post?.image);

  const updatePostHandler = (e: React.FormEvent) => {
    e.preventDefault();
    updatePost(id, text, image);
    setOpenSnack(true);
  };

  return (
    <div className="App">
      <Button className={styles.backBtn} onClick={() => navigate('/' + id)}>
        Back
      </Button>
      <form onSubmit={updatePostHandler}>
        <ImagePicker src={image} onChange={(_, url) => setImage(url)} />
        <input
          className={styles.input}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <Button>Valider</Button>
      </form>

      <Snackbar show={openSnack} onClose={() => setOpenSnack(false)}>
        Modification réussie
      </Snackbar>
    </div>
  );
}

export default EditPostPage;
