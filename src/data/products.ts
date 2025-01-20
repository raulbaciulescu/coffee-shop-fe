export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  galleryImages: string[];
  description: string;
  origin: string;
  roastLevel: string;
  flavorNotes: string[];
}

export const products: Product[] = [
  {
    id: "house-blend",
    name: "House Blend",
    price: "$4.50",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&q=80"
    ],
    description: "Our signature house blend combines carefully selected beans from Central and South America, creating a perfectly balanced cup with medium body and subtle complexity.",
    origin: "Multi-region blend",
    roastLevel: "Medium",
    flavorNotes: ["Chocolate", "Caramel", "Light citrus"]
  },
  {
    id: "ethiopian-light",
    name: "Ethiopian Light Roast",
    price: "$5.00",
    image: "https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80"
    ],
    description: "This light roast Ethiopian coffee showcases the delicate floral and fruit notes characteristic of the region, with a bright acidity and tea-like body.",
    origin: "Yirgacheffe, Ethiopia",
    roastLevel: "Light",
    flavorNotes: ["Jasmine", "Bergamot", "Peach"]
  },
  {
    id: "colombian-dark",
    name: "Colombian Dark",
    price: "$4.75",
    image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80"
    ],
    description: "A rich, full-bodied dark roast made from premium Colombian beans, featuring deep chocolate notes and a smooth, clean finish.",
    origin: "Huila, Colombia",
    roastLevel: "Dark",
    flavorNotes: ["Dark chocolate", "Walnut", "Brown sugar"]
  },
  {
    id: "colombian-dark2",
    name: "Colombian Dark2",
    price: "$4.757",
    image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80"
    ],
    description: "A rich, full-bodied dark roast made from premium Colombian beans, featuring deep chocolate notes and a smooth, clean finish.",
    origin: "Huila, Colombia",
    roastLevel: "Dark",
    flavorNotes: ["Dark chocolate", "Walnut", "Brown sugar"]
  }
];