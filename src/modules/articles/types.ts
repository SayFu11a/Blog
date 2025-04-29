export type ArticleId = string;
export type ArticlesData = {
    articles: [
        {
            title: string;
            description: string;
            slug: ArticleId;
            favoritesCount: number;
            tagList: string[];
            createdAt: string;
            author: {
                username: string;
                image: string;
                following: boolean;
            };
        }
    ];
    articlesCount: number;
};

export type Article = {
    title: string;
    description: string;
    slug: ArticleId;
    favoritesCount: number;
    tagList: string[];
    createdAt: string;
    author: {
        username: string;
        image: string;
        following: boolean;
    };
};
