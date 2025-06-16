import { useEffect, useRef, useState } from 'react';
import JSConfetti from 'js-confetti';
import styles from './App.module.css';
import { Result } from './Result';
import { computeCurrentSegment, computePointerSegmentIndex } from './utils';

function App() {
  const wheelRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLCanvasElement>(null);
  const segments = [
    'Sherlock Holmes',
    'Hercule Poirot',
    'Miss Marple',
    'Feluda',
    'Byomkesh Bakshi',
    'Philip Marlowe',
  ];

  const colors = [
    '#f8c471',
    '#3498db',
    '#a9dfbf',
    '#5b2c6f',
    '#e74c3c',
    '#f39c12',
  ];

  const jsConfetti = new JSConfetti();
  const ANGLE_PER_SEGMENT = (2 * Math.PI) / segments.length;
  const POINTER_SEGMENT_INDEX = computePointerSegmentIndex(segments);
  const [ currentSegment, setCurrentSegment ] = useState<string>(segments[POINTER_SEGMENT_INDEX]);
  const [ isSpinning, setIsSpinning ] = useState<boolean>(false);
  const [ angle, setAngle ] = useState<number>(0);
  const [ displayText, setDisplayText ] = useState<string>('');

  useEffect(() => {
    setDisplayText(`The winner is ${currentSegment}!`);
  }, [currentSegment]);

  useEffect(() => {
    drawWheel();
    if (!isSpinning) {
      const newCurrentSegment = computeCurrentSegment(angle, segments);
      setCurrentSegment(newCurrentSegment);
    }
  }, [angle]);

  useEffect(() => {
    drawButton();
    const initialSegment = computeCurrentSegment(angle, segments);
    setCurrentSegment(initialSegment);
    setDisplayText('Spin the wheel to find a winner!');
  }, []);

  const drawPointer = () => {
    const wheelCanvas = wheelRef.current;
    if (!wheelCanvas) return;

    const ctx = wheelCanvas.getContext('2d');
    if (!ctx) return;

    const wheelRadius = wheelCanvas.width / 2;
    ctx.beginPath();
    ctx.moveTo(wheelRadius, 10);
    ctx.lineTo(wheelRadius - 20, 40);
    ctx.lineTo(wheelRadius + 20, 40);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();
  };

  const drawWheel = () => {
    const wheelCanvas = wheelRef.current;
    if (!wheelCanvas) return;

    const ctx = wheelCanvas.getContext('2d');
    if (!ctx) return;

    const wheelRadius = wheelCanvas.width / 2;

    for(let i = 0; i < segments.length; i++) {
      const startAngle = angle + i * ANGLE_PER_SEGMENT;
      const endAngle = startAngle + ANGLE_PER_SEGMENT;
      ctx.beginPath();
      ctx.moveTo(wheelRadius, wheelRadius);
      ctx.arc(wheelRadius, wheelRadius, wheelRadius, startAngle, endAngle);
      ctx.fillStyle = colors[i];
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      ctx.save();
      ctx.translate(wheelRadius, wheelRadius);
      ctx.rotate(startAngle + ANGLE_PER_SEGMENT / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.fillText(segments[i], wheelRadius - 10, 0);
      ctx.restore();
    }
    drawPointer();
  };

  const drawButton = () => {
    const buttonCanvas = buttonRef.current;
    const wheelCanvas = wheelRef.current;
    if (!buttonCanvas || !wheelCanvas) return;

    const btnContext = buttonCanvas.getContext('2d');
    if (!btnContext) return;

    const buttonRadius = buttonCanvas.width / 2;

    btnContext.beginPath();
    btnContext.arc(buttonRadius, buttonRadius, buttonRadius, 0, 2 * Math.PI);
    btnContext.closePath();

    btnContext.fillStyle = '#fbf7f6';
    btnContext.fill();
    btnContext.stroke();

    btnContext.save();
    btnContext.textAlign = 'center';
    btnContext.fillStyle = 'black';
    btnContext.textBaseline = 'middle';
    btnContext.font = '20px Arial';
    btnContext.fillText('Try Your Luck!', buttonRadius, buttonRadius);

    btnContext.save();
  };

  const spinWheel = () => {
    let velocity = Math.random() * 10 + 15;
    const deceleration = 0.98;
    setIsSpinning(true);

    const interval = setInterval(() => {
      setAngle((prevAngle) => {
        const newAngle = prevAngle + (velocity * Math.PI) / 180;
        if (velocity > 0.01) {
          velocity *= deceleration;
        } else {
          setIsSpinning(false);
          jsConfetti.addConfetti();
          clearInterval(interval);
        }
        return newAngle;
      });
    }, 25);
  };

  return (
    <>
      <Result displayText={isSpinning ? 'Spinning...' : displayText} />
      <div className={styles.container}>
        <canvas
          ref={wheelRef}
          width={600}
          height={600}
          className={styles.wheelCanvas}
          data-testid='wheelCanvas'
        />
        <canvas
          ref={buttonRef}
          width={150}
          height={150}
          onClick={spinWheel}
          className={styles.buttonCanvas}
          data-testid='buttonCanvas'
        />
      </div>
    </>
  );
}

export default App;
