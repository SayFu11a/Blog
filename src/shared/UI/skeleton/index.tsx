import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader: FC<{ height?: number }> = ({ height = 129 }) => (
    <ContentLoader
        style={{ width: 938, marginBottom: '20px', height: `${height}px` }}
        speed={2}
        width={940}
        height={height}
        viewBox={`0 0 940 129 ${height}`}
        backgroundColor="#dadada"
        foregroundColor="#fafafa"
    >
        <rect x="212" y="248" rx="6" ry="6" width="180" height="16" />
        <rect x="212" y="211" rx="6" ry="6" width="90" height="16" />
        <rect x="327" y="211" rx="6" ry="6" width="90" height="16" />
        <rect x="1" y="1" rx="14" ry="14" width="936" height={height} />
    </ContentLoader>
);

export default MyLoader;
