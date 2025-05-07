varying vec2 vUv;
uniform float uIntensity;
uniform sampler2D uTexture;

void main(){
    gl_FragColor = texture2D(uTexture,vUv);
}