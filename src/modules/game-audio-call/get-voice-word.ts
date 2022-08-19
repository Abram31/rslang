import { fetchRequest, IwordsLIst } from '../tutorial/fetch/fetch';
import { IDomNode } from '../tutorial/function-create-dom-node';
import { IdataFromServer } from '../tutorial/get words/render-result-find-to-page';
import { buttonCallVoice } from './markup';

class GetVoiceWord {
  part: string;

  page: string;

  wordsNotUsed: IdataFromServer[];

  listWords: IdataFromServer[];

  constructor(part: string, page: string) {
    this.part = part;
    this.page = page;
    this.wordsNotUsed = [];
    this.listWords = [];
  }

  async getWordsFromServer() {
    const argumentForFetch: IwordsLIst = {
      page: this.part,
      group: this.page,
    };
    await fetchRequest.getNewWordsLIst(argumentForFetch).then((data) => {
      this.listWords = data;
      this.wordsNotUsed = data;
    });
  }

  randomNumberWord() {
    return Math.floor(Math.random() * this.wordsNotUsed.length);
  }

  choiсeNextWord(data: IdataFromServer[]) {
    if (this.wordsNotUsed.length === 0) {
      this.getWordsFromServer();
    }
    const randomNumber = this.randomNumberWord();
    return data[randomNumber];
  }

  async addDataToElement() {
    await this.getWordsFromServer();
    const word = this.choiсeNextWord(this.wordsNotUsed);
    buttonCallVoice.setAttribute('data-voice', word.audio);
  }
}

export const voiceWord = new GetVoiceWord('0', '0');

export const addDataAtributeWithPathVoice = voiceWord.addDataToElement.bind(voiceWord);

addDataAtributeWithPathVoice();
