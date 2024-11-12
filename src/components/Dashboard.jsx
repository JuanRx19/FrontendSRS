import "../assets/styles/Dashboard.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
} from "react-bootstrap";
import Sidebar from "./SideBar.jsx";
import { useState } from "react";

const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleToggleSidebar = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };

  return (
    <Container fluid className="dashboard-container vh-100 d-flex p-0">
      {/* Sidebar */}
      <div className={`sidebar-container ${isSidebarExpanded ? "expanded" : "collapsed"}`}>
        <Sidebar onToggleSidebar={handleToggleSidebar} />
      </div>

      {/* Main Content */}
      <Col className={`main-content ${isSidebarExpanded ? "content-expanded" : "content-collapsed"} h-100 overflow-auto`}>
          {/* Header */}
          <Row className="mb-4">
            <Col>
              <h2>Transactions</h2>
              <p>4:45 pm 21 Jul 2023</p>
            </Col>
            <Col className="text-end">
              <span>Tatiana Herwitz</span>
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="rounded-circle ms-2"
              />
            </Col>
          </Row>

          {/* Top Statistics */}
          <Row className="mb-4">
            <Col md={4}>
              <Card className="text-center p-3 card-highlight">
                <Card.Title>+164,455.00</Card.Title>
                <Card.Text>Income</Card.Text>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center p-3 card-highlight">
                <Card.Title>-21,790.00</Card.Title>
                <Card.Text>Outcome</Card.Text>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center p-3 card-highlight">
                <Card.Title>142,665.00</Card.Title>
                <Card.Text>Total Balance</Card.Text>
              </Card>
            </Col>
          </Row>

          {/* Charts Section */}
          <Row className="mb-4">
            <Col md={6}>
              <Card className="p-4">
                <Card.Title>Total Projected</Card.Title>
                <Card.Text>$124,500</Card.Text>
                {/* Insert your chart component here */}
              </Card>
            </Col>
            <Col md={6}>
              <Card className="p-4">
                <Card.Title>Data Activity</Card.Title>
                <Card.Text>$54,000</Card.Text>
                {/* Insert your chart component here */}
              </Card>
            </Col>
          </Row>

          {/* Top Customers */}
          <Row className="mb-4">
            <Col>
              <Card className="p-4">
                <Card.Title>Top Customers</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    #0034 - Premium - $4,395.00 <Button variant="primary" size="sm" className="float-end">New Order</Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    #0089 - Premium - $1,095.00 <Button variant="primary" size="sm" className="float-end">On Delivery</Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    #0256 - Free - $2,548.00 <Button variant="primary" size="sm" className="float-end">On Delivery</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* Right Side Panel */}
          <Row>
            <Col md={4}>
              <Card className="top-products p-3 mb-4">
                <Card.Title>Top Products</Card.Title>
                <Card.Body>
                  <Button variant="outline-primary" className="w-100 mb-2">
                    ZendQ - $375,441.00
                  </Button>
                  <Button variant="outline-primary" className="w-100">
                    Dlhunter - $142,665.00
                  </Button>
                </Card.Body>
              </Card>
              <Card className="expenses p-3">
                <Card.Title>Expenses</Card.Title>
                <ListGroup variant="flush" className="expenses-list">
                  <ListGroup.Item>
                    Avandana Inc. <span className="text-success">+$1,386.00</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Bougle Mc <span className="text-success">+$711.27</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Magesty <span className="text-danger">-$392.00</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Angela Stant <span className="text-success">+$3,713.32</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Col>
    </Container>
  );
};

export default Dashboard;