import { FC, useCallback, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import { NeuButton } from '../button/NeuButton';
import {
  RedoOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined
} from '@ant-design/icons';

interface ImgViewerProps {
  imgPath: string;
  description: string;
}
const ImgViewer: FC<ImgViewerProps> = ({ imgPath, description }) => {
  // const file = useMemo(
  //   () => ({ url: imgPath, withCredentials: true }),
  //   [imgPath]
  // );

  const zoomStep = 0.5;
  const maxScale = 5;
  const minScale = 0.5;
  const defaultScale = 1;
  const defaultRotate = 0;

  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);
  const [transform, setTransform] = useState({
    scale: defaultScale,
    rotate: defaultRotate,
    version: 0
  });

  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  // };

  const handleZoomIn = () => {
    const nextZoom = transform.scale + zoomStep;
    setTransform((values) => ({
      ...values,
      scale: nextZoom <= maxScale ? nextZoom : maxScale
    }));
  };
  const handleZoomOut = () => {
    const nextZoom = transform.scale - zoomStep;
    setTransform((values) => ({
      ...values,
      scale: nextZoom >= minScale ? nextZoom : minScale
    }));
  };
  const handleRotateCounter = () => {
    const nextRotate = transform.rotate === 0 ? 270 : transform.rotate - 90;
    setTransform((values) => ({ ...values, rotate: nextRotate }));
  };
  const handleRotateClockwise = () => {
    const nextRotate = transform.rotate === 270 ? 0 : transform.rotate + 90;
    setTransform((values) => ({ ...values, rotate: nextRotate }));
  };
  const handleReset = useCallback(() => {
    setTransform((values) => ({
      ...values,
      scale: defaultScale,
      rotate: defaultRotate,
      version: values.version + 1
    }));
    // setPageNumber(1);
  }, [setTransform, defaultScale]);

  // const handleNextPage = () => {
  //   const nextPage = pageNumber < numPages ? pageNumber + 1 : pageNumber;
  //   setPageNumber(nextPage);
  // };

  // const handlePreviousPage = () => {
  //   const previousPage = pageNumber <= 1 ? 1 : pageNumber - 1;
  //   setPageNumber(previousPage);
  // };

  useEffect(() => {
    handleReset();
  }, [handleReset, imgPath]);
  return (
    <ImgViewerContainer className="flex content-center items-center h-full overflow-hidden">
      <Draggable key={`${transform.version}`}>
        <div style={{ cursor: 'grab' }}>
          <img
            src={imgPath}
            style={{
              maxWidth: '100%',
              maxHeight: 'calc(100vh - 200px)',
              transform: `scale(${transform.scale}) rotate(${transform.rotate}deg)`,
              transition: 'transform .3s'
            }}
            alt={description}
            draggable="false"
          />
        </div>
      </Draggable>
      <div
        className="flex items-center flex-row"
        style={{
          minHeight: '40px',
          position: 'absolute',
          bottom: '1rem',
          left: '0.2rem'
        }}
      >
        <NeuButton
          className="mr-1"
          disabled={transform.scale <= minScale}
          type="primary"
          icon={<ZoomOutOutlined />}
          onClick={handleZoomOut}
        ></NeuButton>
        <NeuButton
          className="mr-8"
          disabled={transform.scale >= maxScale}
          type="primary"
          icon={<ZoomInOutlined />}
          onClick={handleZoomIn}
        ></NeuButton>
        <NeuButton
          className="mr-1"
          type="primary"
          icon={<RotateRightOutlined />}
          onClick={handleRotateCounter}
        ></NeuButton>
        <NeuButton
          className="mr-8"
          type="primary"
          icon={<RotateLeftOutlined />}
          onClick={handleRotateClockwise}
        ></NeuButton>
        <NeuButton
          className="mr-8"
          type="primary"
          icon={<RedoOutlined />}
          onClick={handleReset}
        ></NeuButton>
      </div>
    </ImgViewerContainer>
  );
};

const ImgViewerContainer = styled.div`
  position: relative;
  /* &.image-pdf-viewer > canvas {
    height: auto !important;
    width: auto !important;
    max-height: calc(100vh - 200px);
    max-width: calc(100vw - 270px);
  } */
`;
export default ImgViewer;
