export default async function handler(req, res) {
  if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
      const response = await fetch('https://generative-language.googleapis.com/v1beta2/models/gemini-pro:generateText', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY}`,
          },
          body: JSON.stringify({ prompt: req.body.prompt }),
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      res.status(200).json({ text: data.text });
  } catch (error) {
      console.error('Error generating text:', error);
      res.status(500).json({ error: 'Failed to generate text' });
  }
}
