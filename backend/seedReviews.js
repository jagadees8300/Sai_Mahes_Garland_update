const mongoose = require("mongoose");
require("dotenv").config();
const Review = require("./models/Review");

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/garlands";

// All product IDs from products.js
const productIds = [
  42, 43, 44, 45, 46,
  1, 2, 3, 4, 5,
  6, 7, 8, 9, 10,
  11, 12, 13, 14, 15,
  16, 17, 18, 19,
  20, 21, 22, 23, 24,
  25, 26, 27, 28,
  29, 30, 31,
  32, 33, 34, 37, 35, 36,
  38, 41,
  47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58
];

// Customer reviews provided by user
const customerReviews = [
  {
    userName: "Anusha & Karthik",
    rating: 5,
    comment: "WeddingGarland truly brought our vision to life. The Poola Jada and jasmine garlands were fresh and elegant. All our guests appreciated the traditional floral touch. - Hyderabad, South Indian Wedding 2024"
  },
  {
    userName: "Meena & Arvind",
    rating: 5,
    comment: "Our experience with WeddingGarland was seamless. The venis and flower jewelry were absolutely beautiful. Highly recommended for authentic Telugu weddings. - Telugu Wedding, Summer 2024"
  },
  {
    userName: "Divya & Rohit",
    rating: 5,
    comment: "We ordered Kobbari Bondam and Addu Thera from WeddingGarland. The quality and presentation were top-notch. Best florist for wedding needs! - Temple Wedding, Winter 2024"
  },
  {
    userName: "Lakshmi & Nitin",
    rating: 5,
    comment: "Absolutely loved the floral umbrella and garlands. Everything looked beautiful in our wedding photos! - Hyderabad, Garden Ceremony 2023"
  },
  {
    userName: "Sneha & Sandeep",
    rating: 4,
    comment: "The flowers were fresh and vibrant. The Poola Jada was elegant and stayed intact the whole ceremony. - Traditional Telugu Wedding 2023"
  },
  {
    userName: "Pooja & Varun",
    rating: 5,
    comment: "WeddingGarland gave a personal touch to our decor. Highly professional and timely delivery. - Nizamabad, Summer 2024"
  },
  {
    userName: "Aishwarya & Tarun",
    rating: 5,
    comment: "We ordered custom garlands and flower jewelry. Everything matched our outfits and looked so elegant! - Telangana Wedding 2023"
  },
  {
    userName: "Haritha & Rakesh",
    rating: 5,
    comment: "The floral decorations made our stage look magical. Thank you WeddingGarland! - Hyderabad, Evening Reception 2024"
  }
];

// Generate a random past date (within the last 12 months)
function randomPastDate() {
  const now = Date.now();
  const oneYearAgo = now - 365 * 24 * 60 * 60 * 1000;
  return new Date(oneYearAgo + Math.random() * (now - oneYearAgo));
}

// Shuffle and pick N items from an array
function pickRandom(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function seed() {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    // Clear existing reviews
    const deleted = await Review.deleteMany({});
    console.log(`Cleared ${deleted.deletedCount} existing reviews`);

    let totalInserted = 0;

    for (const productId of productIds) {
      // Pick 3-5 random reviews for each product
      const count = 3 + Math.floor(Math.random() * 3); // 3, 4, or 5
      const selectedReviews = pickRandom(customerReviews, count);

      const reviewDocs = selectedReviews.map((review) => ({
        productId,
        userName: review.userName,
        rating: review.rating,
        comment: review.comment,
        createdAt: randomPastDate()
      }));

      await Review.insertMany(reviewDocs);
      totalInserted += reviewDocs.length;
      console.log(`  ✅ Product ${productId}: ${reviewDocs.length} reviews added`);
    }

    console.log(`\n🎉 Done! ${totalInserted} reviews seeded across ${productIds.length} products.`);
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
