import axios from 'axios';

// Create axios instance with base URL
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Mock API functions for demo purposes
// In a real app, these would make actual API calls

export const fetchMarketSummary = async (timeRange: string) => {
  // Mock data - in real app: return api.get(`/api/market-data/summary?range=${timeRange}`)
  return {
    indices: [
      { name: 'S&P 500', value: 4782.3, change: 1.23, changePercent: 0.026 },
      { name: 'NASDAQ', value: 15612.45, change: 312.05, changePercent: 0.0205 },
      { name: 'DOW JONES', value: 38412.56, change: -172.23, changePercent: -0.0045 },
    ],
    sectors: [
      { name: 'Technology', performance: 2.1 },
      { name: 'Healthcare', performance: 0.8 },
      { name: 'Finance', performance: -0.5 },
      { name: 'Energy', performance: 1.2 },
      { name: 'Consumer', performance: 0.3 },
    ],
    topGainers: [
      { symbol: 'AAPL', name: 'Apple Inc', price: 198.5, changePercent: 3.2 },
      { symbol: 'NVDA', name: 'NVIDIA Corp', price: 850.35, changePercent: 4.8 },
      { symbol: 'AMZN', name: 'Amazon.com Inc', price: 178.25, changePercent: 2.7 },
    ],
    topLosers: [
      { symbol: 'META', name: 'Meta Platforms Inc', price: 472.1, changePercent: -1.8 },
      { symbol: 'DIS', name: 'Walt Disney Co', price: 112.45, changePercent: -2.3 },
      { symbol: 'PFE', name: 'Pfizer Inc', price: 29.82, changePercent: -3.1 },
    ],
  };
};

export const fetchPortfolioSummary = async () => {
  // Mock data - in real app: return api.get('/api/portfolio/summary')
  return {
    totalValue: 487291.42,
    dayChange: 15721.34,
    dayChangePercent: 3.24,
    allocation: [
      { category: 'Stocks', value: 219281.14, percentage: 45 },
      { category: 'Bonds', value: 146187.43, percentage: 30 },
      { category: 'Cash', value: 48729.14, percentage: 10 },
      { category: 'Commodities', value: 48729.14, percentage: 10 },
      { category: 'Crypto', value: 24364.57, percentage: 5 },
    ],
    positions: [
      { symbol: 'AAPL', name: 'Apple Inc', shares: 250, price: 198.5, value: 49625, dayChange: 2.8 },
      { symbol: 'MSFT', name: 'Microsoft Corp', shares: 180, price: 405.72, value: 73029.6, dayChange: 1.5 },
      { symbol: 'GOOGL', name: 'Alphabet Inc', shares: 120, price: 173.44, value: 20812.8, dayChange: 0.9 },
      { symbol: 'AMZN', name: 'Amazon.com Inc', shares: 100, price: 178.25, value: 17825, dayChange: 2.7 },
    ],
  };
};

export const fetchStockData = async (symbol: string) => {
  // Mock data - in real app: return api.get(`/api/market-data/stock/${symbol}`)
  const mockStocks: { [key: string]: any } = {
    AAPL: {
      symbol: 'AAPL',
      name: 'Apple Inc',
      price: 198.5,
      change: 6.15,
      changePercent: 3.2,
      open: 193.21,
      high: 199.62,
      low: 192.75,
      volume: 89542312,
      marketCap: 3078500000000,
      pe: 32.54,
      dividend: 0.96,
      eps: 6.16,
    },
    MSFT: {
      symbol: 'MSFT',
      name: 'Microsoft Corp',
      price: 405.72,
      change: 6.02,
      changePercent: 1.5,
      open: 400.12,
      high: 407.28,
      low: 399.54,
      volume: 21456324,
      marketCap: 3012400000000,
      pe: 35.28,
      dividend: 0.68,
      eps: 11.52,
    },
  };

  return mockStocks[symbol] || {
    symbol,
    name: 'Unknown Company',
    price: 100.0,
    change: 0,
    changePercent: 0,
  };
};

export const fetchHistoricalData = async (symbol: string, period: string = '1y', interval: string = '1d') => {
  // Mock data - in real app: return api.get(`/api/market-data/historical/${symbol}?period=${period}&interval=${interval}`)
  // Generate mock time series data
  const today = new Date();
  const data = [];
  let price = 100; // Starting price

  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Random price movement
    const change = (Math.random() - 0.48) * 2; // Slight upward bias
    price = price * (1 + change / 100);
    
    data.push({
      date: date.toISOString().split('T')[0],
      open: price * (1 - Math.random() * 0.01),
      high: price * (1 + Math.random() * 0.02),
      low: price * (1 - Math.random() * 0.02),
      close: price,
      volume: Math.floor(Math.random() * 10000000) + 5000000,
    });
  }

  return data;
};

export const fetchRecommendations = async () => {
  // Mock data - in real app: return api.get('/api/portfolio/recommendations')
  return {
    buyRecommendations: [
      { symbol: 'AAPL', name: 'Apple Inc', reason: 'Strong momentum with increasing volume. Price above 50-day moving average.' },
      { symbol: 'NVDA', name: 'NVIDIA Corp', reason: 'Earnings growth expected to continue. AI sector leader.' },
      { symbol: 'AMZN', name: 'Amazon.com Inc', reason: 'Cloud division showing accelerating growth. Strong technical support.' },
    ],
    sellRecommendations: [
      { symbol: 'NFLX', name: 'Netflix Inc', reason: 'Bearish divergence on RSI. Competition concerns affecting growth projections.' },
      { symbol: 'BA', name: 'Boeing Co', reason: 'Continued production issues and regulatory scrutiny.' },
    ],
    holdRecommendations: [
      { symbol: 'MSFT', name: 'Microsoft Corp', reason: 'Stable performance near all-time highs. Watch for earnings announcement.' },
      { symbol: 'GOOGL', name: 'Alphabet Inc', reason: 'Fair valuation with steady growth. Monitor for regulatory developments.' },
    ],
  };
};

export const fetchPortfolioAnalysis = async (portfolioId: number) => {
  // Mock data - in real app: return api.get(`/api/portfolio/${portfolioId}/analysis`)
  return {
    performance: {
      totalReturn: 15.8,
      annualizedReturn: 12.4,
      sharpeRatio: 1.2,
      maxDrawdown: -8.3,
      volatility: 14.5,
      alpha: 2.1,
      beta: 0.85,
    },
    riskExposure: {
      sectorExposure: [
        { sector: 'Technology', exposure: 42 },
        { sector: 'Healthcare', exposure: 18 },
        { sector: 'Financial', exposure: 15 },
        { sector: 'Consumer Cyclical', exposure: 12 },
        { sector: 'Industrial', exposure: 8 },
        { sector: 'Other', exposure: 5 },
      ],
      geographicExposure: [
        { region: 'North America', exposure: 65 },
        { region: 'Europe', exposure: 20 },
        { region: 'Asia', exposure: 12 },
        { region: 'Other', exposure: 3 },
      ],
      factorExposure: [
        { factor: 'Market', exposure: 1.0 },
        { factor: 'Size', exposure: 0.3 },
        { factor: 'Value', exposure: -0.2 },
        { factor: 'Momentum', exposure: 0.5 },
        { factor: 'Quality', exposure: 0.4 },
      ],
    },
    correlationMatrix: [
      [1.0, 0.7, 0.5, 0.3, 0.2],
      [0.7, 1.0, 0.6, 0.4, 0.3],
      [0.5, 0.6, 1.0, 0.5, 0.4],
      [0.3, 0.4, 0.5, 1.0, 0.6],
      [0.2, 0.3, 0.4, 0.6, 1.0],
    ],
    stressTests: [
      { scenario: 'Market Crash (-20%)', impact: -15.4 },
      { scenario: 'Tech Sector Decline (-15%)', impact: -7.2 },
      { scenario: 'Interest Rate Hike (+1%)', impact: -3.5 },
      { scenario: 'USD Strengthening (+10%)', impact: -2.8 },
      { scenario: 'Commodity Surge (+20%)', impact: 1.2 },
    ],
  };
};
