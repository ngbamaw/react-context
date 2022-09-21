import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import shortid from 'shortid';

import { IPost } from '../types';
// import { fetchAll, persist as persistData } from '../services/api';
import useStorage from '../hooks/useStorage';

type Context = {
  posts: IPost[] | null;
  updatePostsContext?: () => Promise<void>;
  updatePost: (id: string, text: string, image?: string) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  addPost: (text: string, image?: string) => Promise<void>;
  getPost: (id: string) => IPost | null;
  persist: (posts: IPost[]) => Promise<void>;
};

const StateContext = createContext<Context>({
  posts: null,
  updatePostsContext: () => Promise.resolve(),
  updatePost: () => Promise.resolve(),
  deletePost: () => Promise.resolve(),
  addPost: () => Promise.resolve(),
  getPost: () => null,
  persist: () => Promise.resolve(),
});

interface Props {
  children: ReactNode;
}

const initialData: IPost[] = [
  {
    id: shortid.generate(),
    text: 'Hello world',
  },
  {
    id: shortid.generate(),
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
  },
];

const PostsProvider = ({ children }: Props) => {
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [value, setValue] = useStorage('posts', initialData);

  useEffect(() => {
    setPosts(value);
  }, [value]);

  const deletePost = useCallback(
    async (id: string) => {
      if (posts) setPosts(posts.filter((post) => post.id !== id));
    },
    [posts],
  );

  const addPost = useCallback(
    async (text: string, image?: string) => {
      if (posts) setPosts([{ id: shortid.generate(), text, image }, ...posts]);
    },
    [posts],
  );

  const updatePost = useCallback(
    async (id: string, text: string, image?: string) => {
      if (posts) {
        const post = posts.find((post) => post.id === id);
        if (post) {
          const newPost = { ...post, text, image };
          setPosts(posts.map((post) => (post.id === id ? newPost : post)));
        }
      }
    },
    [posts],
  );

  const getPost = useCallback(
    (id: string) => {
      if (posts) return posts.find((post) => post.id === id) || null;
      return null;
    },
    [posts],
  );

  const persist = (posts: IPost[]) => setValue(posts);

  if (!posts) return <p>Loading...</p>;

  return (
    <StateContext.Provider
      value={{
        posts,
        // updatePostsContext: fetch,
        updatePost,
        deletePost,
        addPost,
        getPost,
        persist,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const usePosts = () => useContext(StateContext);
/* export const usePersist = () => {
  const { persist } = useContext(StateContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const action = useCallback(
    (posts: IPost[]) => {
      persist(posts)
        .then(() => {
          setSuccess(true);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          setError(e);
          setIsError(true);
          setSuccess(false);
        });

      setLoading(false);
      setError(null);
      setIsError(false);
      setSuccess(false);
    },
    [persist],
  );
  return { persist: action, success, loading, error, isError };
}; */

export default PostsProvider;
