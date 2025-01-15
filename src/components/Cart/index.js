import './index.css'
import Header from '../Header'
import CartListView from '../CartListView'

const Cart = () => (
  <>
    <Header />
    <div className="cart-container">
      <h1 className="cart-heading">My Cart</h1>
      <CartListView />
    </div>
  </>
)

export default Cart
