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
    return {
      x: parsedCoordinatesMap[polygonId].x,
      y: parsedCoordinatesMap[polygonId].y,
      width: parsedCoordinatesMap[polygonId].width,
      height: parsedCoordinatesMap[polygonId].height,
      fill: "transparent",
      stroke: "red",
      strokeWidth: 2,
      id: linesObject[polygonId].id,
      text: linesObject[polygonId].text,
    };
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
export const TranscriptsProvider = ({ children }) => {
  // 3840 x 2160 Ultra HD (UHD)
  const maxScreenHeight = 2160;

  const [resizeFactor, setResizeFactor] = useState(0);
  const [transcripts, setTranscripts] = useState([]);
  const [imageData, setImageData] = useState({});
  useEffect(() => {
    const getTranscriptsFromAPI = async () => {
      const res = await fetch("/Albatross_vol009of055-050-0.json");
      const data = await res.json();
      const CanvasData = parseToCanvas(data);

      const heightRatio = maxScreenHeight / CanvasData.image.height;
      setResizeFactor(heightRatio < 1 ? heightRatio : 1);
      setImageData(resizeBackgroundImage(CanvasData.image, resizeFactor));
      setTranscripts(resizeRegions(CanvasData.rectangles, resizeFactor));
    };
    getTranscriptsFromAPI();
  }, [resizeFactor]);

  return (
    <TranscriptsContext.Provider
      value={{ transcripts, setTranscripts, imageData, resizeFactor }}
    >
      {children}
    </TranscriptsContext.Provider>
  );
};
