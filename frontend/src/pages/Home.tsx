import { useNavigate } from "react-router-dom";

export const Home = () => {
	const navigate = useNavigate();
	return (
	<div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
		<h1 className="text-9xl font-bold tracking-tight relative">
		<span className="animate-pulse">Medium</span>
		<span className="absolute top-0 left-0 -z-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text animate-bounce">Medium</span>
		</h1>
		<div className="mt-8">
		<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4" onClick={()=>{navigate('/signup')}}>Register</button>
		<button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{navigate('/signin')}}>Login</button>
		</div>
	</div>
	);
};