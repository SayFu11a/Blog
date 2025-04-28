import { FC, ReactNode } from 'react';

import { Flex, Tag, Tooltip } from 'antd';

type MyTagsProps = {
    tags: string[] | [null];
};

const MyTags: FC<MyTagsProps> = ({ tags }) => {
    return (
        <Flex gap="4px 0" wrap>
            {tags?.map<ReactNode>((tag) => {
                if (!tag) {
                    return;
                }

                const isLongTag = tag.length > 20;
                const tagElem = (
                    <Tag key={tag} style={{ userSelect: 'none' }}>
                        <span>{isLongTag ? `${tag.slice(0, 20)}...` : tag}</span>
                    </Tag>
                );
                return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                        {tagElem}
                    </Tooltip>
                ) : (
                    tagElem
                );
            })}
        </Flex>
    );
};

export default MyTags;
