/*
Contains mock data for development and tests purposes.
mockRecommendations array is a collection of objects, each representing a recommendation item.
Each object includes the following properties: name, description, thumbnail, url, and origin, with source being an optional property for sponsored items.
This mock data simulates what might be retrieved from an API call in a real application and is used to populate the UI with recommendation items.
The origin property differentiates between organic and sponsored content, influencing how each item might be displayed or styled in the UI. 
*/

const mockRecommendations = [
    {
      name: "Discover the Secrets of Ancient Architecture",
      description: "Explore the wonders of ancient constructions and their timeless beauty.",
      thumbnail: [
        { url: "https://example.com/images/architecture.jpg" }
      ],
      url: "https://www.example.com/ancient-architecture",
      origin: "organic"
    },
    {
      name: "The Ultimate Guide to City Photography",
      description: "Master the art of capturing the urban landscape with our comprehensive guide.",
      thumbnail: [
        { url: "https://example.com/images/city-photography.jpg" }
      ],
      url: "https://www.example.com/city-photography",
      origin: "organic"
    },
    {
      name: "Transform Your Home with These Simple Tricks",
      description: "Revamp your living space with easy and affordable home decor ideas.",
      thumbnail: [
        { url: "https://example.com/images/home-decor.jpg" }
      ],
      url: "https://www.example.com/home-decor",
      origin: "sponsored",
      branding: "Tech Innovators Inc." // Advertiser name
    },
    {
      name: "Boost Your Productivity with These Tech Gadgets",
      description: "Discover gadgets that can make your daily tasks more efficient and fun.",
      thumbnail: [
        { url: "https://example.com/images/tech-gadgets.jpg" }
      ],
      url: "https://www.example.com/tech-gadgets",
      origin: "sponsored",
      branding: "Tech Innovators Inc." // Advertiser name
    }
  ];

  export { mockRecommendations };