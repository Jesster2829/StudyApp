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


export function Flashcards() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [flashcards, setFlashcards] = React.useState<Flashcard[]>([]);
  const { className } = useParams();

  console.log("chosen class",className)

  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const flashcardsRef = collection(db, "users");
  var maxSteps = flashcards.length;
  React.useEffect(() => {
 
    const getUserFlashcards = async () => {
      const userDoc = await getDocs(flashcardsRef);
      const userDocSnapshot = userDoc.docs.map((doc) => doc.data());
      console.log("userDocSnapshot",userDocSnapshot)
      console.log("uid",uid)
      const userDocSnapshotFiltered = userDocSnapshot.filter(
        (doc) => doc.uid === uid

      );
      console.log("userDocSnapshotFiltered",userDocSnapshotFiltered)

      const userFlashcards = userDocSnapshotFiltered[0].FlashCards;
      setFlashcards(userFlashcards);
      setActiveStep(0);
      maxSteps = flashcards.length;
      setShowAnswer(false);
    };
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
      <Stack paddingTop={7} direction="column" alignItems="center">
        <Box sx={{ flexGrow: 29, marginBottom: 2 }}>
        <Paper elevation={0} square sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    borderRadius: 10,
                  }}>            <Button onClick={toggleShowAnswer} color="secondary">
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
        </Box>
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
            bottom: theme.spacing(50),
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
