import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { createUser, getSession } from "../utils/database";
import { errorToast } from "../utils/toast";
import { useSpring, animated } from "@react-spring/web";
import { utangItemSpring } from "../springs";
import { regPage } from "../styles";

const RegistrationPage = ({
  userId,
  setSessionId,
  setIsSessionModalOpen,
  userDetails,
}) => {
  const springs = useSpring(utangItemSpring);
  const [loading, setLoading] = useState(false);
  const [inputCode, setInputCode] = useState(null);

  const onClickJoin = async () => {
    const code = inputCode.toUpperCase();
    setLoading(true);

    setTimeout(async () => {
      if (await getSession(code)) {
        createUser({ userId: userId, sessionId: code, ...userDetails }, false);
        localStorage.setItem("user", userId);
        localStorage.setItem("sessionId", code);
        setSessionId(code);
        setLoading(false);
      } else {
        errorToast("Session not found.");
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <>
      <animated.div
        style={{
          ...regPage.container,
          ...springs,
        }}
      >
        <div style={regPage.noSession}>
          It looks like you haven't joined nor created a session yet.
        </div>
        <Button
          onClick={() => setIsSessionModalOpen(true)}
          style={regPage.createSession}
        >
          Create a session
        </Button>
        <div style={regPage.bottomContainer}>
          <div style={regPage.joinExisting}>
            Or join an existing session using a code:
          </div>{" "}
          <input
            maxLength={8}
            style={regPage.sessionInput}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="session code"
          />
          {loading ? (
            <CircularProgress sx={regPage.circularProgress} />
          ) : (
            <Button
              onClick={() => onClickJoin()}
              disabled={!inputCode}
              style={regPage.sessionBtn}
            >
              Join session
            </Button>
          )}
        </div>
      </animated.div>
    </>
  );
};

export default RegistrationPage;
