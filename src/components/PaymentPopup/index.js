import {useState} from 'react'
import Popup from 'reactjs-popup'
import './index.css'

const paymentOptions = [
  {id: 101, option: 'Card', disabled: true},
  {id: 102, option: 'Net Banking', disabled: true},
  {id: 103, option: 'UPI', disabled: true},
  {id: 104, option: 'Wallet', disabled: true},
  {id: 105, option: 'Cash On Delivery', disabled: false},
]

const App = ({totalItems = 0, totalAmount = 0}) => {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePaymentSelection = option => {
    setSelectedPaymentOption(option)
  }

  const handleOrderConfirmation = () => {
    if (selectedPaymentOption === 'Cash On Delivery') {
      setOrderPlaced(true)
    }
  }

  return (
    <>
      <Popup
        trigger={<button className="button">Checkout</button>}
        modal
        nested
      >
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <h1 className="header">Payment Options</h1>
            <p className="summary-of-payment">
              You need to pay <strong>₹{totalAmount}</strong> for{' '}
              <strong>{totalItems}</strong> items in your shopping cart.
            </p>
            <ul className="content">
              {paymentOptions.map(eachOption => (
                <li key={eachOption.id} className="payment-options">
                  <input
                    type="radio"
                    id={eachOption.id}
                    name="paymentOption"
                    value={eachOption.option}
                    disabled={eachOption.disabled}
                    onChange={() => handlePaymentSelection(eachOption.option)}
                  />
                  <label htmlFor={eachOption.id}>{eachOption.option}</label>
                </li>
              ))}
            </ul>
            <div className="actions">
              <button
                className="button"
                disabled={selectedPaymentOption !== 'Cash On Delivery'}
                onClick={handleOrderConfirmation}
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </Popup>
      {orderPlaced && (
        <Popup open modal nested>
          {close => (
            <div className="modal">
              <p>Your order has been placed successfully!</p>
              <button className="button" onClick={close}>
                Close
              </button>
            </div>
          )}
        </Popup>
      )}
    </>
  )
}

export default App
