import json
import boto3
from datetime import datetime
import random

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('user')

def lambda_handler(event, context):
    try:
        name = event['name']
        email = event['email']
        role = event['role']
        ques = event['queId']
        
        
        item = {
            'userId': random.randint(1000000000000000, 999999999999999999),
            'name': name,
            'email': email,
            'queId': ques,
            'createdAt': datetime.utcnow().isoformat(),
            'role': role,
        }
        print(item)

        table.put_item(Item=item)

        response = {
            'statusCode': 200,
            'body':{
                "message": 'User details added successfully',
            } 
        }
        return response

    except Exception as e:
        print(e)
        response = {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Failed to add user details',
                'error': str(e)
            })
        }
        return response
