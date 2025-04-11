import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const ExpenseItem = ({ expense, onDelete }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {expense.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {expense.description}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            €{expense.amount}
          </Typography>
          <Button
            startIcon={<DeleteIcon />}
            color="error"
            variant="outlined"
            onClick={() => onDelete(expense.id)}
          >
            Elimina
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ExpenseItem;

