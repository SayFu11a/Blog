import { MyLoader } from '../MyLoader';

const LoaderList = () => [1, 2, 3, 4, 5].map((el) => <MyLoader key={el} />);

export default LoaderList;
