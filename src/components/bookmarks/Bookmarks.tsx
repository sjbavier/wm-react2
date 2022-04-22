import React, { FC, useState, useEffect } from 'react'
import { client } from '../../lib/Client'
import { Table, Tag, Alert } from 'antd'

import styles from './Bookmarks.module.scss'

const Bookmarks: FC = () => {

  interface IResult {
    num_pages: number,
    bookmarks_total: number,
    data: IBookmarks[]
  }
  interface IBookmarks {
    title: string,
    bookmark_id: number,
    categories_collection: ICategory[],
    link: string
  }
  interface ICategory {
    name: string,
    category_id: number
  }
  const [bookmarks, setBookmarks] = useState<IBookmarks[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [err, setErr] = useState<string | undefined>(undefined)
  const [totalBookmarks, setTotalBookmarks] = useState<number | undefined>(undefined)

  const columns = [
    {
      title: 'id',
      dataIndex: 'bookmark_id',
      key: 'bookmark_id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: ((link: string) => <a href={link} target="_blank" rel="noreferrer">{link}</a>)
    },
    {
      title: 'Categories',
      key: 'categories_collection',
      dataIndex: 'categories_collection',
      render: (categories_collection: ICategory[]) => (
        <>
          {categories_collection.map(category => {
            return (
              <Tag color="blue" key={category.category_id}>
                {category.name.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ]

  const fetchPage = async (page: number) => {
    setIsLoading(true)
    client.fetchMe<IResult>('GET', `/api/bookmarks/page/${page}`)
      .then((data) => {
          setBookmarks(data.data)
          setTotalBookmarks(data.bookmarks_total)
      })
      .catch(err => setErr(client.prettyError(err)))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      fetchPage(1)
    }
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <h1>bookmarks</h1>
      <div>
        {
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={bookmarks}
            pagination={{
              pageSize: 10,
              total: totalBookmarks,
              onChange: (page) => {
                fetchPage(page)
              }
            }}
          />
        }
        {err && (<Alert message={err} type="error" />)}
      </div>
    </div>
  )
}

export default Bookmarks