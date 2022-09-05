import App from '../../../components/app';
import { IdataFromServer } from '../../../interface/interface';
import { listLearnedWords } from '../../game-audio-call/get-voice-word';

const getDifficultStudiedWords = async () => {
  if (localStorage.getItem('id')) {
    const respHard = await new App().getUserAggregateWords('filter={"userWord.difficulty":"hard"}');
    const learnedWordsId = JSON.parse(sessionStorage.getItem('learnedWordsId')!);
    debugger;
    const hardWords: IdataFromServer[] = respHard[0].paginatedResults;
    // if (window.location.hash.split('/').slice(-1)[0] === 'hard-word') {
    //   sessionStorage.setItem('game-audio-call', JSON.stringify(hardWords));
    // } else {
    //   const filteredHardWordsWithoutLearned =
    //   hardWords.filter((word) => !learnedWordsId.includes(word._id));
    sessionStorage.setItem('game-audio-call', JSON.stringify(hardWords));
    // }
    sessionStorage.setItem('difficult-words', JSON.stringify(hardWords));

    const resp = await new App().getUserAggregateWords('filter={"userWord.difficulty":"studied"}');
    const studiedWords: IdataFromServer[] = resp[0].paginatedResults;
    sessionStorage.setItem('studied-words', JSON.stringify(studiedWords));
  }
};

export default getDifficultStudiedWords;
