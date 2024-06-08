**Cloud Architecture**

1. For react frontend code, create a docker image using Docker and tag to Google artifact registry.
2. Push docker image to Google artifact registry.
3. After image push execute cloud run with new docker image.

**Learning Outcome**

1. Learnt about how docker can be used with Node.js to built immutable docker images which can directly executed to make application working.
2. Google artifact registry can be used to store docker images in private repository in which access can be given to only required services.
3. Create and execute cloud run with latest docker image to execute and expose web application. 

So, we will be using AWS CloudFormation to create a stack for all AWS Services like Lambda, Api Gateway, Lex, Dynamo DB and all other required. Using CloudFormation script it would be easy to automate infrastructure provisioning and deployment.  
 
Similar, we are planning to use Google Cloud Deployment Manager to automate Google Cloud functions deployment and configuration with other services such as Pub/Sub, Looker studio and others. 


**Architectural Diagram**
![web_application.drawio__1_](/uploads/2114ba6bff5b00272d29c9fd535fb230/web_application.drawio__1_.png)

**References**

References

- [1]	“What is cloud run,” Google Cloud. [Online]. Available: https://cloud.google.com/run/docs/overview/what-is-cloud-run. [Accessed: 26-May-2024].
- [2]	“React,” React.dev. [Online]. Available: https://react.dev/. [Accessed: 26-May-2024].
- [3]	“Home,” Docker Documentation, 21-May-2024. [Online]. Available: https://docs.docker.com/. [Accessed: 26-May-2024].
- [4]	“Deploying to cloud run,” Google Cloud. [Online]. Available: https://cloud.google.com/run/docs/deploying. [Accessed: 26-May-2024].
- [5]	“Artifact registry documentation,” Google Cloud. [Online]. Available: https://cloud.google.com/artifact-registry/docs. [Accessed: 26-May-2024].
- [6]	Amazon.com. [Online]. Available: https://docs.aws.amazon.com/cloudformation/. [Accessed: 27-May-2024].
- [7]	“Deployment manager fundamentals,” Google Cloud. [Online]. Available: https://cloud.google.com/deployment-manager/docs/fundamentals. [Accessed: 27-May-2024].
