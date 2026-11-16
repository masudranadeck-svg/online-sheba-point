'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const skip =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768;
    if (!el || skip) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.position.x = 1.6;
    scene.add(group);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.7, 1),
      new THREE.MeshBasicMaterial({ color: 0x4f8bff, wireframe: true, transparent: true, opacity: 0.85 })
    );
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.1, 0),
      new THREE.MeshBasicMaterial({ color: 0x1fd1a8, wireframe: true, transparent: true, opacity: 0.9 })
    );
    group.add(core, inner);

    const nodes = [];
    for (let i = 0; i < 14; i++) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.08 + Math.random() * 0.07, 12, 12),
        new THREE.MeshBasicMaterial({ color: i % 3 ? 0xffffff : 0x1fd1a8 })
      );
      m.userData = { r: 2.4 + Math.random() * 1.3, s: 0.2 + Math.random() * 0.5, a: Math.random() * 6.28, y: (Math.random() - 0.5) * 3 };
      group.add(m);
      nodes.push(m);
    }

    let mx = 0, my = 0, raf;
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    const tick = () => {
      const t = clock.getElapsedTime();
      core.rotation.y = t * 0.15;
      core.rotation.x = t * 0.08;
      inner.rotation.y = -t * 0.3;
      nodes.forEach((n) => {
        const d = n.userData;
        n.position.set(Math.cos(d.a + t * d.s) * d.r, d.y + Math.sin(t * d.s) * 0.3, Math.sin(d.a + t * d.s) * d.r);
      });
      group.rotation.y += (mx * 0.5 - group.rotation.y) * 0.03;
      group.rotation.x += (my * 0.3 - group.rotation.x) * 0.03;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true" />;
}