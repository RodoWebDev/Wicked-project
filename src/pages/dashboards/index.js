import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { getUser, getClients } from "../../redux/actions";
import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import { Link } from "react-router-dom";
import * as moment from 'moment'

class DefaultDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
      selectedArray: [],
    };
  }

  componentDidMount() {
    this.props.getClients();
    this.props.getUser(this.state.user.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clients !== this.props.clients) {
      const clients = nextProps.clients;
      this.setState({selectedArray: clients})
    }
  }

  render() {
    const { clients } = this.props;    
    let nonCategory = 0;
    var curTime = moment(new Date());
    for(let i=0;i<clients.length;i++)
    {
      if(clients[i].category=="")
        nonCategory++;
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
                    <h4 className="page-title">Welcome {this.state.user.fullName},</h4>
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
                <CardBody style={{backgroundColor:"#f5f6f8"}}>
                  <Row>
                    <Col md={6} xl={3}
                      style={{ 
                      paddingRight:12,
                      paddingLeft:12}}
                    >
                      <div
                        style={{
                          padding:"1.5rem", 
                          boxShadow:"0 0.75rem 6rem rgba(56,65,74,.03)",
                          marginBottom:24,
                          borderRadius:"0.25m",
                          backgroundColor:"#fff",
                          height: 150
                        }}
                      >
                        <h5>You have {nonCategory} unfiltered leads. </h5>
                      </div>
                    </Col>
                    <Col md={6} xl={3}
                      style={{ 
                      paddingRight:12,
                      paddingLeft:12}}
                    >
                      <div
                        style={{
                          padding:"1.5rem", 
                          boxShadow:"0 0.75rem 6rem rgba(56,65,74,.03)",
                          marginBottom:24,
                          borderRadius:"0.25m",
                          backgroundColor:"#fff",
                          height: 150,
                          overflow: "auto",
                        }}
                      >
                        <h5>Today’s birthday</h5>
                        <div>
                          {this.state.selectedArray.map((client, i) => (
                            moment.utc(client.dob).format("DD-MM") === moment.utc(Date()).format("DD-MM") ? 
                            <Link style={{display:"block"}} to={`/clients/${client._id}/view`}>{client.nricName} ({client.preferredName})</Link>: ''
                          ))}
                        </div>
                      </div>
                    </Col>
                    <Col md={6} xl={3}
                      style={{ 
                      paddingRight:12,
                      paddingLeft:12}}
                    >
                      <div
                        style={{
                          padding:"1.5rem", 
                          boxShadow:"0 0.75rem 6rem rgba(56,65,74,.03)",
                          marginBottom:24,
                          borderRadius:"0.25m",
                          backgroundColor:"#fff",
                          height: 150,
                          overflow: "auto",
                        }}
                      >
                        <h5>Overdue contact clients</h5>
                        <div>
                          {this.state.selectedArray.map((client, i) => (
                            (moment.duration(curTime.diff(client.nextFollowUpDate)).asDays()) <= 7 && (moment.duration(curTime.diff(client.nextFollowUpDate)).asDays()) > 0 ? 
                            <Link style={{display:"block"}} to={`/clients/${client._id}/view`}>{client.nricName} ({client.preferredName})</Link>: ''
                          ))}
                        </div>
                      </div>
                    </Col>
                    <Col md={6} xl={3}
                      style={{ 
                      paddingRight:12,
                      paddingLeft:12}}
                    >
                      <div
                        style={{
                          padding:"1.5rem", 
                          boxShadow:"0 0.75rem 6rem rgba(56,65,74,.03)",
                          marginBottom:24,
                          borderRadius:"0.25m",
                          backgroundColor:"#fff",
                          height: 150,
                          overflow: "auto",
                        }}
                      >
                        <h5>Clients to contact in the next 7 days</h5>
                        <div>
                          {this.state.selectedArray.map((client, i) => (
                            (moment.duration(moment(client.nextFollowUpDate).diff(curTime)).asDays()) <= 7&&(moment.duration(moment(client.nextFollowUpDate).diff(curTime)).asDays()) > 0 ? 
                            <Link style={{display:"block"}} to={`/clients/${client._id}/view`}>{client.nricName} ({client.preferredName})</Link>: ''
                          ))}
                        </div>
                      </div>
                    </Col>
                    <Col md={6} xl={3}
                      style={{ 
                      paddingRight:12,
                      paddingLeft:12}}
                    >
                      <div
                        style={{
                          padding:"1.5rem", 
                          boxShadow:"0 0.75rem 6rem rgba(56,65,74,.03)",
                          marginBottom:24,
                          borderRadius:"0.25m",
                          backgroundColor:"#fff",
                          height: 150
                        }}
                      >
                        <h5>Total number of clients: {this.state.selectedArray.length}</h5>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { user, clients, deleteClientSuccess, loading, error } = state.User;
  return { user, clients, deleteClientSuccess, loading, error };
};

export default connect(
  mapStateToProps,
  { getClients, getUser }
)(DefaultDashboard);
