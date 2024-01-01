import * as React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useParams } from "react-router";
import { Stack } from "@mui/material";
import ResponsiveAppBar from "../PageHeaders/homeHeader";
import { Flipper, Flipped } from "react-flip-toolkit";
import { darker } from "../../themes";
import { db } from "../../Config/FireBase";
import { getDocs, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Flashcard } from "../../FireBaseManagement/AppBaseTypes";
import { NewFlashCard } from "../PopUps/NewFlashCard";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";



export function Flashcards() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [flashcards, setFlashcards] = React.useState<Flashcard[]>([]);

  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const flashcardsRef = collection(db, "users");
  var maxSteps = flashcards.length;
  
  const location = useLocation();
  const ClassNameReceived= location.state?.ClassName || "";


  const getUserFlashcards = async () => {

    const userDoc = await getDocs(flashcardsRef);
    const userDocSnapshot = userDoc.docs.map((doc) => doc.data());
    const userDocSnapshotFiltered = userDocSnapshot.filter(
      (doc) => doc.uid === uid

    );
    const userFlashcards = userDocSnapshotFiltered[0].FlashCards;
    console.log("userFlashcards",userFlashcards)
    const data= userFlashcards.map((doc: { NewFlashCard: Flashcard; }) => doc.NewFlashCard);
  
    const filtered= data.filter((doc: { Class_Name: string; }) => doc.Class_Name === ClassNameReceived);
    console.log(filtered)
    setFlashcards(filtered);
    console.log("userFlashcards",userFlashcards)
    setActiveStep(0);
    maxSteps = flashcards.length;
    setShowAnswer(false);
};
  React.useEffect(() => {
    getUserFlashcards();
  }, []);
 

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setShowAnswer(false);
  };

  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setShowAnswer(false);
  };

  return (
    <ThemeProvider theme={darker}>
    <ResponsiveAppBar />
    <br></br>
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12} md={8} lg={6}>
        <Paper
          elevation={0}
          square
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
            borderRadius: 10,
          }}
        >
          <Button onClick={toggleShowAnswer} color="secondary">
            <Flipper flipKey={showAnswer}>
              <Flipped flipId="box">
                <Box sx={{ maxWidth: 400, p: 1 }}>
                  {flashcards.length > 0 ? (
                    showAnswer
                      ? flashcards[activeStep].Answer
                      : flashcards[activeStep].Question
                  ) : (
                    "Loading..."
                  )}
                </Box>
              </Flipped>
            </Flipper>
          </Button>
        </Paper>
      </Grid>
  
      <Grid item xs={12} md={8} lg={6}>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
          sx={{
            position: "fixed",
            bottom: theme.spacing(4),
          }}
        />
      </Grid>
  
      <Grid item xs={12} md={8} lg={6}>
        <NewFlashCard getFlashCards={getUserFlashcards} className={ClassNameReceived} />
      </Grid>
    </Grid>
  </ThemeProvider>
  );
}
