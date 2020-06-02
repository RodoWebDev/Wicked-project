const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const PolicySchema = new mongoose.Schema({
    policyName: String,
    policyNumber: String,
    policyType: String,
    planningNeeds: String,
    company: String,
    policyStartDate: String,
    ageIncepted: String,
    policyEndAge: String,
    policyDuration: String,
    premiumSGD: String,
    paymentFrequency: String,
    paymentMethod: String,
    premiumEndAge: String,
    remarks: String,
    cashValueAge:String,
    cashValueAmount:String,
    maturityAmountAge: String,
    maturityAmount: String,
    couponPayoutFromAge: String,
    couponPayoutToAge: String,
    couponPayoutAnnualAmount: String,
    investmentValueAge1: String,
    investmentValueAge2: String,
    investmentValueAge3: String,
    investmentValueAmount1: String,
    investmentValueAmount2: String,
    investmentValueAmount3: String,
    benefit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Benefit",
        autopopulate: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

PolicySchema.plugin(autopopulate);

const Policy = mongoose.model("Policy", PolicySchema);
module.exports = Policy;
