**AWS SNS (Simple Notification Service):** Pub/Sub Messaging: SNS is a fully managed pub/sub messaging service that enables you to decouple microservices, distributed systems, and serverless applications. \_ Features:\_

- High Throughput: Can handle a large number of messages per second.
- Flexible Message Delivery: Supports multiple protocols like HTTP, Lambda, SMS, Email, and SQS.
- Message Filtering: Allows subscribers to filter and receive only the messages that interest them.
- Practical Benefits:
- Scalability: Automatically scales with your application traffic.
- Reliability: Guarantees delivery of messages by leveraging multiple availability zones.
- Cost-Effective: You pay as you go, and there is no upfront cost.
- SNS is a fully managed messaging service for both application-to-application (A2A) and application-to-person (A2P) communication.
- It allows you to decouple microservices, distributed systems, and serverless applications.
- You can use SNS to send notifications to the end users via email, SMS, or mobile push notifications.
- For detailed development instructions and API operations, you can refer to the Amazon SNS Documentation.

**AWS SQS (Simple Queue Service):**

- Message Queuing Service: SQS is a fully managed message queuing service that enables you to send, store, and receive messages between software components at any volume. _Features:_
- Standard & FIFO Queues: Offers standard queues for maximum throughput and FIFO queues for ordering guarantee.
- _Dead-Letter Queues:_ Helps in troubleshooting undeliverable messages.
- _Message Delay:_ Allows you to delay the delivery of messages for up to 15 minutes. _Practical Benefits:_
- Durability: Stores messages on multiple servers to prevent loss.
- Security: Provides encryption at rest and in transit, along with IAM roles for access control.
- Integration: Easily integrates with other AWS services like Lambda and EC2.
- SQS is a fully managed message queuing service that enables you to decouple and scale applications.
- It moves data between distributed components of an application and helps you manage the workflow of messages.
- Standard SQS queues offer maximum throughput, best-effort ordering, and at-least-once delivery.
- SQS triggers AWS Lambda functions to process messages.
- For a comprehensive guide on using SQS, including API references and sample codes, check out the Amazon SQS Documentation.

_Potential Uses:_

- Application Decoupling: Both services can be used to decouple application components, ensuring that if one component fails, it doesn’t affect the entire system.
- Microservices Communication: They facilitate communication between microservices by acting as a buffer and message exchange hub.
- _Notifications:_ SNS can be used to trigger notifications based on certain events in your application.
- Workload Offloading: SQS can offload tasks that would otherwise block primary application workflows.
- By leveraging SNS and SQS, you can build a robust, scalable, and fault-tolerant architecture that can handle complex workflows and asynchronous processing tasks.
- The flow of the notifications in the DALVacationHome project is outlined as follows:
- User Registration & Login:
- When a user successfully registers or logs in, the system triggers a notification process.

**AWS SNS & SQS:** The notification module utilizes AWS Simple Notification Service (SNS) and Simple Queue Service (SQS) to handle notifications. _Email Notifications:_ Notifications for successful registration, login, booking confirmation, and booking failure are sent to the user’s email. _Queue Mechanism:_ Booking requests are placed in a standard SQS queue, which activates an AWS Lambda function to process the approval task. This system ensures that users are kept informed about important events within the application, such as registration and booking statuses. The use of AWS services like SNS, SQS, and Lambda facilitates a scalable and efficient notification mechanism.

**Architecture Diagram**

![aws.drawio (2).png](/uploads/9d0bfcba8eac4574db45d285162ada3d/aws.drawio__2_.png)

**References:**

\[1\] Getting started with Amazon SNS - Amazon Simple Notification Service, https://docs.aws.amazon.com/sns/latest/dg/sns-getting-started.html (accessed May 24, 2024).

\[2\] SQS queues and SNS notifications – now best friends | amazon web services, https://aws.amazon.com/blogs/aws/queues-and-notifications-now-best-friends/ (accessed May 24, 2024).

\[3\] Message queuing service - amazon simple queue service - AWS, https://aws.amazon.com/sqs/ (accessed May 24, 2024).
