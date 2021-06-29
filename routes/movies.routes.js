// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrities = require("../models/Celebrity.model")

router.get("/movies", async (req, res) => {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  });

router.get("/movies/create", async (req, res) => {
    const celebrities = await Celebrities.find();
    res.render("movies/new-movie", {celebrities} );
  });

router.post("/movies/create", async (req, res) => {
        const { title, genre, plot, cast } = req.body;
        await Movie.create({
            title,
            genre,
            plot,
            cast,
        });
        res.redirect("/movies");
  });

module.exports = router;
