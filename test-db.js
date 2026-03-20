const { getCollection } = require('./api/_db.js');
async function run() {
  try {
    const col = await getCollection('gallery');
    const item = await col.findOne({});
    console.log('Found:', item);
    // Mimic the PUT request updates
    const updates = { ...item };
    // let's put _id back as string maybe?
    // updates._id = updates._id.toString();
    
    // my fix
    delete updates._id;

    console.log('Updating with id:', item.id);
    const result = await col.updateOne({ id: item.id }, { $set: updates });
    console.log('Success:', result);
  } catch (e) {
    console.error('Error:', e);
  }
}
run();
