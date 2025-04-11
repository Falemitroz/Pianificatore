// Un elenco dettagliato di tutte le spese sostenute in modo da monitorare costi e gestire il budget// 

import React, from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Divider, Box, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EuroIcon from '@mui/icons-material/Euro';
import moment from 'moment';
import 'moment/locale/it'; // Importa la localizzazione italiana per moment

function ExpenseList({ expenses, onDeleteExpense }) {
  moment.locale('it'); // Imposta la lingua italiana per questo componente

  if (!expenses || expenses.length === 0) {
    return (
      <Box sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="subtitle1">Nessuna spesa ancora aggiunta per questo viaggio.</Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
      {expenses.map((expense) => (
        <React.Fragment key={expense.id}>
          <ListItem alignItems="center">
            <ListItemText
              primary={expense.description}
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {moment(expense.date).format('D MMMM YYYY')} - {expense.category}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Typography variant="body1" sx={{ mr: 2 }}>
                <EuroIcon sx={{ fontSize: 'small', mr: 0.5 }} />
                {expense.amount.toFixed(2)}
              </Typography>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDeleteExpense(expense.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

export default ExpenseList;