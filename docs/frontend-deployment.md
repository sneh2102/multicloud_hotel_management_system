# Google cloud

- Setup project on google cloud console
- Install and setup google cloud cli
- Enable APIS for Registry, Cloud Run, Cloud Build, Deployment Manager

# Docker
- Install docker
- Move to frontend directory
- Run `docker build -t docker.io/tudu123/serverless-frontend:latest .` to build docker image
- RUN `docker push docker.io/tudu123/serverless-frontend:latest` to push image to Google cloud artifact registry

# Execute Cloud run
- Move to infra directory
- Run `gcloud builds submit --region=us-central1 --config frontend_cloudbuild.yml` to deploy create docker image to cloud run function
- Above command will output public url for service which can be used to access application