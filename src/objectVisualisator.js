/*
    NEED:
    OrbitControls
    three.js
    STLoader
    Made by Timoz Dimitri
*/

class Visualisator3D extends HTMLElement {
    constructor(){
        super();
          
    }
    updateZoom (){
        var min = (this.clientHeight > this.clientWidth)? (this.clientWidth) : this.clientHeight;
        this.camera.position.z = (this.zoom*100/min)*10;
    
    }
    init(){
        this.maxAngX = 3.14/5;
        this.maxAngY = 3.14/5;   

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.clientWidth / this.clientHeight, 0.1, 1000)
        this.updateZoom();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.clientWidth, this.clientHeight);
        this.renderer.setClearColor(new THREE.Color(this.style.backgroundColor), 1.0);
        this.renderer.height = this.style.height;
        this.renderer.width = this.style.width;
        this.appendChild(this.renderer.domElement);
        
        window.addEventListener('resize', () => {
            this.renderer.setSize(this.clientWidth, this.clientHeight );
            this.camera.aspect = this.clientWidth / this.clientHeight;
            this.updateZoom();
            this.camera.updateProjectionMatrix();
        });

        this.render = () => {
            requestAnimationFrame(this.render);
            if(!this.mesh)
                return;
            this.mesh.rotation.y += 3.14/600;
            this.renderer.render(this.scene, this.camera);
        }
        var loader = new THREE.STLLoader();
        
        
        loader.load( 'hub.stl',  ( geometry ) => {
            var material = new THREE.MeshBasicMaterial( {
                 color: this.color,
                 transparent: true,
                 opacity: this.opacity

            } );
            this.geometry = geometry;
            this.geometry.normalizeNormals();
            this.mesh = new THREE.Mesh( this.geometry, material );
            this.mesh.rotation.x += 3.14/6;
            this.scene.add( this.mesh );
            
        } );
        
 
        window.addEventListener('mousemove', (mouse)=>{
            mouse.preventDefault();
            if(!this.mesh)
                return;
            var xR = mouse.pageX / window.innerWidth * 2;
            var yR = mouse.pageY / window.innerHeight * 2;
            
            //this.mesh.rotation.y = (xR - 1) * this.maxAngX;
            this.mesh.rotation.x = (yR - 1) * this.maxAngY;
            
            
        });

        this.render();
        
      
    }

    connectedCallback() {
        this.color = this.getAttribute('color') || 0x000000,
        this.zoom = this.getAttribute('zoom') || 20,
        this.opacity = parseFloat(this.getAttribute('opacity')) || 1.0
        this.src = this.getAttribute("src") || undefined
        if(this.src == undefined)
            console.debug("Error: STL source not specified.");
        this.init();
    }
    


}
customElements.define("object-viewer", Visualisator3D);

