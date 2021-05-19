const UAPayService = require("../services/uapay")

module.exports.checkoutECOM = async function(req, res) {
    try {
        const sessionResponse = await UAPayService.createSession();        
        const invoiceResponse = await UAPayService.createInvoiceECOM(sessionResponse.id);

        res.send(invoiceResponse);  
    } catch (e) {
        res.send(e);
    }    
}

module.exports.checkoutP2P = async function(req, res) {
    res.send({});
}
