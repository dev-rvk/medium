import { useNavigate } from "react-router-dom"
import { BlogCard, LoadingSkeleton } from "../components/BlogCard"
// import { BlogCardInput } from "../components/BlogCard"
import { NavBar } from "../components/NavBar"
import { useBlogs } from "../hooks"
import { BulkBlogs } from "../hooks"
import { useEffect } from "react"

// const testData: BlogCardInput = {
//     authorName: "John Doe",
//     title: "An LLM With A Visual Sketchpad Can Now Smash Its Competitors Without One (Even GPT-4o)",
//     content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     date: "23/07/24"
// }

export const Blogs = () => {
    const { loading, blogs, error } = useBlogs()
    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            navigate('/signin')
        }
    }, [error, navigate])

    if (loading) {
        return (
            <LoadingSkeleton />
        )
    }
    
    return (
        <>
            <NavBar />
            <div className="flex flex-wrap justify-center items-center min-h-screen max-w-3xl mx-auto">
                {/* <BlogCard {...testData} /> */}
                {blogs.map((blog:BulkBlogs) => (
                    <BlogCard 
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.author.name || 'Anonymous'}
                        title={blog.title}
                        content={blog.content}
                        date={blog.createdAt.substring(0,10)}
                    />
                ))}
            </div>
        </>
    )
}