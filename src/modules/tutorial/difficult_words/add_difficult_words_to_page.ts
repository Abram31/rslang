import App from "../../../components/app";
import {createDomNode} from "../../tutorial/function-create-dom-node";
import { createWordContainer } from "../create-word-container";
import { body } from "../get words/render-result-find-to-page";
import getDifficultStudiedWords, { IdataAboutWordDificulty } from "./get_difficult_studied_words"
import './difficult_words.scss'
import preload from "../../game-audio-call/preload";

const addDifficultWordsToPage = () => {
    const prel =  preload();
    body.append(prel)
getDifficultStudiedWords();
    const difficultWords:IdataAboutWordDificulty[] = JSON.parse(sessionStorage.getItem('difficult-words')!);

    const descriptionWrapperWords = {
        typeElement: 'div',
        className: 'wrapper-difficult-words',
        parentElement: body,
    };
    const wrapperWord = createDomNode(descriptionWrapperWords)
    difficultWords.forEach(async (item, index)=>{
        const word = await new App().getUserOneWord(item.wordId);
        wrapperWord.append(createWordContainer(word));
        
        if (difficultWords.length - 1 === index){
            prel.remove()
        }
        
    })
}

export default addDifficultWordsToPage;