import json
import boto3
from botocore.exceptions import ClientError

# Initialize the DynamoDB resource
dynamodb = boto3.resource('dynamodb')

# Name of the DynamoDB table
TABLE_NAME = 'rooms'

def lambda_handler(event, context):
    # Parse the body to get the input parameters
    try:
        body = json.loads(event['body'])
        agent = body['agent']
        room = body['room']
    except KeyError as e:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps(f'Missing parameter: {e}')
        }
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps('Invalid JSON in body.')
        }

    # Reference the DynamoDB table
    table = dynamodb.Table(TABLE_NAME)

    try:
        # Delete item from DynamoDB table
        response = table.delete_item(
            Key={
                'room': room
            }
        )
        if 'Attributes' in response:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST',
                    "Access-Control-Allow-Credentials": True
                },
                'body': json.dumps(f'Room {room} removed successfully.')
            }
        else:
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST',
                    "Access-Control-Allow-Credentials": True
                },
                'body': json.dumps(f'Room {room} not found.')
            }
    except ClientError as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps(f'Error removing room: {e.response["Error"]["Message"]}')
        }
