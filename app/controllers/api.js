const UAPayService = require("../services/uapay")

module.exports.checkout = async function(req, res) {
    const sessionResponse = await UAPayService.createSession();
    res.send(sessionResponse.data);  
}
