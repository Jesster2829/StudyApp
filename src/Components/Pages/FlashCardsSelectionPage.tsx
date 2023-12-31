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
import { FlashCardSetEdit } from "../PopUps/SelectedFlashCardSet";

export function FlashcardsSelection() {
  const navigate = useNavigate();
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const [UserClasses, setUserClasses] = React.useState<
    { className: string; description: string; color: string }[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  const flashcardsRef = collection(db, "users");

  const getUserClasses = async () => {
    const userDoc = await getDocs(flashcardsRef);
    const userDocSnapshot = userDoc.docs.map((doc) => doc.data());
    const userDocSnapshotFiltered = userDocSnapshot.filter(
      (doc) => doc.uid === uid
    );
    const userClasses = userDocSnapshotFiltered[0]?.Classes || [];
    console.log("userClasses", userClasses);
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
      <ResponsiveAppBar />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {loading ? (
            <Typography variant="h5">Loading...</Typography>
          ) : UserClasses.length === 0 ? (
            <Typography variant="h5" color={"primary.main"}>
              No Classes/Sets
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {UserClasses.map((card) => (
                <Grid item key={card.className} xs={"auto"} sm={6} md={"auto"}  >
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
                        backgroundColor: card.color,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.className}
                      </Typography>
                      <Typography >{card.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => chosenFlashcards(card.className)}
                        sx={{
                          color: "primary.main",
                          backgroundColor: "secondary.main",
                        }}
                      >
                        View
                      </Button>
                      <FlashCardSetEdit
                        name={card.className}
                        description={card.description}
                        getUserClasses={getUserClasses}
                        color={card.color}
                      />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
        <FlashcardClass getUserClasses={getUserClasses} />
      </main>
    </ThemeProvider>
  );
}
