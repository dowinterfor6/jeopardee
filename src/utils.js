import tempData from './temp-backend';
import { shuffle } from 'lodash';

// TODO: Axios for backend
const getQuestions = () => {
  return (tempData.questions);
};

export const getGameQuestions = () => {
  let rawQuestions = getQuestions();
  const difficulty = ['easy', 'medium', 'hard'];
  let randCategories = [0, 1, 2, 3, 4, 5, 6];

  randCategories.forEach((cat) => {
    const randIdx = Math.round(Math.random() * 2);
    const randDifficulty = difficulty[randIdx];
    let rand2Idx
    if (randDifficulty === 'hard') {
      rand2Idx = 0;
    } else {
      rand2Idx = Math.round(Math.random());
    }
    rawQuestions[cat][randDifficulty][rand2Idx].dailyDouble = true;
  });

  rawQuestions = shuffle(rawQuestions);

  const round1 = rawQuestions.slice(0, 6);
  const round2 = rawQuestions.slice(6, 12);
  const finalRound = rawQuestions.slice(12, 13)[0];

  const gameQuestions = {
    round1,
    round2,
    finalRound
  }

  return gameQuestions;
}

export const getRoomID = () => {
  let randCharCodes = [];

  for (let i = 0; i < 4; i ++) {
    // TODO: cases is overkill atm
    // const isUppercase = Math.round(Math.random()) === 1;
    let randCharCode = Math.round(Math.random() * 25) + 65;
    // if (!isUppercase) {
    //   randCharCode += 32;
    // }
    randCharCodes.push(randCharCode);
  }

  return randCharCodes.map((code) => String.fromCharCode(code)).join('');
}

// TODO: New room ID