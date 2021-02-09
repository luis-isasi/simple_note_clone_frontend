export type Note = {
  id: string;
  text: string;
  user: User;
  pinned: boolean;
  isMarkdown: boolean;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
};

export type User = {
  id: string;
  email: string;
};

export type Tag = {
  id: string;
  name: string;
};
