import connectDB from '../../middleware/mongodb';
import { NextApiRequest, NextApiResponse } from "next"
import mongodb from 'mongodb';

const root = {
  // GET /api/posts
  // List all posts
  getAll: async (req: NextApiRequest, res: NextApiResponse, db: mongodb.Db) => {
    console.log("getall");
    const dbPosts = await db.collection('posts');
    const posts = await dbPosts.find({}).toArray();

    res.json(posts);
  },

  // GET /api/posts/:id
  // Get a post by id
  getById: async (req: NextApiRequest, res: NextApiResponse, db: mongodb.Db) => {
    console.log("getbyId", req.query.id);
    const dbPosts = await db.collection('posts');
    const post = await dbPosts.findOne({ _id: new mongodb.ObjectId(req.query.id as string) });

    console.log(post);
    // .catch((err: string) => {
    //   res.status(500).json({ err });
    // });
    res.json(post);
  },

  // POST /api/posts
  // Create a new post
  create: async (req: NextApiRequest, res: NextApiResponse, db: mongodb.Db) => {
    console.log("create:", req.query.id);
    const dbPosts = await db.collection('posts');
    const post = await dbPosts.insert(req.body)
      .catch((err) => {
        res.status(500).json({ err });
      });
    res.json(post);
  },

  // PUT /api/posts/:id
  // Update a post by id
  update: async (req: NextApiRequest, res: NextApiResponse, db: mongodb.Db) => {
    console.log("update:", req.query.id);
    const dbPosts = await db.collection('posts');
    const post = await dbPosts.findOne({ _id: new mongodb.ObjectId(req.query.id as string) })

    post.content = req.body.content;
    await post.save()

    res.json(post);
  },

  // DELETE /api/posts/:id
  // Delete a post by id
  delete: async (req: NextApiRequest, res: NextApiResponse, db: mongodb.Db) => {
    console.log("delete:", req.query.id);
    const dbPosts = await db.collection('posts');
    const post = await dbPosts.findOne({ _id: new mongodb.ObjectId(req.query.id as string) });
    await post.remove();

    res.json({ message: 'Post deleted' });
  }
};


// @ts-ignore
export default connectDB((req, res, db) => {
  const { query } = req;
  const di = "" + query.do;
  if (di in root) {
    // @ts-ignore
    root[di](req, res, db);
  } else {
    root.getById(req, res, db)
  }
});
