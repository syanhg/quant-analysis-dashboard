import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress, Button, Chip } from '@mui/material';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { fetchMarketSummary, fetchPortfolioSummary, fetchRecommendations } from '../../services/api';
import LineChart from '../../components/Charts/LineChart';
import BarChart from '../../components/Charts/BarChart';
import PieChart from '../../components/Charts/PieChart';
import MarketMoversTable from '../../components/Tables/MarketMoversTable';
import MetricCard from '../../components/Cards/MetricCard';
import NewsCard from '../../components/Cards/NewsCard';

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');

  // Fetch market summary data
  const { 
    data: marketSummary, 
    isLoading: isLoadingMarket 
  } = useQuery(['marketSummary', timeRange], () => fetchMarketSummary(timeRange));

  // Fetch portfolio summary
  const { 
    data: portfolioSummary, 
    isLoading: isLoadingPortfolio 
  } = useQuery(['portfolioSummary'], fetchPortfolioSummary);

  // Fetch recommendations
  const { 
    data: recommendations, 
    isLoading: isLoadingRecommendations 
  } = useQuery(['recommendations'], fetchRecommendations);

  // Demo data for visualization - would be replaced by actual API data
  const mockMarketIndices = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'S&P 500',
        data: [4200, 4250, 4100, 4300, 4450, 4400, 4380, 4500, 4550],
        borderColor: '#3f51b5',
      },
      {
        label: 'NASDAQ',
        data: [14200, 14000, 13800, 14100, 14500, 14700, 14600, 15000, 15200],
        borderColor: '#f50057',
      },
    ],
  };

  const mockSectorPerformance = {
    labels: ['Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer', 'Utilities', 'Materials'],
    datasets: [
      {
        data: [5.2, 3.8, -1.2, 2.3, 0.8, -0.5, 1.7],
        backgroundColor: [
          '#3f51b5', '#f50057', '#00bcd4', '#4caf50', '#ff9800', '#9c27b0', '#607d8b'
        ],
      },
    ],
  };

  const mockPortfolioAllocation = {
    labels: ['Stocks', 'Bonds', 'Cash', 'Commodities', 'Crypto'],
    datasets: [
      {
        data: [45, 30, 10, 10, 5],
        backgroundColor: [
          '#3f51b5', '#f50057', '#00bcd4', '#4caf50', '#ff9800'
        ],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      
      {/* Market Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <MetricCard 
            title="S&P 500" 
            value="4,782.30" 
            change={1.23} 
            changeType="percentage" 
            icon={<ArrowDropUp color="success" />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard 
            title="NASDAQ" 
            value="15,612.45" 
            change={2.05} 
            changeType="percentage" 
            icon={<ArrowDropUp color="success" />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard 
            title="DOW JONES" 
            value="38,412.56" 
            change={-0.45} 
            changeType="percentage" 
            icon={<ArrowDropDown color="error" />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard 
            title="10Y TREASURY" 
            value="4.32%" 
            change={0.05} 
            changeType="absolute" 
            icon={<ArrowDropUp color="success" />}
          />
        </Grid>
      </Grid>

      {/* Time Range Filter */}
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        {(['1D', '1W', '1M', '3M', '1Y'] as const).map((range) => (
          <Button 
            key={range} 
            variant={timeRange === range ? 'contained' : 'outlined'} 
            size="small"
            onClick={() => setTimeRange(range)}
          >
            {range}
          </Button>
        ))}
      </Box>

      {/* Main Dashboard Content */}
      <Grid container spacing={3}>
        {/* Market Indices Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Market Indices</Typography>
            <LineChart data={mockMarketIndices} height={300} />
          </Paper>
        </Grid>

        {/* Portfolio Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Portfolio Summary</Typography>
            {isLoadingPortfolio ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                <MetricCard 
                  title="Total Value" 
                  value="$487,291.42" 
                  change={3.24} 
                  changeType="percentage" 
                  icon={<ArrowDropUp color="success" />}
                />
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Asset Allocation</Typography>
                  <PieChart data={mockPortfolioAllocation} height={200} />
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Sector Performance */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Sector Performance</Typography>
            <BarChart data={mockSectorPerformance} height={300} />
          </Paper>
        </Grid>

        {/* Top Movers */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Market Movers</Typography>
            <MarketMoversTable />
          </Paper>
        </Grid>

        {/* Trading Signals & Recommendations */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Trading Signals & Recommendations</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1">AAPL</Typography>
                    <Chip label="BUY" color="success" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Strong momentum with increasing volume. Price above 50-day moving average.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1">MSFT</Typography>
                    <Chip label="HOLD" color="primary" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Stable performance near all-time highs. Watch for earnings announcement.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1">NFLX</Typography>
                    <Chip label="SELL" color="error" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Bearish divergence on RSI. Competition concerns affecting growth projections.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Market News */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Market News</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <NewsCard 
                  title="Fed Signals Potential Rate Cut in September Meeting" 
                  source="Financial Times"
                  time="2h ago"
                  image="https://via.placeholder.com/100"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewsCard 
                  title="Tech Stocks Rally on Strong Earnings Reports" 
                  source="Wall Street Journal"
                  time="5h ago"
                  image="https://via.placeholder.com/100"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewsCard 
                  title="Oil Prices Surge Amid Middle East Tensions" 
                  source="Bloomberg"
                  time="8h ago"
                  image="https://via.placeholder.com/100"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
