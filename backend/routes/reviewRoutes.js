const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// GET /api/reviews/:productId — Fetch all reviews for a product
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: Number(req.params.productId) })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// GET /api/reviews/:productId/summary — Get avg rating & count
router.get("/:productId/summary", async (req, res) => {
  try {
    const productId = Number(req.params.productId);
    const reviews = await Review.find({ productId });
    
    if (reviews.length === 0) {
      return res.json({ avgRating: 0, totalReviews: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } });
    }

    const totalReviews = reviews.length;
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
    
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => { breakdown[r.rating]++; });

    res.json({
      avgRating: Math.round(avgRating * 10) / 10,
      totalReviews,
      breakdown
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

// POST /api/reviews — Submit a new review
router.post("/", async (req, res) => {
  try {
    const { productId, userName, rating, comment } = req.body;
    
    if (!productId || !userName || !rating || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const review = new Review({ productId, userName, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit review" });
  }
});

module.exports = router;
