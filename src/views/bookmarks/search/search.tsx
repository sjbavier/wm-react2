import { Form, Input } from 'antd';
import { debounce } from 'lodash';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { NeuInput } from '../../../components/form/input/NeuInput';
import useClient from '../../../hooks/useClient';
import { VERBOSITY } from '../../../lib/constants';
import { IBookmarks, TRequest } from '../../../models/models';

interface IBookmarksProps {
  bookmarks: IBookmarks[] | [];
  setBookmarks: Dispatch<SetStateAction<IBookmarks[] | []>>;
  getBookmarks: (request: TRequest) => Promise<void>;
  getParameters: TRequest;
}

function Search({
  setBookmarks,
  getBookmarks,
  getParameters
}: IBookmarksProps) {
  const [search, setSearch] = useState('');
  const { fetchMe, loading: isLoading } = useClient(VERBOSITY.NORMAL);

  interface IResponse {
    data: IBookmarks[];
  }

  const debouncedSearch = useRef(
    debounce(async (request: TRequest) => {
      const response: IResponse = await fetchMe(request);
      setBookmarks(response?.data);
    }, 1000)
  ).current;

  const onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue: string = ev.target.value.trim();
    if (searchValue === '') {
      getBookmarks(getParameters);
    } else {
      setSearch(searchValue);
      searchSubmit(searchValue);
    }
  };

  const searchSubmit = async (e: string) => {
    const request: TRequest = {
      method: 'GET',
      path: `/api/bookmarks/search/${e}`
    };
    if (!isLoading) {
      debouncedSearch(request);
    }
  };

  return (
    <Form
      labelCol={{ span: 2 }}
      onFinish={(values) => searchSubmit}
      style={{ marginTop: '2rem' }}
    >
      <Form.Item name="search" hasFeedback>
        <NeuInput
          placeholder="search"
          type="text"
          value={search}
          onChange={onSearchChange}
          autoFocus={true}
        />
      </Form.Item>
    </Form>
  );
}

export default Search;
