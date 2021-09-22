const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

// mongoose.connect("mongodb+srv://nico-user:arco123@cluster0.acnjf.mongodb.net/myFirstDatabase", { useUnifiedTopology: true, useNewUrlParser: true })
//     .then(() => { console.log('Connected to MongoDB') })
//     .catch(() => { console.log('Connection failed!') });
mongoose.connect("mongodb+srv://nico-user:" + process.env.MONGO_ATLAS_PASSWORD + "@cluster0.acnjf.mongodb.net/myFirstDatabase", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => { console.log('Connected to MongoDB') })
    .catch(() => { console.log('Connection failed!') });

// body parsing
app.use(bodyParser.json());
// url parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join('backend/images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

// app.use((req, res, next) => {
//     console.log('First middleware');
//     next();
// })

// app.post('/api/posts', (req, res, next) => {
//     const post = new Post({
//         title: req.body.title,
//         content: req.body.content,
//     });
//     post.save().then(createdPost => {
//         res.status(201).json({
//             message: 'Post added successfully',
//             postId: createdPost._id
//         })
//     });
// });

// app.put('/api/posts/:id', (req, res, next) => {
//     const post = new Post({
//         _id: req.body.id,
//         title: req.body.title,
//         content: req.body.content,
//     })
//     Post.updateOne({ _id: req.params.id, post }).then(result => {
//         res.status(200).json({ message: 'Post updated!' })
//     })
// })

// app.get('/api/posts', (req, res, next) => {
//     Post.find()
//         .then(documents => {
//             // No need to return as last operation in this app.use() + no need to call next() as all is done
//             res.status(200).json({
//                 message: 'Posts fetched successfully',
//                 posts: documents
//             })
//         })
//         .catch(err => { console.log(err) });

// })

// app.get('/api/posts/:id', (req, res, next) => {
//     Post.findById(req.params.id).then(post => {
//         if (post) {
//             res.status(200).json({ post });
//         } else {
//             res.status(404).json({ message: 'Post not found' });
//         }
//     })
// })

// app.delete('/api/posts/:id', (req, res, next) => {
//     console.log(req.params.id);
//     Post.deleteOne({ _id: req.params.id }).then(result => {
//         console.log(result);
//         res.status(200).json({ message: 'Post deleted!' });
//     })
// })

module.exports = app;
