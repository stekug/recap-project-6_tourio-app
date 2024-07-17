import dbConnect from '@/db/dbConnect';
import Place from '@/db/models/Place';

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === 'GET') {
    const places = await Place.find();
    response.status(200).json(places);
  }

  if (request.method === 'POST') {
    try {
      const placeData = request.body;
      await Place.create(placeData);
      response.status(201).json({ status: 'Place created!' });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
