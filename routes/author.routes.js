const express = require("express");
const router = express.Router();

//todas nuestras rutas de autores
/*Model*/
const Author = require("../models/Author.model.js");

//GET "/author/read" 
router.get('/list', async (req, res, next) => {
    try {
        const data = await Author.find();
        res.render('author/list.hbs', {
            data: data
        })

    } catch (err) {
        next(err)
    }
})

//GET "/author/add" 
router.get('/add', (req, res, next) => {
    res.render('author/add.hbs')
})

//POST "/author/add" 
router.post('/add', async (req, res, next) => {
    try {
        await Author.create({
          name: req.body.name,
          country: req.body.country,
          yearBorn: req.body.yearBorn,
        });
    
        res.redirect("/author/list");
      } catch (err) {
        next(err);
      }
})

//GET "/:authorId/edit" 
router.get('/:authorId/edit', async (req, res, next) => {
    try {
        const data = await Author.find({ _id: req.params.authorId });
        res.render("author/edit.hbs", {
          author: data[0],
        });
      } catch (err) {
        next(err);
      }
})
  
  /* POST "/author/id/edit */
  router.post("/:authorId/edit", async (req, res, next) => {
    try {
      const { name, country, yearBorn } = req.body;
      const authorId = req.params.authorId;
      await Author.findByIdAndUpdate(authorId, {
        name: name,
        country: country,
        yearBorn: yearBorn,
      });
  
      res.redirect("/author/list");
    } catch (err) {
      next(err);
    }
  });






//GET "/author/delete" 
/* router.get('/', (req, res, next) => {
    
}) */

module.exports = router;