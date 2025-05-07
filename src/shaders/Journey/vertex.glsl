varying vec2 vUv;
uniform float uIntensity;
varying float uPI;

void main(){
    vUv=uv;
    uPI = 3.141592653589793;
    vec3 pos = position;

    pos.z += sin(vUv.y * 3.1415926) * .5 * uIntensity;
    pos.z += sin(vUv.x * 3.1415926) * .5 * uIntensity;


    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
}