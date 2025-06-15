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

export const reverseUpToIndex = (arr: string[], index: number): string[] => {
  const slicedArray = arr.slice(0, index + 1);
  const segmentsLeft = arr.slice(index + 1);
  return [...slicedArray.reverse(), ...segmentsLeft];
};

export const computeAngleToNextSegment = (segments) => {
  const pointerSegmentIndex = computePointerSegmentIndex(segments);
  const anglePerSegment = (2 * Math.PI) / segments.length;
  const pointerAngle = 3 * Math.PI / 2;
  return (pointerSegmentIndex + 1) * anglePerSegment - pointerAngle;
};

export const computeCurrentSegment = (angle: number, segments: string[], index: number) => {
  const anglePerSegment = (2 * Math.PI) / segments.length;
  const displacement = angle % (2 * Math.PI);

  const angleToPointer = anglePerSegment - computeAngleToNextSegment(segments);
  const rearrangedSegments = reverseUpToIndex(segments, index);

  if (displacement <= angleToPointer) {
    return segments[index];
  } else if (displacement > angleToPointer && displacement <= (angleToPointer + anglePerSegment)) {
    return rearrangedSegments[1];
  } else if (displacement > (angleToPointer + anglePerSegment) && displacement <= (angleToPointer + 2 * anglePerSegment)) {
    return rearrangedSegments[2];
  } else if (displacement > (angleToPointer + 2 * anglePerSegment) && displacement <= (angleToPointer + 3 * anglePerSegment)) {
    return rearrangedSegments[3];
  } else if (displacement > (angleToPointer + 3 * anglePerSegment) && displacement <= (angleToPointer + 4 * anglePerSegment)) {
    return rearrangedSegments[4];
  } else {
    return rearrangedSegments[0];
  }
};
