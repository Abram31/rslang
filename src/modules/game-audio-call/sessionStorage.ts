import { IdataFromServer } from '../../interface/interface';

export const addSessionStorage = (title: string, data: IdataFromServer[] | string) => {
  const dataOld = JSON.parse(sessionStorage.getItem(title) as string);
  if (typeof data === 'string') {
    if (sessionStorage.getItem(title)) {
      dataOld.push(data);
      const newData = JSON.stringify(dataOld);
      sessionStorage.setItem(title, newData);
    } else {
      const newData = JSON.stringify([data]);
      sessionStorage.setItem(title, newData);
    }
  } else {
    const JSONData = JSON.stringify(data);
    sessionStorage.setItem(title, JSONData);
  }
};

export const deleteSessionStorage = (title: string) => {
  sessionStorage.removeItem(title);
};

export const getSessinoStorage = (title: string) => {
  if (sessionStorage.getItem(title)) {
    return JSON.parse(sessionStorage.getItem(title) as string);
  }
  return [];
};
