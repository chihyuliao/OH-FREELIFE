"use client";
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function DolphinAnimationPage() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0077be);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 15);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Water surface with waves
    const waterGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    const waterMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a66ff,
      roughness: 0.8,
      metalness: 0.2,
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -2;
    water.receiveShadow = true;
    scene.add(water);

    // Create simple dolphin geometry (placeholder - should be replaced with actual model)
    const createDolphin = () => {
      const bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
      bodyGeometry.scale(2, 0.6, 0.4);
      
      const tailGeometry = new THREE.ConeGeometry(0.3, 1.5, 32);
      tailGeometry.rotateX(Math.PI / 2);
      tailGeometry.translate(-2, 0, 0);
      
      const finGeometry = new THREE.ConeGeometry(0.5, 1.2, 32);
      finGeometry.rotateZ(Math.PI / 2);
      finGeometry.translate(0.8, 0, 0.5);
      
      const body = new THREE.Mesh(
        bodyGeometry,
        new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
      );
      
      const tail = new THREE.Mesh(
        tailGeometry,
        new THREE.MeshStandardMaterial({ color: 0x999999 })
      );
      
      const fin = new THREE.Mesh(
        finGeometry,
        new THREE.MeshStandardMaterial({ color: 0x999999 })
      );
      
      const dolphin = new THREE.Group();
      dolphin.add(body);
      dolphin.add(tail);
      dolphin.add(fin);
      
      return dolphin;
    };

    // Create placeholder dolphin (replace with GLTFLoader for actual model)
    const dolphin = createDolphin();
    dolphin.position.set(-20, -2, 0);
    dolphin.rotation.y = Math.PI / 2;
    dolphin.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
    scene.add(dolphin);

    // Animation variables
    let jumpHeight = 0;
    let jumpPhase = 0;
    let speed = 0.1;
    let positionX = -20;
    let waveTime = 0;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update dolphin position and rotation
      positionX += speed;
      if (positionX > 20) positionX = -20;
      
      // Jumping motion (sin wave)
      jumpPhase += 0.1;
      jumpHeight = Math.sin(jumpPhase) * 2;
      
      dolphin.position.x = positionX;
      dolphin.position.y = jumpHeight > 0 ? jumpHeight - 2 : -2;
      
      // Rotate based on jump direction
      const rotationY = jumpHeight > 0 ? Math.PI/2 - jumpHeight*0.3 : Math.PI/2 + -jumpHeight*0.1;
      dolphin.rotation.y = rotationY;
      
      // Animate tail flapping
      dolphin.children[1].rotation.x = Math.sin(jumpPhase * 3) * 0.5;
      
      // Animate waves
      waveTime += 0.01;
      const water = scene.getObjectByName('water');
      if (water instanceof THREE.Mesh) {
        const positionAttribute = water.geometry.attributes.position;
        for (let i = 0; i < positionAttribute.count; i++) {
          const x = positionAttribute.getX(i);
          const z = positionAttribute.getZ(i);
          positionAttribute.setY(
            i, 
            Math.sin(x * 0.2 + waveTime) * 0.5 + Math.cos(z * 0.2 + waveTime) * 0.3 - 2
          );
        }
        positionAttribute.needsUpdate = true;
      }
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute top-4 left-0 right-0 text-center text-white z-10">
        <h1 className="text-4xl font-bold mb-2">Dolphin Jump Animation</h1>
        <p className="text-xl">3D Dolphin Jumping from Left to Right</p>
      </div>
    </div>
  );
}


