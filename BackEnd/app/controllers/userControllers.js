import { collection, ObjectId } from "../models/userModels.js";
import bcrypt from "bcryptjs";

async function createUser(req, res) {
  const {
    user,
    name,
    password,
    departamento,
    email,
    rol,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      user,
      name,
      email,
      rol,
      password: hashedPassword,
      date_create: new Date(),
    };

    await collection.insertOne(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(`Error registering user: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Read All
const getAllUsers = async (req, res) => {
  try {
    const users = await collection.find().toArray();
    res.json(users);
  } catch (error) {
    console.error(`Error getting users: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Read One
async function getUser(req, res) {
  try {
    const id = req.params.id;
    const user = await collection.findOne({ _id: new ObjectId(id) });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Update
async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const updates = {
      user: req.body.user,
      name: req.body.name,
      departamento: req.body.departamento,

      password: req.body.password
        ? await bcrypt.hash(req.body.password, 10)
        : undefined,
      email: req.body.email,
      rol: req.body.rol,
      date_create: req.body.date_create
        ? new Date(req.body.date_create)
        : undefined,
    };

    // Elimina cualquier campo undefined
    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User updated successfully" });
    }
  } catch (error) {
    console.error(`Error updating user: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Delete
async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.error(`Error deleting user: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Helper function to get user by ID
async function getUserById(userId) {
  const user = await collection.findOne({ _id: new ObjectId(userId) });
  return user;
}

// Helper function to update user
async function updateUserOne(userId, updatedUserData) {
  await collection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: updatedUserData }
  );
}

export {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUserOne,
};
