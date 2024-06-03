import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('answers')

def lambda_handler(event, context):
    email = event['email']
    quesAnswers = event['queAns']
    key= event['key']
    items={
        "email": email,
        "queAns": quesAnswers,
        "key": key
    }
    
    
    response = table.put_item(Item=items)

    return {
        'statusCode': 200,
        'body': "Sucess"
    }
