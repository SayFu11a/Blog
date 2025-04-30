export type ArticleId = string;
export type ArticlesData = {
    articles: Article[];
    articlesCount: number;
};

export type Article = {
    title: string;
    description: string;
    slug: ArticleId;
    favoritesCount: number;
    tagList: string[];
    createdAt: string;
    body: string | undefined;
    author: {
        username: string;
        image: string;
        following: boolean;
    };
};
