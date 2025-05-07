
varying vec2 vUv;
uniform sampler2D uCurrentTexture;
uniform sampler2D uNextTexture;
uniform float uProg;


void main(){
  vec4 color = texture2D(uCurrentTexture,vUv);
  gl_FragColor = color;
}
