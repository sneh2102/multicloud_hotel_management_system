# Multi-Cloud Hotel Management System

## Project Overview
A modern hotel management system built on multi-cloud architecture, combining AWS and Google Cloud services. Features include room booking/cancellation, real-time customer-agent messaging, Sentiment analysed review system, and an analytics dashboard.

![System Architecture](/architecture.png)  
*Diagram illustrating the core system components and their relationships*

## Key Features
- **Room Management**
  - Booking & cancellation system
  - Admin panel for room inventory
  - Dynamic pricing engine
- **Authentication**
  - AWS Cognito integration
  - JWT-based secure access
- **Customer Interaction**
  - Real-time messaging (Google Pub/Sub)
  - Review system with automated sentiment analysis (Google NLP API)
- **Serverless Backend**
  - AWS Lambda for booking operations
  - Google Cloud Functions for notifications
- **Analytics**
  - Dashboard using Google Looker Studio
  - Operational metrics & customer insights
- **Database**
  - NoSQL storage with AWS DynamoDB
  - Multi-region replication

## System Architecture
**Four-Layer Design:**
1. **Presentation Layer (React Frontend)**
   - Guest-facing interface
   - Admin dashboard
2. **Application Layer**
   - AWS Lambda (Booking/Inventory)
   - Google Cloud Functions (Notifications)
3. **Services Layer**
   - AWS Cognito (Authentication)
   - Google Pub/Sub (Messaging)
   - Google NLP (Sentiment Analysis)
   - AWS LEX (Chatbot)
4. **Data Layer**
   - AWS DynamoDB (Core Database)
   - Google BigQuery (Analytics)

## Tech Stack
**Cloud Services**
- AWS: Cognito, Lambda, DynamoDB
- GCP: Cloud Functions, Pub/Sub, NLP API, Looker Studio

**Frontend**
- React + TypeScript
- Tailwind CSS
- Docker Containerization

**Backend**
- Python (AWS Lambda)
- Node.js (Google Cloud Functions)
- Serverless Framework

## Directory Structure
```plaintext
project-root/
├── backend/
│   ├── .serverless/       # Serverless framework configuration
│   ├── authentication/    # Auth service implementation
│   ├── cloud-functions/   # Cloud function source code
│   ├── lambda_functions/  # AWS Lambda handlers
│   ├── queries/           # Database query modules
│   ├── Review/            # Code review system components
│
├── docs/                  # Technical documentation
│   └── *.md               # Various research and documentation files
│
├── frontend/
│   ├── node_modules/
│   ├── public/           # Static assets
│   ├── src/              # Application source code
│   ├── Dockerfile        # Containerization configuration
│   ├── package.json      # NPM dependencies
│   └── tsconfig.json     # TypeScript configuration
│
└── infra/                # Infrastructure as Code (IaC) configurations
        ├── *.yaml        # Cloud deployment templates
        └── *.yml         # CI/CD pipeline configurations
```

## Documentation
Refer to these key documents in the `backend/docs/` directory:
- `authentication_Research.md`: Auth system design
- `Virtual_Assistant.md`: NLP implementation details
- `web_application_and_deployment.md`: Deployment guide
- `data_analysis_and_visualization.md`: Data analysis guide
- `notifications.md`: Notifications using SNS details
- `frontend_deployment`: Frontend Deployment in GCP Cloud Run
- `messaging_pub_sub_research`: Messaging using GCP Pub/Sub




