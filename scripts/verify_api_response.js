import api from '../src/api/axios.js';

async function test() {
  console.log('--- Calling Public Brand API via Axios Client ---');
  console.log('Base URL:', api.defaults.baseURL);
  console.log('Endpoint: GET /brand');

  const response = await api.get('/brand');
  console.log('HTTP Status:', response.status);
  console.log('Success Flag:', response.data?.success);
  console.log('Total Brands Count:', response.data?.data?.length);

  const audi = response.data?.data?.find(
    (b) => b.name?.toLowerCase() === 'audi' || b.slug?.toLowerCase() === 'audi'
  );

  if (audi) {
    console.log('\n✅ NEW BRAND CONFIRMED IN API RESPONSE:');
    console.log('ID:', audi._id);
    console.log('Name:', audi.name);
    console.log('Tagline:', audi.tagline);
    console.log('Description:', audi.description);
    console.log('Image:', audi.image);
    console.log('Active:', audi.active);
    console.log('Deleted:', audi.deleted);
    console.log('Created At:', audi.createdAt);
  } else {
    console.error('❌ Audi brand NOT found in /brand response!');
    process.exit(1);
  }
}

test().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
