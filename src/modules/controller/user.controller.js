const { Response, Router } = require("express");

const showMessage = async (req, res = Response) => {
  try {
    const { message } = req.body;

    const hasSpecialCharacters = escapeRegExp(message);
    if (hasSpecialCharacters) {
      return res.status(400).json({ message: "No se admiten caracteres especiales" });
    }

    const splitted = splitMessage(message);

    res.status(200).json(splitted);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

function splitMessage(message) {
  const array = [];

  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    if (char !== " ") {
      const imageUrl = `https://img.icons8.com/ios/50/sign-language-${char.toLowerCase()}.png`;
      array.push([char, imageUrl]);
    } else {
      array.push([char, ""]);
    }
  }

  return array;
}

function escapeRegExp(string) {
  const caracteres = `!"#$%&/()=?¡'!¿-_+*{}[]`;

  for (let i = 0; i < string.length; i++) {
    for (let j = 0; j < caracteres.length; j++) {
      if (string[i] === caracteres[j]) return true;
    }
  }

  return false;
}

const userRouter = Router();

userRouter.post("/", showMessage);

module.exports = {
  userRouter,
};
