import { FC, useState, useEffect, useCallback, useMemo } from 'react';
import { Col, Row, Table, Tag } from 'antd';

import { useNavigate, useParams } from 'react-router-dom';
import useClient from '../../hooks/useClient';
import { VERBOSITY } from '../../lib/constants';
import { IBookmarks, ICategory, TRequest } from '../../models/models';
import Search from './search/search';

const Bookmarks: FC = () => {
  interface IResult {
    num_pages?: number;
    bookmarks_total?: number;
    data?: IBookmarks[] | [];
  }

  const [bookmarks, setBookmarks] = useState<IBookmarks[] | []>([]);
  const { fetchMe, loading: isLoading } = useClient(VERBOSITY.SILENT);
  const [totalBookmarks, setTotalBookmarks] = useState<number | undefined>(
    undefined
  );

  const { page = '1', pageSize = '10' } = useParams() as {
    page: string;
    pageSize: string;
  };
  const navigate = useNavigate();

  const columns = [
    {
      title: 'id',
      dataIndex: 'bookmark_id',
      key: 'bookmark_id'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <p className="break-words">{text}</p>
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: (link: string) => (
        <a className="break-all" href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      )
    },
    {
      title: 'Categories',
      key: 'categories_collection',
      dataIndex: 'categories_collection',
      render: (categories_collection: ICategory[]) => (
        <>
          {categories_collection.map((category) => {
            return (
              <Tag color="blue" className="mt-1" key={category.category_id}>
                {category.name.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    }
  ];
  const getBookmarks = useCallback(
    async (request: TRequest) => {
      const data: IResult = await fetchMe(request);
      setBookmarks(data?.data ? data?.data : []);
      setTotalBookmarks(data?.bookmarks_total);
    },
    [fetchMe]
  );

  const getParameters = useMemo(() => {
    const request: TRequest = {
      method: 'GET',
      path: `/api/bookmarks/page/${page}/page_size/${pageSize}`
    };
    return request;
  }, [page, pageSize]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getBookmarks(getParameters);
    }
    return () => {
      mounted = false;
    };
  }, [getBookmarks, getParameters]);

  return (
    <div className="mt-3">
      <h1>bookmarks</h1>
      <Row>
        <Col span={16}>
          <Search
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
            getParameters={getParameters}
            getBookmarks={getBookmarks}
          />
        </Col>
      </Row>
      <div>
        <Table
          className="bookmarks"
          loading={isLoading}
          columns={columns}
          dataSource={bookmarks}
          scroll={{ x: true }}
          pagination={{
            pageSize: pageSize ? parseInt(pageSize) : undefined,
            total: totalBookmarks,
            onChange: (page, pageSize) => {
              navigate(`/dashboard/page/${page}/page_size/${pageSize}`);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Bookmarks;
