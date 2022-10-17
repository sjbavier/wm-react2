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

export type TResponseReferenceStructure = {
  hash: string;
  path: string;
  reference_structure_id: number;
  structure?: string;
};

export type TStructure = {
  children?: TStructure[];
  name: string;
  path: string;
  type: 'directory' | 'file';
};
