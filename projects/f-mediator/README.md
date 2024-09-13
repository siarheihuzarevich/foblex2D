# Foblex2D

An Angular library for 2D geometric computations, providing classes and utilities for manipulating points, lines, vectors, rectangles, arcs, and transformations. 
Used in [Foblex Flow](https://flow.foblex.com) for 2D geometric operations.

## Overview

The Foblex2D library is designed to simplify 2D geometric operations in TypeScript and Angular applications. It offers a rich set of classes and utility functions for:

- **Geometric Primitives**: Points, Lines, Vectors, Rectangles, Arcs, and Rounded Rectangles.
- **Geometric Calculations**: Distance, angle, intersection detection, and transformations.
- **Transformations**: Handling position, scaling, and rotation transformations.
- **Intersection Detection**: Finding intersections between line segments and various shapes, including rounded rectangles and arcs.

Whether you’re building graphical editors, games, data visualization tools, or any application that requires precise 2D geometric computations, Foblex2D provides the tools you need.

## Installation

Install the library via npm:

```bash
  npm install @foblex/2D
```
## Usage

### Working with Points

Create and manipulate points:

```typescript
import { Point, PointExtensions } from '@foblex/2D';

// Using the Point class
const pointA = new Point(10, 20);
const pointB = new Point(30, 40);

// Using PointExtensions for utility functions
const sumPoint = pointA.add(pointB);
const distance = PointExtensions.distance(pointA, pointB);

console.log(`Sum Point: (${sumPoint.x}, ${sumPoint.y})`);
console.log(`Distance between points: ${distance}`);
```

### Working with Lines

Create and manipulate lines:

```typescript
import { Line, LineExtensions } from '@foblex/2D';

const point1 = new Point(0, 0);
const point2 = new Point(10, 10);

const line = new Line(point1, point2);

// Calculate the length of the line
const length = LineExtensions.hypotenuse(line);

console.log(`Line length: ${length}`);
```

### Vector Operations

Perform vector calculations:

```typescript
import { VectorExtensions } from '@foblex/2D';

const vector1 = VectorExtensions.initialize(1, 0);
const vector2 = VectorExtensions.initialize(0, 1);

// Calculate the angle between two vectors
const angleRadians = VectorExtensions.angle(vector1, vector2);
const angleDegrees = (angleRadians * 180) / Math.PI;

console.log(`Angle between vectors: ${angleDegrees} degrees`);
```

### Working with Rectangles

Create and manipulate rectangles:

```typescript
import { RectExtensions, IRect, Point } from '@foblex/2D';

// Initialize a rectangle
const rect = RectExtensions.initialize(0, 0, 100, 50);

// Check if a point is inside the rectangle
const point = new Point(50, 25);
const isInside = RectExtensions.isIncludePoint(rect, point);

console.log(`Point is inside rectangle: ${isInside}`);
```

### Handling Transformations

Work with transformations:

```typescript
import { ITransformModel, TransformModelExtensions } from '@foblex/2D';

const transform = TransformModelExtensions.default();
transform.position = { x: 100, y: 50 };
transform.scale = 2;

// Get the transformation matrix string
const transformString = TransformModelExtensions.toString(transform);

console.log(`Transform Matrix: ${transformString}`);
```

### Finding Intersections

Detect intersections between lines and shapes:

```typescript
import { IntersectionFinder, RoundedRect, Point } from '@foblex/2D';

const fromPoint = new Point(0, 0);
const toPoint = new Point(150, 150);

const roundedRect = new RoundedRect(50, 50, 100, 100, 20, 20, 20, 20);

const intersections = IntersectionFinder.getIntersections(fromPoint, toPoint, roundedRect);

if (intersections.length > 0) {
  intersections.forEach((point, index) => {
    console.log(`Intersection ${index + 1}: (${point.x}, ${point.y})`);
  });
} else {
  console.log('No intersections found.');
}
```

## License

This project is licensed under the MIT License.

By integrating Foblex2D into your Angular projects, you can simplify complex 2D geometric computations, enhance performance, and focus on building feature-rich applications.
