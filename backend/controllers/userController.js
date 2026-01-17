const Product = require("../models/Product");
const User = require("../models/User");

// ================================
// GET PROFILE
// ================================
const getProfile = async (req, res) => {
  try {
    const user = req.user;

    const totalProducts = await Product.countDocuments({
      seller: user._id,
    });

    res.json({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      totalProducts,
      activeListings: totalProducts,
    });
  } catch {
    res.status(500).json({ message: "Failed to load profile" });
  }
};

// ================================
// UPDATE PROFILE (NAME ONLY)
// ================================
const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name cannot be empty" });
    }

    const user = await User.findById(req.user._id);
    user.name = name;
    await user.save();

    res.json({ message: "Profile updated", name: user.name });
  } catch {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

module.exports = { getProfile, updateProfile };

