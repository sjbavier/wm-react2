import { FC, useEffect, useState } from 'react';
import { ReferenceNav } from '../../components/reference-nav/ReferenceNav';
import { useReferenceStructure } from '../../hooks/useReferenceStructure';
import { TStructure } from '../../models/models';

export const Reference: FC = () => {
  const { data, loading } = useReferenceStructure();
  const [codified, setcodified] = useState<TStructure>({
    name: '',
    path: '',
    type: 'directory'
  });
  useEffect(() => {
    let mounted = true;
    const convertCodified = async () => {
      const dataObj = await JSON.parse(data?.structure || '');
      console.log(dataObj);
      if (mounted) {
        setcodified(dataObj);
      }
    };
    convertCodified();
    return () => {
      mounted = false;
    };
  }, [data?.structure]);

  return (
    <>
      {loading && <div>loading...</div>}
      {data && codified && <ReferenceNav codified={codified} />}
    </>
  );
};
