varying vec2 vUv;

uniform sampler2D uFromText;
uniform sampler2D uToText;
uniform float uProg;
uniform float UGridCells;
uniform float uTime;
uniform vec2 uMouse;

// --------------------------------------------------
// BOX SDF (aspect corrected)
// --------------------------------------------------
float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

// --------------------------------------------------
// RANDOM + NOISE
// --------------------------------------------------
float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(27.619, 57.583))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  v += noise(p) * 0.5;
  p *= 2.0;
  v += noise(p) * 0.25;
  p *= 2.0;
  v += noise(p) * 0.125;
  return v;
}

// --------------------------------------------------
// MAIN
// --------------------------------------------------
void main() {
  // --------------------------------------------------
  // NOISE TRANSITION
  // --------------------------------------------------
  float n = fbm(vUv * 3.0 + uProg * 0.6);
  float mask = 1.0 - smoothstep(uProg - 0.15, uProg + 0.15, n);

  // --------------------------------------------------
  // GRID FOR GLITCH OFFSET
  // --------------------------------------------------
  float gridSize = UGridCells;
  vec2 cellIndex = floor(vUv * gridSize);
  float cellId = cellIndex.x + cellIndex.y * gridSize;

  // --------------------------------------------------
  // DISTORTION WINDOW (0.4 → 0.8)
  // --------------------------------------------------
  float offsetWindow = smoothstep(0.4, 0.6, uProg) *
    (1.0 - smoothstep(0.7, 0.85, uProg));

  // random direction per cell
  vec2 dir = vec2(hash(cellId * 2.3) - 0.5, hash(cellId * 7.1) - 0.5);
  dir = normalize(dir);

  vec2 glitchOffset = dir * offsetWindow * 0.15;

  float glitchNoise = fbm(vUv * 40.0 + uProg * 5.0 + uTime);
  glitchOffset += (glitchNoise - 0.5) * 0.02;

  vec2 uv = vUv + glitchOffset;

  // --------------------------------------------------
  // CHROMATIC ABERRATION
  // --------------------------------------------------
  float aberrationStrength = 0.003 * offsetWindow;

  vec2 redUV = uv + vec2(aberrationStrength, 0.0);
  vec2 blueUV = uv - vec2(aberrationStrength, 0.0);
  vec2 greenUV = uv;

  vec4 fromR = texture2D(uFromText, redUV);
  vec4 fromG = texture2D(uFromText, greenUV);
  vec4 fromB = texture2D(uFromText, blueUV);

  vec4 toR = texture2D(uToText, redUV);
  vec4 toG = texture2D(uToText, greenUV);
  vec4 toB = texture2D(uToText, blueUV);

  vec4 text1 = vec4(fromR.r, fromG.g, fromB.b, 1.0);
  vec4 text2 = vec4(toR.r, toG.g, toB.b, 1.0);

  vec4 color = mix(text1, text2, mask);

  // --------------------------------------------------
  // FILM GRAIN
  // --------------------------------------------------
  float grain = hash21(vUv * 800.0 + uProg * 10.0);
  color.rgb += (grain - 0.5) * 0.06;

  // --------------------------------------------------
  // SCANLINE GLITCH
  // --------------------------------------------------
  float scan = sin(vUv.y * 900.0 + uProg * 30.0) * 0.04 * offsetWindow;
  color.rgb -= scan;

  // --------------------------------------------------
  // MOUSE BOX (FIXED ASPECT RATIO)
  // --------------------------------------------------
  vec2 p = vUv - uMouse;

  // fix rectangle stretching
  p.x *= (1.0); // if you pass resolution later, multiply by aspect here

  vec2 boxSize = vec2(0.15, 0.15);
  float d = sdBox(p, boxSize);

  float boxMask = smoothstep(0.03, -0.03, d);

  // --------------------------------------------------
  // LUMINANCE MIX INSIDE BOX
  // --------------------------------------------------
  vec3 LUMA = vec3(0.299, 0.587, 0.114);

  float luminance = dot(color.rgb, LUMA);
  vec3 dotColor = vec3(luminance);

  color.rgb = mix(color.rgb, dotColor, boxMask);

  gl_FragColor = color;
}