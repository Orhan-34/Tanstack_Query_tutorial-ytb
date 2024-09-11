import React, { useState } from "react";
import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const getPosts = async (page) => {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_page=${page}`,
	);
	return res.json();
};

// const getUsers = async () => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/userss");
//     return res.json();
// }

const WithQuery = () => {
	const [page, setPage] = useState(1);

	const { isPending, error, data, isFetching } = useQuery({
		queryKey: ["posts", page],
		queryFn: () => getPosts(page),
		staleTime: 10000,
		placeholderData: keepPreviousData,
	});

	// const [{isPending,error,data}, {isPending: isUsersPending, error: useRouteError, data: users}] = useQueries({
	//     queries: [
	//         {queryKey: ['posts'], queryFn: getPosts},
	//         {queryKey: ['users'], queryFn: getUsers, retryDelay: 2000},
	//     ]
	// })
	if (isPending) {
		return (
			<h1 className="text-3xl text-center my-8 font-bold text-gray-400">
				Loading...
			</h1>
		);
	}

	if (error) {
		return (
			<h1 className="text-3xl text-center my-8 font-bold text-gray-400">
				Error: {error.message}
			</h1>
		);
	}

	return (
		<div className="m-4 max-w-[600px] w-4/5 mx-auto">
			<h1 className="text-3xl text-center my-8 font-bold text-gray-400">
				Posts Data
			</h1>
			<div className={isFetching ? "bg-blue-400" : ""}>
				{/* biome-ignore lint/complexity/useOptionalChain: <explanation> */}
				{data &&
					data.map((post) => {
						return (
							<Link
								to={`${post.id}`}
								key={post.id}
								className="p-4 rounded-lg block border border-gray-200 my-6 cursor-pointer hover:bg-gray-900"
							>
								<h2 className="font-bold text-lg mb-2 text-gray-400">
									{post.title}
								</h2>
								<p className="text-gray-400">{post.body}</p>
							</Link>
						);
					})}
			</div>
			<div className="flex items-center justify-center gap-2">
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					className="px-3 py-1 bg-blue-500 rounded-md text-white font-bold"
					onClick={() => setPage((prev) => prev + 1)}
				>
					Next page
				</button>
				<p className="text-black">Current page: {page}</p>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					className="px-3 py-1 bg-blue-500 rounded-md text-white font-bold"
					onClick={() => setPage((prev) => (prev > 0 ? prev - 1 : 0))}
				>
					Previous page
				</button>
			</div>
		</div>
	);
};

export default WithQuery;
