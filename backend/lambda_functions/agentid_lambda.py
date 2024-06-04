import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

# Environment variables
BOOKINGS_TABLE_NAME = 'booking'
ROOMS_TABLE_NAME = 'rooms'

def lambda_handler(event, context):
    try:
        # Parse input parameters
        body = json.loads(event['body'])
        booking_id = body['booking_id']
    except (KeyError, json.JSONDecodeError):
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps('Missing or invalid input parameters.')
        }

    bookings_table = dynamodb.Table(BOOKINGS_TABLE_NAME)
    rooms_table = dynamodb.Table(ROOMS_TABLE_NAME)

    try:
        # Get booking details from bookings table
        booking_response = bookings_table.get_item(
            Key={'bookingid': booking_id}
        )

        if 'Item' not in booking_response:
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST',
                    "Access-Control-Allow-Credentials": True
                },
                'body': json.dumps(f'Booking ID {booking_id} not found.')
            }

        room_id = booking_response['Item']['room_id']

        # Get room details from rooms table
        room_response = rooms_table.get_item(
            Key={'room': room_id}
        )

        if 'Item' not in room_response:
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST',
                    "Access-Control-Allow-Credentials": True
                },
                'body': json.dumps(f'Room ID {room_id} not found.')
            }

        agent = room_response['Item']['Agent']

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps({'agent': agent})
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
            'body': json.dumps(f'Error: {e.response["Error"]["Message"]}')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps(f'Error: {str(e)}')
        }
