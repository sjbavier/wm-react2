import React, { FC, useState, useEffect } from 'react'
import clientFetch from '../../lib/clientFetch'

const Bookmarks: FC = () => {
    let [bookmarks, setBookmarks] = useState([])
    let [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        setIsLoading(true)
        let opts = {
            method: 'GET',
            path: 'http://localhost:5000/api/bookmarks',
            cb: setBookmarks
        }

        clientFetch(opts)
        setIsLoading(false)
    }, [])

    return (
        <div>
            <h1>bookmarks</h1>
            <div>{
                isLoading ? <div>loading...</div> : <div>{bookmarks}</div>
            }
            </div>

        </div>
    )
}

export default Bookmarks