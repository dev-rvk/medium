import { useBlog } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { LoadingSkeleton } from "../components/BlogCard";
import { BlogPost } from "../components/BlogPost";
import { useEffect } from "react";

export const Blog = () => {
	const { id } = useParams();
	const { loading, blog, error } = useBlog(id || "")
	const navigate = useNavigate()

	useEffect(() => {
		if (error) {
			navigate('/signin')
		}
	}, [error, navigate])
	if (loading || !blog) {
		return <div>
			<NavBar />
			<LoadingSkeleton />
		</div>
	}
	return <div>
		<BlogPost blog={blog} />
	</div>
}