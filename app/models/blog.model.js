const sql = require("./db.js");
// constructor
const Blogb = function(blogp) {
  this.title = blogp.title;
  this.description = blogp.description;
  this.published = blogp.published;
};
Blogb.create = (newBlogb, result) => {
  sql.query("INSERT INTO blogs SET ?", newBlogb, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created blog: ", { id: res.insertId, ...newBlogb });
    result(null, { id: res.insertId, ...newBlogb });
  });
};
Blogb.findById = (id, result) => {
  sql.query(`SELECT * FROM blogs WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found blog: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Blog with the id
    result({ kind: "not_found" }, null);
  });
};
Blogb.getAll = (title, result) => {
  let query = "SELECT * FROM blogs";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("blogs: ", res);
    result(null, res);
  });
};
Blogb.getAllPublished = result => {
  sql.query("SELECT * FROM blogs WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("blogs: ", res);
    result(null, res);
  });
};
Blogb.updateById = (id, blogp, result) => {
  sql.query(
    "UPDATE blogs SET title = ?, description = ?, published = ? WHERE id = ?",
    [blogp.title, blogp.description, blogp.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Blog with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated blogs: ", { id: id, ...blogp });
      result(null, { id: id, ...blogp });
    }
  );
};
Blogb.remove = (id, result) => {
  sql.query("DELETE FROM blogs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Blog with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted Blog with id: ", id);
    result(null, res);
  });
};
Blogb.removeAll = result => {
  sql.query("DELETE FROM blogs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} blogs`);
    result(null, res);
  });
};
module.exports = Blogb;