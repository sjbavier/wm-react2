import { DownOutlined } from '@ant-design/icons';
import Tree, { DataNode, TreeProps } from 'antd/lib/tree';
import { useEffect, useState } from 'react';
import { TStructure } from '../../models/models';
import { IReferenceNavProps } from './models';

export const ReferenceNav = ({ codified }: IReferenceNavProps) => {
  const [nav, setNav] = useState<DataNode[]>([{ key: '' }]);

  useEffect(() => {
    let mounted = true;

    const structure = (codified: TStructure): DataNode[] => {
      const walkNodes = (_children: TStructure[]) => {
        const nodeTree: DataNode[] = [];

        _children.forEach((node) => {
          const _node = createNode(node);
          nodeTree.push(_node);
        });

        return nodeTree;
      };

      const createNode = (node: TStructure): DataNode => {
        let _node: DataNode = { key: '' };
        if (node.type === 'directory' && Array.isArray(node.children)) {
          _node.title = node.name;
          _node.key = node.path;
          _node.children = (() =>
            walkNodes(node.children) as any as DataNode[])();
        } else {
          _node.title = node.name;
          _node.key = node.path;
        }

        return _node;
      };

      if (codified?.children) {
        return walkNodes(codified.children) as any as DataNode[];
      }

      return [{ key: '' }];
    };

    if (mounted) {
      const navStructure = structure(codified);
      setNav(navStructure);
    }

    return () => {
      mounted = false;
    };
  }, [codified]);

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  return (
    <>
      <Tree
        showLine
        switcherIcon={<DownOutlined />}
        onSelect={onSelect}
        treeData={nav}
      />
    </>
  );
};
