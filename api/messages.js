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

const listItems = async (collection) => {
  return collection.find({}).sort({ id: -1 }).toArray();
};

module.exports = async (req, res) => {
  try {
    const collection = await getCollection('messages');
    const method = req.method || 'GET';

    if (method === 'GET') {
      res.status(200).json(await listItems(collection));
      return;
    }

    const body = parseBody(req);

    if (method === 'POST') {
      const { action } = req.query || {};
      
      if (action === 'clear') {
        await collection.deleteMany({});
        res.status(200).json([]);
        return;
      }

      const item = body.item || body;
      const latest = await collection.find({}).sort({ id: -1 }).limit(1).toArray();
      const nextId = latest.length > 0 ? (latest[0].id || 0) + 1 : 1;
      
      const newMsg = {
        id: nextId,
        ...item,
        status: 'unread',
        submittedAt: new Date().toLocaleString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      
      await collection.insertOne(newMsg);
      res.status(200).json(await listItems(collection));
      return;
    }

    if (method === 'PUT') {
      const id = Number(body.id);
      if (!Number.isFinite(id)) {
        res.status(400).json({ error: 'Missing id' });
        return;
      }
      const updates = body.updates || {};
      delete updates._id; // Remove immutable _id
      await collection.updateOne({ id }, { $set: updates });
      res.status(200).json(await listItems(collection));
      return;
    }

    if (method === 'DELETE') {
      const id = req.query && req.query.id ? Number(req.query.id) : null;
      if (!Number.isFinite(id)) {
        res.status(400).json({ error: 'Missing id' });
        return;
      }
      await collection.deleteOne({ id });
      res.status(200).json(await listItems(collection));
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    res.status(500).json({ error: 'Server error', details: e.message });
  }
};
