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

  //Gets the detail of movie
router.get("/movies/:id", async (req, res) => {
    const movieDetail = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", { movieDetail });
  });

  router.post("/movies/:movieId/delete", async (req, res) => {
    await Movie.findByIdAndRemove(req.params.movieId);
    res.redirect("/movies");
  });


module.exports = router;
