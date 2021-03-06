const express = require("express");
const router = express.Router();
const dbGenres = require("../db/clients");
const modelClient = require("../models/client");
const authMiddleware = require("../middleware/auth");

router.get("/", async (request, response) => {
  const result = await dbGenres.getAllClients();
  response.send(JSON.stringify(result, null, " "));
});

router.get("/:id", async (request, response) => {
  const result = await dbGenres.getClient(request.params.id);
  if (!result)
    return response.status(404).send("The client with such Id does not exist");
  response.send(JSON.stringify(result, null, " "));
});

router.post("/", authMiddleware, async (request, response) => {
  const { error } = modelClient.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const result = await dbGenres.createClient(
    request.body.name,
    request.body.phone,
    request.body.isGold
  );
  response.send(JSON.stringify(result, null, " "));
});

router.put("/:id", authMiddleware, async (request, response) => {
  const { error } = modelClient.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);
  const result = await dbGenres.updateClient(
    request.params.id,
    request.body.name,
    request.body.phone,
    request.body.isGold
  );
  if (!result)
    return response.status(404).send("The client with such Id does not exist");

  response.send(JSON.stringify(result, null, " "));
});

router.delete("/:id", authMiddleware, async (request, response) => {
  const { error } = modelClient.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const result = await dbGenres.removeClient(request.params.id);
  if (!result)
    return response.status(404).send("The client with such Id does not exist");

  response.send(JSON.stringify(result, null, " "));
});

module.exports = router;
