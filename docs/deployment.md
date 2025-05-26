# Cloud Deployment Guide

## AWS Deployment

### Prerequisites

- AWS Account
- AWS CLI installed and configured
- Terraform (optional, for infrastructure as code)

### Deployment Steps

1. **Set up ECR repositories**

```bash
# Create ECR repositories for frontend and backend
aws ecr create-repository --repository-name quant-dashboard-frontend
aws ecr create-repository --repository-name quant-dashboard-backend
```

2. **Build and push Docker images**

```bash
# Login to ECR
aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com

# Build and push frontend
docker build -t your-account-id.dkr.ecr.your-region.amazonaws.com/quant-dashboard-frontend:latest ./frontend
docker push your-account-id.dkr.ecr.your-region.amazonaws.com/quant-dashboard-frontend:latest

# Build and push backend
docker build -t your-account-id.dkr.ecr.your-region.amazonaws.com/quant-dashboard-backend:latest ./backend
docker push your-account-id.dkr.ecr.your-region.amazonaws.com/quant-dashboard-backend:latest
```

3. **Deploy with ECS Fargate**

Use the AWS Console or Terraform to set up an ECS cluster with Fargate tasks for both frontend and backend services.

## GCP Deployment

### Prerequisites

- GCP Account
- gcloud CLI installed and configured

### Deployment Steps

1. **Set up Container Registry**

```bash
# Configure Docker to use gcloud as a credential helper
gcloud auth configure-docker
```

2. **Build and push Docker images**

```bash
# Build and push frontend
docker build -t gcr.io/your-project-id/quant-dashboard-frontend:latest ./frontend
docker push gcr.io/your-project-id/quant-dashboard-frontend:latest

# Build and push backend
docker build -t gcr.io/your-project-id/quant-dashboard-backend:latest ./backend
docker push gcr.io/your-project-id/quant-dashboard-backend:latest
```

3. **Deploy with Cloud Run**

```bash
# Deploy frontend
gcloud run deploy quant-dashboard-frontend --image gcr.io/your-project-id/quant-dashboard-frontend:latest --platform managed

# Deploy backend
gcloud run deploy quant-dashboard-backend --image gcr.io/your-project-id/quant-dashboard-backend:latest --platform managed
```

## Azure Deployment

### Prerequisites

- Azure Account
- Azure CLI installed and configured

### Deployment Steps

1. **Create Azure Container Registry**

```bash
# Create resource group
az group create --name quant-dashboard --location eastus

# Create container registry
az acr create --resource-group quant-dashboard --name quantdashboardacr --sku Basic
```

2. **Build and push Docker images**

```bash
# Login to ACR
az acr login --name quantdashboardacr

# Build and push frontend
docker build -t quantdashboardacr.azurecr.io/quant-dashboard-frontend:latest ./frontend
docker push quantdashboardacr.azurecr.io/quant-dashboard-frontend:latest

# Build and push backend
docker build -t quantdashboardacr.azurecr.io/quant-dashboard-backend:latest ./backend
docker push quantdashboardacr.azurecr.io/quant-dashboard-backend:latest
```

3. **Deploy with Azure Container Apps**

Use the Azure Portal or Azure CLI to set up Container Apps for both frontend and backend services.
