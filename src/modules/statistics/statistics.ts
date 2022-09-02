import { IdataStatistics } from '../../interface/interface';
import { TfindWordInData, WordDescription } from '../../interface/type';

class Statistics {
  dataStatistics: IdataStatistics;

  constructor(dataStatistics: IdataStatistics = JSON.parse(sessionStorage.getItem('statistics') as string)) {
    this.dataStatistics = dataStatistics;
  }

  findWordInData(idWord:string): TfindWordInData {
    const data = this.dataStatistics;

    let oldUserData: Array<WordDescription>;
    let oldWordData: Array<WordDescription>;
    if (data) {
      let indexWord: number;

      oldUserData = data.optional.words;
      if (oldUserData) {
        // eslint-disable-next-line array-callback-return
        oldWordData = oldUserData.filter((word, index) => {
          if (word.id === idWord) {
            indexWord = index;
            return true;
          }
        });
        if (oldWordData.length === 0) {
          return {
            oldrDataUser: data,
          };
        }
        return {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          index: indexWord!,
          oldDataWord: oldWordData,
          oldrDataUser: data,
        };
      }
    }
    const newData: IdataStatistics = {
      learnedWords: 0,
      optional: {
        words: [{
          id: idWord,
          correctAnswers: 0,
          lastUsedWord: new Date().toLocaleDateString('en-US'),
        },
        ],
      },
    };
    debugger;
    sessionStorage.setItem('statistics', JSON.stringify(newData));
    return {
      index: 0,
      oldDataWord: [{ id: '', correctAnswers: 0 }],
      oldrDataUser: newData,
    };
  }

  wordCorrectAnswer(idWord: string) {
    const { index, oldrDataUser } = this.findWordInData(idWord);
    if (typeof index === 'number' && oldrDataUser) {
      if (oldrDataUser.optional.words[index].correctAnswers < 3) {
        oldrDataUser.optional.words[index].correctAnswers += 1;
      }
    } else {
      const newWord = {
        id: idWord,
        correctAnswers: 1,
        lastUsedWord: new Date().toLocaleDateString('en-US'),
      };
      oldrDataUser.optional.words.push(newWord);
    }
    sessionStorage.setItem('statistics', JSON.stringify(oldrDataUser));
  }

  wordUncorrectAnswer(idWord: string) {
    const { index, oldrDataUser } = this.findWordInData(idWord);
    if (typeof index === 'number' && oldrDataUser) {
      if (oldrDataUser.optional.words[index].correctAnswers > 0) {
        oldrDataUser.optional.words[index].correctAnswers -= 1;
      }
    } else {
      const newWord = {
        id: idWord,
        correctAnswers: 0,
        lastUsedWord: new Date().toLocaleDateString('en-US'),
      };
      oldrDataUser.optional.words.push(newWord);
    }

    sessionStorage.setItem('statistics', JSON.stringify(oldrDataUser));
  }
}

export default Statistics;
