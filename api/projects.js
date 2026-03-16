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

const listProjects = async (collection) => {
  return collection.find({}).sort({ id: -1 }).toArray();
};

module.exports = async (req, res) => {
  try {
    const collection = await getCollection('projects');
    const method = req.method || 'GET';

    if (method === 'GET') {
      const id = req.query && req.query.id ? Number(req.query.id) : null;
      if (Number.isFinite(id)) {
        const project = await collection.findOne({ id });
        if (!project) {
          res.status(404).json({ error: 'Not found' });
          return;
        }
        res.status(200).json(project);
        return;
      }
      res.status(200).json(await listProjects(collection));
      return;
    }

    const body = parseBody(req);

    if (method === 'POST') {
      if (body.action === 'reset' && Array.isArray(body.items)) {
        await collection.deleteMany({});
        if (body.items.length > 0) {
          await collection.insertMany(body.items);
        }
        res.status(200).json(await listProjects(collection));
        return;
      }

      const project = body.project || body;
      const latest = await collection.find({}).sort({ id: -1 }).limit(1).toArray();
      const nextId = latest.length > 0 ? (latest[0].id || 0) + 1 : 1;
      const newProject = { id: nextId, image: null, ...project };
      await collection.insertOne(newProject);
      res.status(200).json(await listProjects(collection));
      return;
    }

    if (method === 'PUT') {
      const id = Number(body.id);
      if (!Number.isFinite(id)) {
        res.status(400).json({ error: 'Missing id' });
        return;
      }
      await collection.updateOne({ id }, { $set: body.updates || {} });
      res.status(200).json(await listProjects(collection));
      return;
    }

    if (method === 'DELETE') {
      const id = req.query && req.query.id ? Number(req.query.id) : null;
      if (!Number.isFinite(id)) {
        res.status(400).json({ error: 'Missing id' });
        return;
      }
      await collection.deleteOne({ id });
      res.status(200).json(await listProjects(collection));
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    res.status(500).json({ error: 'Server error', details: e.message });
  }
};
