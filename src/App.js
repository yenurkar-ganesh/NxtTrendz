import {useState, useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import CartContext from './context/CartContext'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const [cartList, setCartList] = useState(() => {
    const storedCart = localStorage.getItem('storedCart')
    return storedCart ? JSON.parse(storedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('storedCart', JSON.stringify(cartList))
  }, [cartList])

  const addCartItem = product => {
    setCartList(prevCartList => {
      const existingProduct = prevCartList.find(item => item.id === product.id)
      if (existingProduct) {
        return prevCartList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + product.quantity}
            : item,
        )
      }
      return [...prevCartList, product]
    })
  }

  const removeCartItem = productId => {
    setCartList(prevCartList =>
      prevCartList.filter(item => item.id !== productId),
    )
  }

  const incrementCartItemQuantity = productId => {
    setCartList(prevCartList =>
      prevCartList.map(item =>
        item.id === productId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = productId => {
    setCartList(prevCartList =>
      prevCartList
        .map(item =>
          item.id === productId ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/products" component={Products} />
        <ProtectedRoute
          exact
          path="/products/:id"
          component={ProductItemDetails}
        />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
