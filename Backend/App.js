const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// In-memory posts array
let posts = [];

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
app.get('/posts', (req, res) => res.json(posts));

app.post('/posts', upload.single('image'), (req, res) => {
  const post = {
    id: posts.length + 1,
    caption: req.body.caption,
    imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
    likes: 0,
    comments: []
  };
  posts.push(post);
  res.status(201).json(post);
});

app.put('/posts/:id/like', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  post.likes++;
  res.json(post);
});

app.post('/posts/:id/comment', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  post.comments.push(req.body.comment);
  res.json(post);
});

// Start server
app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
