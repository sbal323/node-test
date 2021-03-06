const mongoose = require("mongoose");
const modelClient = require("../models/client");

const Client = mongoose.model("Client", modelClient.schema);

module.exports.getAllClients = async function getAllClients() {
  const clients = await Client.find();
  return clients;
};

module.exports.getClient = async function getClient(id) {
  const client = await Client.find({ _id: id });
  return client[0];
};

module.exports.updateClient = async function updateClient(
  id,
  newName,
  newPhone,
  newIsGold
) {
  const result = await Client.findByIdAndUpdate(
    id,
    {
      $set: {
        name: newName,
        phone: newPhone,
        isGold: newIsGold
      }
    },
    { new: true }
  );
  return result;
};

module.exports.createClient = async function createClient(name, phone, isGold) {
  const genre = new Client({
    name: name,
    phone: phone,
    isGold: isGold
  });
  return await genre.save();
};

module.exports.removeClient = async function removeClient(id) {
  return await Client.findByIdAndRemove({ _id: id });
};
