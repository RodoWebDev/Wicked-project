import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    borderStyle: 'solid',
    borderWidth: 2,
    width: 599,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tableRow: {
    position: 'relative',
    display: 'flex',
    width: 594,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    borderBottomWidth: 0
  },
  tableCol1: {
    borderStyle: 'solid',
    borderWidth: 1,
    width: 198,
    position: 'relative',
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol3: {
    width: 593,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  colTop: {
    width: '100%',
    position: 'absolute',
    top: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  colBottom: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  textAlignC: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 0,
    paddingTop: 10,
    height: '100%',
  },
  textAddress: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    height: '100%',
    textAlign: 'center'
  },
});

export function ClientBriefDocument(props) {
  const { printSetting, data } = props;
  return (
    <Document>
      <Page style={{ 'margin': '0 auto', 'size': 'A4' }}>
        <View style={styles.table}>
          {data.map((item, key) => {
            return(
                <View key={key} style={{...styles.tableCol1, height: printSetting.format === '35' ? 105 : 76}}>
                  <View style={{...styles.colTop
                              }}>
                    <Text style={{
                        ...styles.textAlignC,
                        fontSize: printSetting.format === '35' ? 14 : 12
                      }}>
                      {printSetting.title === 'blank' 
                        ? '' 
                        : `${item.title} `
                      }
                      {printSetting.name === 'nric' 
                        ? `${item.nricName} ` 
                        : `${item.preferredName} `
                      }
                      {printSetting.suffix === 'blank' 
                        ? ''
                        : printSetting.suffix === 'family' 
                          ? '& Family'
                          : item.family 
                            ? '& Family'
                            : ''
                      }
                    </Text>
                  </View>
                  <View style={{...styles.colBottom
                              }}>
                    <Text style={{
                          ...styles.textAddress, 
                          fontSize: printSetting.format === '35' ? 12 : 10,
                        }}>
                      {printSetting.address === 'address'
                        ? item.address
                        : item.companyaddress
                      }
                    </Text>
                  </View>
                </View>
            )  
          })}
        </View>
      </Page>
    </Document>
  );
}
