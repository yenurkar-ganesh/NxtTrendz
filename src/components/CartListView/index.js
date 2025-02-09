import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'
import PaymentPopup from '../PaymentPopup'
import EmptyCartView from '../EmptyCartView'
import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const checkoutHandler = () => {}

      if (!Array.isArray(cartList) || cartList.length === 0) {
        return <EmptyCartView />
      }

      const totalAmount = cartList.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      )
      const totalItems = cartList.reduce((sum, item) => sum + item.quantity, 0)

      return (
        <div className="cart-view-container">
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>
          <div className="cart-summary">
            <h1 className="order-total-heading">
              Order Total: Rs {totalAmount}/-
            </h1>
            <p>{`${totalItems} ${
              totalItems > 1 ? 'Items' : 'Item'
            } in cart`}</p>
            <div className="btn-section">
              <PaymentPopup totalAmount={totalAmount} totalItems={totalItems} />
              <button
                type="button"
                className="remove-all-button"
                onClick={removeAllCartItems}
              >
                Remove All
              </button>
            </div>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
