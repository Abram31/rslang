const changeLanguages = (event: MouseEvent) => {
  const element = event.target as HTMLLIElement;
  const wrapperLangs = document.querySelector('.wrapper-voice-lives-lang__langs') as HTMLUListElement;
  const en = document.querySelector('.langs__en') as HTMLLIElement;
  const ru = document.querySelector('.langs__ru') as HTMLLIElement;

  if (element.classList.contains('langs__ru')) {
    localStorage.setItem('language', 'ru');
    element.classList.add('active');
    en.classList.remove('active');
  } else {
    localStorage.setItem('language', 'en');
    element.classList.add('active');
    ru.classList.remove('active');
  }
};

export default changeLanguages;
