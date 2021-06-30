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


  //Edit movie 
router.get("/movies/:movieId/edit", async (req, res) => {
    const movieToEdit = await Movie.findById(req.params.movieId).populate("celebrities");
  
    res.render("movies/movie-edit", { movieToEdit });
  });
  
  router.post("/movies/:movieId/edit", async (req, res) => {
    const { title, genre, plot, cast } = req.body;
    await Movie.findByIdAndUpdate(req.params.movieId, {
      title,
      genre,
      plot,
      cast,
    });
    res.redirect("/movies");
  });


module.exports = router;
