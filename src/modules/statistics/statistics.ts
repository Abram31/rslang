/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-mixed-operators */
type WordDescription = {
  [key: string]: {
    correctAnswers: number,
    lastUsedWord: string,
  };
};
// eslint-disable-next-line @typescript-eslint/naming-convention
type percentagesDescription = {
  [key: string]: {
    percentCorrectAnswers: number,
    longestSeriesOfCorrectAnswers: number,
  };
};
interface IdataStatistics {
  learnedWords: number,
  optional: {
    words: WordDescription
    correctAnswersInGames: percentagesDescription,
  },
}

class Statistics {
  dataStatistics: IdataStatistics;

  constructor(dataStatistics: IdataStatistics = JSON.parse(sessionStorage.getItem('statistics')!)) {
    this.dataStatistics = dataStatistics;
  }

  wordCorrectAnswer(idWord: string) {
    if (sessionStorage.getItem('series-of-correct-answers') && sessionStorage.getItem('longest-series-of-correct-answers')) {
      const seriesAnswers = Number(JSON.parse(sessionStorage.getItem('series-of-correct-answers')!)) + 1;
      const longestSeries = Number(JSON.parse(sessionStorage.getItem('longest-series-of-correct-answers')!));
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
          }
        }
      } else {
        const newDataWord = {
          correctAnswers: 1,
          lastUsedWord: new Date().toLocaleDateString('en-US'),
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
              lastUsedWord: new Date().toLocaleDateString('en-US'),
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
          lastUsedWord: new Date().toLocaleDateString('en-US'),
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
              lastUsedWord: new Date().toLocaleDateString('en-US'),
            },
          },
          correctAnswersInGames: {},
        },
      };
      sessionStorage.setItem('statistics', JSON.stringify(newData));
    }
  }

  setStatiscticAboutGame() {
    const guessedWords = JSON.parse(sessionStorage.getItem('guessed-words-id')!) || 0;
    const unguessedWords = JSON.parse(sessionStorage.getItem('unguessed-words-id')!) || 0;
    const statisticPercetCorrectAnswers = Math.round(guessedWords.length
    / (unguessedWords.length + guessedWords.length) * 100) || 0;

    const data = this.dataStatistics;
    debugger;
    data.optional.correctAnswersInGames[`${new Date().toLocaleString()}`] = {
      percentCorrectAnswers: statisticPercetCorrectAnswers,
      longestSeriesOfCorrectAnswers: Number(JSON.parse(sessionStorage.getItem('longest-series-of-correct-answers')!)),
    }

    console.log(unguessedWords.length);
    console.log(guessedWords.length);
    // console.log(statisticAboutGame);
    sessionStorage.setItem('statistics', JSON.stringify(data));
  }

  // longestSeriesCorrectAnswers () {

  // }
}

export default Statistics;
