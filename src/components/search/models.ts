import { Dispatch, SetStateAction } from 'react';
import { IBookmarks, TRequest } from '../../models/models';
// import { IBookmarks, TRequest } from '../../../models/models';

export interface IDataProps<T> {
  data: T[] | [];
  setData: Dispatch<SetStateAction<T[] | []>>;
  getData: (request: TRequest) => Promise<void>;
  getParameters: TRequest;
  searchUrl: string;
}

export interface IResponse<T> {
  data: T[] | [];
}
