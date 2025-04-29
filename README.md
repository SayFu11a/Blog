# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
    extends: [
        // Remove ...tseslint.configs.recommended and replace with this
        ...tseslint.configs.recommendedTypeChecked,
        // Alternatively, use this for stricter rules
        ...tseslint.configs.strictTypeChecked,
        // Optionally, add this for stylistic rules
        ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
        // other options...
        parserOptions: {
            project: ['./tsconfig.node.json', './tsconfig.app.json'],
            tsconfigRootDir: import.meta.dirname,
        },
    },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
    plugins: {
        // Add the react-x and react-dom plugins
        'react-x': reactX,
        'react-dom': reactDom,
    },
    rules: {
        // other rules...
        // Enable its recommended typescript rules
        ...reactX.configs['recommended-typescript'].rules,
        ...reactDom.configs.recommended.rules,
    },
});
```

Тип "(res: unknown) =>{
articles: {
title: string;
description: string;
slug: string;
favoritesCount: number;
createdAt: string;
updatedAt: string;
author: {
username: string;
image: string;
following: boolean;
};
tagList?: (string | null)[] | undefined;
}[];
articlesCount: number;
}"

не может быть назначен для типа "

    (baseQueryReturnValue: unknown, meta: FetchBaseQueryMeta | undefined, arg: void) => Articles | Promise<Articles>".

Тип "{ articles: { title: string; description: string; slug: string; favoritesCount: number; createdAt: string; updatedAt: string; author: { username: string; image: string; following: boolean; }; tagList?: (string | null)[] | undefined; }[]; articlesCount: number; }" не может быть назначен для типа "Articles | Promise<Articles>".
Тип "{ articles: { title: string; description: string; slug: string; favoritesCount: number; createdAt: string; updatedAt: string; author: { username: string; image: string; following: boolean; }; tagList?: (string | null)[] | undefined; }[]; articlesCount: number; }" не может быть назначен для типа "Articles".
Типы свойства "articles" несовместимы.
Тип "{ title: string; description: string; slug: string; favoritesCount: number; createdAt: string; updatedAt: string; author: { username: string; image: string; following: boolean; }; tagList?: (string | null)[] | undefined; }[]" не может быть назначен для типа "[{ title: string; description: string; slug: string; favoritesCount: number; tagList: string[]; createdAt: string; author: { username: string; image: string; following: boolean; }; }]".
Целевой объект требует следующего числа элементов — 1, но источник может иметь меньше.ts(2322)
index.d.ts(1645, 5): Ожидаемый тип поступает из свойства "transformResponse", объявленного здесь в типе "Omit<EndpointDefinitionWithQuery<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, Articles, unknown> & CommonEndpointDefinition<...> & { ...; } & { ...; } & QueryExtraOptions<...>, "type"> | Omit<...>"
⚠ Error(TS2322) |
Тип "(res: unknown) => { articles: { title: string; description: string; slug: string; favoritesCount: number; createdAt: string; updatedAt: string; author: { username: string; image: string; following: boolean; }; tagList?: (string | null)[] | undefined; }[]; articlesCount: number; }" не может быть назначен для типа "(baseQueryReturnValue: unknown, meta: FetchBaseQueryMeta | undefined, arg: void) => Articles | Promise".

Тип "{ articles: { title: string; description: string; slug: string; favoritesCount: number; createdAt: string; updatedAt: string; author: { username: string; image: string; following: boolean; }; tagList?: (string | null)[] | undefined; }[]; articlesCount: number; }" не может быть назначен для типа "Articles | Promise".
Тип "{ articles: { title: string; description: string; slug: string; favoritesCount: number; createdAt: string; updatedAt: string; author: { username: string; image: string; following: boolean; }; tagList?: (string | null)[] | undefined; }[]; articlesCount: number; }" не может быть назначен для типа "Articles".
Типы свойства "articles" несовместимы.
Тип "{ title: string; description: string; slug: string; favoritesCount: number; createdAt: string; updatedAt: string; author: { username: string; image: string; following: boolean; }; tagList?: (string | null)[] | undefined; }[]" не может быть назначен для типа "[{ title: string; description: string; slug: string; favoritesCount: number; tagList: string[]; createdAt: string; author: { username: string; image: string; following: boolean; }; }]".
Целевой объект требует следующего числа элементов — 1, но источник может иметь меньше.
(method) transformResponse?(baseQueryReturnValue: unknown, meta: FetchBaseQueryMeta | undefined, arg: void): Articles | Promise<Articles>
A function to manipulate the data returned by a query or mutation.
