import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { getUser } from '../../api/authApis';
import { getOneQuestion } from '../../api/authApis';
import { checkAnswer } from '../../api/authApis';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';



const LoginVerify: React.FC = () => {
    const {setRole, setStatus, authenticate} = useAuth();
    const [question, setQuestion] = useState('');
    const [randomString, setRandomString] = useState('');
    const [userDetails, setUserDetails] = useState<string>('');
    const [answer, setAnswer] = useState('');
    const [decipher, setDecipher] = useState('');
    const location = useLocation();
    const [id, setId] = useState<number>(0);
    const email = location.state?.email || '';
    const password = location.state?.password || '';
    const navigate = useNavigate();

    useEffect(() => {
        getUserDetails();
    },[]);

    const getUserDetails = async () => { 
        try {
            const response = await getUser(email);
            const role = response.data.role;
            console.log(response.data.role)
            localStorage.setItem('role', role);
            setUserDetails(role);
            const randomId = response.data.queId[Math.floor(Math.random() * response.data.queId.length)];
            setId(randomId);
        } catch (error) {
            console.error('Failed to fetch user details:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchQuestion(id);
        }
        generateRandomString(5);
    }, [id]);

    const fetchQuestion = async (id: number) => {
        try {
            const response = await getOneQuestion(id);
            setQuestion(response.data.que);
            console.log(response.data.que);
        } catch (error) {
            console.error('Failed to fetch question:', error);
        }
    };

    const generateRandomString = (length: number) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setRandomString(result);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await checkAnswer({
            email,
            queId: id,
            answer,
            cipher_text: randomString,
            decrypted_text: decipher,
        }) as { data: { statusCode: number } };
        if (response.data.statusCode === 200) {
            await authenticate(email, password);
            console.log('Login successful');
            setRole(userDetails);
            setStatus(true);
            console.log(userDetails);
            navigate('/')
            toast('Login successful',{
                type: 'success'
            });
        }
        else 
        {
            toast.error('Login failed');
        }
    }

    return (
        <div className="container">
            <h1>Login Verification</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="question">
                    <Form.Label>Question: {question}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Answer the question"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="randomString">
                    <Form.Label>Random String: {randomString}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Decipher the word"
                        value={decipher}
                        onChange={(e) => setDecipher(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default LoginVerify;
