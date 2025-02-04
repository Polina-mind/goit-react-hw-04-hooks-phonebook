import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, List, ListItem, Typography } from '@mui/material';

const Contacts = ({ contacts, onDelete }) => {
  return (
    <Box className="Form" pb={2}>
      {contacts.length > 0 ? (
        <List disablePadding sx={{ pb: -1 }}>
          {contacts.map(({ id, name, number }) => (
            <ListItem
              key={id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
                backgroundColor: 'white',
                borderRadius: 1,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography
                variant="body1"
                component="p"
                sx={{
                  mr: 2,
                  width: '80%',
                  minWidth: 0,
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                }}
              >
                <span style={{ fontWeight: 600 }}>{name}:</span> {number}
              </Typography>

              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => onDelete(id)}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No contacts
        </Typography>
      )}
    </Box>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Contacts;
