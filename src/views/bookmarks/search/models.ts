import { Dispatch, SetStateAction } from 'react';
import { IBookmarks, TRequest } from '../../../models/models';

export interface IBookmarksProps {
  bookmarks: IBookmarks[] | [];
  setBookmarks: Dispatch<SetStateAction<IBookmarks[] | []>>;
  getBookmarks: (request: TRequest) => Promise<void>;
  getParameters: TRequest;
}

export interface IResponse {
  data: IBookmarks[];
}
