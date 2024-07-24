import { Link } from "react-router-dom"


export type BlogCardInput = {
    id: string,
    authorName: string,
    title: string,
    content: string,
    date: string,
}

export const BlogCard = (postData : BlogCardInput) => {
    const minsRead = Math.ceil(postData.content.length / 1000)
    return(
        <div className="w-full cursor-pointer">
            <Link to={`/blog/${postData.id}`}>
                <div className="flex flex-col px-3 py-3 w-full mt-4 mb-1 border-2 rounded-lg shadow-lg">
                    <div className="flex flex-row items-center">
                        <div className="flex flex-col justify-center"><Avatar size="small" text={postData.authorName[0]} /></div>
                        <div className="ml-3 mr-3 text-lg font-semibold">{postData.authorName}</div>
                        <Dot />
                        <div className="mr-3 font-extralight text-slate-600">{postData.date}</div>
                    </div>
                    <div className="mt-4 font-black text-2xl"> {postData.title} </div>
                    <div className="mt-2 font-extralight text-xl text-gray-500"> {postData.content.substring(0, 150) + (postData.content.length < 100 ? "" : "...")} </div>
                    <div className="mt-6 font-extralight text-gray-400"> { minsRead + (minsRead > 1 ? " minutes read" : " minute read") } </div>
                </div>
            </Link>
        </div>
        
    )
}


export const Avatar = ({ size, text }: { size: 'small' | 'large'; text: string }) => {
    const dim = size === 'large' ? 10 : 8
    return (
        <div className={`relative inline-flex items-center justify-center w-${dim} h-${dim} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className="font-medium text-gray-600 dark:text-gray-300">{text[0]}</span>
        </div>
    )
}

export const Dot = () => {
    return (
        <div>
            <div className="mr-3 rounded-full bg-slate-400 w-1 h-1"></div>
        </div>
    )
}

export const LoadingSkeleton = () => {
    return (

        <div role="status" className="w-full h-full mx-auto p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse px-10 m-10">
            <div className="flex items-center justify-between h-50">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full mb-3"></div>
                    <div className="w-32 h-5 bg-gray-200 rounded-full mb-1"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full mb-3"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full mb-3"></div>
                    <div className="w-32 h-5 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full mb-3"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full mb-3"></div>
                    <div className="w-32 h-5 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full mb-3"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full mb-3"></div>
                    <div className="w-32 h-5 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full mb-3"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full mb-3"></div>
                    <div className="w-32 h-5 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full mb-3"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>

    )
}