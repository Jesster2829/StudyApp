import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "../PageHeaders/homeHeader";
import { ThemeProvider } from "@emotion/react";
import { darker } from "../../themes";
import { useNavigate } from "react-router";
import { FlashcardClass } from "../PopUps/FlashcardClass";
import { getAuth } from "firebase/auth";
import { db } from "../../Config/FireBase";
import { getDocs, collection } from "firebase/firestore";

const colors = [
  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  const color = colors[index];
  colors.splice(index, 1);
  return color;
}
export function FlashcardsSelection() {
  const navigate = useNavigate();
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const [UserClasses, setUserClasses] = React.useState<{ className: string, description: string }[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  const flashcardsRef = collection(db, "users");

  const getUserClasses = async () => {
    const userDoc = await getDocs(flashcardsRef);
    const userDocSnapshot = userDoc.docs.map((doc) => doc.data());
    const userDocSnapshotFiltered = userDocSnapshot.filter(
      (doc) => doc.uid === uid
    );
    const userClasses = userDocSnapshotFiltered[0]?.Classes || [];
    console.log("userClasses", userClasses)
    setUserClasses(userClasses);
    setLoading(false); 
  };

  React.useEffect(() => {
    getUserClasses();
  }, []);

  function chosenFlashcards(className: string) {
    navigate(`/flashcards/${className}`);
  }

 

  return (
    <ThemeProvider theme={darker}>
      <CssBaseline />
      <ResponsiveAppBar />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {loading ? (
            <Typography variant="h5">Loading...</Typography>
          ) : UserClasses.length === 0 ? (
            <Typography variant="h5">No Classes</Typography>
          ) : (
            <Grid container spacing={4}>
              {UserClasses.map((card) => (
                <Grid item key={card.className} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: "5%",
                        backgroundColor: getRandomColor(),
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.className}
                      </Typography>
                      <Typography>{card.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => chosenFlashcards(card.className)}
                      >
                        View
                      </Button>
                      <Button size="small">Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
          <FlashcardClass  getUserClasses={getUserClasses} />
        </main>
    </ThemeProvider>
  );
}
