**Virtual Assistance**

For Virtual Assistance AWS Lex, AWS Lambda and DynamoDB services are required.

**AWS Lex**

It is a service for building conversational interfaces using voice and text. Here, for virtual assistance, we require a chatbot which will resolve queries of customers using text so Lex will be used. We will use the 2nd version of AWS Lex as it has several advantages against the 1st version like, dialog management, session handling, language support, ASR, versioning, and overall developer experience[1]. To extend its functionality for dynamic responses AWS Lex will be integrated with AWS Lambda. 

**AWS Lambda**

AWS Lambda is a serverless, event-driven computing service[2]. Here, AWS Lex’s 	capability will be enhanced with the help of the Lambda function[4]. As Lambda can 	be triggered on specific intent defined in Lex, it will process queries regarding booking information with the help of data stored in DynamoDB and will send results back to Lex and eventually to the customer. 

**DynamoDB**

As, Amazon DynamoDB is a fully managed NoSQL database that can store and retrieve any amount of data[3], so, booking records will be stored in a DynamoDB and on given booking reference code to the virtual assistance, Lambda will be triggered (for defined intent) and records will be fetched from DynamoDb[5] and it will be displayed to user. 

**Architecture Oriented Research **

Serverless architecture majorly focuses on Function-as-a-Service(FaaS) models and it offers several advantages for web application development. It is a way in which developers can write business logic and the cloud service provider takes care of managing the infrastructure, making it a compact, scalable, and minimally hands-on activity[6]. For this reason, architectures like chatbots, IoT, and API gateways that deal with event-driven applications, which is particularly beneficial for applications that need to respond to specific triggers or events, such as HTTP requests or database changes, work pretty well under serverless, because it equally administers elastic scaling and provides much-needed control over infrastructural activities. However, it does have some challenges: latency on cold start, complexity in debugging, and security concerns[7].

**Application Perspective Research**

Hotel booking website was developed on serverless architecture. The key features include AWS Lambda functions and integration with the API Gateway to handle HTTP requests and process bookings, data stored in DynamoDB, the booking website created in React and hosted on S3, and closely integrated with a current Wix site using CloudFront; in effect, the automation that scripts on AWs Lambda would be put in place for the streamlining the manual PMS processes. Automation scripts were put in place using Puppeteer on AWs Lambda to streamline the manual PMS processes. Performance monitoring was implemented through New Relic and CloudWatch. Infrastructure management and CI/CD are done using AWS CDK, granting consistent and efficient deployment. This serverless solution has significantly lowered the operating expenses of small and medium-sized businesses while showing the characteristics of high availability, scalability, and cost-effectiveness.[8]

![](https://lh7-us.googleusercontent.com/WSnJz4KCAfkCacFa887-eXlOrkmZt_7OBHU6Sq9ZyM9i2XbWwBexF3PAOCYyyEUTjNUdOB_0r0kGwh_5xnpv9q93lfEJVRBZ26WsGQ6en9orwlxCF3u7QS7gseVFhgghfL5YWmMRptiqZV_Dn7IViog){width="624" height="341"}

**References **

[1] “What is Amazon Lex V2?,” Amazon Lex. https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html (accessed May 20, 2024).    

[2] “Serverless Function, FaaS Serverless  - AWS Lambda - AWS,” Amazon Web Services, Inc. https://aws.amazon.com/lambda/ (accessed May 20, 2024).    

[3] “Fast NoSQL Key-Value Database – Amazon DynamoDB – Amazon Web Services,” Amazon Web Services, Inc. https://aws.amazon.com/dynamodb/ (accessed May 20, 2024).    

[4] “Enabling custom logic with AWS Lambda functions,” Amazon Lex. https://docs.aws.amazon.com/lexv2/latest/dg/lambda.html (accessed May 20, 2024).    

[5] M. Gaikwad, “How to use Lambda DynamoDB: A Complete Guide,” Hevo Data, Apr. 19, 2022. Accessed: May 20, 2024. [Online]. Available: https://hevodata.com/learn/lambda-dynamodb/    

[6] V. Kulkarni, “A Research Paper on Serverless Computing,” International Journal of Engineering Research & Technology, vol. 11, no. 9, Dec. 2022, doi: 10.17577/IJERTV11IS090064.    

[7] J. Saji and A. Kumar, “A Review Paper on Serverless Architecture of Web Applications.” https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4495958 (accessed May 21, 2024).    

[8] H. Do, “A year of running a hotel booking application on AWS Serverless services for $0.8/month,” Hieu’s Technical Blog, Oct. 29, 2023. Accessed: May 21, 2024. [Online]. Available: https://hieudd.substack.com/p/a-year-of-running-a-hotel-booking

[9] J. Obey, “Best practices for building serverless applications that follow AWS’s Well-Architected Framework,” Datadog, Jan. 24, 2022. https://www.datadoghq.com/blog/well-architected-serverless-applications-best-practices/ (accessed May 21, 2024).    
