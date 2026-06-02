import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

const response = await client.chat.completions.create({
  model: "deepseek-chat",
  max_tokens: 128,
  messages: [
    {
      role: "user",
      content: "What is a neural network in one sentence?",
    },
  ],
});

console.log(response.choices[0].message.content);
