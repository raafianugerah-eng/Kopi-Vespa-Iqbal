import { useState, useEffect, useMemo } from 'react'
import { Search, ShoppingCart, User, Home, ClipboardList, LogOut, Plus, Minus, Trash2, ChevronLeft, Check, Coffee, ArrowRight, CreditCard, QrCode } from 'lucide-react'
import './App.css'

// TYPES
type PageType = 'auth' | 'home' | 'cart' | 'checkout' | 'orders' | 'profile'

interface User {
  id: string
  name: string
  email: string
  phone: string
}

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface CartItem extends MenuItem {
  quantity: number
}

interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'completed'
  date: string
  paymentMethod: string
}

interface PaymentMethod {
  id: string
  name: string
  icon: string
  color: string
}

// MOCK DATA
const menuItems: MenuItem[] = [
  { id: '1', name: 'Espresso', description: 'Strong & intense coffee shot', price: 18000, image: 'https://images.unsplash.com/photo-1510707577719-ae7afe3e6c8e?w=400&h=400&fit=crop', category: 'Coffee' },
  { id: '2', name: 'Cappuccino', description: 'Espresso with steamed milk foam', price: 28000, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=400&fit=crop', category: 'Coffee' },
  { id: '3', name: 'Latte', description: 'Creamy espresso with milk', price: 32000, image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=400&fit=crop', category: 'Coffee' },
  { id: '4', name: 'Americano', description: 'Espresso with hot water', price: 22000, image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=400&h=400&fit=crop', category: 'Coffee' },
  { id: '5', name: 'Mocha', description: 'Chocolate espresso with milk', price: 35000, image: 'https://images.unsplash.com/photo-1578636671444-1464f9c0c841?w=400&h=400&fit=crop', category: 'Coffee' },
  { id: '6', name: 'Caramel Macchiato', description: 'Vanilla, caramel & espresso', price: 38000, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop', category: 'Coffee' },
  { id: '7', name: 'Cold Brew', description: 'Smooth 24-hour steeped coffee', price: 25000, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop', category: 'Cold' },
  { id: '8', name: 'Iced Latte', description: 'Chilled latte over ice', price: 30000, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565050c?w=400&h=400&fit=crop', category: 'Cold' },
  { id: '9', name: 'Croissant', description: 'Buttery flaky pastry', price: 15000, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop', category: 'Pastry' },
  { id: '10', name: 'Cinnamon Roll', description: 'Sweet rolled pastry with icing', price: 22000, image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&h=400&fit=crop', category: 'Pastry' },
  { id: '11', name: 'Blueberry Muffin', description: 'Moist muffin with blueberries', price: 18000, image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=400&fit=crop', category: 'Pastry' },
  { id: '12', name: 'Avocado Toast', description: 'Smashed avocado on sourdough', price: 45000, image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=400&fit=crop', category: 'Food' }
]

const paymentMethods: PaymentMethod[] = [
  { id: 'qris', name: 'QRIS', icon: 'qr', color: '#1B3A2B' },
  { id: 'dana', name: 'DANA', icon: 'wallet', color: '#0080FF' },
  { id: 'ovo', name: 'OVO', icon: 'circle', color: '#4E1499' },
  { id: 'gopay', name: 'GoPay', icon: 'circle', color: '#00AA13' }
]

// AUTH PAGE COMPONENT
function AuthPage({ onLogin }: { onLogin: (user: User) => void }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!isLogin && !formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.password.trim()) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const user: User = {
        id: Date.now().toString(),
        name: formData.name || 'User',
        email: formData.email,
        phone: formData.phone
      }
      onLogin(user)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B3A2B] to-[#8B5A3C] flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Coffee className="w-16 h-16 text-white mb-4" />
        </div>
        <h1 className="text-center text-3xl font-bold text-white">Kopi Vespa</h1>
        <p className="text-center text-white/80 mt-2">Premium Coffee Experience</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/95 backdrop-blur-sm py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          <h2 className="text-2xl font-bold text-[#1B3A2B] text-center mb-6">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1B3A2B] focus:border-transparent transition-all ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1B3A2B] focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1B3A2B] focus:border-transparent transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1B3A2B] focus:border-transparent transition-all ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1B3A2B] to-[#8B5A3C] text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setErrors({})
                setFormData({ name: '', email: '', phone: '', password: '' })
              }}
              className="text-[#8B5A3C] hover:text-[#1B3A2B] font-medium text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// HOME PAGE COMPONENT - FIXED SCROLL ISSUE
function HomePage({ user, cart, onAddToCart, onNavigate }: { 
  user: User
  cart: CartItem[]
  onAddToCart: (item: MenuItem) => void
  onNavigate: (page: PageType) => void
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [addedItemId, setAddedItemId] = useState<string | null>(null)

  const categories = ['All', 'Coffee', 'Cold', 'Pastry', 'Food']

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleAddToCart = (item: MenuItem) => {
    onAddToCart(item)
    setAddedItemId(item.id)
    setTimeout(() => setAddedItemId(null), 1000)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-[#1B3A2B]">Hello, {user.name}</h1>
              <p className="text-sm text-gray-500">What would you like today?</p>
            </div>
            <button 
              onClick={() => onNavigate('cart')} 
              className="relative p-2 bg-[#1B3A2B] rounded-full text-white hover:bg-[#2d4f3f] transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8B5A3C] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce-in">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search coffee, pastry, food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:ring-2 focus:ring-[#1B3A2B] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-[#1B3A2B] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Menu Grid - FIXED SCROLL ISSUE */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-4 pb-24">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-xs font-bold text-[#8B5A3C]">{item.category}</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-[#1B3A2B] text-sm mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#8B5A3C]">{formatPrice(item.price)}</span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`p-2 rounded-full transition-all ${
                        addedItemId === item.id
                          ? 'bg-green-500 text-white'
                          : 'bg-[#1B3A2B] text-white hover:bg-[#2d4f3f]'
                      }`}
                    >
                      {addedItemId === item.id ? (
                        <Check className="w-4 h-4 animate-bounce-in" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-20">
        <div className="flex justify-around">
          <button className="flex flex-col items-center gap-1 py-2 px-4 text-[#1B3A2B]">
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={() => onNavigate('orders')} 
            className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400 hover:text-[#1B3A2B] transition-colors"
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-xs font-medium">Orders</span>
          </button>
          <button 
            onClick={() => onNavigate('profile')} 
            className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400 hover:text-[#1B3A2B] transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

// CART PAGE COMPONENT
function CartPage({ cart, onUpdateQuantity, onRemoveItem, onNavigate }: { 
  cart: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onNavigate: (page: PageType) => void
}) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white px-4 py-4 shadow-sm flex items-center gap-4">
          <button onClick={() => onNavigate('home')} className="p-1">
            <ChevronLeft className="w-6 h-6 text-[#1B3A2B]" />
          </button>
          <h1 className="text-lg font-bold text-[#1B3A2B]">Your Cart</h1>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <ShoppingCart className="w-20 h-20 text-gray-300 mb-4" />
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Your cart is empty</h2>
          <p className="text-sm text-gray-400 mb-6">Add some delicious coffee to get started</p>
          <button
            onClick={() => onNavigate('home')}
            className="bg-[#1B3A2B] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#2d4f3f] transition-all"
          >
            Browse Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-4 py-4 shadow-sm flex items-center gap-4">
        <button onClick={() => onNavigate('home')} className="p-1">
          <ChevronLeft className="w-6 h-6 text-[#1B3A2B]" />
        </button>
        <h1 className="text-lg font-bold text-[#1B3A2B]">Your Cart ({cart.length} items)</h1>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 flex gap-4 shadow-sm">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-bold text-[#1B3A2B] mb-1">{item.name}</h3>
                <p className="text-sm text-[#8B5A3C] font-semibold">{formatPrice(item.price)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-medium w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Tax (10%)</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-[#1B3A2B]">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
        <button
          onClick={() => onNavigate('checkout')}
          className="w-full bg-gradient-to-r from-[#1B3A2B] to-[#8B5A3C] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Proceed to Checkout
          <ArrowRight className="w-5 h-5" />
        </button>
      </footer>
    </div>
  )
}

// CHECKOUT PAGE COMPONENT
function CheckoutPage({ cart, user, onPlaceOrder, onNavigate }: { 
  cart: CartItem[]
  user: User
  onPlaceOrder: (paymentMethod: string) => void
  onNavigate: (page: PageType) => void
}) {
  const [selectedPayment, setSelectedPayment] = useState('qris')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
  }

  const handlePlaceOrder = () => {
    setShowConfirmation(true)
    setTimeout(() => {
      onPlaceOrder(selectedPayment)
      setShowConfirmation(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-4 py-4 shadow-sm flex items-center gap-4">
        <button onClick={() => onNavigate('cart')} className="p-1">
          <ChevronLeft className="w-6 h-6 text-[#1B3A2B]" />
        </button>
        <h1 className="text-lg font-bold text-[#1B3A2B]">Checkout</h1>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="font-bold text-[#1B3A2B] mb-3">Delivery Information</h2>
            <div className="space-y-2 text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-500">{user.phone}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="font-bold text-[#1B3A2B] mb-3">Order Summary</h2>
            <div className="space-y-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} x{item.quantity}</span>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-[#1B3A2B]">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="font-bold text-[#1B3A2B] mb-3">Payment Method</h2>
            <div className="space-y-3">
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full flex items-center gap-4 p-3 border rounded-xl transition-all ${
                    selectedPayment === method.id
                      ? 'border-[#1B3A2B] bg-[#1B3A2B]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: method.color + '20' }}
                  >
                    {method.icon === 'qr' ? (
                      <QrCode className="w-6 h-6" style={{ color: method.color }} />
                    ) : (
                      <CreditCard className="w-6 h-6" style={{ color: method.color }} />
                    )}
                  </div>
                  <span className="font-medium flex-1">{method.name}</span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedPayment === method.id ? 'border-[#1B3A2B] bg-[#1B3A2B]' : 'border-gray-300'
                    }`}
                  >
                    {selectedPayment === method.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 p-4">
        <button
          onClick={handlePlaceOrder}
          disabled={showConfirmation}
          className="w-full bg-gradient-to-r from-[#1B3A2B] to-[#8B5A3C] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {showConfirmation ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>Place Order - {formatPrice(total)}</>
          )}
        </button>
      </footer>
    </div>
  )
}

// ORDERS PAGE COMPONENT
function OrdersPage({ orders, onNavigate }: { orders: Order[], onNavigate: (page: PageType) => void }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-4 py-4 shadow-sm flex items-center gap-4">
        <button onClick={() => onNavigate('home')} className="p-1">
          <ChevronLeft className="w-6 h-6 text-[#1B3A2B]" />
        </button>
        <h1 className="text-lg font-bold text-[#1B3A2B]">My Orders</h1>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="p-4">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <ClipboardList className="w-16 h-16 text-gray-300 mb-4" />
              <h2 className="text-lg font-semibold text-gray-500 mb-2">No orders yet</h2>
              <p className="text-sm text-gray-400 mb-6">Your order history will appear here</p>
              <button
                onClick={() => onNavigate('home')}
                className="bg-[#1B3A2B] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#2d4f3f] transition-all"
              >
                Order Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-[#1B3A2B]">Order #{order.id.slice(-6)}</h3>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status === 'completed' ? 'Completed' : 'Processing'}
                    </span>
                  </div>
                  <div className="space-y-1 mb-3">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name} x{item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-[#1B3A2B]">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Payment: {order.paymentMethod.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <button 
            onClick={() => onNavigate('home')} 
            className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400 hover:text-[#1B3A2B] transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2 px-4 text-[#1B3A2B]">
            <ClipboardList className="w-5 h-5" />
            <span className="text-xs font-medium">Orders</span>
          </button>
          <button 
            onClick={() => onNavigate('profile')} 
            className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400 hover:text-[#1B3A2B] transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

// PROFILE PAGE COMPONENT
function ProfilePage({ user, onLogout, onNavigate }: { user: User, onLogout: () => void, onNavigate: (page: PageType) => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-gradient-to-r from-[#1B3A2B] to-[#8B5A3C] px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{user.name}</h1>
            <p className="text-white/80 text-sm">{user.email}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="font-bold text-[#1B3A2B] mb-3">Account Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Full Name</p>
                <p className="font-medium text-[#1B3A2B]">{user.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="font-medium text-[#1B3A2B]">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="font-medium text-[#1B3A2B]">{user.phone}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <button 
              onClick={() => onNavigate('orders')} 
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="flex items-center gap-3">
                <ClipboardList className="w-5 h-5 text-[#8B5A3C]" />
                <span className="font-medium text-[#1B3A2B]">Order History</span>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="font-medium text-red-500">Sign Out</span>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>
          </div>
        </div>
      </main>

      <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <button 
            onClick={() => onNavigate('home')} 
            className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400 hover:text-[#1B3A2B] transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={() => onNavigate('orders')} 
            className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400 hover:text-[#1B3A2B] transition-colors"
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-xs font-medium">Orders</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2 px-4 text-[#1B3A2B]">
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

// MAIN APP COMPONENT
function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('auth')
  const [user, setUser] = useState<User | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const savedUser = localStorage.getItem('kopiVespaUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setCurrentPage('home')
    }
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem('kopiVespaUser', JSON.stringify(user))
    } else {
      localStorage.removeItem('kopiVespaUser')
    }
  }, [user])

  const handleLogin = (userData: User) => {
    setUser(userData)
    setCurrentPage('home')
  }

  const handleLogout = () => {
    setUser(null)
    setCart([])
    setCurrentPage('auth')
  }

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id)
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item))
    }
  }

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const handlePlaceOrder = (paymentMethod: string) => {
    if (cart.length === 0 || !user) return

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.1
    const total = subtotal + tax

    const newOrder: Order = {
      id: Date.now().toString(),
      items: cart,
      total,
      status: 'completed',
      date: new Date().toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      paymentMethod
    }

    setOrders(prev => [newOrder, ...prev])
    setCart([])
    setCurrentPage('orders')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'auth':
        return <AuthPage onLogin={handleLogin} />
      case 'home':
        return user ? (
          <HomePage user={user} cart={cart} onAddToCart={handleAddToCart} onNavigate={setCurrentPage} />
        ) : null
      case 'cart':
        return user ? (
          <CartPage cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveFromCart} onNavigate={setCurrentPage} />
        ) : null
      case 'checkout':
        return user ? (
          <CheckoutPage cart={cart} user={user} onPlaceOrder={handlePlaceOrder} onNavigate={setCurrentPage} />
        ) : null
      case 'orders':
        return user ? (
          <OrdersPage orders={orders} onNavigate={setCurrentPage} />
        ) : null
      case 'profile':
        return user ? (
          <ProfilePage user={user} onLogout={handleLogout} onNavigate={setCurrentPage} />
        ) : null
      default:
        return <AuthPage onLogin={handleLogin} />
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen overflow-hidden">
      {renderPage()}
    </div>
  )
}

export default App