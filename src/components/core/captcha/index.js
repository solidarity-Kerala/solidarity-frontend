import { useState, useEffect, useRef } from "react";
import FormInput from "../input";
import { Canvas, CpatchaContainer } from "./styles";

const Captcha = ({ setCaptchaStatus, label, error }) => {
  const canvasRef = useRef(null);
  const [captchaCode, setCaptchaCode] = useState("");
  const [userInput, setUserInput] = useState("");
  useEffect(() => {
    // generate a random string of 6 characters
    const code = generateCaptchaCode(6);
    setCaptchaCode(code);
    drawCaptchaCode(code);
  }, []);

  function generateCaptchaCode(length) {
    // generate a random string of alphanumeric characters
    const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  }

  function drawCaptchaCode(code) {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // draw a solid color background
    context.fillStyle = "#ffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // draw the captcha code in a random font and size
    const fontSize = Math.floor(Math.random() * 20) + 20;
    const font = `bold ${fontSize}px Arial`;
    context.font = font;
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(code, canvas.width / 2, canvas.height / 2);
  }

  function onCaptchEntered(e, id) {
    validate(e.target.value);
  }
  const validate = (code) => {
    if (code === captchaCode) {
      setCaptchaStatus(true);
    } else {
      setCaptchaStatus(false);
    }
    setUserInput(code);
  };

  return (
    <>
      <CpatchaContainer>
        <Canvas>
          <canvas
            title="Cick here to update the Captcha"
            onClick={() => {
              const code = generateCaptchaCode(6);
              setCaptchaCode(code);
              drawCaptchaCode(code);
              setCaptchaStatus(false);
            }}
            ref={canvasRef}
            width={150}
            height={50}
            style={{ background: "transperant" }}
          />
        </Canvas>
        <FormInput error={error} placeholder={label} id={1} label={label} value={userInput} type="text" onChange={onCaptchEntered} />
      </CpatchaContainer>
    </>
  );
};
export default Captcha;
