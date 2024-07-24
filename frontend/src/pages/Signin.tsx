import { AuthSignIn } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signin = () => {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2">
				<div className="items-center"> <AuthSignIn /> </div>
				<div className="hidden lg:block">
					{" "}
					<Quote />{" "}
				</div>
			</div>
		</>
	);
};
