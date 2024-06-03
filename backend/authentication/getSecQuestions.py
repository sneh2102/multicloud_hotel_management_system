import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('security-question') 

def lambda_handler(event, context):
    try:
        response = table.scan()
        items = response['Items']

        return {
            'statusCode': 200,
            'body': items
        }

    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': 'Failed to fetch items from DynamoDB'
        }
