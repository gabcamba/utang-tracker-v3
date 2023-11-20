export const generateCode = () => {
  const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomCode = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    randomCode += charSet.charAt(randomIndex);
  }

  return randomCode
};
