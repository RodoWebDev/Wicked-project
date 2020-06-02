const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const findOrCreate = require("mongoose-findorcreate");
const autopopulate = require("mongoose-autopopulate");

const CompanySchema = new mongoose.Schema({
    companyname: {
        type: String,
        index: { unique: true }
    },
    headers: {
        type: Array
    }
});

// CompanySchema.methods.verifyPassword = function verifyPassword(password) {
//     return bcrypt
//         .compare(password, this.password)
//         .then(res => res)
//         .catch(err => err);
// };

CompanySchema.plugin(findOrCreate);
CompanySchema.plugin(autopopulate);

// CompanySchema.set("toJSON", {
//     transform: function(doc, ret, options) {
//         if (ret.createdOn) {
//             const options = {
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//                 hour: "numeric",
//                 minute: "numeric"
//             };
//             ret.createdOn = ret.createdOn.toLocaleDateString("en-US", options);
//         }

//         return ret;
//     }
// });

// UserSchema.virtual("normalDate").get(function() {
//     return new Date(this.createdOn).toLocaleDateString("en-US");
// });

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
