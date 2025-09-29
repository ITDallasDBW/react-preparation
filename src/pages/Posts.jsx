import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Posts = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState(id);

  function onSearch() {
    fetchPosts(searchId);
  }

  async function fetchPosts(userId) {
    setLoading(true);
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`
    );
    setPosts(data);
    setLoading(false);
  }

  function onSearchKeyPress(key) {
    if (key === "Enter") {
      onSearch();
    }
  }

  useEffect(() => {
    // setLoading(true);
    fetchPosts();
  }, []);

  return (
    <>
      <div className="post__search">
        {/* To programmatically navigate to new page, put useNavigate(). Acts weird though.It works but Button/Link doesn't act like a 'link' on the page. Also- be sure to use arrow function (to delay/defer action bc onClick functions with parentheses call immediately*/}
        <button onClick={() => navigate("/")}>← navigateBack</button>

        <Link to="/">
          <button>← linkBack</button>
        </Link>
        <a href="/">
          <button>← hrefBack</button>
        </a>
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input
            type="number"
            value={searchId}
            onChange={(event) => setSearchId(event.target.value)}
            //   onKeyDown={(event) => event.key === 'Enter' && onSearch()}
            onKeyDown={(event) => onSearchKeyPress(event.key)}
          />

          <button onClick={() => onSearch()}>Enter</button>
        </div>
      </div>
      {loading
        ? new Array(10).fill(0).map((_, index) => (
            <div className="post" key={index}>
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          ))
        : posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post__title">{post.title}</div>
              <p className="post__body">{post.body}</p>
            </div>
          ))}
    </>
  );
};

export default Posts;

// <>
//   <div className="post__search">
//     <button>← Back</button>
//     <div className="post__search--container">
//       <label className="post__search--label">Search by Id</label>
//       <input type="number" />
//       <button>Enter</button>
//     </div>
//   </div>
//   <div className="post">
//     <div className="post__title">post.title</div>
//     <p className="post__body">post.body</p>
//   </div>
//   <div className="post">
//     <div className="post__title">
//       <div className="post__title--skeleton"></div>
//     </div>
//     <div className="post__body">
//       <p className="post__body--skeleton"></p>
//     </div>
//   </div>
// </>
