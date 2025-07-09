const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  // 👇 Verifique se está recebendo do front
  console.log('🟡 Mensagem recebida do frontend:', userMessage);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    // 👇 Verifique o que a IA respondeu
    console.log('🟢 Resposta da IA:', completion.choices[0].message.content);

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error('🔴 Erro na requisição à OpenAI:', err);
    res.status(500).json({ error: "Erro ao buscar resposta da IA." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
