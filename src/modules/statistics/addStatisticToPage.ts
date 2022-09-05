import { IdataStatistics } from './statistics';

export const statisticByWords = () => {
  if (localStorage.getItem('id')) {
    const data: IdataStatistics = JSON.parse(sessionStorage.getItem('statistics') as string);
    const currentDate = new Date().toLocaleDateString('en-US');
    const newWordsOfDay: Array<string> = [];
    const newLearnedWordsOfDay: Array<string> = [];
    const percentsCurrentAnswers: Array<number> = [];

    Object.entries(data.optional.words).forEach((word) => {
      if (word[1].firstlyUsedWord === currentDate) {
        newWordsOfDay.push(word[0]);
      }
      if (word[1].dateLearnedWord === currentDate) {
        newLearnedWordsOfDay.push(word[0]);
      }
    });

    Object.entries(data.optional.correctAnswersInGames).forEach((word) => {
      if (word[0].split(',')[0] === currentDate) {
        percentsCurrentAnswers.push(word[1].percentCorrectAnswers);
      }
    });

    return {
      newWordsDay: String(newWordsOfDay.length),
      newLearnedWordsDay: String(newLearnedWordsOfDay.length),
      percentAnswers: String(Math.round(percentsCurrentAnswers.reduce((acc, item) => acc + item, 0)
      / percentsCurrentAnswers.length)),
    };
  }
  return {
    newWordsDay: '0',
    newLearnedWordsDay: '0',
    percentAnswers: '0',
  };
};

export const statisticsGame = (nameOfGame: string) => {
  if (localStorage.getItem('id')) {
    const data: IdataStatistics = JSON.parse(sessionStorage.getItem('statistics') as string);
    const currentDate = new Date().toLocaleDateString('en-US');
    const newWordsGameDay: Array<string> = [];
    const mostLongSeriesAnswers: Array<number> = [];
    const percentsCorrectAnswers: Array<number> = [];

    Object.entries(data.optional.words).forEach((word) => {
      if (word[1].nameGame === nameOfGame && word[1].firstlyUsedWord === currentDate) {
        newWordsGameDay.push(word[0]);
      }
    });

    Object.entries(data.optional.correctAnswersInGames).forEach((word) => {
      if (word[1].nameGame === nameOfGame) {
        mostLongSeriesAnswers.push(Number(word[1].longestSeriesOfCorrectAnswers));
        percentsCorrectAnswers.push(Number(word[1].percentCorrectAnswers));
      }
    });
    return {
      newWordsGameDay: String(newWordsGameDay.length),
      longestSeriesAnswers: String(Math.max(...mostLongSeriesAnswers)),
      percentAnswers: String(Math.round(percentsCorrectAnswers.reduce((acc, item) => acc + item, 0)
        / percentsCorrectAnswers.length)),
    };
  }
  return {
    newWordsGameDay: '0',
    longestSeriesAnswers: '0',
    percentAnswers: '0',
  };
};

export const numberNewWordsEachDay = () => {
  const data: IdataStatistics = JSON.parse(sessionStorage.getItem('statistics') as string);
  const newWordsOfDay: { [key:string]: number } = {};
  Object.entries(data.optional.words).forEach((word) => {
    if (newWordsOfDay[word[1].firstlyUsedWord]) {
      newWordsOfDay[word[1].firstlyUsedWord] += 1;
    } else {
      newWordsOfDay[word[1].firstlyUsedWord] = 1;
    }
  });

  return newWordsOfDay;
};

export const numbersLearnedWordsEveryDay = () => {
  const data: IdataStatistics = JSON.parse(sessionStorage.getItem('statistics') as string);
  debugger;
  const learnedWordsOfDay: { [key: string]: number } = {};
  Object.entries(data.optional.words).forEach((word) => {
    if (word[1].dateLearnedWord && word[1].correctAnswers === 3
    && learnedWordsOfDay[word[1].dateLearnedWord as string]) {
      learnedWordsOfDay[word[1].dateLearnedWord as string] += 1;
    } else if (word[1].dateLearnedWord && word[1].correctAnswers === 3) {
      learnedWordsOfDay[word[1].dateLearnedWord as string] = 1;
    }
  });
  return learnedWordsOfDay;
};
