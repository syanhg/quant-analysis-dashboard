from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from app.services.market_data_service import MarketDataService
from app.schemas.market_data import StockData, HistoricalData, MarketDataRequest
from datetime import date

router = APIRouter()
market_data_service = MarketDataService()

@router.get("/stock/{symbol}", response_model=StockData)
async def get_stock_data(symbol: str):
    """Get current stock data for a specific symbol"""
    try:
        return market_data_service.get_stock_data(symbol)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Stock data not found: {str(e)}")

@router.get("/historical/{symbol}", response_model=List[HistoricalData])
async def get_historical_data(
    symbol: str,
    start_date: date = Query(..., description="Start date (YYYY-MM-DD)"),
    end_date: Optional[date] = Query(None, description="End date (YYYY-MM-DD)"),
    interval: str = Query("1d", description="Data interval (1d, 1wk, 1mo)")
):
    """Get historical stock data for a specific symbol"""
    try:
        return market_data_service.get_historical_data(symbol, start_date, end_date, interval)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Historical data not found: {str(e)}")

@router.get("/sector-performance", response_model=dict)
async def get_sector_performance():
    """Get sector performance data"""
    try:
        return market_data_service.get_sector_performance()
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Sector performance data not found: {str(e)}")

@router.post("/custom-data", response_model=dict)
async def get_custom_market_data(request: MarketDataRequest):
    """Get custom market data based on specified parameters"""
    try:
        return market_data_service.get_custom_data(request)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Custom data request failed: {str(e)}")
