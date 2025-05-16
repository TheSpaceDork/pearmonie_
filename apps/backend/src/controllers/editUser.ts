import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

export const editUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  const currentUser = (req as any).user;

  if (!currentUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const userToEdit = await User.findById(id);
    if (!userToEdit) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (currentUser.role !== "admin" && currentUser.id !== id) {
      res.status(403).json({ message: "Unauthorized to edit this user" });
      return;
    }

    if (role && role !== userToEdit.role && currentUser.role !== "admin") {
      res.status(403).json({ message: "Only admin can change user roles" });
      return;
    }

    const updates: Record<string, any> = {};

    // Only update if name is a non-empty string
    if (typeof name === "string" && name.trim() !== "") {
      updates.name = name.trim();
    }

    // Only update if email is a non-empty string
    if (typeof email === "string" && email.trim() !== "") {
      const emailExists = await User.findOne({ email, _id: { $ne: id } });
      if (emailExists) {
        res.status(400).json({ message: "Email already in use" });
        return;
      }
      updates.email = email.trim();
    }

    // Only update password if it's a non-empty string
    if (typeof password === "string" && password.trim() !== "") {
      updates.password = await bcrypt.hash(password.trim(), 10);
    }

    // Only update role if allowed
    if (role && currentUser.role === "admin") {
      updates.role = role;
    }

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ message: "No valid fields to update" });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      res.status(500).json({ message: "Failed to update user" });
      return;
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error editing user:", err);
    res.status(500).json({ message: "Server error during user update" });
  }
};
