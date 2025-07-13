const OpenAI = require("openai");
const dotenv = require("dotenv");
const cosineSimilarity = require("cosine-similarity");

dotenv.config();

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Function to get embedding for any text string
const getEmbedding = async (text) => {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text
    });

    return response.data[0].embedding;
  } catch (err) {
    console.error("Error getting embedding:", err);
    throw new Error("Embedding generation failed.");
  }
};

// Function to compute similarity between resume text and job description
const computeSimilarity = async (resumeText, jobDescription) => {
  try {
    // Get embeddings for both texts
    const [resumeEmbedding, jdEmbedding] = await Promise.all([
      getEmbedding(resumeText),
      getEmbedding(jobDescription)
    ]);

    // Compute cosine similarity
    const similarity = cosineSimilarity(resumeEmbedding, jdEmbedding);

    // Convert similarity (0-1) to percentage (0-100)
    const score = Math.round(similarity * 100);

    return score;
  } catch (err) {
    console.error("Error computing similarity score:", err);
    return 0;
  }
};

// Export the functions
module.exports = {
  getEmbedding,
  computeSimilarity
};
