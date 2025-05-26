from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List, Optional
from app.services.portfolio_service import PortfolioService
from app.schemas.portfolio import Portfolio, PortfolioCreate, PortfolioUpdate, Position, PositionCreate
from app.auth.oauth2 import get_current_user
from app.schemas.user import User

router = APIRouter()
portfolio_service = PortfolioService()

@router.get("/", response_model=List[Portfolio])
async def get_portfolios(current_user: User = Depends(get_current_user)):
    """Get all portfolios for the current user"""
    try:
        return portfolio_service.get_user_portfolios(current_user.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve portfolios: {str(e)}")

@router.post("/", response_model=Portfolio)
async def create_portfolio(
    portfolio: PortfolioCreate,
    current_user: User = Depends(get_current_user)
):
    """Create a new portfolio for the current user"""
    try:
        return portfolio_service.create_portfolio(portfolio, current_user.id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to create portfolio: {str(e)}")

@router.get("/{portfolio_id}", response_model=Portfolio)
async def get_portfolio(
    portfolio_id: int,
    current_user: User = Depends(get_current_user)
):
    """Get a specific portfolio by ID"""
    try:
        portfolio = portfolio_service.get_portfolio(portfolio_id, current_user.id)
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        return portfolio
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve portfolio: {str(e)}")

@router.put("/{portfolio_id}", response_model=Portfolio)
async def update_portfolio(
    portfolio_id: int,
    portfolio_update: PortfolioUpdate,
    current_user: User = Depends(get_current_user)
):
    """Update a portfolio by ID"""
    try:
        updated_portfolio = portfolio_service.update_portfolio(portfolio_id, portfolio_update, current_user.id)
        if not updated_portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        return updated_portfolio
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update portfolio: {str(e)}")

@router.delete("/{portfolio_id}")
async def delete_portfolio(
    portfolio_id: int,
    current_user: User = Depends(get_current_user)
):
    """Delete a portfolio by ID"""
    try:
        success = portfolio_service.delete_portfolio(portfolio_id, current_user.id)
        if not success:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        return {"message": "Portfolio deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete portfolio: {str(e)}")

@router.post("/{portfolio_id}/positions", response_model=Position)
async def add_position(
    portfolio_id: int,
    position: PositionCreate,
    current_user: User = Depends(get_current_user)
):
    """Add a position to a portfolio"""
    try:
        new_position = portfolio_service.add_position(portfolio_id, position, current_user.id)
        return new_position
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to add position: {str(e)}")

@router.get("/{portfolio_id}/analysis", response_model=dict)
async def portfolio_analysis(
    portfolio_id: int,
    current_user: User = Depends(get_current_user)
):
    """Get comprehensive analysis of a portfolio"""
    try:
        analysis = portfolio_service.analyze_portfolio(portfolio_id, current_user.id)
        if not analysis:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        return analysis
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
