import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)',
  },
}));

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeType: 'percentage' | 'absolute';
  icon?: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  color,
  onClick,
}) => {
  const isPositive = change >= 0;
  const formattedChange = isPositive ? `+${change}` : `${change}`;
  const changeDisplay = changeType === 'percentage' ? `${formattedChange}%` : formattedChange;
  
  return (
    <StyledCard onClick={onClick} sx={{ cursor: onClick ? 'pointer' : 'default' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
              {value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {icon}
              <Typography 
                variant="body2" 
                color={isPositive ? 'success.main' : 'error.main'}
              >
                {changeDisplay}
              </Typography>
            </Box>
          </Grid>
          {color && (
            <Grid item>
              <Avatar
                sx={{
                  bgcolor: color,
                  width: 40,
                  height: 40,
                }}
              >
                {icon}
              </Avatar>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default MetricCard;
