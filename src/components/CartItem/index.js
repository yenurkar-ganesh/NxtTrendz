import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
      } = value

      const {cartItemDetails} = props
      const {id, title, brand, quantity, price, imageUrl} = cartItemDetails

      const onIncrement = () => incrementCartItemQuantity(id)
      const onDecrement = () => decrementCartItemQuantity(id)
      const onRemove = () => removeCartItem(id)

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={imageUrl} alt={title} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">by {brand}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrement}
                aria-label="Decrement quantity"
                data-testid="minus"
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity" data-testid={`quantity-${id}`}>
                {quantity}
              </p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrement}
                aria-label="Increment quantity"
                data-testid="plus"
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {price * quantity}/-</p>
              <button
                type="button"
                className="remove-button"
                onClick={onRemove}
                aria-label="Remove item"
                data-testid="remove"
              >
                <AiFillCloseCircle color="#D9534F" size={16} />
              </button>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
