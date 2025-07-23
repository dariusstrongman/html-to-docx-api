const express = require("express");
const bodyParser = require("body-parser");
const htmlDocx = require("html-docx-js");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json({ limit: "5mb" }));

app.post("/convert", (req, res) => {
  const { html } = req.body;
  if (!html) return res.status(400).send("Missing HTML");

  const docx = htmlDocx.asBlob(html);

  res.setHeader("Content-Disposition", "attachment; filename=resume.docx");
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  res.send(docx);
});

app.get("/", (_, res) => res.send("HTML to DOCX API is live!"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

