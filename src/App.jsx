import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Leaf } from 'lucide-react';

const ParadiseNursery = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [cart, setCart] = useState({});

  // Sample plant data organized by categories
  const plants = {
    'Indoor Plants': [
      { id: 1, name: 'Monstera Deliciosa', price: 45, image: 'https://images.unsplash.com/photo-1586078298971-dfe8567e5b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80' },
      { id: 2, name: 'Snake Plant', price: 25, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80' }
    ],
    'Succulents': [
      { id: 3, name: 'Jade Plant', price: 15, image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80' },
      { id: 4, name: 'Aloe Vera', price: 20, image: 'https://images.unsplash.com/photo-1509423350716-97f2360af88e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80' }
    ],
    'Flowering Plants': [
      { id: 5, name: 'Peace Lily', price: 35, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80' },
      { id: 6, name: 'African Violet', price: 18, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80' }
    ]
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const getTotalCost = () => {
    return Object.entries(cart).reduce((total, [plantId, quantity]) => {
      const plant = Object.values(plants).flat().find(p => p.id === parseInt(plantId));
      return total + (plant ? plant.price * quantity : 0);
    }, 0);
  };

  const addToCart = (plantId) => {
    setCart(prev => ({
      ...prev,
      [plantId]: (prev[plantId] || 0) + 1
    }));
  };

  const updateCartQuantity = (plantId, change) => {
    setCart(prev => {
      const currentQuantity = prev[plantId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      
      if (newQuantity === 0) {
        const { [plantId]: removed, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [plantId]: newQuantity
      };
    });
  };

  const removeFromCart = (plantId) => {
    setCart(prev => {
      const { [plantId]: removed, ...rest } = prev;
      return rest;
    });
  };

  const Header = () => (
    <header className="bg-green-700 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Leaf className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Paradise Nursery</h1>
        </div>
        <nav className="flex items-center space-x-6">
          {currentPage !== 'products' && (
            <button
              onClick={() => setCurrentPage('products')}
              className="hover:text-green-200 transition-colors"
            >
              Products
            </button>
          )}
          {currentPage !== 'landing' && (
            <button
              onClick={() => setCurrentPage('landing')}
              className="hover:text-green-200 transition-colors"
            >
              Home
            </button>
          )}
          {currentPage !== 'cart' && (
            <button
              onClick={() => setCurrentPage('cart')}
              className="flex items-center space-x-2 hover:text-green-200 transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
          )}
        </nav>
      </div>
    </header>
  );

  const LandingPage = () => (
    <div className="min-h-screen">
      <div 
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900&q=80')`
        }}
      >
        <div className="text-center text-white max-w-4xl px-6">
          <h1 className="text-6xl font-bold mb-6 text-green-100">Paradise Nursery</h1>
          <p className="text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
            Welcome to Paradise Nursery, where nature meets nurture. We specialize in bringing the beauty 
            of the natural world into your home with our carefully curated collection of premium houseplants. 
            From air-purifying snake plants to stunning monsteras, we have everything you need to create 
            your own green paradise. Each plant is hand-selected and cared for by our expert horticulturists 
            to ensure you receive only the healthiest, most vibrant specimens.
          </p>
          <button
            onClick={() => setCurrentPage('products')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );

  const ProductListingPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Plant Collection</h2>
        
        {Object.entries(plants).map(([category, categoryPlants]) => (
          <div key={category} className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-green-700 border-b-2 border-green-200 pb-2">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPlants.map(plant => (
                <div key={plant.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80';
                    }}
                  />
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-2 text-gray-800">{plant.name}</h4>
                    <p className="text-2xl font-bold text-green-600 mb-4">${plant.price}</p>
                    <button
                      onClick={() => addToCart(plant.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ShoppingCartPage = () => {
    const cartItems = Object.entries(cart).map(([plantId, quantity]) => {
      const plant = Object.values(plants).flat().find(p => p.id === parseInt(plantId));
      return { plant, quantity };
    }).filter(item => item.plant);

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto py-12 px-6">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Shopping Cart</h2>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-24 h-24 mx-auto text-gray-400 mb-6" />
              <p className="text-xl text-gray-600 mb-8">Your cart is empty</p>
              <button
                onClick={() => setCurrentPage('products')}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center text-lg font-semibold mb-4">
                  <span>Total Items: {getTotalItems()}</span>
                  <span className="text-2xl text-green-600">Total: ${getTotalCost().toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-6">
                {cartItems.map(({ plant, quantity }) => (
                  <div key={plant.id} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center space-x-6">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80';
                        }}
                      />
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800">{plant.name}</h3>
                        <p className="text-lg text-green-600 font-semibold">${plant.price} each</p>
                        <p className="text-gray-600">Subtotal: ${(plant.price * quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateCartQuantity(plant.id, -1)}
                          className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-colors duration-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(plant.id, 1)}
                          className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-colors duration-300"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(plant.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300 ml-4"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-12">
                <button
                  onClick={() => setCurrentPage('products')}
                  className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Continue Shopping</span>
                </button>
                <button
                  onClick={() => alert('Checkout functionality would be implemented here!')}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans">
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'products' && <ProductListingPage />}
      {currentPage === 'cart' && <ShoppingCartPage />}
    </div>
  );
};

export default ParadiseNursery;