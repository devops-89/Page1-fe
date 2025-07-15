import React, { useState } from 'react';
import { Box, Typography, TextField, Paper } from '@mui/material';

export default function PackagePrebook() {
  const [specialRequest, setSpecialRequest] = useState('');

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Special Request
        </Typography>
        <TextField
          label="Enter Here Your Special Request"
          variant="outlined"
          fullWidth
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
          inputProps={{ maxLength: 32 }}
        />
      </Box>
    </Paper>
  );
}
