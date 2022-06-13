import { FC, useState, useEffect, useContext, useCallback } from "react";
import { fetchMe, prettyError, TRequest } from "../../lib/Client";
import { Table, Tag, Alert } from "antd";
import { AuthContext } from "../auth/AuthContext";

import styles from "./Bookmarks.module.scss";
import { useNavigate, useParams } from "react-router-dom";

const Bookmarks: FC = () => {
  interface IResult {
    num_pages: number;
    bookmarks_total: number;
    data: IBookmarks[];
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
  const [bookmarks, setBookmarks] = useState<IBookmarks[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string | undefined>(undefined);
  const [totalBookmarks, setTotalBookmarks] = useState<number | undefined>(
    undefined
  );
  const { token } = useContext(AuthContext);

  const { page, pageSize } = useParams();
  const navigate = useNavigate();

  const columns = [
    {
      title: "id",
      dataIndex: "bookmark_id",
      key: "bookmark_id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (link: string) => (
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      ),
    },
    {
      title: "Categories",
      key: "categories_collection",
      dataIndex: "categories_collection",
      render: (categories_collection: ICategory[]) => (
        <>
          {categories_collection.map((category) => {
            return (
              <Tag color="blue" key={category.category_id}>
                {category.name.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const fetchPage = useCallback(
    async (page = 1, pageSize = 10) => {
      const request: TRequest = {
        method: "GET",
        path: `/api/bookmarks/page/${page}/page_size/${pageSize}`,
        token: token,
      };
      setIsLoading(true);
      fetchMe<IResult>(request)
        .then((data) => {
          setBookmarks(data.data);
          setTotalBookmarks(data.bookmarks_total);
        })
        .catch((err) => setErr(prettyError(err)))
        .finally(() => setIsLoading(false));
    },
    [page, pageSize]
  );

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchPage(page, pageSize);
    }
    return () => {
      mounted = false;
    };
  }, [fetchPage]);

  return (
    <div className={styles.wrapper}>
      <h1>bookmarks</h1>
      <div>
        {
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={bookmarks}
            scroll={{ x: true }}
            pagination={{
              pageSize: parseInt(pageSize),
              total: totalBookmarks,
              onChange: (page, pageSize) => {
                navigate(`/dashboard/page/${page}/page_size/${pageSize}`);
              },
            }}
          />
        }
        {err && <Alert message={err} type="error" />}
      </div>
    </div>
  );
};

export default Bookmarks;
