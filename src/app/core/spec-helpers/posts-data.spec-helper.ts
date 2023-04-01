import { Posts } from '../models';

export const userId = 1;
export const id = 1;
export const title =
  'sunt aut facere repellat provident occaecati excepturi optio reprehenderit';
export const body =
  'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto';

export const postData: Posts = {
  userId,
  id,
  title,
  body,
};

export const postsData: Posts[] = [postData];
