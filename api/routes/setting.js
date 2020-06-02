const express = require("express");
const router = express.Router();
const Setting = require("../db/models/Setting");
const Company = require("../db/models/Company");
const authorize = require("../utils/authorize.js");

router.get("/", authorize, (req, res) => {
  Setting.findOne()
    .exec()
    .then(setting => {
      return res.json(setting);
    })
    .catch(err => {
      console.error("setting.js: failed to lookup setting", err);
      return res.status(500).json({
        error: err
      });
    });
});

router.post("/addCompany", authorize, (req, res) => {
  if(req.body.company) {
      let companyname = req.body.company;
      var company = new Company();
      let header = {
        'headername': 'Header',
        'text': 'Text',
        'textarray': [],
        'outarray': [],
      };
      for(var i=0;i<100;i++)
      {
        header.textarray[i] = 0;
        header.outarray[i] = 0;
      }
      company.companyname = companyname;
      company.headers[0] = header;
      company.headers[1] = header;
      company.save()
      .then(doc => {
        Company.find({}).exec( function ( err, result){
            return res.json(result);
          })          
      })
      .catch(err => {
          console.error("Failed to update account: ", err);
          return res.status(500).json({ error: err });
      });
  }
});

router.post("/updateCompany", authorize, (req, res) => {
  let updateData = req.body.company;
  if(req.body.company) {
      Company.findByIdAndUpdate(req.body.id, {
        $set: updateData
      })
      .then(doc => {
        return res.json(doc);
      })
      .catch(err => {
          console.error("Failed to update account: ", err);
          return res.status(500).json({ error: err });
      });      
  }
});

router.get("/getCompany", authorize, (req, res) => {
  Company.find({}).exec( function ( err, result){
    return res.json(result);
  })
});

router.get("/getCompany/:id", authorize, (req, res) => {
  Company.findById(req.params.id)
      .exec()
      .then(company => {
        return res.json(company);
      })
      .catch(err => {
          console.error("company.js: failed to lookup user by ID", err);
          return res.status(500).json({
              error: err
          });
      });
});
module.exports = router;
