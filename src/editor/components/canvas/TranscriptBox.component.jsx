import { useEffect, useRef, useState } from "react";
import { Rect, Transformer } from "react-konva";

export const TranscriptBox = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  transcriptId,
  zoomScale,
  stageRef,
}) => {
  const shapeRef = useRef();
  const trRef = useRef();

  const [borderColor, setBorderColor] = useState(shapeProps.stroke);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
      setBorderColor("#8a90ff");
    } else {
      setBorderColor(shapeProps.stroke);
    }
  }, [isSelected, shapeProps.stroke]);

  return (
    <>
      {/* Rect es el dibujo del polígono */}
      <Rect
        onMouseEnter={() => {
          setBorderColor("#8a90ff");
          if (zoomScale === 1) {
            stageRef.current.content.style.cursor = isSelected
              ? "move"
              : "pointer";
          } else {
            stageRef.current.content.style.cursor = isSelected
              ? "move"
              : "pointer";
          }
        }}
        onMouseLeave={() => {
          !isSelected && setBorderColor(shapeProps.stroke);
          if (zoomScale === 1) {
            stageRef.current.content.style.cursor = "default";
          } else {
            stageRef.current.content.style.cursor = "grab";
          }
        }}
        id={transcriptId}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        stroke={borderColor}
        draggable={isSelected}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            rotation: node.getRotation(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};
