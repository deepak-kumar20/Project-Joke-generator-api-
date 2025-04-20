import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render('index.ejs', { content: " " });
})
app.post("/get-joke", async (req, res) => {
    const name = req.body.name || "Stranger";
  const category = req.body.category || "Any";

  try {
    const result = await axios.get(
      `https://v2.jokeapi.dev/joke/${category}?type=single`
    );
         const joke =
           result.data.joke || `${result.data.setup} ${result.data.delivery}`;
      res.render("index.ejs", { content: `${name}, Your joke is : ${joke}` });
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || "Something went wrong. Try again later.";
    res.render("index.ejs", {
      content: errorMsg,
    });
  }
});

app.listen(PORT, () => {
  console.log("server is running..");
});
