import { FC, useState, useEffect } from 'react';
import { Table, Tag } from 'antd';

import styles from './Bookmarks.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import useClient, { TRequest } from '../../hooks/useClient';
import { VERBOSITY } from '../../lib/constants';

const Bookmarks: FC = () => {
  interface IResult {
    num_pages?: number;
    bookmarks_total?: number;
    data?: IBookmarks[];
  }
  interface IBookmarks {
    title: string;
    bookmark_id: number;
    categories_collection: ICategory[];
    link: string;
  }
  interface ICategory {
    name: string;
    category_id: number;
  }

  const [bookmarks, setBookmarks] = useState<IBookmarks[] | undefined>(
    undefined
  );
  const { fetchMe, loading: isLoading } = useClient(VERBOSITY.NORMAL);
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
      render: (text: string) => <p>{text}</p>
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: (link: string) => (
        <a href={link} target="_blank" rel="noreferrer">
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
              <Tag
                color="blue"
                className={styles.mt1}
                key={category.category_id}
              >
                {category.name.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    }
  ];

  useEffect(() => {
    let mounted = true;
    const request: TRequest = {
      method: 'GET',
      path: `/api/bookmarks/page/${page}/page_size/${pageSize}`
    };

    const getBookmarks = async () => {
      const data: IResult = await fetchMe(request);
      setBookmarks(data?.data);
      setTotalBookmarks(data?.bookmarks_total);
    };

    if (mounted) {
      getBookmarks();
    }
    return () => {
      mounted = false;
    };
  }, [fetchMe, page, pageSize]);

  return (
    <div className={styles.wrapper}>
      <h1>bookmarks</h1>
      <div>
        <Table
          className="bookmarks"
          loading={isLoading}
          columns={columns}
          dataSource={bookmarks}
          scroll={{ x: true }}
          pagination={{
            pageSize: parseInt(pageSize),
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
