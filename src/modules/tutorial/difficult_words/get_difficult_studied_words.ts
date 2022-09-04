import App from '../../../components/app';
import { IdataFromServer } from '../../../interface/interface';

const getDifficultStudiedWords = async () => {
  if (localStorage.getItem('id')) {
    const respHard = await new App().getUserAggregateWords('?filter={"userWord.difficulty":"hard"}');
    const hardWords: IdataFromServer[] = respHard[0].paginatedResults;
    sessionStorage.setItem('difficult-words', JSON.stringify(hardWords));
    sessionStorage.setItem('game-audio-call', JSON.stringify(hardWords));

    const resp = await new App().getUserAggregateWords('?filter={"userWord.difficulty":"studied"}');
    const studiedWords: IdataFromServer[] = resp[0].paginatedResults;
    sessionStorage.setItem('studied-words', JSON.stringify(studiedWords));
  }
};

// const removeDifficultWords = (event: MouseEvent) => {
//   const element = event.target as HTMLElement;
//   const cardOfWord = element.closest('.container-tutorial__wrapper-word') as HTMLElement;
//   cardOfWord.remove();
//   const dataWord: IdataFromServer = {
//     id: String(cardOfWord.id),
//     _id: '',
//     group: 0,
//     page: 0,
//     word: '',
//     image: '',
//     audio: '',
//     audioMeaning: '',
//     audioExample: '',
//     textMeaning: '',
//     textExample: '',
//     transcription: '',
//     wordTranslate: '',
//     textMeaningTranslate: '',
//     textExampleTranslate: '',
//     userWord: {
//       difficulty: '',
//     },
//   };
//   new App().postUserWords(dataWord, 'hard');
// };

export default getDifficultStudiedWords;
