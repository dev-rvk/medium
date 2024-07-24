import { Quote } from "../components/Quote";
import { AuthSignUp } from "../components/Auth";

export const Signup = () => {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2">
				<div className="items-center"> <AuthSignUp /> </div>
				<div className="hidden lg:block">
					{" "}
					<Quote />{" "}
				</div>
			</div>
		</>
	);
};
