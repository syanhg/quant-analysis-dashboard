# Installation Guide

## Prerequisites

- Python 3.9+
- Node.js 18+
- Docker and Docker Compose
- Git

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/syanhg/quant-analysis-dashboard.git
cd quant-analysis-dashboard
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the development server
python -m app.main
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Database Setup

```bash
# Start the database using Docker Compose
cd ../
docker-compose up -d
```

## Docker Deployment

For production deployment, you can use Docker Compose:

```bash
# Build and start all services
docker-compose -f docker-compose.prod.yml up -d --build
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=quant_db
API_KEY_ALPHA_VANTAGE=your_alpha_vantage_api_key
```

## Cloud Deployment

Refer to the [cloud deployment guide](./deployment.md) for instructions on deploying to AWS, GCP, or Azure.
