const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const ClientSchema = new mongoose.Schema({
    nricName: String,
    title:String,
    preferredName: String,
    nric_passport: String,
    dob: Date,
    nextFollowUpDate:Date,
    lastpurchasae:Date,
    lastcontactdate:Date,
    maritalStatus: String,
    hobbies: String,
    email: String,
    contact: String,
    contact2:String,
    familyrelationship:String,
    companyaddress:String,
    companyname:String,
    occupation:String,
    race: String,
    nationality: String,
    address: String,
    gender: String,
    category: String,
    family: {
        label: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            autopopulate: false
        },
    },
    annualExpense: Number,
    monthlyExpense:Number,
    annualShortTermSavings: Number,
    monthlyShortTermSavings:Number,
    annualIncome: Number,
    monthlyIncome: Number,
    referredsource: {
        label: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            autopopulate: false
        },
    },
    othersource:String,
    remarks: String,
    del: {
        type: Boolean, 
        default: false
    },
    cards:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
        autopopulate: true
    }],
    policies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Policy",
        autopopulate: true
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        autopopulate: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

ClientSchema.plugin(autopopulate);

ClientSchema.virtual("normalDate").get(function() {
    return new Date(this.createdOn).toLocaleDateString("en-US");
});

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;
