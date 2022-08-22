import { IdataFromServer } from '../tutorial/get words/render-result-find-to-page';

export interface IData {
  id?: string,
}
export const addSessionStorage = (title: string, data: IdataFromServer[]) => {
  const JSONData = JSON.stringify(data);
  sessionStorage.setItem(title, JSONData);
};

export const deleteSessionStorage = (title: string, data: IdataFromServer[]) => {
  const newDataStringify = JSON.stringify(data);
  sessionStorage.setItem(title, newDataStringify);
};

export const getSessinoStorage = (title: string) => {
  if (sessionStorage.getItem(title)) {
    return JSON.parse(sessionStorage.getItem(title)!);
  }
  return [];
};
