import json
import boto3
from decimal import Decimal

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('user')

def decimal_to_int(d):
    if isinstance(d, Decimal):
        return int(d)
    raise TypeError("Not a Decimal instance")

def decimal_to_dict(d):
    if isinstance(d, list):
        return [decimal_to_dict(i) for i in d]
    elif isinstance(d, dict):
        return {k: decimal_to_dict(v) for k, v in d.items()}
    elif isinstance(d, Decimal):
        return decimal_to_int(d)
    else:
        return d

def lambda_handler(event, context):
    # Get email from query parameters
    email = event.get('queryStringParameters', {}).get('email', '')
    print(email)
    
    try:
        # Retrieve item from DynamoDB table using email as the key
        response = table.get_item(Key={"email": email})
        print(response)
        
        # Extract the item from the response
        item = response.get('Item', {})
        print(item)

        # Convert Decimal values to int
        item = decimal_to_dict(item)

        return {
            'statusCode': 200,
            'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
            'body': json.dumps(item)  # Convert dictionary to JSON string
        }

    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Failed to fetch items from DynamoDB',
                'error': str(e)
            })
        }
