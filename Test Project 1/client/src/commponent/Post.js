import { useEffect, useState} from "react";

const Post = () => {
	const [imageUrl, setImageUrl] = useState("");
	const [description, setDescription] = useState("");
	const [commentText, setCommentText] = useState("");

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch("http://localhost:3001/api/posts");
				const data = await response.json();
				setPosts(data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchPosts();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3001/api/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ imageUrl, description }),
			});

			const data = await response.json();

			setPosts([...posts, data]);
			setImageUrl("");
			setDescription("");
		} catch (err) {
			console.error(err);
		}
	};

	const handleCommentSubmit = async (postId) => {
		try {
			const response = await fetch("http://localhost:3001/api/comments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ postId, text: commentText }),
			});

			const data = await response.json();

			setPosts((prevPosts) => {
				prevPosts.map((post) =>
					post.id === postId
						? { ...post, Comments: [...post.Comments, data] }
						: post
				);
			});

			setCommentText("");
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Image URL:
					<input
						type="text"
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Description:
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>
				<br />
				<button type="submit">Submit</button>
			</form>
			<div>
				{posts.length <= 0 ? (
					<p>No posts yet</p>
				) : (
					posts.map((post) => (
						<div key={post.id}>
							<img src={post.imageUrl} alt={post.description} />
							<p>{post.description}</p>
							{/* <div>
								{post.Comments.map((comment) => (
									<p key={comment.id}>{comment.text}</p>
								))}
							</div> */}
							<form
								onSubmit={(e) => {
									e.preventDefault();
									handleCommentSubmit(post.id);
								}}
							>
								<label>
									Comment :
									<input
										type="text"
										value={commentText}
										onChange={(e) =>
											setCommentText(e.value.target)
										}
									/>
								</label>
								<button type="submit"> Post Comment</button>
							</form>
						</div>
					))
				)}
			</div>
		</>
	);
};

export default Post;
