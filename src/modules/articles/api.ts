import axios, { AxiosResponse } from 'axios';
import { z } from 'zod';

const baseUrl = 'https://blog-platform.kata.academy/api/articles';

const ArticlesDtoSchema = z.object({
    articles: z.array(
        z.object({
            title: z.string(),
            description: z.string(),
            slug: z.string(),
            favoritesCount: z.number(),
            tagList: z.array(z.nullable(z.string())).optional(),
            createdAt: z.string(),
            updatedAt: z.string(),
            author: z.object({
                username: z.string(),
                image: z.string(),
                following: z.boolean(),
            }),
        })
    ),
    articlesCount: z.number(),
});

export const api = {
    getArticles: async () => {
        const response: AxiosResponse = await axios.get(baseUrl);
        console.log('11', response);

        return ArticlesDtoSchema.parse(response.data);
    },
};
