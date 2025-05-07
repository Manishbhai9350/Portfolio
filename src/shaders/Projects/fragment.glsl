
varying vec2 vUv;
uniform sampler2D uFromText;
uniform sampler2D uToText;
uniform float uProg;
uniform float UGridCells;

void main(){
  float gridSize = UGridCells;

  // Determine which cell the current UV belongs to
  vec2 cellIndex = floor(vUv * gridSize);

  // Calculate the local UV within the cell, ranging from 0 to 1
  vec2 cellUV = fract(vUv * gridSize);

  // Sample the textures using the original global UV
  vec4 text1 = texture2D(uFromText, vUv);
  vec4 text2 = texture2D(uToText, vUv);

  // Determine if the cell is even or odd based on its x and y indices
  float cellId = cellIndex.x + cellIndex.y * gridSize;
  bool isEven = mod(cellId, 2.0) < 1.0;

  // Use cellUV.y for per-cell vertical progress
  float progressRef = isEven ? (1.0 - cellUV.y) : cellUV.y;

  // Choose which texture to show based on progress
  vec4 color = mix(text1, text2, 0.5);
  if (uProg < progressRef) {
    color = text1;
  } else {
    color = text2;
  }

  gl_FragColor = color;
}
