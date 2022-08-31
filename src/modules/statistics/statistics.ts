type WordDescription = {
  [key: string]: {
    correctAnswers: number,
    lastUsedWord: string,
  };
};

interface IdataStatistics {
  learnedWords: number,
  optional: {
    words: WordDescription
  }
}

class Statistics {
  dataStatistics: IdataStatistics;

  constructor(dataStatistics: IdataStatistics = JSON.parse(sessionStorage.getItem('statistics')!)) {
    this.dataStatistics = dataStatistics;
  }

  wordCorrectAnswer(idWord: string) {
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
        learnedWords: 1,
        optional: {
          words: {
            [`${idWord}`]: {
              correctAnswers: 1,
              lastUsedWord: new Date().toLocaleDateString('en-US'),
            },
          },
        },
      };
      sessionStorage.setItem('statistics', JSON.stringify(newData));
    }
  }

  wordUncorrectAnswer(idWord: string) {
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
        },
      };
      sessionStorage.setItem('statistics', JSON.stringify(newData));
    }
  }
}

export default Statistics;
