import React, { FC, useState, useEffect } from 'react'
import { client } from '../../lib/Client'
import { Table, Tag, Space } from 'antd'

import styles from './Bookmarks.module.scss'

const Bookmarks: FC = () => {
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
    let [bookmarks, setBookmarks] = useState<IBookmarks[] | []>([])
    let [isLoading, setIsLoading] = useState(false)

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
            render: ((link: string) => <a href={link} target="_blank">{link}</a>)
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

    useEffect(() => {
        let mounted = true
        let updateBookmarks = (data: IBookmarks[]) => {
            setBookmarks(data)
        }
        setIsLoading(true)
        client.fetchMe<IBookmarks[]>('GET', '/api/bookmarks/')
            .then((data) => mounted ? updateBookmarks(data) : null)
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))

        return () => {
            mounted = false
        }
    }, [])


    return (
        <div className={ styles.wrapper }>
            <h1>bookmarks</h1>
            <div>
                {
                    isLoading ? <div>loading...</div> : <Table columns={columns} dataSource={bookmarks} />
                }
            </div>
        </div>
    )
}

export default Bookmarks