import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {Product} from '../data/products';
import { useCart } from '../contexts/CartContext';
import {productService} from "../../services/api.ts";

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useCart();
  const [product, setProduct] = useState();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const response = await productService.getById(id!);
    let data: Product;
    data = {
      id:  response.id,
      name:  response.name,
      description:  response.description,
      galleryImages: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&q=80"
      ],
      origin:  response.origin,
      roastLevel: "Medium",
      flavorNotes: ["Chocolate", "Caramel", "Light citrus"],
      image:  response.imageUrl ,
      price: `$${ response.price}`
    }
    setProduct(data);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/" className="text-[#6F4E37] hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center text-[#6F4E37] hover:underline mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
            <div className="grid grid-cols-3 gap-4">
              {product.galleryImages.map((image, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-[#6F4E37] font-bold mb-6">{product.price}</p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <dl className="space-y-2">
                  <div>
                    <dt className="font-medium">Origin</dt>
                    <dd className="text-gray-600">{product.origin}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Roast Level</dt>
                    <dd className="text-gray-600">{product.roastLevel}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Flavor Notes</h2>
                <div className="flex flex-wrap gap-2">
                  {product.flavorNotes.map((note, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-[#f8f3e9] rounded-full text-sm"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={addToCart}
                className="w-full bg-[#6F4E37] text-white py-3 px-6 rounded-lg hover:bg-[#5D3D2B] transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}