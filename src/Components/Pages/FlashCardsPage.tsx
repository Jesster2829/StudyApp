import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import ResponsiveAppBar from '../PageHeaders/homeHeader';
import { ThemeProvider } from '@emotion/react';
import { darker } from '../../themes';




const cards = [
    { className: "Math", description: "Study math concepts" },
    { className: "Science", description: "Explore scientific principles" },
    { className: "History", description: "Learn about past events" },
    // Add more objects as needed
];

const colors = ["#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D", "#43AA8B", "#577590"];

const defaultTheme = createTheme();

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

export function Flashcards() {
  return (
    <ThemeProvider theme={darker}>
      <CssBaseline />
        <ResponsiveAppBar/>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.className} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                <CardMedia
                    component="div"
                    sx={{
                        pt: '5%',
                        backgroundColor: getRandomColor(),
                    }}
                />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.className}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
     
    </ThemeProvider>
  );
}