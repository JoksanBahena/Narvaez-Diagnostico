const { Response, Router } = require("express");

const showMessage = async (req, res = Response) => {
  try {
    const { message } = req.body;

    const replace = escapeRegExp(message)
    console.log(replace)

    const splitted = splitMessage(replace)

    res.status(200).json(splitted);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

function splitMessage(message) {
    const array = []
    for(let i = 0; i < message.length; i++) {
        array.push(message[i]);
    }

    return array;
}

function escapeRegExp(string) {
    let letras = /[A-Za-z]/;

    if(caracteres.exec(string)) return true

    return false
}

const userRouter = Router();

userRouter.post("/", showMessage);

module.exports = {
  userRouter,
};
