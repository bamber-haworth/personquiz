import type { NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useState } from "react";
import styles from "../../styles/Home.module.css";
import PersonType from "../components/organism/PersonType";
import FinalForm from "../components/organism/FinalForm";
import {
  extroverts,
  feelings,
  introverts,
  intuitions,
  judgings,
  perceivings,
  sensings,
  thinkings,
} from "../services/mockData";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  "Bạn là E hay I?",
  "Bạn là N hay S?",
  "Bạn là T hay F?",
  "Bạn là J hay P?",
  "Nhận kết quả",
];

const Home: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

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

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const renderSteppers = useCallback(() => {
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
        <Box>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1, mt: 1 }}
                >
                  <Typography>Back</Typography>
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext}>
                  <Typography>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Typography>
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
    );
  }, [activeStep]);

  const renderPersonTypes = useCallback(() => {
    switch (activeStep) {
      case 0:
        return (
          <PersonType
            leftTitle="Extraversion (Hướng ngoại)"
            leftTypes={extroverts}
            rightTitle="Introversion (Hướng nội)"
            rightTypes={introverts}
          />
        );
      case 1:
        return (
          <PersonType
            leftTitle="Intuition(Trực giác)"
            leftTypes={intuitions}
            rightTitle="Sensing(Cảm nhận)"
            rightTypes={sensings}
          />
        );
      case 2:
        return (
          <PersonType
            leftTitle="Thinking(Suy nghĩ)"
            leftTypes={thinkings}
            rightTitle="Feeling(Cảm giác)"
            rightTypes={feelings}
          />
        );
      case 3:
        return (
          <PersonType
            leftTitle="Judging(Đánh giá)"
            leftTypes={judgings}
            rightTitle="Perceiving(Nhận thức)"
            rightTypes={perceivings}
          />
        );
      case 4:
        return <FinalForm />;
    }
  }, [activeStep]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Trắc nghiệm tính cách</h1>
        {renderSteppers()}

        {renderPersonTypes()}
      </main>
    </div>
  );
};

export default Home;
