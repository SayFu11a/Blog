import { articlesApi } from '../../../entities/articles/api/articlesApi';
import { useAuth } from '../../../entities/user/model/hooks/use-auth';

export function useArticleItem(slug: string | undefined) {
  const [likeArticle] = articlesApi.useLikeArticleMutation();
  const [unLikeArticle] = articlesApi.useUnLikeArticleMutation();

  const { isAuth } = useAuth();

  const likeHandle: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation();

    if (isAuth) {
      likeArticle(slug);
    }
  };
  const unLikeHandle: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation();
    if (isAuth) {
      unLikeArticle(slug);
    }
  };

  return {
    likeHandle,
    unLikeHandle,
  };
}
