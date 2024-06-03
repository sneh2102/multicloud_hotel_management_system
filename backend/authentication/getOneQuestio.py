import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('security-question')  

def lambda_handler(event, context):
    id = event.get('queryStringParameters', {}).get('id', '')
    print(id, " hiii")
    
    try:
        # Convert the id to an integer (assuming quesId is a number in DynamoDB)
        int_id = int(id)
        
        # Retrieve item from DynamoDB table using quesId as the key
        response = table.get_item(Key={"quesId": int_id})
        print(response)
        
        # Check if the item exists in the response
        if 'Item' in response:
            item = response['Item']
        else:
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({
                    'message': 'Item not found'
                })
            }

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps(item, default=str)  # Use default=str to handle non-serializable types
        }

    except ValueError:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'message': 'Invalid id format'
            })
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'message': 'Failed to fetch items from DynamoDB',
                'error': str(e)
            })
        }
