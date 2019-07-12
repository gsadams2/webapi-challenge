const express = require("express");

const Action = require("../data/helpers/actionModel");
const Project = require("../data/helpers/projectModel");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  Action.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({ error: "actions could not be retrieved" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Action.get(id)
    .then(actionID => {
      if (actionID) {
        res.status(200).json(actionID);
      } else {
        res.status(400).json({ error: "no ID found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "action ID could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  Action.insert(req.body)
    .then(projects => {
      res.status(201).json(projects);
    })
    .catch(error => {
      res.status(500).json({ error: "error yooooo" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  //   console.log(req.body); ===================== ASK QUESTION ABOUT THIS: How does it know to only put description and notes as the req.body
  Action.update(id, changes)
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
  Action.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        message: "The specified ID does not exist.";
      }
    })
    .catch(error => {
      res.status(500).json({ error: "error in deleting" });
    });
});

// function validateProjectID(req, res, next) {
//   Project.get(req.params.project_id)
//     .then(pid => {
//       if (pid) {
//         next();
//       } else {
//         res
//           .status(400)
//           .json({ error: "there is no project ID that matches this action" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({ error: "error validating project ID" });
//     });
// }

module.exports = router;
