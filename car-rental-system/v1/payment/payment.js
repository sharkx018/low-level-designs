

class Payment{
    constructor(paymentId, bookingId, amount, method, transactionDate = new Date()) {
        this.paymentId = paymentId
        this.bookingId = bookingId
        this.amount = amount
        this.status = 'pending'
        this.method = method
        this.transactionDate = transactionDate
        this.transactionDetails = null
    }

    processPayment(){
        this.transactionDetails = this.method.process(this.amount)
        this.status = this.transactionDetails.status

        console.log(`Payment processed successfully with ID: ${this.transactionDetails.transactionId}`)
        return this.transactionDetails
    }

    refundPayment(){
        if(!this.transactionDetails|| this.status !== 'completed'){
            throw new Error('Payment can not be refunded')
        }

        const refundDetails = this.method.refund(this.transactionDetails)
        this.status = refundDetails.status

        return refundDetails
    }

    getPaymentStatus(){
        return {
            paymentId: this.paymentId,
            bookingId: this.bookingId,
            amount: this.amount,
            status: this.status,
            method: this.method,
            transactionDate: this.transactionDate,
            transactionDetails: this.transactionDetails,

        }

    }

}

module.exports = Payment
