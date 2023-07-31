import * as THREE from 'three';

export function simplifyCurve(points: THREE.Vector2[], tolerance: number): THREE.Vector2[] {
  const simplifiedPoints: THREE.Vector2[] = [];

  // Add the first and last points
  simplifiedPoints.push(points[0]);
  simplifyRecursive(points, 0, points.length - 1, tolerance, simplifiedPoints);
  simplifiedPoints.push(points[points.length - 1]);

  return simplifiedPoints;
  return smoothCurve(simplifiedPoints,3);
}

function simplifyRecursive(points: THREE.Vector2[], startIndex: number, endIndex: number, tolerance: number, simplifiedPoints: THREE.Vector2[]) {
  let maxDistance = 0;
  let maxIndex = 0;

  // Find the point with the maximum distance from the line segment
  for (let i = startIndex + 1; i < endIndex; i++) {
    const distance = perpendicularDistance(points[i], points[startIndex], points[endIndex]);
    if (distance > maxDistance) {
      maxDistance = distance;
      maxIndex = i;
    }
  }

  // If the maximum distance is greater than the tolerance, recursively simplify the curve
  if (maxDistance > tolerance) {
    simplifyRecursive(points, startIndex, maxIndex, tolerance, simplifiedPoints);
    simplifyRecursive(points, maxIndex, endIndex, tolerance, simplifiedPoints);
  } else {
    // Otherwise, add the end point of the segment to the simplified curve
    simplifiedPoints.push(points[endIndex]);
  }
}

function perpendicularDistance(point: THREE.Vector2, lineStart: THREE.Vector2, lineEnd: THREE.Vector2): number {
  const { x: x1, y: y1 } = lineStart;
  const { x: x2, y: y2 } = lineEnd;
  const { x: x, y: y } = point;

  const A = x - x1;
  const B = y - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  const param = lenSq !== 0 ? dot / lenSq : -1;

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = x - xx;
  const dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}


function smoothCurveWithB(points: THREE.Vector2[]): THREE.Vector2[] {
  const smoothedPoints: THREE.Vector2[] = [];

  // Add the first point
  smoothedPoints.push(points[0]);

  // Iterate through each point in the original curve
  for (let i = 1; i < points.length - 2; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2];

    // Calculate control points based on neighboring points
    const controlPoint1 = new THREE.Vector2();
    controlPoint1.x = (p0.x + p1.x) / 2;
    controlPoint1.y = (p0.y + p1.y) / 2;

    const controlPoint2 = new THREE.Vector2();
    controlPoint2.x = (p1.x + p2.x) / 2;
    controlPoint2.y = (p1.y + p2.y) / 2;

    // Generate Bézier curve points
    for (let t = 0; t <= 1; t += 0.1) {
      const v = new THREE.Vector2();

      const t2 = t * t;
      const t3 = t * t2;

      v.x = (1 - t) * (1 - t) * (1 - t) * p1.x +
        3 * (1 - t) * (1 - t) * t * controlPoint1.x +
        3 * (1 - t) * t2 * controlPoint2.x +
        t3 * p2.x;

      v.y = (1 - t) * (1 - t) * (1 - t) * p1.y +
        3 * (1 - t) * (1 - t) * t * controlPoint1.y +
        3 * (1 - t) * t2 * controlPoint2.y +
        t3 * p2.y;

      smoothedPoints.push(v);
    }
  }

  // Add the last point
  smoothedPoints.push(points[points.length - 1]);

  return smoothedPoints;
}



function smoothCurve(points: THREE.Vector2[], subdivision: number): THREE.Vector2[] {
  const smoothedPoints: THREE.Vector2[] = [];

  // Iterate through each point in the original curve
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    // Calculate parameterized t
    for (let t = 0; t <= 1; t += 1 / subdivision) {
      const v = new THREE.Vector2();

      const t2 = t * t;
      const t3 = t * t2;

      // Apply Catmull-Rom spline formula
      v.x = 0.5 * ((2 * p1.x) +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);

      v.y = 0.5 * ((2 * p1.y) +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);

      smoothedPoints.push(v);
    }
  }

  // Add the last point
  smoothedPoints.push(points[points.length - 1]);

  return smoothedPoints;
}
