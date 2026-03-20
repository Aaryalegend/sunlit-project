const { getCollection } = require('./_db');

const parseBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
};

const listBlogs = async (collection) => {
  return collection.find({}).sort({ id: -1 }).toArray();
};

module.exports = async (req, res) => {
  try {
    const collection = await getCollection('blogs');
    const method = req.method || 'GET';

    if (method === 'GET') {
      const id = req.query && req.query.id ? Number(req.query.id) : null;
      if (Number.isFinite(id)) {
        const blog = await collection.findOne({ id });
        if (!blog) {
          res.status(404).json({ error: 'Not found' });
          return;
        }
        res.status(200).json(blog);
        return;
      }
      res.status(200).json(await listBlogs(collection));
      return;
    }

    const body = parseBody(req);

    if (method === 'POST') {
      if (body.action === 'reset' && Array.isArray(body.items)) {
        await collection.deleteMany({});
        if (body.items.length > 0) {
          await collection.insertMany(body.items);
        }
        res.status(200).json(await listBlogs(collection));
        return;
      }

      const blog = body.blog || body;
      const latest = await collection.find({}).sort({ id: -1 }).limit(1).toArray();
      const nextId = latest.length > 0 ? (latest[0].id || 0) + 1 : 1;
      const newBlog = { id: nextId, featured: false, image: null, ...blog };
      await collection.insertOne(newBlog);
      if (newBlog.featured) {
        await collection.updateMany({ id: { $ne: nextId } }, { $set: { featured: false } });
      }
      res.status(200).json(await listBlogs(collection));
      return;
    }

    if (method === 'PUT') {
      const id = Number(body.id);
      if (!Number.isFinite(id)) {
        res.status(400).json({ error: 'Missing id' });
        return;
      }
      const updates = body.updates || {};
      delete updates._id; // Remove immutable _id before saving
      await collection.updateOne({ id }, { $set: updates });
      res.status(200).json(await listBlogs(collection));
      return;
    }

    if (method === 'PATCH') {
      const id = Number(body.id);
      if (!Number.isFinite(id)) {
        res.status(400).json({ error: 'Missing id' });
        return;
      }
      await collection.updateMany({}, { $set: { featured: false } });
      await collection.updateOne({ id }, { $set: { featured: true } });
      res.status(200).json(await listBlogs(collection));
      return;
    }

    if (method === 'DELETE') {
      const id = req.query && req.query.id ? Number(req.query.id) : null;
      if (!Number.isFinite(id)) {
        res.status(400).json({ error: 'Missing id' });
        return;
      }
      await collection.deleteOne({ id });
      res.status(200).json(await listBlogs(collection));
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    res.status(500).json({ error: 'Server error', details: e.message });
  }
};
