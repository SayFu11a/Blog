import { useEffect, useState, FC } from 'react';
import ArticlePage from './ArticlePage';
import axios, { AxiosResponse } from 'axios';
import { api } from './api';
import { articlesApi } from './api2';

const url = 'https://blog-platform.kata.academy/api/articles';

const ArticleList: FC = () => {
    // const [articls, setArticls] = useState({});

    const { data: articls, isLoading } = articlesApi.useGetArticleQuery();

    // useEffect(() => {
    //     api.getArticles().then((res) => {
    //         console.log(res);

    //         setArticls(res);
    //     });

    //     // async function fetchData() {
    //     //     const response: AxiosResponse = await axios.get(url);
    //     //     console.log(response);
    //     //     setArticls(response.data);
    //     // }

    //     // fetchData();
    // }, []);

    return <ArticlePage articls={articls} />;
};

export default ArticleList;
