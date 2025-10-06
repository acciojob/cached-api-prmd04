import React, { useState, useEffect, useMemo } from "react";
import "./../styles/App.css";
import "regenerator-runtime/runtime";

const App = () => {
	const [posts, setPosts] = useState([]);
	const [userId, setUserId] = useState("");
	const [loading, setLoading] = useState(false);

	// Fetch all posts from API when component mounts
	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const res = await fetch(
					"https://jsonplaceholder.typicode.com/posts"
				);
				const data = await res.json();
				setPosts(data);
			} catch (err) {
				console.error("Failed to fetch posts", err);
			} finally {
				// Simulate a delay before hiding loading
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			}
		};

		fetchPosts();
	}, []);

	// useMemo to cache filtered posts based on userId
	const filteredPosts = useMemo(() => {
		if (!userId) return posts;
		return posts.filter((post) => post.userId === Number(userId));
	}, [posts, userId]);

	return (
		<div style={{ padding: "1rem" }}>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<h1>Posts Viewer</h1>
					<label>
						Filter by User ID:{" "}
						<input
							type="number"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							placeholder="Enter userId (1-10)"
						/>
					</label>
					<ul>
						{filteredPosts.map((post) => (
							<li key={post.id} style={{ marginBottom: "1rem" }}>
								<h4>{post.title}</h4>
								<p>{post.body}</p>
								<small>User ID: {post.userId}</small>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default App;