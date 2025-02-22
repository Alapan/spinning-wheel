import { useEffect, useRef, useState } from 'react';
import styles from './App.module.css';

function App() {
  const wheelRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLCanvasElement>(null);
  const [ angle, setAngle ] = useState<number>(0);

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
    '#5f6a6a',
    '#73c6b6',
  ];

  useEffect(() => {
    drawWheel();
  }, [angle]);

  useEffect(() => {
    drawButton();
  }, []);

  const drawWheel = () => {
    const wheelCanvas = wheelRef.current;
    if(!wheelCanvas) return;

    const ctx = wheelCanvas.getContext('2d');
    if (!ctx) return;

    const wheelRadius = wheelCanvas.width / 2;
    const anglePerSegment = (2 * Math.PI) / segments.length;

    for(let i = 0; i < segments.length; i++) {
      const startAngle = angle + i * anglePerSegment;
      const endAngle = startAngle + anglePerSegment;
      ctx.beginPath();
      ctx.moveTo(wheelRadius, wheelRadius);
      ctx.arc(wheelRadius, wheelRadius, wheelRadius, startAngle, endAngle);
      ctx.fillStyle = colors[i];
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      ctx.save();
      ctx.translate(wheelRadius, wheelRadius);
      ctx.rotate(startAngle + anglePerSegment / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.fillText(segments[i], wheelRadius - 10, 0);
      ctx.restore();
    }
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

    const interval = setInterval(() => {
      setAngle((prevAngle) => {
        const newAngle = prevAngle + velocity;
        if (velocity > 0.1) {
          velocity *= deceleration;
        } else {
          clearInterval(interval);
        }
        return newAngle;
      });
    }, 15);
  };

  return (
    <div className={styles.container}>
      <canvas
        ref={wheelRef}
        width={600}
        height={600}
        className={styles.wheelCanvas}
      />
      <canvas
        ref={buttonRef}
        width={150}
        height={150}
        onClick={spinWheel}
        className={styles.buttonCanvas}
      />
    </div>
  );
}

export default App;
