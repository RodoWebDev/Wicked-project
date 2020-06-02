import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { Modal } from "antd";

import { getLoggedInUser } from "../../helpers/authUtils";
import { getUser, getClients, getClientsByCategory, deleteClient } from "../../redux/actions";
import Loader from "../../components/Loader";
import { Table, Divider, Button, Input, Checkbox, Select } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ClientBriefDocument } from "../../components/ClientBriefDocument";
import { CSVLink } from "react-csv";
import * as moment from 'moment'
const { Search } = Input;

const { Option } = Select;

class Clients extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: () => (
          <span>
            <Checkbox onChange={this.onHandleSelectAll} />
          </span>
        ),
        key: "checked",
        render: (value, record) => (
          <span>
            <Checkbox onChange={()=>{this.onHandleSelect(value)}} checked={value.checked}/>
          </span>
        )
      },
      {
        title: "Name",
        dataIndex: "nricName",
        key: "name",
        render: (value, record) => `${value} (${record.preferredName})`,
        sorter: (a, b) => a.nricName.localeCompare(b.nricName)
      },
      {
        title: "Contact",
        dataIndex: "contact",
        key: "contact"
      },
      {
        title: "Birth Date",
        dataIndex: "dob",
        key: "dob",
        sorter: (a, b,sortOrder) => {
          if(sortOrder === "ascend" && !a.dob)
            return 1;
          else if(sortOrder === "ascend" && !b.dob)
            return -1;
          return new Date(a.dob) - new Date(b.dob);
        },
        render: value => {
          if (value) {
            return moment.utc(value).format("DD-MM-YYYY");
          }
          return null;
        }
      },
      {
        title: "Next Followup Date",
        key: "tags",
        dataIndex: "nextFollowUpDate",
        sorter: (a, b,sortOrder) => {
          if(sortOrder === "ascend" && !a.nextFollowUpDate)
            return 1;
          else if(sortOrder === "ascend" && !b.nextFollowUpDate)
            return -1;
          return new Date(a.nextFollowUpDate) - new Date(b.nextFollowUpDate);
        },
        render: value => {
          if (value) {
            return moment.utc(value).format("DD-MM-YYYY");
          }
          return null;
        }
      },
      {
        title: "Action",
        key: "action",
        render: (value, record) => (
          <span>
            <Link to={`/clients/${record._id}/view`}>View</Link>
            <Divider type="vertical" />
            <Link to={`/clients/${record._id}/Edit`}>Edit</Link>
            <Divider type="vertical" />
            <span onClick={(e) => { this.setState({deleteVisible: true, selectedField: record._id}); }}><a className="fa fa-trash" aria-hidden="true"></a></span>
          </span>
        )
      }
    ];
    this.state = {
      user: getLoggedInUser(),
      key: '',
      deleteVisible: false,
      printVisible: false,
      selectedField: null,
      csvHeader: [
        { label: 'NRIC Name', key: 'nricName' },
        { label: 'Preferred Name', key: 'preferredName' },
        { label: 'Date of birth', key: 'dob' },
        { label: 'E-mail', key: 'email' },
        { label: 'Contact No', key: 'contact' },
        { label: 'Contact No 2', key: 'contact2' },
        { label: 'Gender', key: 'gender' },
        { label: 'Category', key: 'category' },
        { label: 'Race', key: 'race' },
        { label: 'Nationality', key: 'nationality' },
        { label: 'Occupation', key: 'occupation' },
        { label: 'Company Name', key: 'companyname' },
        { label: 'Company Address', key: 'companyaddress' },
        { label: 'Address', key: 'address' },
        { label: 'Family', key: 'family' },
        { label: 'Family Relationship', key: 'familyrelationship' },
        { label: 'Last Purchase', key: 'lastpurchasae' },
        { label: 'Next followup date', key: 'nextFollowUpDate' },
      ],
      csvData: [],
      selectedArray: [],
      printArray: [],
      searchText:'',
      printSetting: {
        title: "blank",
        name: "nric",
        suffix: "blank",
        address: "address",
        format: "35"
      }
    };
  }

  componentDidMount() {
    this.props.getClients();    
    this.props.getUser(this.state.user.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clients !== this.props.clients) {
      var clients = nextProps.clients;
      this.setState({ csvData: clients})
    }
    if (nextProps.clients !== this.props.clients) {
      const clients = nextProps.clients;
      let filteredClients=[];
      for(let i=0; i<clients.length; i++) {
        clients[i]['checked'] = false;        
        if((clients[i].nricName&&clients[i].nricName.includes(this.state.searchText))
        || (clients[i].preferredName&&clients[i].preferredName.includes(this.state.searchText)) 
        || (clients[i].dob&&clients[i].dob.includes(this.state.searchText)) 
        || (clients[i].nextFollowUpDate&&clients[i].nextFollowUpDate.includes(this.state.searchText)))
        {
          filteredClients.push(clients[i]);
        }        
      }
      this.setState({selectedArray: filteredClients})
    }
  }

  handleChange(value) {
    this.props.getClients("");
    this.setState({searchText: value})
  }
  
  handleDeleteCancel = () => {
    this.setState({ deleteVisible: false, selectedField: null });
  }
  
  handlePrintCancel = () => {
    this.setState({ printVisible: false})
  }
  
  handlePrintChange = e => {
    let printSetting = {...this.state.printSetting}
    const { name, value } = e.target;;
    printSetting[name] = value;
    this.setState({printSetting})
  }

  handleCategoryChange = value => {
    this.props.getClientsByCategory(value);
  }
  
  onDelete = (key) => {
    this.props.deleteClient(key);
  }
  
  onHandleSelect = (value) => {
    value.checked = !value.checked;
    this.setState({...this.state.selectedArray, value})
    if(value.checked){
      this.state.printArray.push(value)
    } else {
      for(let i=0; i<this.state.printArray.length; i++) {
        if(this.state.printArray[i]._id === value._id){
          this.state.printArray.splice(i, 1);
        }
      }
    }
  }
  
  onHandleSelectAll = e => {
    const clients = this.state.selectedArray;
    let printArray = [];
    for(let i=0; i<clients.length; i++) {
      clients[i]['checked'] = e.target.checked;
      if(e.target.checked) {
        printArray.push(clients[i]);
      } 
    }

    this.setState({selectedArray: clients, printArray})
  }
  
  render() {
    const { user } = this.props
    const categories = [];
    
    if(user.categories){
      for (let i = 0; i < user.categories.length; i++) {
        categories.push(<Option key={user.categories[i]}>{user.categories[i]}</Option>);
      }
    }
    return (
      <React.Fragment>
        <div className="">
          {/* preloader */}
          {this.props.loading && <Loader />}
          <Row>
            <Col>
              <div className="page-title-box">
              <Row>
                  <Col lg={2}>
                    <h4 className="page-title">Clients</h4>
                  </Col>
                  <Col lg={10} className="mt-lg-3 text-right">
                    <Search
                      placeholder=""
                      style={{ width: 200, 'marginRight': 20 }}
                      onSearch={this.handleChange.bind(this)}
                      allowClear
                    >
                    </Search>
                    { this.props.user.categories && (
                      <Select
                        style={{ width: 200, 'marginRight': 20 }}
                        mode="tags"
                        placeholder="Please select"
                        onChange={this.handleCategoryChange}
                      >
                        {categories}
                      </Select>
                    )}
                    <Link 
                      to="/clients/add"
                      style={{ 'marginRight': 20 }}
                    >
                      <Button type="primary" ghost>
                        Add Client
                      </Button>
                    </Link>
                    <Button type="primary" onClick={() => {this.setState({printVisible: true}); }} ghost>
                      Label Printing
                    </Button>
                    &nbsp;&nbsp;
                    <CSVLink className="btn btn-success" data={this.state.csvData.map((item) => {return {...item, dob: moment.utc(item.dob).format("DD-MM-YYYY")}})} headers={this.state.csvHeader} filename={"Client Data.csv"}>
                      Export
                    </CSVLink>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Table
                columns={this.columns}
                rowKey="_id"
                dataSource={this.state.selectedArray}
                style={{ overflow: 'auto' }}
              />
            </Col>
          </Row>
        </div>
        <Modal
          visible={this.state.deleteVisible}
          footer={[
            <Button type="primary"
              onClick={() => {
                this.handleDeleteCancel()
                this.onDelete(this.state.selectedField)
                this.handleChange(this)
              }}
            >
              Confirm          
            </Button>,
            <Button type="primary" 
              onClick={this.handleDeleteCancel.bind(this)}
            >
              Cancel          
            </Button>
            ]}
          onCancel={this.handleDeleteCancel}
          zIndex={1051}
        >
          <p>Are you sure?</p>   
        </Modal>
        <Modal
          visible={this.state.printVisible}
          footer={[
            <PDFDownloadLink
              document={<ClientBriefDocument data={this.state.printArray} printSetting={this.state.printSetting}/>}
              fileName="FinancialPortfolio.pdf"
            >
              <Button 
                type="primary"
                style={{marginRight: '20px'}}
              >
                Print
              </Button>
            </PDFDownloadLink>,
              <Button 
                type="primary" 
                onClick={this.handlePrintCancel.bind(this)}
              >
                Cancel          
              </Button>
            ]}
          onCancel={this.handlePrintCancel}
          zIndex={1051}
        >
          <table className='table table-bordered'>
            <tbody>
              <tr>
                <th>Title</th>
                <th>
                  <select
                    name="title"
                    onChange={this.handlePrintChange}
                    value={this.state.printSetting.title}
                  >
                    <option value="blank">(Blank)</option>
                    <option value="salution">Salutation</option>
                  </select>
                </th>
              </tr>
              <tr>
                <th>Name</th>
                <th>
                  <select
                   name="name"
                   onChange={this.handlePrintChange}
                   value={this.state.printSetting.name}
                  >
                    <option value="nric">NRIC Name</option>
                    <option value="preferred">Preferred Name</option>
                  </select>
                </th>
              </tr>
              <tr>
                <th>Suffix</th>
                <th>
                  <select
                    name="suffix"
                    onChange={this.handlePrintChange}
                    value={this.state.printSetting.suffix}
                  >
                    <option value="blank">(Blank)</option>
                    <option value="family">Insert "& Family" for all clients</option>
                    <option value="detail">Insert "& Family" for clients with family details</option>
                  </select>
                </th>
              </tr>
              <tr> 
                <th>Address</th>
                <th>
                  <select
                    name="address"
                    onChange={this.handlePrintChange}
                    value={this.state.printSetting.address}
                  >
                    <option value="address">Address</option>
                    <option value="company">Company Address</option>
                  </select>
                </th>
              </tr>
              <tr>
                <th>Format</th>
                <th>
                  <select
                    name="format"
                    onChange={this.handlePrintChange}
                    value={this.state.printSetting.format}
                  >
                    <option value="35">70 by 35mm label</option>
                    <option value="25.4">70 by 25.4mm label</option>
                  </select>
                </th>
              </tr>
            </tbody>
          </table>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { user, clients, deleteClientSuccess, loading, error } = state.User;
  return { user, clients, deleteClientSuccess, loading, error };
};

export default connect(
  mapStateToProps,
  { getUser, getClients, getClientsByCategory, deleteClient }
)(Clients);
