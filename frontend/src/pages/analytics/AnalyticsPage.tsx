import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AnalyticsPage: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h4>Analytics Dashboard</h4>
            </Card.Header>
            <Card.Body>
              <iframe
                width="1000"
                height="650"
                src="https://lookerstudio.google.com/embed/reporting/f6ce117e-decf-4b22-adc5-db2023c79c1f/page/8eZ6D"
                frameBorder="0"
                style={{ border: '0', width: '100%', height: '650px' }}
                allowFullScreen
                sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              ></iframe>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsPage;
