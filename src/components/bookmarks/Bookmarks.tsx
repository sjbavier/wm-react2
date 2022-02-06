import React, { FC, useState, useEffect } from 'react'
import clientFetch from '../../lib/clientFetch'

const Bookmarks: FC = () => {
    interface IBookmarks {
        bookmark_id: number,
        categories_collection: string[],
        link: string
    }
    let [bookmarks, setBookmarks] = useState<IBookmarks[] | []>([])
    let [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        setIsLoading(true)

        let updateBookmarks = (data: IBookmarks[]) => {
            setBookmarks(data)
        }
        let opts = {
            method: 'GET',
            path: '/api/bookmarks/',
            cb: updateBookmarks
        }

        clientFetch(opts)
        setIsLoading(false)
    }, [])

    const bookmarksItem = bookmarks.map((item, index) => {
        return (
        <div key={item.bookmark_id}>
            {item.bookmark_id}
            {item.categories_collection.join(' ')}
            {item.link}
        </div>
        )
    })

    return (

        <div>
            <h1>bookmarks</h1>
            <div>
            {
                isLoading ? <div>loading...</div> : <div>{bookmarksItem}</div>
            }
            </div>
        </div>
    )
}

export default Bookmarks