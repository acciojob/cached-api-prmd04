import React, { useEffect, useMemo, useState } from "react";
import "./../styles/App.css";
import "regenerator-runtime";

const App = () => {
  const [post, setPost] = useState([]);
  const [loading,setLoading] = useState(true);
  const [userId,setUserId] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("unable to fetch data");
        }

        const data = await response.json();

        setPost(data);
        console.log(data);
        setLoading(false);
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  const PostList = useMemo(()=>{
    return post.map((pst) => (
      <ul key={pst.id}>
        <li>
          <h4>{pst.title}</h4>
          <p>{pst.body}</p>
        </li>
      </ul>
    ));
  }, [post]);


  return (
     <div>
      <h2>Posts for User ID: {userId}</h2>

      <select value={userId} onChange={(e) => setUserId(Number(e.target.value))}>
        <option value={1}>User 1</option>
        <option value={2}>User 2</option>
        <option value={3}>User 3</option>
      </select>

      {loading ? <p>Loading...</p> : PostList}
    </div>
  )
};

export default App;
