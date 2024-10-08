const PaymentProcessorInterface = require('./payment-processor')


class CreditCardPayment extends PaymentProcessorInterface {

    constructor(cardNumber, cardHolder, expiryDate, cvv) {
        super();
        this.cardNumber = cardHolder
        this.cardHolder = cardHolder
        this.expiry = expiryDate
        this.cvv = cvv
    }

    process(amount) {
        console.log(`Processing credit card payment of $${amount}`)
        return {
            status: 'completed',
            transactionId: `CC-${Date.now()}`,
            maskedCard: `****-****-****-${this.cardNumber.slice(-4)}`
        }
    }

    refund(transactionDetails) {
        console.log(`Refunding credit card payment: ${transactionDetails.transactionId}`)
        return {
            status: 'refunded',
            refundTransactionId: `REF-${transactionDetails.transactionId}`
        }
    }
}

module.exports = CreditCardPayment
