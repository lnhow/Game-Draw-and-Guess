import React, { useEffect, useRef, useState } from 'react';
import { Paper, Grid, Box, Button, ButtonGroup } from '@material-ui/core';
import {
  CropPortrait, //Used as the eraser icon
  FiberManualRecordRounded, //Used as the line width icon
  Create, //Used as the pen icon
} from '@material-ui/icons';
import { CirclePicker } from 'react-color';

const COLORS = [
  '#000000',
  '#808080',
  '#C0C0C0',
  '#FFFFFF',
  '#FF0000',
  '#CC00AF',
  '#FF4600',
  '#BA00FF',
  '#FF7F00',
  '#7308A5',
  '#FEB300',
  '#0E0EF2',
  '#FFFF00',
  '#00AEAE',
  '#00FF00',
  '#008000',
];
const DEFAULT_COLOR = COLORS[0]; //BLACK
const DEFAULT_CANVAS_COLOR = COLORS[3]; //WHITE
const DEFAULT_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  CANVAS_TOOLBAR_WIDTH: 84,
  SPACING: 8,
};

function Canvas(props) {
  const classes = props.classes;
  const sizeConfig = props.sizeConfig ? props.sizeConfig : DEFAULT_CONFIG;

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState(DEFAULT_COLOR);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = sizeConfig.CANVAS_HEIGHT;
    canvas.width = sizeConfig.CANVAS_WIDTH;
    canvas.style.height = `${sizeConfig.CANVAS_HEIGHT}px`;
    canvas.style.width = `${sizeConfig.CANVAS_WIDTH}px`;

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = DEFAULT_COLOR;
    context.lineWidth = 5;
    contextRef.current = context;
  }, [sizeConfig]);

  useEffect(() => {
    contextRef.current.strokeStyle = strokeColor;
  }, [strokeColor]);

  const handleColorChangeComplete = (color) => {
    setStrokeColor(color.hex);
  };

  const handleLineWidthChange = (width) => {
    contextRef.current.lineWidth = width;
  };

  return (
    <Paper
      elevation={2}
      className={classes.backgroundPaper}
      style={{ height: 600, width: 900, flexDirection: 'row' }}
    >
      <Box display="flex" style={{ height: '100%', flexDirection: 'row' }}>
        <DrawToolBar
          onLineWidthChange={handleLineWidthChange}
          onColorChangeComplete={handleColorChangeComplete}
          onClearCanvas={DrawHelper.handleClearCanvas(contextRef, canvasRef)}
          width={sizeConfig.CANVAS_TOOLBAR_WIDTH}
        />
        <Paper
          elevation={2}
          style={{ height: '100%', width: sizeConfig.CANVAS_WIDTH }}
        >
          <canvas
            onTouchStart={DrawHelper.handleStartDrawing(
              contextRef,
              setIsDrawing,
            )}
            onTouchMove={DrawHelper.handleDraw(contextRef, isDrawing)}
            onTouchEnd={DrawHelper.handleFinishDrawing(
              contextRef,
              setIsDrawing,
            )}
            onMouseDown={DrawHelper.handleStartDrawing(
              contextRef,
              setIsDrawing,
            )}
            onMouseMove={DrawHelper.handleDraw(contextRef, isDrawing)}
            onMouseUp={DrawHelper.handleFinishDrawing(contextRef, setIsDrawing)}
            onMouseOut={DrawHelper.handleFinishDrawing(
              contextRef,
              setIsDrawing,
            )}
            ref={canvasRef}
          />
        </Paper>
      </Box>
    </Paper>
  );
}

function DrawToolBar(props) {
  const lineWidths = [5, 10, 15];
  const onColorChangeComplete = props.onColorChangeComplete;
  const handleSelectEraser = () => {
    onColorChangeComplete({ hex: DEFAULT_CANVAS_COLOR });
  };
  const handleSelectPen = () => {
    onColorChangeComplete({ hex: DEFAULT_COLOR });
  };

  const width = props.width ? props.width : DEFAULT_CONFIG.CANVAS_TOOLBAR_WIDTH;

  const spacing = props.spacing ? props.spacing : DEFAULT_CONFIG.SPACING;

  return (
    <Grid
      container
      direction="column"
      spacing={1}
      style={{ width: width, height: '100%', margin: `${spacing}px` }}
    >
      <Grid item>
        <CirclePicker
          colors={COLORS}
          width={width}
          circleSpacing={spacing}
          onChangeComplete={onColorChangeComplete}
        />
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item>
            <ButtonGroup orientation="vertical">
              <Button onClick={() => props.onLineWidthChange(lineWidths[0])}>
                <FiberManualRecordRounded fontSize="small" />
              </Button>
              <Button onClick={() => props.onLineWidthChange(lineWidths[1])}>
                <FiberManualRecordRounded fontSize="medium" />
              </Button>
              <Button onClick={() => props.onLineWidthChange(lineWidths[2])}>
                <FiberManualRecordRounded fontSize="large" />
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <ButtonGroup
              orientation="vertical"
              size="medium"
              aria-label="vertical outlined button group"
            >
              <Button onClick={handleSelectPen}>
                <Create />
              </Button>
              <Button onClick={handleSelectEraser}>
                <CropPortrait style={{ transform: 'rotate(45deg)' }} />
              </Button>
              <Button onClick={props.onClearCanvas}>Clear</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

class DrawHelper {
  static handleStartDrawing(contextRef, setIsDrawing) {
    return ({ nativeEvent }) => {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    };
  }

  static handleFinishDrawing(contextRef, setIsDrawing) {
    return () => {
      setIsDrawing(false);
      contextRef.current.closePath();
    };
  }

  static handleDraw(contextRef, isDrawing) {
    return ({ nativeEvent }) => {
      if (!isDrawing) {
        return;
      }

      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    };
  }

  static handleClearCanvas(contextRef, canvasRef) {
    return () => {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
    };
  }
}

export default Canvas;
