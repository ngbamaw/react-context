import shortid from 'shortid';
import { IPost } from '../types';

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

let data: IPost[] = initialData;

const storage = localStorage.getItem('data_react_context');
console.log(storage);

if (storage) {
  data = JSON.parse(storage);
}

export const fetchAll = async () => {
  return data;
};

/* export const deletePost = async (id: number) => {
    return data.filter((post) => post.id !== id);
} */

export const persist = async (posts: IPost[]) => {
  localStorage.setItem('data_react_context', JSON.stringify(posts));
};
