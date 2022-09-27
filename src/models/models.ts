import React from 'react';

export type TRequest = {
  method: string;
  path: string;
  data?: any;
  token?: string;
};

export interface IBookmarks {
  title: string;
  bookmark_id: number;
  categories_collection: ICategory[];
  link: string;
}

export interface ICategory {
  name: string;
  category_id: number;
}

export interface DivWrapper extends React.HTMLAttributes<HTMLDivElement> {
  callback?: Function;
}
