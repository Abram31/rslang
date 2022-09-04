import App from '../../components/app';
import { IdataStatistics } from './statistics';

const uploadStatistics = async () => {
  const statistics = await new App().getStatistics()
    .catch(() => {
      const newData: IdataStatistics = {
        learnedWords: 0,
        optional: {
          words: {},
          correctAnswersInGames: {},
        },
      };
      sessionStorage.setItem('statistics', JSON.stringify(newData))
    });

  if (statistics) {
    sessionStorage.setItem('statistics', JSON.stringify(statistics));
  }
};
export default uploadStatistics;
