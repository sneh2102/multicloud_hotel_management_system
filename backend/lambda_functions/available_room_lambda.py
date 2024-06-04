import json
import boto3
from botocore.exceptions import ClientError
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
TABLE_NAME = 'rooms'

# Custom encoder to convert Decimal to float
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    table = dynamodb.Table(TABLE_NAME)
    all_rooms = []
    last_evaluated_key = None

    try:
        while True:
            if last_evaluated_key:
                response = table.scan(
                    ExclusiveStartKey=last_evaluated_key
                )
            else:
                response = table.scan()
            
            scanned_items = response.get('Items', [])
            print(f'Scanned {len(scanned_items)} items')
            all_rooms.extend(scanned_items)
            last_evaluated_key = response.get('LastEvaluatedKey')
            
            if not last_evaluated_key:
                break

        print(f'Total rooms: {len(all_rooms)}')

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,GET',
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps({'rooms': all_rooms}, cls=DecimalEncoder)
        }
    except ClientError as e:
        print(f'ClientError: {e.response["Error"]["Message"]}')
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,GET',
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps(f'Error fetching rooms: {e.response["Error"]["Message"]}')
        }
    except Exception as e:
        print(f'Exception: {str(e)}')
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,GET',
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps(f'Error: {str(e)}')
        }
