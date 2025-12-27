import OpenAI from "openai";

// Initialize OpenAI client
// Note: For production, use a backend proxy to protect your API key
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || "YOUR_OPENAI_API_KEY",
  dangerouslyAllowBrowser: true, // Only for development - use backend proxy in production
});

export const generateSuggestion = async (prompt, type = "general") => {
  try {
    const systemPrompts = {
      summary:
        "You are a professional resume writer. Generate a compelling professional summary based on the user's information. Keep it concise (2-3 sentences) and impactful.",
      experience:
        "You are a professional resume writer. Improve the job description provided. Use action verbs, quantify achievements where possible, and make it more impactful. Return 3-4 bullet points.",
      skills:
        "You are a professional resume writer. Based on the job title or field provided, suggest relevant technical and soft skills. Return as a comma-separated list.",
      projects:
        "You are a professional resume writer. Improve the project description provided. Highlight technologies used, your role, and the impact. Return 2-3 bullet points.",
      coverLetter:
        "You are a professional cover letter writer. Generate a compelling cover letter based on the resume information and job description provided. Keep it professional and personalized.",
    };

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompts[type] || systemPrompts.general,
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to generate AI suggestion. Please try again.");
  }
};

export default openai;
