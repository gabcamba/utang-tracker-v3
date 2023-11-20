import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth, provider } from "../firestore";
import { Button } from "@mui/material";
import swig from "../media/swig.png";
import { createUser, getDeleted, getPayments, getSession, getUser, getUtangs } from "../utils/database";
import { generateUUID } from "../utils/uuid";
import { generateCode } from "../utils/sessionCodeGenerator";
import GenerateSessionModal from "./GenerateSessionModal";
import { errorToast } from "../utils/toast";
const Login = ({
  setSessionId,
  setRegistration,
  setUtangs,
  setDeleted,
  setPayments,
}) => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isSesionModalOpen, setIsSessionModalOpen] = useState(false);
  const [inputCode, setInputCode] = useState(null);

  const onClickJoin = async() => {

    // check if session code is existing, return error if not, proceed to home when yes

    if(await getSession(inputCode)){
      createUser({ userId: userId, sessionId: inputCode });

    } else {
      errorToast('SESSION CODE NOT FOUND');
    }
  };

  const onClickLogin = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        setUserId(user.uid);
        const userDetails = await getUser(user.uid);

        if (userDetails && userDetails.sessionId) {
          sessionStorage.setItem("sessionId", userDetails?.sessionId);
          sessionStorage.setItem("user", user.uid);
          setSessionId(userDetails?.sessionId || null);
        } else {
          setIsRegistration(true);
        }
      })
      .catch((error) => {
        console.error("GOOGLE AUTH ERROR", error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <>
      {isRegistration ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100svh",
            flexDirection: "column",
          }}
        >
          <div style={{ color: "white" }}>
            It looks like your account doesn't have a joined session yet.
          </div>
          <Button
            onClick={() => setIsSessionModalOpen(true)}
            style={{ color: "white", backgroundColor: "green" }}
          >
            Create a session{" "}
          </Button>{" "}
          {/*create user, generate sessionId, updte user with sessionId, fetch data */}
          <div style={{ color: "white" }}>Join session? </div>{" "}
          <input onChange={e => setInputCode(e.target.value)} placeholder="session code" />
          <Button
            onClick={() => onClickJoin()}
            style={{ color: "white", backgroundColor: "green" }}
          >
            Join session
          </Button>
          {/*create user, fetch sessionId, update user with sessionid, fetch data */}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100svh",
          }}
        >
          <Button
            onClick={() => onClickLogin()}
            sx={{
              textTransform: "lowercase",
              color: "white",
              scale: "0.5 !important",
            }}
          >
            <img src={swig} />
          </Button>
        </div>
      )}
      {
        <GenerateSessionModal open={isSesionModalOpen} toggleModal={setIsSessionModalOpen} userId={userId}/>
      }
    </>
  );
};

export default Login;
