import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, Button, Alert, Table } from 'reactstrap';

import { getCompany, createColumn, updateCompany, setActive } from '../../redux/actions';
import Loader from '../../components/Loader';
import { AvField, AvForm } from "availity-reactstrap-validation";

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      company: this.props.company,
    };
  }

  componentDidMount() {
    this.props.getCompany(this.props.match.params.id);
  }

  createColumns = () => {
    console.log(this.props.company.headers.length);
    if(this.props.company.headers.length <= 30)
      this.props.createColumn(this.props.match.params.id);    
  }

  toList = () => {
    this.props.history.push('/settings');
  }

  saveData = () => {
    this.props.updateCompany(this.state.company, this.props.match.params.id);
    this.props.setActive('shield');
    this.props.history.push('/settings');
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.company !== this.props.company) {
      this.setState({
        company: nextProps.company
      });
    }
  }

  changeCompanyName = () => (event) => {
    if(this.state.company)
    {
      const company = { ...this.state.company };
      company.companyname = event.target.value;
      this.setState({ company })
    }
  }

  changeHeadername = (header_index) => (event) => {
    if(this.state.company)
    {
      const company = { ...this.state.company };
      company.headers[header_index].headername = event.target.value;
      this.setState({ company })
    }
  }

  changeHeaderText = (header_index) => (event) => {
    if(this.state.company)
    {
      const company = { ...this.state.company };
      company.headers[header_index].text = event.target.value;
      this.setState({ company })
    }
  }

  changeText = (header_index, array_index) => (event) => {
    if(this.state.company)
    {
      const company = { ...this.state.company };
      company.headers[header_index].textarray[array_index] = parseInt(event.target.value, 10);
      this.setState({ company });
    }
  }

  changeOut = (header_index, array_index) => (event) => {
    if(this.state.company)
    {
      const company = { ...this.state.company };
      company.headers[header_index].outarray[array_index] = parseInt(event.target.value, 10);
      this.setState({ company });
    }
  }

  getTd(text, out, j, i){
    var lis = [];
    lis.push(<td><AvField value={text} onChange={this.changeText(j, i)} type="number" name="text" /></td>);
    lis.push(<td><AvField value={out} onChange={this.changeOut(j, i)} type="number" name="out" /></td>);
    return lis;
  }

  getTh(val1,i){
    var lis = [];
    lis.push(<td style={{ minWidth: 120 }}><AvField value={val1} onChange={this.changeHeaderText(i)} name="text" placeholder="Text" required /></td>);
    lis.push(<th style={{ minWidth: 120 }}>Cash Outlay</th>);
    return lis;
  }

  render() {
    if (this.props.userAdded._id) {
      return <Redirect to='/users' />;
    }
    return (
      <React.Fragment>
        <div className="">
          { /* preloader */}
          {this.props.loading && <Loader />}

          <Row>
            <Col>
              <div className="page-title-box">
                <Row>
                  <Col lg={7}>
                    <h4 className="page-title">Edit Company</h4>
                  </Col>
                  <Col lg={5} className="mt-lg-3 mt-md-0">

                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  {this.props.error && <Alert color="danger" isOpen={!!this.props.error}>
                    <div>{this.props.error}</div>
                  </Alert>}
                  <AvForm>
                    <AvField value={this.props.company && this.props.company.companyname} onChange={this.changeCompanyName()} name="companyname" label="Company Name" placeholder="Enter Company Name" required />
                    <Row>
                      <Col lg={3}>
                        <Button color="primary" className="btn-block" onClick={this.createColumns}>Create column</Button>
                      </Col>
                      <Col lg={3}>
                        
                      </Col>
                      <Col lg={3}>
                        <Button color="primary" className="btn-block" onClick={this.toList}>Return</Button>
                      </Col>
                      <Col lg={3}>
                        <Button color="success" className="btn-block" onClick={this.saveData}>Save</Button>
                      </Col>
                    </Row>
                    <div style={{ overflow: 'auto', height: 500 }}>
                      <Table bordered className="text-center">
                        <thead>
                          <tr>
                            <th rowSpan="2">Age</th>
                            {
                              this.props.company && this.props.company.headers && this.props.company.headers.map((header, i) => (
                                <th colSpan="2">
                                  <AvField name={`headername-${i}`} value={header.headername} onChange={this.changeHeadername(i)} placeholder="Enter Header Name" required />
                                </th>
                              ))
                            }
                          </tr>  
                          <tr>                      
                            {
                              this.props.company && this.props.company.headers && this.props.company.headers.map((header, i) => (
                                this.getTh(header.text, i)
                              ))                                                       
                            }     
                          </tr>                    
                        </thead>
                        <tbody>
                          {
                            this.props.company && this.props.company.headers && this.props.company.headers[0].textarray && this.props.company.headers[0].textarray.map((header, i) => (
                              <tr key={i}>
                                <th scope="row">{i+1}</th>
                                {
                                  this.props.company.headers.map((header, j) => (
                                    this.getTd(header.textarray[i], header.outarray[i], j, i)
                                  ))
                                }
                              </tr>
                            ))
                          }
                        </tbody>
                      </Table>
                    </div>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ User, Company }) => {
  const { user, userAdded, loading, error } = User;
  const { company } = Company;
  return { user, userAdded, loading, error, company };
};

export default connect(mapStateToProps, { getCompany, createColumn, updateCompany, setActive })(Edit);
