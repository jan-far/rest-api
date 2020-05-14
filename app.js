const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const tutorRoutes = require("./routes/tutor.route");
const adminRoutes = require("./routes/admin.route");
const db = require("./models");
const Category = db.category;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);
app.use(userRoutes);
app.use(tutorRoutes);
app.use(adminRoutes);



db.mongoose
.connect(
  "mongodb://janfar:farouk@cluster0-shard-00-00-env6i.mongodb.net:27017,cluster0-shard-00-01-env6i.mongodb.net:27017,cluster0-shard-00-02-env6i.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


function initial() {
  Category.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Category({
        name: "primary"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Primary' to category collection");
      });

      new Category({
        name: "jss"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Jss' to category collection");
      });

      new Category({
        name: "sss"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Sss' to category collection");
      });
    }
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to janfar application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
