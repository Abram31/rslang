type WordDescription = {
  [key: string]: {
    correctAnswers: number,
    firstlyUsedWord: string,
    dateLearnedWord?:string,
    nameGame: string,
  };
};

type PercentagesDescription = {
  [key: string]: {
    percentCorrectAnswers: number,
    longestSeriesOfCorrectAnswers: number,
    nameGame: string,
  };
};
export interface IdataStatistics {
  learnedWords: number,
  optional: {
    words: WordDescription
    correctAnswersInGames: PercentagesDescription,
  },
}

class Statistics {
  dataStatistics: IdataStatistics;

  nameGame: string;

  constructor(
    nameGame:string,
    dataStatistics: IdataStatistics = JSON.parse(sessionStorage.getItem('statistics') as string),
  ) {
    this.dataStatistics = dataStatistics;
    this.nameGame = nameGame;
  }

  wordCorrectAnswer(idWord: string) {
    if (sessionStorage.getItem('series-of-correct-answers') && sessionStorage.getItem('longest-series-of-correct-answers')) {
      const seriesAnswers = Number(JSON.parse(sessionStorage.getItem('series-of-correct-answers') as string)) + 1;
      const longestSeries = Number(JSON.parse(sessionStorage.getItem('longest-series-of-correct-answers') as string));
      if (seriesAnswers > longestSeries) {
        sessionStorage.setItem('longest-series-of-correct-answers', JSON.stringify(seriesAnswers));
      }
      sessionStorage.setItem('series-of-correct-answers', JSON.stringify(seriesAnswers));
    } else {
      sessionStorage.setItem('series-of-correct-answers', JSON.stringify(1));
      sessionStorage.setItem('longest-series-of-correct-answers', JSON.stringify(1));
    }
    const data: IdataStatistics = this.dataStatistics;
    if (data) {
      if (Object.keys(data.optional.words).includes(idWord)) {
        if (data.optional.words[idWord].correctAnswers < 3) {
          data.optional.words[idWord].correctAnswers += 1;
          if (data.optional.words[idWord].correctAnswers === 3) {
            data.learnedWords += 1;
            data.optional.words[idWord].dateLearnedWord = new Date().toLocaleDateString('en-US');
          }
        }
      } else {
        const newDataWord = {
          correctAnswers: 1,
          firstlyUsedWord: new Date().toLocaleDateString('en-US'),
          nameGame: this.nameGame,
        };
        data.optional.words[idWord] = newDataWord;
      }
      sessionStorage.setItem('statistics', JSON.stringify(data));
    } else {
      const newData:IdataStatistics = {
        learnedWords: 0,
        optional: {
          words: {
            [`${idWord}`]: {
              correctAnswers: 1,
              firstlyUsedWord: new Date().toLocaleDateString('en-US'),
              nameGame: this.nameGame,
            },
          },
          correctAnswersInGames: {},
        },
      };
      sessionStorage.setItem('statistics', JSON.stringify(newData));
    }
  }

  wordUncorrectAnswer(idWord: string) {
    sessionStorage.setItem('series-of-correct-answers', JSON.stringify(0));
    const data: IdataStatistics = this.dataStatistics;
    if (data) {
      if (Object.keys(data.optional.words).includes(idWord)) {
        if (data.optional.words[idWord].correctAnswers > 0) {
          data.optional.words[idWord].correctAnswers -= 1;
          if (data.optional.words[idWord].correctAnswers === 2) {
            data.learnedWords -= 1;
          }
        }
      } else {
        const newDataWord = {
          correctAnswers: 0,
          firstlyUsedWord: new Date().toLocaleDateString('en-US'),
          nameGame: this.nameGame,
        };
        data.optional.words[idWord] = newDataWord;
      }
      sessionStorage.setItem('statistics', JSON.stringify(data));
    } else {
      const newData: IdataStatistics = {
        learnedWords: 0,
        optional: {
          words: {
            [`${idWord}`]: {
              correctAnswers: 0,
              firstlyUsedWord: new Date().toLocaleDateString('en-US'),
              nameGame: this.nameGame,
            },
          },
          correctAnswersInGames: {},
        },
      };
      sessionStorage.setItem('statistics', JSON.stringify(newData));
    }
  }

  setStatiscticAboutGame() {
    const guessedWords = JSON.parse(sessionStorage.getItem('guessed-words-id') as string) || [];
    const unguessedWords = JSON.parse(sessionStorage.getItem('unguessed-words-id') as string) || [];
    // eslint-disable-next-line max-len, no-mixed-operators
    const statisticPercetCorrectAnswers = Math.round(guessedWords.length / (unguessedWords.length + guessedWords.length) * 100) || 0;

    const data = this.dataStatistics;
    if (data.optional.correctAnswersInGames) {
      data.optional.correctAnswersInGames[`${new Date().toLocaleString()}`] = {
        percentCorrectAnswers: statisticPercetCorrectAnswers,
        longestSeriesOfCorrectAnswers: Number(JSON.parse(sessionStorage.getItem('longest-series-of-correct-answers') as string)),
        nameGame: this.nameGame,
      };
    } else {
      data.optional.correctAnswersInGames = {};
      data.optional.correctAnswersInGames[`${new Date().toLocaleString()}`] = {
        percentCorrectAnswers: statisticPercetCorrectAnswers,
        longestSeriesOfCorrectAnswers: Number(JSON.parse(sessionStorage.getItem('longest-series-of-correct-answers') as string)),
        nameGame: this.nameGame,
      };
    }
    sessionStorage.setItem('statistics', JSON.stringify(data));
  }
}

export default Statistics;
