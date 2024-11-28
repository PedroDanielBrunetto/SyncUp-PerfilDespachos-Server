const express = require("express");
const cors = require("cors");
const SendMailService = require("./services/SendMailService");

const app = express();

app.use(cors());

app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    const response = await SendMailService.execute({ nome, email, mensagem });
    res.status(200).json({ message: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao enviar e-mail." });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
