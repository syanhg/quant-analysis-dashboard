from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine, Base
from app.routers import market_data, portfolio, optimization, backtest, ml_models, auth
from app.config import settings

# Create tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Quant Analysis Dashboard API",
    description="API for quantitative financial analysis",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(market_data.router, prefix="/api/market-data", tags=["Market Data"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["Portfolio Management"])
app.include_router(optimization.router, prefix="/api/optimization", tags=["Portfolio Optimization"])
app.include_router(backtest.router, prefix="/api/backtest", tags=["Backtesting"])
app.include_router(ml_models.router, prefix="/api/ml", tags=["Machine Learning"])

@app.get("/")
async def root():
    return {"message": "Welcome to Quant Analysis Dashboard API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
