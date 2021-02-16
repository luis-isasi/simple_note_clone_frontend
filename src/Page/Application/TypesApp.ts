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

export type Theme = {
  colorIconSelect: string;
  colorText: string;
  colorTextNote: string;
  backgroundColor: string;
  colorBorder: string;
  backgroundTag: string;
  colorTag: string;
  backgroundHoverTag: string;
  backgroundSelectNote: string;
  backgroundSelectMainOptions: string;
  backgroundHoverNote: string;
  backgroundContentModal: string;
  backgroundColorScroll: string;
  borderColorScroll: string;
};
