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

interface Flashcards {
  Question: string;
  Answer: string;
  Class_Name: string;
  User: string;
  id: string;
}

const steps = [
  {
    question: `What is the way to pass cmpt 332`,
    answer: `Don't take it`,
  },
  {
    question: "What is the most useless class you can take?",
    answer: `Why of course it is cmpt 370`,
  },
  {
    question: `What is the main component of a computer?`,
    answer: `According to Dwight, the operating system`,
  },
  {
    question: `What is the capital of France?`,
    answer: `Paris`,
  },
  {
    question: `Who painted the Mona Lisa?`,
    answer: `Leonardo da Vinci`,
  },
  {
    question: `What is the largest planet in our solar system?`,
    answer: `Jupiter`,
  },
];

export function Flashcards() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [flashcards, setFlashcards] = React.useState<Flashcards[]>([]);
  const flashcardsRef = collection(db, "FlashCards");
  const maxSteps = flashcards.length;

  React.useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const querySnapshot = await getDocs(flashcardsRef);
        const data: Flashcards[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          Question: doc.data().Question,
          Answer: doc.data().Answer,
          Class_Name: doc.data().Class_Name,
          User: doc.data().User,
        }));
        console.log(data);
        setFlashcards(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFlashcards();
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
      <Stack direction="column" alignItems="center">
        <ResponsiveAppBar />
        <Box sx={{ flexGrow: 29, marginBottom: 2 }}>
          <Paper elevation={0} square>
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
