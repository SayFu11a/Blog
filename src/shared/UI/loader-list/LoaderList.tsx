import { MyLoader } from '../my-loader';

export const LoaderList = () => [1, 2, 3, 4, 5].map((el) => <MyLoader key={el} />);
