import json
import boto3
import os

# Initialize the DynamoDB resource
dynamodb = boto3.resource('dynamodb')

# Name of the DynamoDB table
TABLE_NAME = 'rooms'

def lambda_handler(event, context):
    try:
        if 'body' not in event:
            raise ValueError("Missing 'body' in the event")

        room_details = json.loads(event['body'])

        required_fields = ['agent', 'address', 'amenities', 'availability', 'beds', 'room', 'price']
        for field in required_fields:
            if field not in room_details:
                raise ValueError(f"Missing required field: {field}")

        agent = room_details['agent']
        address = room_details['address']
        amenities = room_details['amenities']
        availability = room_details['availability']
        beds = room_details['beds']
        room = room_details['room']
        price = room_details['price']

        # Reference the DynamoDB table
        table = dynamodb.Table(TABLE_NAME)

        # Item to be inserted
        item = {
            'Agent': agent,
            'Address': address,
            'Amenities': amenities,
            'Availability': availability,
            'Beds': beds,
            'room': room,
            'Price': price
        }

        try:
            # Put item into DynamoDB table
            table.put_item(Item=item)
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST',
                    'Access-Control-Allow-Credentials': True
                },
                'body': json.dumps(f'Room {room} added successfully.')
            }
        except ClientError as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST',
                    'Access-Control-Allow-Credentials': True
                },
                'body': json.dumps(f'Error adding room: {e.response["Error"]["Message"]}')
            }
    except ValueError as ve:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                'Access-Control-Allow-Credentials': True
            },
            'body': json.dumps({
                'error': str(ve)
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                'Access-Control-Allow-Credentials': True
            },
            'body': json.dumps({
                'error': 'An error occurred',
                'details': str(e)
            })
        }
