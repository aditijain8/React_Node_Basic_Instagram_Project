import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const uploadPost = () => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);

    axios.post('http://localhost:5000/posts', formData)
      .then(() => {
        setCaption('');
        setImage(null);
        window.location.reload(); // refresh feed
      });
  };

  return (
    <div>
      <input
        type="text"
        value={caption}
        onChange={e => setCaption(e.target.value)}
        placeholder="Caption"
      />
      <input
        type="file"
        onChange={e => setImage(e.target.files[0])}
      />
      <button onClick={uploadPost}>Upload</button>
    </div>
  );
}

export default Upload;