import Header from './shared/UI/Header';
import ArticleList from './modules/articles/article-list';

function App() {
    return (
        <>
            <Header />
            <section
                style={{
                    backgroundColor: 'rgba(235, 238, 243, 1)',
                    padding: '26px 0px',
                }}
            >
                <ArticleList />
            </section>
        </>
    );
}

export default App;
