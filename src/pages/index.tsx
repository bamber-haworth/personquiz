import type { NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useState } from "react";
import styles from "../../styles/Home.module.css";
import FinalForm from "../components/organism/FinalForm";
import {
  aboutYou,
  aboutSupport,
} from "../services/mockData";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepLabel from "@mui/material/StepLabel";
import EIScreen from "../components/organism/EIScreen";
import ISScreen from "../components/organism/ISScreen";
import useThankyou from "../hooks/useThankyou";

const steps = [
  "About You",
  "Support Needed",
  "Results",
];

const Home: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const [finalResult, setFinalResult] = useState("");

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const renderSteppers = () => {
    return (
      <Box>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>
                  <Typography fontWeight={500}>
                    {activeStep === index ? label : null}
                  </Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    );
  };

  const renderPersonTypes = useCallback(() => {
    switch (activeStep) {
      case 0:
        return (
          <EIScreen
            leftTitle="Tell us about you"
            leftTypes={aboutYou}
            generalTypes="EI"
            setFinalResult={setFinalResult}
          />
        );
      case 1:
        return (
          <ISScreen
            leftTitle="Tell us about what support you need"
            leftTypes={aboutSupport}
            generalTypes="IS"
            setFinalResult={setFinalResult}
          />
        );
      case 2:
        return <FinalForm />;
    }
  }, [activeStep]);

  const { isThankyou } = useThankyou();

  const renderThankyouPage = () => {
    return (
      <div className={styles.thankyou}>
        Thanks for completing the quiz, hopefully there is something here that can help you.
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>London Trans Support Finder</title>
        <meta name="description" content="A quiz to help direct trans people to the most appropriate/accessible support." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>London Trans Support Finder</h1>
        {isThankyou ? (
          renderThankyouPage()
        ) : (
          <div className={styles.main}>
            {renderSteppers()}
            {renderPersonTypes()}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                justifyContent: "space-between",
              }}
              mb={10}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                <Typography>Back</Typography>
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep === steps.length - 1 ? null : (
                <Button onClick={handleNext}>
                  <Typography>Next</Typography>
                </Button>
              )}
            </Box>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
