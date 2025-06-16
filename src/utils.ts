export const computePointerSegmentIndex = (segments) => {
  const anglePerSegment = (2 * Math.PI) / segments.length;
  const pointerAngle = 3 * Math.PI / 2;
  for (let i = 0; i < segments.length; i++) {
    const startAngle = i * anglePerSegment;
    const endAngle = startAngle + anglePerSegment;
    if (pointerAngle >= startAngle && pointerAngle < endAngle) {
      return i;
    }
  }
};

export const computeCurrentSegment = (angle: number, segments: string[]) => {
  const anglePerSegment = (2 * Math.PI) / segments.length;
  // ((270 - angle) + 360) % 360
  const adjustedAngle = (3 * Math.PI / 2 - angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  const index = Math.floor(adjustedAngle / anglePerSegment) % segments.length;
  return segments[index];
};
