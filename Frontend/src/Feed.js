import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(res => setPosts(res.data));
  }, []);

  return (
    <div>
      {posts.map(p => <Post key={p.id} post={p} />)}
    </div>
  );
}

export default Feed;