export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
  page?: number;
}

export interface PostParams {
  _page: number;
  _limit: number
}
