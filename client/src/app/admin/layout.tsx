import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div className='className="max-w-screen-2xl m-auto min-h-screen overflow-hidden p-6 pb-20 2xl:overflow-visible 2xl:px-0'>
			{children}
		</div>
	);
};

export default Layout;
