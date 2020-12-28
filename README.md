# HtmlElement3DDisplaySTL
This html custom element is an animated 3D file viewer. The custom element rotate on y permanently and the x's rotation depend of the vertical mouse position.
The element use three.js wich is downlable here:
https://threejs.org/

# Setup
Add the libraries to your html file.
```html
<script src="three.js"></script>
<script src="STLLoader.js"></script>
<script src="objectVisualisator.js"></script>
```
[Download](https://threejs.org/build/three.js) Three.js <br />
[Download](https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrbitControls.js) OrbitControls <br />

# How to use
```html
 <object-viewer style=" background-color: COLOR; width: Xpx; height: Xpx;" opacity="1.0" src="OBJECT.stl"  zoom="70" color="COLOR"/>
```
The <b>size</b> and <b>color background</b> have to be settings in the style attribute. <br>
The <b>opacity</b> is a float between 0.0 and 1.0 <br>
The <b>src</b> is the source of a 3d object of the STL format. <br>
The <b>zoom</b> is an integer relative to the size of the contener. <br>
The <b>color</b> is the color of the object.
