varying vec2 vUv;
uniform float uIntensity;

void main(){
    gl_FragColor = vec4(vUv.x,vUv.y,.9, 1.0);
}