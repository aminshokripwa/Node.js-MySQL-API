const Blogb = require("../models/blog.model.js");
const showDataInApi = function (data=null,message=null,status=null) {
  if (message === null) {
    return { data: data, "message": "success", "status": true };
  }else if (status === null) {
    return { "message": message, "status": true };
  }else {
    return { "message": message, "status": false };
  }
}

// Create and Save a new blog
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send(showDataInApi(null,"Content can not be empty!",1));
    }
    // Create a blog
    const blogc = new Blogb({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published || false
    });
    // Save blog in the database
    Blogb.create(blogc, (err, data) => {
      if (err)
        res.status(500).send(showDataInApi(null,err.message || "Some error occurred while creating blogs.",1));
      else res.send(showDataInApi(data));
    });
  };
// Retrieve all blogs from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
    Blogb.getAll(title, (err, data) => {
      if (err)
      res.status(500).send(showDataInApi(null,err.message || "Some error occurred while retrieving blogs.",1));
      else res.send(showDataInApi(data));
    });
  };
  exports.findAllPublished = (req, res) => {
    Blogb.getAllPublished((err, data) => {
      if (err)
        res.status(500).send(showDataInApi(null,err.message || "Some error occurred while retrieving blogs.",1));
      else res.send(showDataInApi(data));
    });
  };
// Find a single blog with a id
exports.findOne = (req, res) => {
  Blogb.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send(showDataInApi(null,`Not found blog with id ${req.params.id}.`,1));
        } else {
          res.status(500).send(showDataInApi(null,"Error retrieving blog with id " + req.params.id,1));
        }
      } else res.send(showDataInApi(data));
    });
  };
// Update a blog identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send(showDataInApi(null,"Content can not be empty!",1));
    }
    console.log(req.body);
    Blogb.updateById(
      req.params.id,
      new Blogb(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send(showDataInApi(null,`Not found blog with id ${req.params.id}.`,1));
          } else {
            res.status(500).send(showDataInApi(null,"Error updating blog with id " + req.params.id,1));
          }
        } else res.send(showDataInApi(data));
      }
    );
  };
// Delete a blog with the specified id in the request
exports.delete = (req, res) => {
  Blogb.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send(showDataInApi(null,`Not found blog with id ${req.params.id}.`,1));
        } else {
          res.status(500).send(showDataInApi(null,"Could not delete blog with id " + req.params.id,1));
        }
      } else res.send(showDataInApi(null,'blog was deleted successfully!'));
    });
  };
// Delete all blogs from the database.
exports.deleteAll = (req, res) => {
  Blogb.removeAll((err, data) => {
      if (err)
        res.status(500).send(showDataInApi(null,err.message || "Some error occurred while removing all blogs.",1));
      else res.send(showDataInApi(null,'All blogs were deleted successfully!'));
    });
  };