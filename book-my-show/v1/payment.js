class Payment {

    constructor(id, bookingId, amount, paymentMethod) {
        this.id = `payment-id:${Date.now()}`
        this.bookingId = bookingId
        this.amount = amount
        this.status = 'pending'
        this.paymentMethod = paymentMethod
    }

    makePayment(){
        this.status = "success"
    }

    refundPayment(){
        this.status = "refunded"
    }

}

module.exports = Payment
