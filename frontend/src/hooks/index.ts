import { useEffect, useState } from "react"
import axios from "axios"
import { BULK_POSTS, BASE_BLOG } from "../config"

export type BulkBlogs = {
    "title": string,
    "content": string,
    "id": string,
    "author": {
        "name": string
    }
}

export const useBlog = (id:string) => {

    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<BulkBlogs>()
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        axios.get(`${BASE_BLOG}/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setBlog(response.data as BulkBlogs)
            setLoading(false)
        })
        .catch(err => {
            setError(err.message || 'An error occurred')
            setLoading(false)
        })
    }, [id])

    return {
        loading,
        blog,
        error
    }

}


export const useBlogs = () => {

    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<BulkBlogs[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        console.log(BULK_POSTS,localStorage.getItem('token'))
        axios.get(BULK_POSTS, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setBlogs(response.data as BulkBlogs[])
            setLoading(false)
        })
        .catch(err => {
            setError(err.message || 'An error occurred')
            setLoading(false)
        })
    }, [])

    return {
        loading,
        blogs,
        error
    }

}