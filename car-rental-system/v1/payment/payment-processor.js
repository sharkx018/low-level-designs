

// Strategy Pattern
class PaymentProcessorInterface{
    process(amount){
        throw new Error('process() method must be implemented by the subclass')
    }

    refund(transactionDetails){
        throw new Error('refunc() method must be implemented by the subclass')
    }
}

module.exports = PaymentProcessorInterface
