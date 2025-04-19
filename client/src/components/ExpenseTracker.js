import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Select, MenuItem, FormControl,
  InputLabel, Checkbox, FormGroup, FormControlLabel, Paper, Divider, Box, Grid, List, ListItem, ListItemText
} from '@mui/material';

const participants = [
  'Alessandro Midolo',
  'Eleonora Lombardo',
  'Marzia Gueli',
  'Luana Puccio',
  'Marco Arcidiacono',
  'Gaetano Castronovo',
  'Alice Abruzzo'
];

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(participants[0]);
  const [sharedWith, setSharedWith] = useState(participants);

  const addExpense = () => {
    if (!desc || !amount || sharedWith.length === 0) return;

    const newExpense = {
      description: desc,
      amount: parseFloat(amount),
      paidBy,
      sharedWith
    };

    setExpenses([...expenses, newExpense]);
    setDesc('');
    setAmount('');
    setPaidBy(participants[0]);
    setSharedWith(participants);
  };

  const toggleSharedWith = (person) => {
    setSharedWith(prev =>
      prev.includes(person)
        ? prev.filter(p => p !== person)
        : [...prev, person]
    );
  };

  const calculateBalances = () => {
    const balances = {};
    participants.forEach(p => (balances[p] = 0));

    expenses.forEach(({ amount, paidBy, sharedWith }) => {
      const share = amount / sharedWith.length;
      sharedWith.forEach(p => {
        balances[p] -= share;
      });
      balances[paidBy] += amount;
    });

    return balances;
  };

  const balances = calculateBalances();

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom color="primary">
        PlanFriendTrip – Gestione Spese
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Aggiungi una spesa</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Descrizione"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Importo (€)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Pagato da</InputLabel>
              <Select
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                label="Pagato da"
              >
                {participants.map(p => (
                  <MenuItem key={p} value={p}>{p}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>Dividi con:</Typography>
            <FormGroup row>
              {participants.map(p => (
                <FormControlLabel
                  key={p}
                  control={
                    <Checkbox
                      checked={sharedWith.includes(p)}
                      onChange={() => toggleSharedWith(p)}
                    />
                  }
                  label={p}
                />
              ))}
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={addExpense}>
              Aggiungi Spesa
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Lista Spese</Typography>
        {expenses.length === 0 ? (
          <Typography color="text.secondary">Nessuna spesa aggiunta.</Typography>
        ) : (
          <List>
            {expenses.map((e, i) => (
              <ListItem key={i} divider>
                <ListItemText
                  primary={`${e.paidBy} ha pagato €${e.amount.toFixed(2)} per "${e.description}"`}
                  secondary={`Diviso con: ${e.sharedWith.join(', ')}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Bilanci Finali</Typography>
        <List>
          {participants.map(p => (
            <ListItem key={p} divider>
              <ListItemText
                primary={p}
                secondary={
                  <Typography
                    color={balances[p] >= 0 ? 'green' : 'red'}
                    fontWeight="bold"
                  >
                    €{balances[p].toFixed(2)}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default ExpenseTracker;
