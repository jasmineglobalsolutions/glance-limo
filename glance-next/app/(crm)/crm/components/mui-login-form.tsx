'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export function MuiLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/crm/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) {
        setError(data?.message ?? 'Invalid credentials.');
        return;
      }

      router.push('/crm/dashboard');
      router.refresh();
    } catch {
      setError('Unable to login right now.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        bgcolor: '#0b0b0b',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 460,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.14)',
          bgcolor: '#121212',
          p: 4,
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.72)', letterSpacing: 2 }}>
              GLANCE LIMOUSINE CRM
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mt: 0.5 }}>
              Staff Login
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.66)', mt: 1 }}>
              Sign in to access your CRM workspace.
            </Typography>
          </Box>

          <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              fullWidth
              InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  bgcolor: '#0f0f0f',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              fullWidth
              InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  bgcolor: '#0f0f0f',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                },
              }}
            />

            {error ? <Alert severity="error">{error}</Alert> : null}

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                height: 46,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: 16,
                fontWeight: 700,
                bgcolor: '#fff',
                color: '#000',
                '&:hover': { bgcolor: '#e6e6e6' },
              }}
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : 'Sign in'}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
