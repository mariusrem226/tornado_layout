varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uOpacity;
        
void main()
{
  vec4 textureColor = texture2D(uTexture, vUv);
  // gl_FragColor = mix(textureColor, vec4(1., 0., 0., 1.),1.);
  
  gl_FragColor = vec4(textureColor.rgb, textureColor.a * 1.);
  
  }