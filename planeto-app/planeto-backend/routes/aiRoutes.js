import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Please type a message."
      });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-7b-it:free",
        messages: [
          {
            role: "system",
            content:
              "You are Lunar, a smart and friendly productivity assistant. Help users with habits, reminders, motivation, planning, and general support. Keep answers concise, helpful, and positive."
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply =
      response.data.choices?.[0]?.message?.content ||
      "I'm here for you! How can I assist you today?";

    res.json({ reply });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      reply: "Something went wrong. Please try again later."
    });
  }
});

export default router;