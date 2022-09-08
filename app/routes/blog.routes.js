module.exports = app => {
    const blogsPwa = require("../controllers/blog.controller.js");
    var router = require("express").Router();
    // Create a new Blog
    router.post("/", blogsPwa.create);
    // Retrieve all Blog
    router.get("/", blogsPwa.findAll);
    // Retrieve all published Blogs
    router.get("/published", blogsPwa.findAllPublished);
    // Retrieve a single Blog with id
    router.get("/:id", blogsPwa.findOne);
    // Update a Blog with id
    router.put("/:id", blogsPwa.update);
    // Delete a Blog with id
    router.delete("/:id", blogsPwa.delete);
    // Delete all Blogs
    router.delete("/", blogsPwa.deleteAll);
    //groups
    app.use('/api/v1/blog', router);
  };