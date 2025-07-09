const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Ajuste na importação do OpenAI dependendo da versão:
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  console.log('🟡 Mensagem recebida do frontend:', userMessage);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const respostaIA = completion.data.choices[0].message.content;
    console.log('🟢 Resposta da IA:', respostaIA);

    res.json({ reply: respostaIA });
  } catch (err) {
    console.error('🔴 Erro na requisição à OpenAI:', err.response?.data || err.message || err);
    res.status(500).json({ error: "Erro ao buscar resposta da IA." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
