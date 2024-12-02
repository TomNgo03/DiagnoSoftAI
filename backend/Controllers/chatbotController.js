// import openai from '../openai.js';

export const generateResponse = async (req, res) => {
  try {
    const { message } = req.body;

    const systemMessage = `You are an AI medical assistant for DiagnosoftAI. 
    Your role is to:
    - Provide general medical information and health advice
    - Help explain medical terms in simple language
    - Suggest when users should seek professional medical help
    - Provide general wellness and preventive health tips
    - Never provide specific medical diagnosis or treatment recommendations
    - Always remind users that this is general information and they should consult healthcare professionals for specific medical advice`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      message: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot Error:', error);
    res.status(500).json({
      success: false,
      message: "Error generating response",
      error: error.message
    });
  }
}; 