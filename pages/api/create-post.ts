import { NextApiRequest, NextApiResponse } from 'next';
import sanityClient, { ClientConfig } from '@sanity/client';

interface CreatePostData {
  title: string;
  body: string;
  author: string; // the _id of the author document in the Sanity dataset
}

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { title, body, author } = req.body as CreatePostData;

    const clientConfig: ClientConfig = {
      projectId: 'x815abh1',
      dataset: 'production',
      token: 'sk4NJ0ezh8tpeQlly4Kec3K1oE9IE8WbOOsooRoIKD8rUmYGwrCzo5F63aNWRfTeHZMxqNMD3DzwmjYloFP8vIzqa48X6i6F9CLNN6B1AYp3Nh6dAVLzXf5aTBpG6WDbC5Q5nrSMf5Hvtwn9DCPSah446TfTweR3Ww8XcWoeo0RWTAvIfAJI', // optional
      useCdn: false // set to true for faster response times, but cached data
    };

    const client = sanityClient(clientConfig);

    const data = {
      title,
      body,
      author: {
        _type: 'reference',
        _ref: author
      }
    };

    try {
      const response = await client.create({
          type: 'blog-post',
          ...data,
          _type: ''
      });

      res.status(200).json({ success: true, message: 'Post created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error creating post' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
