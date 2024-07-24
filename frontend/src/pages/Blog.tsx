import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { LoadingSkeleton } from "../components/BlogCard";
import { BlogPost } from "../components/BlogPost";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog(id || "");

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