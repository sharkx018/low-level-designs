const PaymentProcessorInterface = require('./payment-processor')

class PaypalPayment extends PaymentProcessorInterface{

    constructor(paypalEmail) {
        super();
        this.paypalEmail = paypalEmail
    }

    process(amount) {
        console.log(`Processing paypal payment of ${amount} for ${this.paypalEmail}`)

        // return the transaction
        return {
            status: 'completed',
            transactionId: `PP-${Date.now()}`,
            paypalEmail: this.paypalEmail
        }
    }

    refund(transactionDetails){
        console.log(`Refunding Paypal payment: ${transactionDetails.transactionId}`)
        return {
            status: 'refund',
            refundTransactionId: `REF-${transactionDetails.transactionId}`
        }
    }

}
