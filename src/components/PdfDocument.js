import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Canvas
} from "@react-pdf/renderer";
import moment from "moment";
// const riskmanagement=/risk Management/i;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    margin: "50px"
  },
  title: {
    padding: "10px;",
    marginTop: 5,
    fontSize: 10,
    fontWeight: 700,
    marginLeft: 52
  },
  margin: {
    marginTop: "20px"
    // marginBottom: "20px"
  },
  tableC: {
    display: "table",
    width: 400
  },
  ColC: {
    width: "150px",
    borderStyle: "solid"
  },

  table: {
    display: "table",
    width: "422px",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: 'auto',
  },
  tableRow: { flexDirection: "row" },
  tableCol: {
    width: "60px",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { marginBottom: 3, fontSize: 9, padding: 5 },

  table1: {
    display: "table",
    width: "422px",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow1: { flexDirection: "row" },
  tableCol1: {
    width: "60px",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell1: { marginBottom: 3, fontSize: 11, padding: 5 },
  tableCol2: {
    width: "300px",
    // height:"100px",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol3: {
    width: "120px",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol5: {
    width: "60px"
  },
  table2: {
    display: "table",
    width: "562px",
    margin: 'auto',
  },
  tableColRisk: {
    width: "160px",
    backgroundColor: "#333"
  },
  tableColsRisk: {
    width: "160px",
    backgroundColor: "#ccc",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderColor: "white"
  },
  tableColBenefit: {
    width: "160px",
    backgroundColor: "#333",
    textAlign: "center"
  },
  tableColsBenefit: {
    width: "160px",
    backgroundColor: "#ccc",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderColor: "white"
  },
  tableColsOP: {
    width: "160px",
    backgroundColor: "#ccc",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderColor: "white"
  },
  tableColRiskSeg: {
    width: "80px",
    backgroundColor: "#333",
    textAlign: "center"
  },  
  tableColsRiskSeg: {
    width: "80px",
    backgroundColor: "grey",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderColor: "white"
  },
  tableColsRiskSeg1: {
    width: "80px",
    backgroundColor: "#aaa",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderColor: "white"
  },
  tableColsRiskSeg2: {
    width: "80px",
    backgroundColor: "#ccc",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderColor: "white"
  },
  tableColMinBlue: {
    width: "10px",
    backgroundColor:"blue",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderColor: "white"
  },
  tableColMinPink: {
    width: "10px",
    backgroundColor:"pink",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderColor: "white"
  },
  tableColMinWhite: {
    width: "10px",
    backgroundColor:"white",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderColor: "white"
  },
  tableColMinGreen: {
    width: "10px",
    backgroundColor:"green",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderColor: "white"
  },
  tableCell2Header: {
    color: "white",
    marginBottom: 3, 
    fontSize: 9, 
    padding: 5,
  },
  tableRowRisk: {
    flexDirection: "row",
    height: 25
  },
  tableRowOP: {
    flexDirection: "row",
    height: 50
  },
  tableColRB: {
    width: "330px"
  },
  tableColOP: {
    width: "160px"
  },
  tableColCO: {
    width: "10px"
  },
  tableCellVertical: { margin:"auto", fontSize: 9, padding: 5 },
});

export function PdfDocument(props) {  
  const data = props.data;
  const userFinancial = props.userFinancial;
  var count1 = 0;
  var count2 = 0;
  var count3 = 0;
  var annual_sum1 = 0;
  var monthly_sum1 = 0;
  var annual_sum2 = 0;
  var monthly_sum2 = 0;
  var annual_sum3 = 0;
  var monthly_sum3 = 0;
  var hospitalizationSum = "";
  var hospitalizationIncomeSum = "";
  var SumofFinancialSummary = {};
  
  if (data&&data.policies) {
    let value = {
      accidentalDeath: 0,
      accidentalDisability: 0,
      accidentalReimbursement: 0,
      criticalIllness: 0,
      death: 0,
      disabilityIncome: 0,
      earlyCriticalIllness: 0,
      hospitalIncome: "",
      hospitalization: "",
      other: "",
      totalPermanentDisability: 0
    };
    data.policies.map(item => {
      let benefit = item.benefit;
      value.accidentalDeath += parseInt(benefit.accidentalDeath, 10)
        ? parseInt(benefit.accidentalDeath, 10)
        : 0;
      value.accidentalDisability += parseInt(benefit.accidentalDisability, 10)
        ? parseInt(benefit.accidentalDisability, 10)
        : 0;
      value.accidentalReimbursement += parseInt(
        benefit.accidentalReimbursement,
        10
      )
        ? parseInt(benefit.accidentalReimbursement, 10)
        : 0;
      value.death += parseInt(benefit.death, 10)
        ? parseInt(benefit.death, 10)
        : 0;
      value.disabilityIncome += parseInt(benefit.disabilityIncome, 10)
        ? parseInt(benefit.disabilityIncome, 10)
        : 0;
      value.earlyCriticalIllness += parseInt(benefit.earlyCriticalIllness, 10)
        ? parseInt(benefit.earlyCriticalIllness, 10)
        : 0;
      value.criticalIllness += parseInt(benefit.criticalIllness, 10)
        ? parseInt(benefit.criticalIllness, 10)
        : 0;

      value.hospitalIncome = benefit.hospitalIncome
        ? benefit.hospitalIncome
        : null;
      value.hospitalization =
        benefit.hospitalization !== "" ? benefit.hospitalization : null;
      value.totalPermanentDisability += parseInt(
        benefit.totalPermanentDisability,
        10
      )
        ? parseInt(benefit.totalPermanentDisability, 10)
        : 0;
    });
    SumofFinancialSummary = value;
    for(let i = 0; i < data.policies.length ; i++)  {
      let policy = data.policies[i];
      if(i === data.policies.length - 1) {
        hospitalizationSum += policy.benefit.hospitalization;
        hospitalizationIncomeSum += policy.benefit.hospitalIncome;
      }else {
        hospitalizationSum += policy.benefit.hospitalization + ",";
        hospitalizationIncomeSum += policy.benefit.hospitalIncome + ",";
      }
    }
  }
  return (
    <Document>
      <Page style={{ 'margin': '0 auto', 'size': 'A4' }}>
        {props.data.nricName ? (
          <View>
            <View style={{ 'padding': '20' }}>
              <View style={{ 'backgroundColor': '#333', 'color': '#fff' }}>
                <View style={{ 'padding': '20' }}>
                  <Text style={{ 'fontSize': '28' }}>Financial Portfolio</Text>
                </View>
                <View style={{ 'display': 'table', 'marginLeft': '10' }}>
                  <View style={styles.tableRow}>
                    <View style={{ 'width': '200' }}>
                      <Text style={{ 'fontSize': 10, 'width': '200' }}>
                        Name: {data.nricName}
                      </Text>
                    </View>
                    <View style={styles.ColC}>
                      <Text style={{ 'fontSize': 10, 'width': '200' }}>DOB:{moment(data.dob).format('DD-MMM-YYYY')}</Text>
                    </View>
                    <View style={styles.ColC}>
                      <Text style={{ 'fontSize': 10, 'width': '200' }}>NRIC: {data.nric_passport}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ 'display': 'table', 'marginLeft': '10', 'marginBottom': '20' }}>
                  <View style={styles.tableRow}>
                    <View style={{ 'width': '200' }}>
                      <Text style={{ 'fontSize': 10, 'width': '200' }}>
                        Prepared By: {data.createdBy.fullName}
                      </Text>
                    </View>
                    <View style={styles.ColC}>
                      <Text style={{ 'fontSize': 10, 'width': '200' }}>
                        Prepared On: {moment.utc().format('DD-MMM-YYYY')}
                      </Text>
                    </View>
                    <View style={styles.ColC}>
                      <Text style={{ 'fontSize': 10, 'width': '200' }}>FSC e-mail: {data.email}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <View>
                  <Text style={styles.title}>Risk Management</Text>
                </View>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Company</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Benefit</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Plan Name</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Policy No.</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Policy Date</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Cash Value</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Premium</Text>
                    </View>
                  </View>
                  {data.policies
                    ? data.policies.map((item, key) => {
                      if (
                        item.policyType.toUpperCase() ===
                        "Risk Management".toUpperCase()
                      ) {
                        count1 += 1;
                        if (item.paymentFrequency === "Annually") {
                          annual_sum1 += parseInt(item.premiumSGD) ? parseInt(item.premiumSGD) : 0;
                        }
                        else if (item.paymentFrequency === "Monthly") {
                          monthly_sum1 += parseInt(item.premiumSGD) ? parseInt(item.premiumSGD) : 0;
                        }
                        return (
                          <View key={key} style={styles.tableRow}>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>
                                {item.company}
                              </Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>{""}</Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>
                                {item.policyName}
                              </Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>
                                {item.policyNumber}
                              </Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>
                                {moment(item.policyStartDate).format('DD-MM-YYYY')}
                              </Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>{""}</Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>
                                ${item.premiumSGD}
                              </Text>
                            </View>
                          </View>
                        );
                      }

                      return null;
                    })
                    : null}
                </View>                
                <View style={{ marginTop: "10px", marginBottom: "10px" }}>
                {
                  count1 === 0? <Text style={{ margin: "auto", fontSize: 10 }}>Not Provided For Yet</Text> : null   
                }
                </View>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol2}>                      
                      <Text
                        style={{ margin: "auto", marginTop: "6px", fontSize: 10 }}
                      >
                        Total Premium for Risk Management
                      </Text>
                    </View>
                    <View style={styles.tableCol3}>
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={{fontSize: 9, padding: 5 }}>Annual</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={{fontSize: 9, padding: 5 }}>$&nbsp;{annual_sum1}</Text>
                        </View>
                      </View> 
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={{fontSize: 9, padding: 5 }}>Monthly</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={{fontSize: 9, padding: 5 }}>$&nbsp;{monthly_sum1}</Text>
                        </View>
                      </View>                   
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.title}>Wealth Accumulation</Text>
              </View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Company</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Benefit</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Plan Name</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Policy No.</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Policy Date</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Cash Value</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Premium</Text>
                  </View>
                </View>
                {data.policies
                  ? data.policies.map((item, key) => {
                    if (
                      item.policyType.toUpperCase() ===
                      "Wealth Accumulation".toUpperCase()
                    ) {
                      count2 += 1;
                      if (item.paymentFrequency === "Annually") {
                        annual_sum2 += parseInt(item.premiumSGD) ? parseInt(item.premiumSGD) : 0;
                      } else if (item.paymentFrequency === "Monthly") {
                        monthly_sum2 += parseInt(item.premiumSGD) ? parseInt(item.premiumSGD) : 0;
                      }
                      return (
                        <View key={key} style={styles.tableRow}>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.company}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{""}</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.policyName}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.policyNumber}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {moment(item.policyStartDate).format('DD-MM-YYYY')}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{""}</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              ${item.premiumSGD}
                            </Text>
                          </View>
                        </View>
                      );
                    }
                    return null;
                  })
                  : null}
              </View>
              <View style={{ marginTop: "10px", marginBottom: "10px" }}>
              {
                count2 === 0? <Text style={{ margin: "auto", fontSize: 10 }}>Not Provided For Yet</Text> : null   
              }
              </View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol2}>
                    <Text
                      style={{ margin: "auto", marginTop: "6px", fontSize: 10 }}
                    >
                      Total Premium for Wealth Accumulation
                      </Text>
                  </View>
                  <View style={styles.tableCol3}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={{'fontSize': 9, 'padding': 5 }}>Annual</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={{'fontSize': 9, 'padding': 5 }}>$&nbsp;{annual_sum2}</Text>
                      </View>
                    </View>    
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={{'fontSize': 9, 'padding': 5 }}>Monthly</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={{'fontSize': 9, 'padding': 5 }}>$&nbsp;{monthly_sum2}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.title}>Preservation</Text>
              </View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Company</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Benefit</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Plan Name</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Policy No.</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Policy Date</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Cash Value</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Premium</Text>
                  </View>
                </View>
                {data.policies
                  ? data.policies.map((item, key) => {
                    if (
                      item.policyType.toUpperCase() ===
                      "Wealth Preservation".toUpperCase()
                    ) {
                      count1 += 3;
                      if (item.paymentFrequency === "Annually") {
                        annual_sum3 += parseInt(item.premiumSGD) ? parseInt(item.premiumSGD) : 0;
                      }
                      if (item.paymentFrequency === "Monthly") {
                        monthly_sum3 += parseInt(item.premiumSGD) ? parseInt(item.premiumSGD) : 0;
                      }
                      return (
                        <View key={key} style={styles.tableRow}>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.company}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{""}</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.policyName}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.policyNumber}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {moment(item.policyStartDate).format('DD-MM-YYYY')}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{""}</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              ${item.premiumSGD}</Text>
                          </View>
                        </View>
                      );
                    }
                    return null;
                  })
                  : null}
              </View>
              <View style={{ marginTop: "10px", marginBottom: "10px" }}>
              {
                count3 === 0? <Text style={{ margin: "auto", fontSize: 10 }}>Not Provided For Yet</Text> : null   
              }
              </View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol2}>
                    <Text
                      style={{ margin: "auto", marginTop: "6px", fontSize: 10 }}
                    >
                      Total Premium for Preservation</Text>
                  </View>
                  <View style={styles.tableCol3}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={{'fontSize': 9, 'padding': 5 }}>Annual</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={{'fontSize': 9, 'padding': 5 }}>$&nbsp;{annual_sum3}</Text>
                      </View>
                    </View>   
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={{'fontSize': 9, 'padding': 5 }}>Monthly</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={{'fontSize': 9, 'padding': 5 }}>$&nbsp;{monthly_sum3}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </Page >
      <Page style={{ 'margin': '0 auto', 'size': 'A4' }}>
        {props.data.nricName ? (
          <View>
            <View style={{ 'padding': '20' }}>
              <View style={{ 'backgroundColor': '#333', 'color': '#fff' }}>
                <View style={{ 'padding': '20' }}>
                  <Text style={{ 'fontSize': '28' }}>Financial Portfolio</Text>
                </View>
                <View style={{ 'display': 'table', 'marginLeft': '10' }}>
                  <View style={styles.tableRow}>
                    <View style={{ 'width': '200' }}>
                      <Text style={{ 'fontSize': 10, 'width': '200' }}>
                        Name: {data.nricName}
                      </Text>
                    </View>
                    <View style={styles.ColC}>
                      <Text style={{ 'fontSize': 10, 'width': '200' }}>DOB:{moment(data.dob).format('DD-MMM-YYYY')}</Text>
                    </View>
                    <View style={styles.ColC}>
                      <Text style={{ 'fontSize': 10, 'width': '200' }}>NRIC: {data.nric_passport}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ 'display': 'table', 'marginLeft': '10', 'marginBottom': '20' }}>
                  <View style={styles.tableRow}>
                    <View style={{ 'width': '200' }}>
                      <Text style={{ 'fontSize': 10, 'width': '200' }}>
                        Prepared By: {data.createdBy.fullName}
                      </Text>
                    </View>
                    <View style={styles.ColC}>
                      <Text style={{ 'fontSize': 10, 'width': '200' }}>
                        Prepared On: {moment.utc().format('DD-MMM-YYYY')}
                      </Text>
                    </View>
                    <View style={styles.ColC}>
                      <Text style={{ 'fontSize': 10, 'width': '200' }}>FSC e-mail: {data.email}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ paddingTop: 20 }}></View>
              <View style={styles.table2}>
                <View style={styles.tableRow}>
                  <View style={styles.tableColMinWhite}>
                  </View>
                  <View style={styles.tableColRisk}>
                    <Text style={styles.tableCell2Header}>Risk</Text>
                  </View>
                  <View style={styles.tableColBenefit}>
                    <Text style={styles.tableCell2Header}>Benefit</Text>
                  </View>
                  <View style={styles.tableColRiskSeg}>
                    <Text style={styles.tableCell2Header}>Risk Segment</Text>
                  </View>
                  <View style={styles.tableColBenefit}>
                    <Text style={styles.tableCell2Header}>Optimisation</Text>
                  </View>                  
                </View>
                {/* 1 */}
                <View style={styles.tableRow}>
                  <View style={styles.tableColRB}>
                    <View style={styles.tableRowRisk}>
                      <View style={styles.tableColMinGreen}></View>
                      <View style={styles.tableColsRisk}>
                        <Text style={styles.tableCell}>Death</Text>
                      </View>
                      <View style={styles.tableColsBenefit}>
                        <Text style={styles.tableCell}>
                        ${Number(parseFloat(SumofFinancialSummary.death).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0})}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowRisk}>
                      <View style={styles.tableColMinGreen}></View>
                      <View style={styles.tableColsRisk}>
                        <Text style={styles.tableCell}>TPD</Text>
                      </View>
                      <View style={styles.tableColsBenefit}>
                        <Text style={styles.tableCell}>
                        ${Number(parseFloat(SumofFinancialSummary.totalPermanentDisability).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0})}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowRisk}>
                      <View style={styles.tableColMinGreen}></View>
                      <View style={styles.tableColsRisk}>
                        <Text style={styles.tableCell}>Disavility Income</Text>
                      </View>
                      <View style={styles.tableColsBenefit}>
                        <Text style={styles.tableCell}>
                        ${Number(parseFloat(SumofFinancialSummary.disabilityIncome).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0})}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowRisk}>
                      <View style={styles.tableColMinGreen}></View>
                      <View style={styles.tableColsRisk}>
                        <Text style={styles.tableCell}>Critical Illness</Text>
                      </View>
                      <View style={styles.tableColsBenefit}>
                        <Text style={styles.tableCell}>
                        ${Number(parseFloat(SumofFinancialSummary.criticalIllness).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0})}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowRisk}>
                      <View style={styles.tableColMinGreen}></View>
                      <View style={styles.tableColsRisk}>
                        <Text style={styles.tableCell}>Early Critical Illness</Text>
                      </View>
                      <View style={styles.tableColsBenefit}>
                        <Text style={styles.tableCell}>
                        ${Number(parseFloat(SumofFinancialSummary.earlyCriticalIllness).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0})}
                        </Text>
                      </View>
                    </View>
                  </View>                  
                  <View style={styles.tableColsRiskSeg}>
                    <Text style={styles.tableCellVertical}>
                      1.Income{"\n"}
                      Protection
                    </Text>
                  </View>
                  <View style={styles.tableColOP}>
                    <View style={styles.tableRowOP}>
                      <View style={styles.tableColsOP}>
                        <Text style={styles.tableCellVertical}>
                        {userFinancial.death/100} x of annual income
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowRisk}>
                      <View style={styles.tableColsOP}>
                        <Text style={styles.tableCellVertical}>
                        {userFinancial.critical_illness/100} x of annual income
                        </Text>
                      </View>
                    </View>  
                    <View style={styles.tableRowOP}>
                      <View style={styles.tableColsOP}>
                        <Text style={styles.tableCellVertical}>
                        {userFinancial.early_critical_illness/100} x of annual income
                        </Text>
                      </View>
                    </View>           
                  </View>
                </View>
                {/* 1 */}
                <View style={styles.tableRow}>
                  <View style={styles.tableColRB}>
                    <View style={styles.tableRowRisk}>
                      <View style={styles.tableColMinPink}></View>
                      <View style={styles.tableColsRisk}>
                        <Text style={styles.tableCell}>Hospitalisation</Text>
                      </View>
                      <View style={styles.tableColsBenefit}>
                        <Text style={styles.tableCell}>
                          {hospitalizationSum}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowRisk}>
                      <View style={styles.tableColMinPink}></View>
                      <View style={styles.tableColsRisk}>
                        <Text style={styles.tableCell}>Hospitalisation Income</Text>
                      </View>
                      <View style={styles.tableColsBenefit}>
                        <Text style={styles.tableCell}>
                          {hospitalizationIncomeSum}
                        </Text>
                      </View>
                    </View>
                  </View>                  
                  <View style={styles.tableColsRiskSeg1}>
                    <Text style={styles.tableCellVertical}>
                      2.Accident{"\n"} Protection
                    </Text>
                  </View>
                  <View style={styles.tableColOP}>
                    <View style={styles.tableRowRisk}>
                      <View style={styles.tableColsOP}>
                        <Text style={styles.tableCellVertical}>
                        ~${Number(parseFloat(userFinancial.accidental_death).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0})}
                        </Text>
                      </View>
                    </View>  
                    <View style={styles.tableRowRisk}>
                      <View style={styles.tableColsOP}>
                        <Text style={styles.tableCellVertical}>
                        ~${Number(parseFloat(userFinancial.accidental_disability).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0})} per injury
                        </Text>
                      </View>
                    </View>          
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColRB}>
                    <View style={styles.tableRowRisk}>
                      <View style={styles.tableColMinBlue}></View>
                      <View style={styles.tableColsRisk}>
                        <Text style={styles.tableCell}>Accidental Death</Text>
                      </View>
                      <View style={styles.tableColsBenefit}>
                        <Text style={styles.tableCell}>
                        ${Number(parseFloat(SumofFinancialSummary.accidentalDeath).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0})}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowRisk}>
                      <View style={styles.tableColMinBlue}></View>
                      <View style={styles.tableColsRisk}>
                        <Text style={styles.tableCell}>Accidental TPD</Text>
                      </View>
                      <View style={styles.tableColsBenefit}>
                        <Text style={styles.tableCell}>
                        ${Number(parseFloat(SumofFinancialSummary.accidentalDisability).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0})}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowRisk}>
                      <View style={styles.tableColMinBlue}></View>
                      <View style={styles.tableColsRisk}>
                        <Text style={styles.tableCell}>Accidental Reimbursement</Text>
                      </View>
                      <View style={styles.tableColsBenefit}>
                        <Text style={styles.tableCell}>
                        ${Number(parseFloat(SumofFinancialSummary.accidentalReimbursement).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0})}
                        </Text>
                      </View>
                    </View>
                  </View>    
                  <View style={styles.tableColsRiskSeg2}>
                    <Text style={styles.tableCellVertical}>
                      3.Health{"\n"} Protection
                    </Text>
                  </View>
                  <View style={styles.tableColOP}>
                    <View style={styles.tableRowOP}>
                      <View style={styles.tableColsOP}>
                        <Text style={styles.tableCellVertical}>
                        
                        </Text>
                      </View>
                    </View>  
                    <View style={styles.tableRowRisk}>
                      <View style={styles.tableColsOP}>
                        <Text style={styles.tableCellVertical}>
                        
                        </Text>
                      </View>
                    </View>          
                  </View> 
                </View>        
              </View>
              <View style={{ paddingTop: 20 }}></View>
              
            </View>
          </View>
        
        ) : null}
      </Page>
    </Document >
  );
}
