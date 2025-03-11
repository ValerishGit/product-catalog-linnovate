import { ObjectId } from "mongodb";
import { Review } from "./database/schemas";

 
  const reviewers = [
    'John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Lee', 
    'David Wilson', 'Emma Davis', 'Frank Harris', 'Grace Clark', 'Helen Lewis'
  ];
  
  // Function to generate random reviews for a product
  export const generateReviews = (productId: string): Review[] => {
    const reviews: Review[] = [];
  
    // Generate 20 random reviews
    for (let i = 0; i < 20; i++) {
      const reviewer = reviewers[Math.floor(Math.random() * reviewers.length)];
      const rating = Math.floor(Math.random() * 5) + 1; // Random rating between 1 and 5
      const comment = `This is a random review for product ${productId}. Rating: ${rating}/5`;
      const createdAt = new Date(); // Use current time as createdAt
      const objectId = new ObjectId(productId);
      reviews.push({
        username: reviewer,
        rating,
        comment,
        createdAt,
        productId:objectId
      });
    }
  
    return reviews;
  };
  