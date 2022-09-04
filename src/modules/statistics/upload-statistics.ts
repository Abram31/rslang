import App from '../../components/app';

const uploadStatistics = async () => {
  const statistics = await new App().getStatistics();

  if (statistics) {
    sessionStorage.setItem('statistics', JSON.stringify(statistics));
  }
};
export default uploadStatistics;