import * as React from "react";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
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
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import { useParams } from "react-router-dom";



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
    setUserClasses(userClasses);
    setLoading(false);
  };

  React.useEffect(() => {
    getUserClasses();
  }, []);

  function chosenFlashcards(className: string) {
    navigate(`/flashcards`,{state:{ClassName: className}});
  }

  return (
    <ThemeProvider theme={darker}>
      <ResponsiveAppBar />

      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {loading ? (
            <Typography variant="h5">Loading...</Typography>
          ) : UserClasses.length === 0 ? (
            <Typography variant="h5" color="primary.main">
              No Classes/Sets
            </Typography>
          ) : (
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
              {UserClasses.map((card) => (
                <Paper
                  key={card.className}
                  elevation={3}
                  sx={{
                    width: 345,
                    margin: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      backgroundColor: card.color,
                      height: 12, 
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.className}
                    </Typography>
                    <Typography
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        wordWrap: "break-word",
                        WebkitLineClamp: 10,
                        maxHeight: "6em",
                        
                      }}
                    >
                      {card.description}
                    </Typography>
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
                      oldcolor={card.color}
                    />
                  </CardActions>
                </Paper>
              ))}
            </Box>
          )}
        </Container>

        <FlashcardClass getUserClasses={getUserClasses} />
      </main>
    </ThemeProvider>
  );
}
