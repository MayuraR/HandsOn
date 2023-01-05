const AWS = require('aws-sdk');
const { resolve } = require('path');
AWS.config.update({
    region: 'us-east-1'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'Books';

exports.handler = async function(event){
    console.log('event recieved');
    let response;
    console.log(event)
    switch(event.path){
        case '/book':
            response = await saveProduct(JSON.parse(event.body));
            break;
        case '/getbooks':
            response = await getAllBooks();
            break;
        default:
            response = await buildResponse(404, {message: 'page not found'});
    }
    return response;
}


async function saveProduct(requestBody) {
  const params = {
    TableName: tableName,
    Item: requestBody
  }
  return await dynamoDB.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  })
}

const getAllBooks = async ()=>{
    const params = {
      TableName: tableName
    }
    const allbooks = await scanDynamoRecords(params, []);
    const body = {
      books: allbooks
    }
    return buildResponse(200, body);
  }
  
const scanDynamoRecords = async (scanParams, itemArray) => {
    try {
      const dynamoData = await dynamoDB.scan(scanParams).promise();
      itemArray = itemArray.concat(dynamoData.Items);
      if (dynamoData.LastEvaluatedKey) {
        scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
        return await scanDynamoRecords(scanParams, itemArray);
      }
      return itemArray;
    } catch(error) {
      console.error('Do your custom error handling here. I am just gonna log it: ', error);
    }
  }

  function buildResponse(statusCode, responseBody) {
    console.log(responseBody)
    return {
      statusCode: statusCode,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(responseBody)
    }
  }