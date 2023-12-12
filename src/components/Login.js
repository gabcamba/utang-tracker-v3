import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, provider } from "../firestore";
import { Button, CircularProgress } from "@mui/material";
import swig from "../media/swig.png";
import blink from "../gifs/Blink-Final.gif";
import cry from "../gifs/PixelPets-Cry.gif";
import { getUser } from "../utils/database";
import GenerateSessionModal from "./GenerateSessionModal";
import { APP_VERSION } from "../constants";
import { useSpring, animated } from "@react-spring/web";
import { utangItemSpring } from "../springs";
import RegistrationPage from "./RegistrationPage";

const Login = ({ setSessionId, loggedOut }) => {
  useEffect(() => {
    localStorage.removeItem("utangs");
  }, []);
  const springs = useSpring(utangItemSpring);

  const [isRegistration, setIsRegistration] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isSesionModalOpen, setIsSessionModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const onClickLogin = async () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        setUserDetails({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        });
        setUserId(user.uid);
        const userDetails = await getUser(user.uid);

        if (userDetails && userDetails.sessionId) {
          localStorage.setItem("sessionId", userDetails?.sessionId);
          localStorage.setItem("user", user.uid);
          setSessionId(userDetails?.sessionId || null);
        } else {
          setIsRegistration(true);
        }
      })
      .catch((error) => {
        console.error(error.code, "GOOGLE AUTH ERROR", error.message);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {isRegistration ? (
        <RegistrationPage
          userId={userId}
          userDetails={userDetails}
          setSessionId={setSessionId}
          setIsSessionModalOpen={setIsSessionModalOpen}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 100,
          }}
        >
          <img
            alt="pet-blink"
            src={loggedOut ? blink : blink}
            style={{ width: "250px", "margin-bottom": "-5px" }}
          />
          <animated.div
            style={{
              ...springs,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              border: "1px solid #69c88146",
              height: "200px",
              width: "300px",
              borderRadius: "20px",
            }}
          >
            <div
              style={{ color: "white", fontFamily: "ui-monospace, SF Mono" }}
            >
              utang tracker{" "}
            </div>
            <div
              style={{
                color: "#69c881",
                fontFamily: "ui-monospace, SF Mono",
                fontSize: "0.7em",
                marginTop: 10,
              }}
            >
              {APP_VERSION}
            </div>
            {!loading ? (
              <>
                <Button
                  onClick={() => onClickLogin()}
                  sx={{
                    scale: "0.5 !important",
                  }}
                >
                  <img src={swig} alt="signInWithGoogle" />
                </Button>
              </>
            ) : (
              <CircularProgress
                sx={{
                  color: "#69c881",
                  height: "20px !important",
                  width: "20px !important",
                  marginTop: 9,
                }}
              />
            )}
          </animated.div>
        </div>
      )}
      {
        <GenerateSessionModal
          open={isSesionModalOpen}
          toggleModal={setIsSessionModalOpen}
          setSessionId={setSessionId}
          userId={userId}
        />
      }
    </div>
  );
};

export default Login;
