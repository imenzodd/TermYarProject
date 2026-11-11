if(typeof THREE==='undefined'){throw new Error('Seer.js: three.js is required. Include the three.js CDN tag before this script, or use the full bundle (seer.min.js).')}
var Seer=(function(e){var t=Object.create,n=Object.defineProperty,r=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,a=Object.getPrototypeOf,o=Object.prototype.hasOwnProperty,s=(e,t,a,s)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var c=i(t),l=0,u=c.length,d;l<u;l++)d=c[l],!o.call(e,d)&&d!==a&&n(e,d,{get:(e=>t[e]).bind(null,d),enumerable:!(s=r(t,d))||s.enumerable});return e};e=((e,r,i)=>(i=e==null?{}:t(a(e)),s(r||!e||!e.__esModule||!o.call(e,`default`)?n(i,`default`,{value:e,enumerable:!0}):i,e)))(e);var c={el:null,mouseControls:!0,touchControls:!0,scale:1,scaleMobile:1,minHeight:200,minWidth:200,backgroundColor:null};function l(e){return typeof e==`string`?document.querySelector(e):e instanceof Element?e:null}function u(t){return t==null?null:t instanceof e.Color?t:new e.Color(t)}var d=class{constructor(t={}){if(this.options={...c,...t},this.el=l(this.options.el),!this.el)throw Error(`Seer.js: "el" is required and must be a selector string or DOM element.`);this.mouse={x:0,y:0,px:0,py:0,active:!1},this.rect=null,this.width=0,this.height=0,this.destroyed=!1,this.listeners=[],this.clock=new e.Clock,this.buildCanvas(),this.buildRenderer(),this.buildCamera(),this.bindEvents(),this.resize(),this.applyOptions(),this.start()}buildCanvas(){let e=document.createElement(`canvas`);e.style.position=`absolute`,e.style.top=`0`,e.style.left=`0`,e.style.width=`100%`,e.style.height=`100%`,e.style.pointerEvents=`none`,e.style.zIndex=`0`,this.canvas=e,this.el.appendChild(e)}buildRenderer(){this.renderer=new e.WebGLRenderer({canvas:this.canvas,antialias:!0,alpha:!0,powerPreference:`high-performance`}),this.renderer.setClearColor(0,0),this.scene=new e.Scene}buildCamera(){this.camera=new e.PerspectiveCamera(60,1,.1,1e4),this.camera.position.set(0,0,500),this.camera.lookAt(0,0,0)}bindEvents(){this.addListener(window,`resize`,this.resize),this.bindControls()}bindControls(){this.options.mouseControls&&this.addListener(window,`pointermove`,this.onPointerMove),this.options.touchControls&&(this.addListener(window,`touchstart`,this.onTouchStart),this.addListener(window,`touchmove`,this.onTouchMove))}addListener(e,t,n){let r=n.bind(this);e.addEventListener(t,r,{passive:!0}),this.listeners.push({target:e,type:t,fn:r})}removeListeners(){for(let e of this.listeners)e.target.removeEventListener(e.type,e.fn);this.listeners=[]}updateRect(){this.rect=this.el.getBoundingClientRect()}onPointerMove(e){this.mouse.active=!0,this.mouse.px=this.mouse.x,this.mouse.py=this.mouse.y,this.mouse.x=(e.clientX-this.rect.left)/this.rect.width,this.mouse.y=(e.clientY-this.rect.top)/this.rect.height}updateTouch(e,t){this.mouse.active=!0,this.mouse.px=this.mouse.x,this.mouse.py=this.mouse.y,this.mouse.x=(e-this.rect.left)/this.rect.width,this.mouse.y=(t-this.rect.top)/this.rect.height}onTouchStart(e){if(e.touches&&e.touches.length){let t=e.touches[0];this.updateTouch(t.clientX,t.clientY)}}onTouchMove(e){if(e.touches&&e.touches.length){let t=e.touches[0];this.updateTouch(t.clientX,t.clientY)}}resize(){this.updateRect();let e=Math.max(this.el.clientWidth||this.rect.width||0,this.options.minWidth),t=Math.max(this.el.clientHeight||this.rect.height||0,this.options.minHeight),n=typeof window.matchMedia==`function`&&window.matchMedia(`(max-width: 640px)`).matches,r=this.options.scale*(n?this.options.scaleMobile:1),i=(window.devicePixelRatio||1)*r;this.renderer.setPixelRatio(i),this.renderer.setSize(e,t,!1),this.width=e,this.height=t,this.camera&&(this.camera.aspect=e/t,this.camera.updateProjectionMatrix()),this.onResize(e,t)}setOptions(e={}){return Object.assign(this.options,e),this.applyOptions(),this}applyOptions(){this.options.backgroundColor==null?this.renderer.setClearColor(0,0):this.renderer.setClearColor(u(this.options.backgroundColor),1);let e={m:!!this.options.mouseControls,t:!!this.options.touchControls};(!this.lastControls||this.lastControls.m!==e.m||this.lastControls.t!==e.t)&&(this.removeListeners(),this.bindEvents(),this.lastControls=e),typeof this.updateOptions==`function`&&this.updateOptions()}start(){let e=()=>{if(this.destroyed)return;let t=Math.min(this.clock.getDelta(),.05);this.onFrame(t,this.clock.elapsedTime),this.render(),this.rafId=requestAnimationFrame(e)};this.rafId=requestAnimationFrame(e)}renderNow(){let e=Math.min(this.clock.getDelta(),.05);this.onFrame(e,this.clock.elapsedTime),this.render()}render(){this.renderer.render(this.scene,this.camera)}destroy(){this.destroyed||(this.destroyed=!0,cancelAnimationFrame(this.rafId),this.removeListeners(),this.disposeScene(),this.renderer.dispose(),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas))}disposeScene(){this.scene.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.dispose()):e.material.dispose())})}onResize(){}onFrame(){}updateOptions(){}},f={color:`#9f7cff`,backgroundColor:null,density:.55,scale:1.1,turbulence:.7,speed:.12,intensity:.75,mouseControls:!1,touchControls:!1},p=`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,m=`
uniform float uTime;
uniform float uAspect;
uniform vec3 uBackground;
uniform float uHasBackground;
uniform float uDensity;
uniform float uScale;
uniform float uTurbulence;
uniform float uSpeed;
uniform float uIntensity;
uniform vec3 uGasColor;
uniform vec3 uFilColor;
uniform vec3 uGlowColor;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  v += 0.50 * valueNoise(p);
  v += 0.28 * valueNoise(p * 2.03 + vec2(7.4, -3.9));
  v += 0.16 * valueNoise(p * 4.05 + vec2(-21.3, 13.7));
  v += 0.06 * valueNoise(p * 8.1 + vec2(53.8, -27.1));
  return v;
}

void main() {
  vec2 p = vUv - 0.5;
  p.x *= uAspect;

  float t = uTime * uSpeed;
  float s = uScale;
  float turb = uTurbulence;

  vec2 q = vec2(
    fbm(p * 1.1 * s + vec2(7.2, -3.1) + t * vec2(0.10, -0.07)),
    fbm(p * 1.1 * s + vec2(-5.3, 9.7) - t * vec2(0.08, 0.09))
  );
  vec2 r = vec2(
    fbm(p * 1.1 * s + 2.1 * turb * q + vec2(0.0, 0.0) + t * vec2(0.13, 0.05)),
    fbm(p * 1.1 * s + 2.1 * turb * q + vec2(31.5, -17.2) - t * vec2(0.10, 0.12))
  );
  float f = fbm(p * 1.15 * s + 1.9 * turb * r + vec2(-73.9, 58.6));

  float density = uDensity;
  float base = 0.52 - 0.34 * density;
  float gasA = smoothstep(base, base + 0.34, f) * uIntensity;
  float filA = smoothstep(base + 0.18, base + 0.42, f) * uIntensity * 0.8;
  float glowA = pow(smoothstep(base + 0.34, base + 0.5, f), 2.0) * uIntensity;
  float streak = pow(clamp(f - base - 0.12, 0.0, 1.0), 1.6);

  vec3 pre = uBackground * uHasBackground;
  float outA = uHasBackground;

  vec3 gasC = mix(uGasColor, uFilColor, 0.5);
  pre = gasC * gasA + pre * (1.0 - gasA);
  outA = gasA + outA * (1.0 - gasA);

  pre = uFilColor * (filA * 0.7 + streak * 0.5) + pre * (1.0 - filA);
  outA = filA + outA * (1.0 - filA);

  pre = uGlowColor * glowA + pre * (1.0 - glowA);
  outA = glowA + outA * (1.0 - glowA);

  vec2 cell = vUv * 620.0;
  vec2 ci = floor(cell);
  float star = step(0.9995, hash(ci));
  float starA = star * (0.3 + 0.3 * sin(uTime * 2.0 + hash(ci) * 40.0));
  vec3 starC = vec3(0.9);
  pre = starC * starA + pre * (1.0 - starA);
  outA = starA + outA * (1.0 - starA);

  vec3 rgb = pre / max(outA, 0.0001);
  rgb = rgb * 1.05 - rgb * rgb * 0.08;
  rgb += (hash(vUv * 1200.0) - 0.5) / 255.0;

  float alpha = mix(outA, 1.0, uHasBackground);
  gl_FragColor = vec4(rgb, alpha);
}
`,h=class extends d{constructor(e={}){super({...f,...e})}onResize(e,t){this.buildPlane(),this.sizePlane(e,t)}buildPlane(){if(this.mesh)return;let t=new e.PlaneGeometry(2,2),n=new e.ShaderMaterial({uniforms:{uTime:{value:0},uAspect:{value:1},uBackground:{value:new e.Color(0,0,0)},uHasBackground:{value:0},uDensity:{value:this.options.density},uScale:{value:this.options.scale},uTurbulence:{value:this.options.turbulence},uSpeed:{value:this.options.speed},uIntensity:{value:this.options.intensity},uGasColor:{value:new e.Color},uFilColor:{value:new e.Color},uGlowColor:{value:new e.Color}},vertexShader:p,fragmentShader:m,depthWrite:!1,depthTest:!1,transparent:this.options.backgroundColor==null}),r=new e.Mesh(t,n);r.frustumCulled=!1,this.scene.add(r),this.geometry=t,this.material=n,this.mesh=r,this.updateOptions()}sizePlane(t,n){let r=e.MathUtils.degToRad(this.camera.fov),i=2*this.camera.position.z*Math.tan(r/2),a=t/n*i;this.mesh.scale.set(a/2,i/2,1),this.material.uniforms.uAspect.value=t/n}onFrame(e,t){this.material.uniforms.uTime.value=t}updateOptions(){let t=u(this.options.color);if(!t)return;let n=this.material.uniforms;this.accent=t;let r={h:0,s:0,l:0};t.getHSL(r);let i=new e.Color().setHSL(r.h,e.MathUtils.clamp(r.s*.55,0,1),e.MathUtils.clamp(r.l*.35,0,1)),a=t,o=new e.Color().setHSL(r.h,e.MathUtils.clamp(r.s*.3,0,1),Math.min(1,r.l+(1-r.l)*.6));n.uGasColor.value.copy(i),n.uFilColor.value.copy(a),n.uGlowColor.value.copy(o);let s=u(this.options.backgroundColor);s?(n.uBackground.value.copy(s),n.uHasBackground.value=1):(n.uBackground.value.set(0,0,0),n.uHasBackground.value=0),n.uDensity.value=e.MathUtils.clamp(this.options.density,.15,.9),n.uScale.value=e.MathUtils.clamp(this.options.scale,.4,3),n.uTurbulence.value=e.MathUtils.clamp(this.options.turbulence,0,1.5),n.uSpeed.value=e.MathUtils.clamp(this.options.speed,.01,.4),n.uIntensity.value=e.MathUtils.clamp(this.options.intensity,.08,1);let c=this.options.backgroundColor==null;this.material.transparent!==c&&(this.material.transparent=c,this.material.needsUpdate=!0)}};return{Nebula(e){return new h(e)}}})(THREE);