// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const router = require("express").Router(); 
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities", async (req, res) => {
    const celebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities });
  });

router.get("/celebrities/create", async (req, res) => {
    const celebrities = await Celebrity.find();
    res.render("celebrities/new-celebrity", { celebrities });
  });

router.post("/celebrities/create", async (req, res) => {
    try {
        const { name, occupation, catchPhrase } = req.body;
        await Celebrity.create({
          name,
          occupation,
          catchPhrase,
        });
        res.redirect("/celebrities");
    } catch (err) {
        res.render("error");
    }
  });



module.exports = router;
