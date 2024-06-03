import json
import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
ansTable = dynamodb.Table('answers')

def caesar_cipher_decrypt(cipher_text, key):
    decrypted_text = ""
    
    for char in cipher_text:
        if char.isalpha():
            shift = 65 if char.isupper() else 97
            decrypted_text += chr((ord(char) - shift - key) % 26 + shift)
        else:
            decrypted_text += char
    return decrypted_text

def lambda_handler(event, context):
    try:
        queId = int(event['queId'])
        cipher_text = event['cipher_text']
        answer = event['answer']
        dText = event['decrypted_text']
        email = event['email']
        
        
        print(queId, cipher_text, answer, dText, email)
        
        result = ansTable.get_item(Key={'email': email})
        item = result['Item']
        
        realAnswers = item['queAns']
        key = int(item['key']) 
        
        print(realAnswers, key)
        # Filter the answer that matches the queId
        filtered_answer = next((ans for ans in realAnswers if ans['queId'] == queId))
                
        if not filtered_answer:
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'message': 'Question not found'})
            }
        
        realAns = filtered_answer['answer']
        
        # Decrypt the stored answer
        decrypted_answer = caesar_cipher_decrypt(cipher_text, key)
        print("decrypted_text:", decrypted_answer, " provided decrypted_text:", dText)
        print("answer:", answer, " realAns:", realAns)
        
        # Compare the decrypted answer with the provided answer
        if decrypted_answer == dText and answer == realAns:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'message': 'Success'})
            }
        else:
            return {
                'statusCode': 403,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'message': 'Answer is incorrect'})
            }
    except Exception as err:
        print('Error retrieving item:', err)
        
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'message': 'Error retrieving item',
                'error': str(err)
            })
        }
