const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");


const app = express();

app 
	.use(bodyParser.json())
	.use(cors()).get("/api/test", function (req, res){
		res.send('hello');
	});

var db;
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  db = client.db();
  console.log("Database connection ready");
  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App running on port:", port);
  });
});
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ "error": message });
}
app.get("/", function (req, res) {
  res.sendFile('/build/index.html');
});
app.get("/api/posts", function (req, res) {
  db.collection("posts").find({}).sort({_id:-1}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get posts.");
    } else {
      res.status(200).json(docs);
    }
  });
});
app.post("/api/posts", function (req, res) {
  var newPost = req.body;
  newPost.createDate = new Date();
  if (!req.body.content) {
    handleError(res, "Invalid input", "Must provide post content.", 400);
  } else {
    db.collection("posts").insertOne(newPost, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new post.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});
app.get("/api/posts/:id", function (req, res) {
  db.collection("posts").findOne({ _id: new mongodb.ObjectID(req.params.id) }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get post");
    } else {
      res.status(200).json(doc);
    }
  });
});
app.delete("/api/posts/:id", function(req, res) {
  db.collection("posts").deleteOne({_id: new mongodb.ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete post");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

app.use(express.static("/build/"))