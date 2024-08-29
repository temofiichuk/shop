const changeContext = (forward, operation, observer, token) => {
	operation.setContext((previousContext) => ({
		...previousContext,
		headers: {
			authorization: token ? `Bearer ${token}` : "",
		},
	}));
	// Retry the failed request
	const subscriber = {
		next: observer.next.bind(observer),
		error: observer.error.bind(observer),
		complete: observer.complete.bind(observer),
	};

	forward(operation).subscribe(subscriber);
};

export default changeContext;