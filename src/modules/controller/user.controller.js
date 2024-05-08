const { Response, Router } = require("express");

const showMessage = async (req, res = Response) => {
  try {
    const { message } = req.body;

    const replace = escapeRegExp(message);
    console.log(replace);

    if (replace)
      return res
        .status(400)
        .json({ message: "No se admiten caracteres especiales" });

    const splitted = splitMessage(message);

    res.status(200).json(splitted);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

function splitMessage(message) {
  const array = {};
  for (let i = 0; i < message.length; i++) {
    message[i] = new Array();
    array.push(
      (message[i][0] = `https://img.icons8.com/ios/50/sign-language-${message[
        i
      ].toLowerCase()}.png`)
    );
    // if (message[i] !== " ") {
    //   array.push(message[i]);
    //   array.push(
    //     `https://img.icons8.com/ios/50/sign-language-${message[
    //       i
    //     ].toLowerCase()}.png`
    //   );
    // } else {
    //   array.push(message[i])
    // }
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
