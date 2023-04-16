import { Form } from 'antd';
import { debounce } from 'lodash';
import React, { useRef, useState } from 'react';
import useClient from '../../hooks/useClient';
import { VERBOSITY } from '../../lib/constants';
import { TRequest } from '../../models/models';
import { NeuInput } from '../form/input/NeuInput';
import { IDataProps, IResponse } from './models';

const Search = <T extends {}>({
  setData,
  getData,
  getParameters,
  searchUrl
}: IDataProps<T>) => {
  const [search, setSearch] = useState('');
  const { fetchMe, loading: isLoading } = useClient(VERBOSITY.NORMAL);

  const debouncedSearch = useRef(
    debounce(async (request: TRequest) => {
      const response: IResponse<T> = await fetchMe(request);
      setData(response?.data);
    }, 1000)
  ).current;

  const onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue: string = ev.target.value.trim();
    if (searchValue === '') {
      getData(getParameters);
    } else {
      setSearch(searchValue);
      searchSubmit(searchValue);
    }
  };

  const searchSubmit = async (e: string) => {
    const request: TRequest = {
      method: 'GET',
      path: `${searchUrl}${e}`
    };
    if (!isLoading) {
      debouncedSearch(request);
    }
  };

  return (
    <Form
      labelCol={{ span: 2 }}
      onFinish={searchSubmit}
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
};

export default Search;
