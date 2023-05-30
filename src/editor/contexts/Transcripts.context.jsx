import { createContext, useState, useEffect } from "react";

const parseToCanvas = (rawData) => {
  const fileName = rawData.image.name.split(".")[0];
  const linesObject = rawData.text_regions[`textregion_${fileName}`].text_lines;
  const polygonIdMap = Object.keys(linesObject).map(
    (keyId) => linesObject[keyId].id
  );

  const parsedCoordinatesMap = {};
  for (const polygonId of polygonIdMap) {
    parsedCoordinatesMap[polygonId] = {
      x: linesObject[polygonId].contour.exterior[0].x,
      y: linesObject[polygonId].contour.exterior[0].y,
      width:
        linesObject[polygonId].contour.exterior[1].x -
        linesObject[polygonId].contour.exterior[0].x,
      height:
        linesObject[polygonId].contour.exterior[2].y -
        linesObject[polygonId].contour.exterior[1].y,
    };
  }

  const parsedRectangles = polygonIdMap.map((polygonId) => {
    const savedTranscript = localStorage.getItem(polygonId);
    if (savedTranscript) {
      const { x, y, width, height, text, rotation } =
        JSON.parse(savedTranscript);
      return {
        x,
        y,
        width,
        height,
        rotation,
        text,
        fill: "transparent",
        stroke: "red",
        strokeWidth: 1,
        id: linesObject[polygonId].id,
      };
    } else {
      return {
        x: parsedCoordinatesMap[polygonId].x,
        y: parsedCoordinatesMap[polygonId].y,
        width: parsedCoordinatesMap[polygonId].width,
        height: parsedCoordinatesMap[polygonId].height,
        rotation: 0,
        text: linesObject[polygonId].text,
        fill: "transparent",
        stroke: "red",
        strokeWidth: 1,
        id: linesObject[polygonId].id,
      };
    }
  });

  return { image: { ...rawData.image }, rectangles: parsedRectangles };
};
const resizeBackgroundImage = (image, d) => ({
  ...image,
  width: d * image.width,
  height: d * image.height,
});
const resizeRegions = (regions, d) =>
  regions.map((region) => ({
    ...region,
    width: d * region.width,
    height: d * region.height,
    x: d * region.x,
    y: d * region.y,
  }));
//store (context)
export const TranscriptsContext = createContext({});
//provider (component)
export const TranscriptsProvider = ({ children, fileId }) => {
  //***************************************************************************** */
  //The user must be able to change this scale factor clicking on a "scale" button
  const [viewFinderScale, setViewFinderScale] = useState(0);
  const userScaleFactor = 1;

  //For now we just hardcode it
  //***************************************************************************** */

  const [transcripts, setTranscripts] = useState([]);
  const [cachedTranscripts, setCachedTranscripts] = useState([]);
  const [imageData, setImageData] = useState({});
  const [selectedTranscriptId, setSelectedTranscriptId] = useState(null);
  const [isFirstSelection, setIsFirstSelection] = useState(true);

  useEffect(() => {
    const getTranscriptsFromAPI = async () => {
      const res = await fetch(`/${fileId}.json`);
      const data = await res.json();
      const CanvasData = parseToCanvas(data);

      //this get calls once, we should add a resize hook
      //this works for desktop w>768 (because further than that distorts the image),
      // for mobile we should try a different approach,
      // set viewFinder to 1, see viewFinder component comments

      const initialViewFinderScale =
        (Math.max(768, window.innerWidth) / CanvasData.image.width) *
        userScaleFactor;
      setViewFinderScale(
        initialViewFinderScale < 1 ? initialViewFinderScale : 1
      );
      // setViewFinderScale(1);

      const resizedRectangles = resizeRegions(
        CanvasData.rectangles,
        viewFinderScale
      );
      setImageData(resizeBackgroundImage(CanvasData.image, viewFinderScale));
      setTranscripts(resizedRectangles);
      setCachedTranscripts(resizedRectangles);
    };
    getTranscriptsFromAPI();
  }, [viewFinderScale, fileId]);

  return (
    <TranscriptsContext.Provider
      value={{
        transcripts,
        setTranscripts,
        cachedTranscripts,
        setCachedTranscripts,
        imageData,
        viewFinderScale,
        selectedTranscriptId,
        setSelectedTranscriptId,
        isFirstSelection,
        setIsFirstSelection,
      }}
    >
      {children}
    </TranscriptsContext.Provider>
  );
};
