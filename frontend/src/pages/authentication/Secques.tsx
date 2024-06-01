import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Que, getQuestions } from '../../api/authApis';
import { postUser } from '../../api/authApis';
import { postAnswers } from '../../api/authApis';
import { toast } from 'react-toastify';
const SecurityQuestions: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const name = location.state?.name || '';
  const [questions, setQuestions] = useState<Que[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<{ queId: number | undefined, question: string, answer: string }[]>([
    { queId: undefined, question: '', answer: '' },
    { queId: undefined, question: '', answer: '' }
  ]);
  const [cipherKey, setCipherKey] = useState<number>();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      console.log("fetching questions");
      const response = await getQuestions();
      setQuestions(response.data.body);
      console.log(response);
    } catch (error) {
      console.error('Failed to fetch security questions:', error);
      setMessage('Failed to fetch security questions. Please try again.');
    }
  }

  const handleQuestionChange = (index: number, question: string) => {
    const updatedQuestions = [...selectedQuestions];
    updatedQuestions[index].question = question;
    updatedQuestions[index].queId = questions.find((q) => q.que === question)?.quesId;
    setSelectedQuestions(updatedQuestions);
  };

  const handleAnswerChange = (index: number, answer: string) => {
    const updatedQuestions = [...selectedQuestions];
    updatedQuestions[index].answer = answer;
    setSelectedQuestions(updatedQuestions);
  };

  const handleKeyChange = (key: string) => {
    setCipherKey(Number(key));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log({
        email: email,
        queAns: [
          { queId: selectedQuestions[0].queId, answer: selectedQuestions[0].answer },
          { queId: selectedQuestions[1].queId, answer: selectedQuestions[1].answer }
        ],
        key: cipherKey
      });
      
      await postAnswers({
        email: email,
        queAns: [
          { queId: selectedQuestions[0].queId, answer: selectedQuestions[0].answer },
          { queId: selectedQuestions[1].queId, answer: selectedQuestions[1].answer }
        ],
        key: cipherKey
      })
      console.log(await postUser({email: email, queId: [selectedQuestions[0].queId,selectedQuestions[1].queId], name: name, role: "user"}))
      navigate('/');
      toast.success('Security answers submitted successfully');
    } catch (error) {
      console.error('Failed to submit security answers:', error);
      setMessage('Failed to submit security answers. Please try again.');
    }
  };

  const getAvailableQuestions = (index: number) => {
    const selected = selectedQuestions.map((sq) => sq.question);
    return questions.filter((q) => !selected.includes(q.que) || selectedQuestions[index].question === q.que);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h3 className="mb-4">Choose Security Questions</h3>
              {selectedQuestions.map((_, index) => (
                <Form.Group key={index} className="mb-3">
                  <Form.Label>Security Question {index + 1}</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedQuestions[index].question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                  >
                    <option value="">Select a question</option>
                    {getAvailableQuestions(index).map((q, idx) => (
                      <option key={idx} value={q.que}>{q.que}</option>
                    ))}
                  </Form.Control>
                  <Form.Control
                    type="text"
                    placeholder="Answer"
                    value={selectedQuestions[index].answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="mt-2"
                  />
                </Form.Group>
              ))}
              <Form.Group className="mb-3">
                <Form.Label>Cipher Key (for Caesar Cipher)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter cipher key"
                  value={cipherKey}
                  onChange={(e) => handleKeyChange(e.target.value)}
                />
              </Form.Group>
              {message && <Alert variant="danger">{message}</Alert>}
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit Answers
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SecurityQuestions;
