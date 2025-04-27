
import { Layout } from 'components';
import styles from './App.module.scss';
import { StoreProvider } from 'context';
import { GenerateAudioPage } from 'pages';

function App() { 
  return (
    <div className={styles.App}>
      <Layout>
        <StoreProvider>
          <GenerateAudioPage/>
        </StoreProvider>
      </Layout>
    </div>
  );
}

export default App;
