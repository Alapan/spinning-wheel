import { useEffect, useRef } from 'react';
import styles from './App.module.css';

function App() {
  const ref = useRef<HTMLCanvasElement>(null);
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
    const canvas = ref.current;
    if(!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const wheelRadius = canvas.width / 2;
    const anglePerSegment = (2 * Math.PI) / segments.length;
    const currentAngle = 0;

    for(let i = 0; i < segments.length; i++) {
      const startAngle = currentAngle + i * anglePerSegment;
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
  }, [])

  return (
    <div className={styles.container}>
      <canvas
        ref={ref}
        width={500}
        height={500}
      />
    </div>
  )
}

export default App
