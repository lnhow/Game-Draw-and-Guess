import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Paper, Box } from '@material-ui/core';
import useStyles from './styles';

import AspectRatioBox from '../../../../../../common/aspectRatioBox';
import DrawToolBar from './toolbar';

const DEFAULT_COLOR = '#000000'; //BLACK
const DEFAULT_CANVAS_COLOR = '#FFFFFF'; //WHITE
const DEFAULT_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  CANVAS_TOOLBAR_WIDTH: 84,
  SPACING: 8,
};

function Canvas(props, ref) {
  const classes = useStyles();
  const sizeConfig = props.sizeConfig ? props.sizeConfig : DEFAULT_CONFIG;
  const submitHandler = props.submitHandler;

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const drawable = props.drawable;
  const [strokeColor, setStrokeColor] = useState(DEFAULT_COLOR);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = sizeConfig.CANVAS_HEIGHT;
    canvas.width = sizeConfig.CANVAS_WIDTH;

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = DEFAULT_COLOR;
    context.fillStyle = DEFAULT_CANVAS_COLOR; //To clear canvas
    context.lineWidth = 5;
    contextRef.current = context;
  }, [sizeConfig]);

  useEffect(() => {
    contextRef.current.strokeStyle = strokeColor;
  }, [strokeColor]);

  const onSubmit = () => {
    //When submitting data
    const drawData = canvasRef.current.toDataURL('image/png');
    submitHandler(drawData);
  };

  //Handlers--------------------------------------------------
  //Draw tool handlers
  const handleColorChangeComplete = (color) => {
    setStrokeColor(color.hex);
  };

  const handleLineWidthChange = (width) => {
    contextRef.current.lineWidth = width;
  };

  const handleClearCanvas = () => {
    //Clear canvas, clearRect need more action to make it works
    contextRef.current.fillRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    );
    onSubmit();
  };
  //Draw tool handlers

  //Draw action handlers
  const handleStartDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  const handleFinishDrawing = () => {
    setIsDrawing(false);
    contextRef.current.closePath();
    onSubmit();
  };

  const handleDraw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  //Draw action handlers
  //Handlers--------------------------------------------------

  //Allow parent to call these inner functions
  useImperativeHandle(ref, () => ({
    loadDrawData(data) {
      if (data) {
        let image = new Image();
        image.onload = function () {
          contextRef.current.drawImage(image, 0, 0);
        };
        image.src = data;
      }
    },
  }));

  return (
    <Paper
      elevation={2}
      className={classes.backgroundPaper}
      style={{ flexDirection: 'row' }}
    >
      <Box display="flex" style={{ height: '100%', flexDirection: 'row' }}>
        {drawable ? (
          <DrawToolBar
            onLineWidthChange={handleLineWidthChange}
            onColorChangeComplete={handleColorChangeComplete}
            onClearCanvas={handleClearCanvas}
            width={sizeConfig.CANVAS_TOOLBAR_WIDTH}
          />
        ) : (
          <div></div>
        )}

        <Paper
          elevation={2}
          style={{ height: '100%', width: sizeConfig.CANVAS_WIDTH }}
        >
          <AspectRatioBox ratio={8 / 6}>
            <canvas
              {...(drawable
                ? {
                    onTouchStart: handleStartDrawing,
                    onTouchMove: handleDraw,
                    onTouchEnd: handleFinishDrawing,
                    onMouseDown: handleStartDrawing,
                    onMouseMove: handleDraw,
                    onMouseUp: handleFinishDrawing,
                    onMouseOut: handleFinishDrawing,
                  }
                : null)}
              ref={canvasRef}
            />
          </AspectRatioBox>
        </Paper>
      </Box>
    </Paper>
  );
}

export default forwardRef(Canvas);
