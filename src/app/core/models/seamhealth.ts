export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostParams {
  _page: number;
  _limit: number
}
