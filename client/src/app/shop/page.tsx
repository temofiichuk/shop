import { auth } from "@/auth";

const Home = async () => {
	const session = await auth();

	return (
		<div>
			Home
			<pre>
				{`Is auth: ${JSON.stringify(session)}`}
			</pre>
		</div>
	);
};

export default Home;
