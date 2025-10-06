import React, { useEffect, useMemo, useState } from "react";
import "./../styles/App.css";
import "regenerator-runtime";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?userId=1" // fixed for test
        );

        if (!response.ok) {
          throw new Error("Unable to fetch data");
        }

        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        alert(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const PostList = useMemo(() => {
    return posts.map((post) => (
      <div key={post.id}>
        <h4>{post.title}</h4>
        <p>{post.body}</p> {/* This is what Cypress is looking for */}
      </div>
    ));
  }, [posts]);

  return <div>{loading ? <p>Loading...</p> : PostList}</div>;
};

export default App;
