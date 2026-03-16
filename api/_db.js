const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let cached = global.__mongoClient;

if (!cached) {
  cached = global.__mongoClient = { client: null, promise: null };
}

const getClient = async () => {
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }
  if (cached.client) {
    return cached.client;
  }
  if (!cached.promise) {
    cached.promise = MongoClient.connect(uri, {
      maxPoolSize: 10,
    });
  }
  cached.client = await cached.promise;
  return cached.client;
};

const getCollection = async (name) => {
  const client = await getClient();
  const db = client.db();
  return db.collection(name);
};

module.exports = { getCollection };
