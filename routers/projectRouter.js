const express = require("express");

const Project = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  Project.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({ error: "projects could not be retrieved" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Project.get(id)
    .then(projectID => {
      if (projectID) {
        res.status(200).json(projectID);
      } else {
        res.status(400).json({ error: "no ID found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "project ID could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  Project.insert(req.body)
    .then(projects => {
      res.status(201).json(projects);
    })
    .catch(error => {
      res.status(500).json({ error: "error yo" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  Project.update(id, updates)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          message: "The specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Could not be modified." });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Project.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({
          message: "The specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Could not be deleted." });
    });
});

module.exports = router;
