import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { Modal, Divider } from "antd";
import { parseISO, format } from "date-fns";

import { getLoggedInUser } from '../../helpers/authUtils';
import { getUsers, deleteUser } from '../../redux/actions';
import Loader from '../../components/Loader';


class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
      deleteVisible: false,
      selectedField: null,
    };
  }

  componentWillMount() {
    this.props.getUsers();
  }

  handleCancel = () => {
    this.setState({ deleteVisible: false, selectedField: null });
  }
  
  onDelete = (key) => {
    this.props.deleteUser(key);
  }
    
  render() {
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
                    <h4 className="page-title">Users</h4>
                  </Col>
                  <Col lg={5} className="mt-lg-3 mt-md-0 text-right">
                    <Link to="/users/add">
                      <Button type="primary">
                        Add User
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <table className="table">
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Role</th>
                      <th>Last Login</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.users.map((user, i) =>
                      <tr key={i}>
                        <td>{user.fullName}</td>
                        <td>{user.username}</td>
                        <td>{user.role === 'staff' ? 'FSC':'Admin'}</td>
                        <td>{user.lastConnectionDate ? format(parseISO(user.lastConnectionDate), "dd/MM/yy HH:mm") : "Never"}</td>
                        <td>
                          <Link to={`/users/${user._id}/update-account`}>Update Details</Link>
                          <Divider type="vertical" />
                          <span onClick={(e) => { this.setState({deleteVisible: true, selectedField: user._id}); }}>
                            <a className="fa fa-trash" aria-hidden="true"></a>
                          </span>
                        </td>
                      </tr>
                    )}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <Modal
          visible={this.state.deleteVisible}
          footer={[
            <Button type="primary"
            onClick={() => {
              this.handleCancel();
              this.onDelete(this.state.selectedField);
            }}
            >
            Confirm          
            </Button>,
            <Button type="primary"
            onClick={this.handleCancel.bind(this)}
            >
            Cancel          
            </Button>
          ]}
          onCancel={this.handleCancel}
          zIndex={1051}
        >
          <p>You are going to remove user permanently. Are you sure?</p>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { users, loading, error } = state.User;
  return { users, loading, error };
};

export default connect(mapStateToProps, { getUsers, deleteUser })(Users);
