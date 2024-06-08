1) Cloud based Approach

Cognito

- In the DalVacation project, we can use Amazon Cognito to handle user registration, authentication, and authorization. It will securely manage user identities, allowing users to sign up, sign in, and access protected resources based on their roles and permissions [1]. Moreover, Amazon Cognito supports the creation of multiple user pools, allowing us to implement different user types for the DalVacation project, such as guests, property managers, and registered customers [2].


Lambda

- AWS Lambda can be used to implement multi-factor authentication (MFA) functionality and secure communication. One Lambda function can handle security questions as an additional authentication step after the initial sign-in with Amazon Cognito, prompting users with personalized questions and validating their responses. Another Lambda function can implement a Caesar Cipher algorithm to encrypt and decrypt data transmitted between the client and the authentication services, ensuring secure communication through Amazon API Gateway [3].

API Gateway

- API Gateway can act as the front door, enabling users to access authentication services powered by AWS Lambda functions and Amazon Cognito. It can route incoming requests to Lambda functions that handle custom authentication logic, such as implementing multi-factor authentication or encryption algorithms like Caesar Cipher. Additionally, API Gateway can seamlessly integrate with Amazon Cognito user pools, allowing it to control access to the authentication APIs based on user identities and permissions defined in Cognito [4]. 

Dynamo DB

- We can utilize Amazon DynamoDB to store user information and related data. DynamoDB, a fully managed NoSQL database service, provides a scalable and efficient solution for storing user profiles, preferences, and other relevant details associated with user accounts. As users register and authenticate through Amazon Cognito, their information can be securely stored in DynamoDB tables, allowing for efficient retrieval and management during subsequent authentication and authorization processes [5].

2) Architecture Oriented Research

![Architecture](/uploads/880704ba11b3ddd1f2a2b852d5c6490c/Architecture.png)[6]

In the DalVacation project, adopting a multi-tenant architecture with separate Amazon Cognito user pools for different user types, such as guests, property managers, and registered customers, offers maximum isolation and customization, enabling tailored configurations, authentication mechanisms, and password policies for each user type. This approach, while beneficial in providing a secure and tailored authentication experience aligning with the distinct requirements and access levels of each user persona, also brings increased development costs and operational efforts. We would need to integrate logic into our application to manage sign-ups and sign-ins across different user pools based on user type, adding complexity in terms of administration and scalability. Despite these challenges, the isolation and customization benefits may outweigh the overhead, making it a valuable strategy for ensuring security and meeting the specific needs of diverse user groups in the DalVacation project [6].
 

References

[1]AWS , “What Is Amazon Cognito? - Amazon Cognito,” docs.aws.amazon.com. (Online) Available: https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html (accessed May 24, 2024).

[2]AWS , “User-pool multi-tenancy best practices - Amazon Cognito,” docs.aws.amazon.com. (Online) Available: https://docs.aws.amazon.com/cognito/latest/developerguide/bp_user-pool-based-multi-tenancy.html (accessed May 26, 2024).

[3]Amazon Web Services, “What Is Amazon API Gateway? - Amazon API Gateway,” Amazon.com, 2019. (Online) Available: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html (accessed May 24, 2024).

[4]AWS, “Amazon DynamoDB - Overview,” Amazon Web Services, Inc., 2019. (Online) Available: https://aws.amazon.com/dynamodb/ (accessed May 24, 2024).

[5]AWS, “What Is AWS Lambda? - AWS Lambda,” Amazon.com, 2019. (Online) Available: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html (accessed May 24, 2024).

[6]S. Yakut, “Multi-Tenant Architectures with AWS Cognito,” Medium, Dec. 06, 2023. (Online) Available: https://senayakut.com/aws-cognito-multi-tenant-8a6feb035ff3 (accessed May 26, 2024).
