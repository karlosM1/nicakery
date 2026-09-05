import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import cookieModelUrl from "@/assets/3d/cookie-crust.glb?url";

const COLORS = {
  gold: 0xa96b35,
  brown: 0x3b2416,
  cream: 0xefe8d8,
  warmHighlight: 0xd4a574,
} as const;

function disposeMaterial(material: THREE.Material): void {
  material.dispose();

  for (const value of Object.values(material)) {
    if (value instanceof THREE.Texture) {
      value.dispose();
    }
  }
}

function disposeObject3D(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    child.geometry?.dispose();

    const { material } = child;
    if (!material) return;

    if (Array.isArray(material)) {
      material.forEach(disposeMaterial);
      return;
    }

    disposeMaterial(material);
  });
}

function enhanceCookieMaterials(root: THREE.Object3D): void {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    child.castShadow = true;
    child.receiveShadow = true;

    const name = child.name.toLowerCase();
    const isChocolate = name.includes("chocolate");
    const isCrumb = name.includes("crumb");

    const material = new THREE.MeshPhysicalMaterial({
      color: isChocolate ? 0x4a2c17 : isCrumb ? 0xc99252 : COLORS.gold,
      roughness: isChocolate ? 0.38 : 0.62,
      metalness: isChocolate ? 0.12 : 0.06,
      clearcoat: isChocolate ? 0.55 : 0.3,
      clearcoatRoughness: 0.35,
      emissive: isChocolate ? 0x2a1408 : COLORS.brown,
      emissiveIntensity: isChocolate ? 0.06 : 0.03,
    });

    if (child.material instanceof THREE.MeshStandardMaterial) {
      const previous = child.material;
      material.map = previous.map;
      material.normalMap = previous.normalMap;
      material.roughnessMap = previous.roughnessMap;
      material.metalnessMap = previous.metalnessMap;
      material.aoMap = previous.aoMap;
      previous.dispose();
    }

    child.material = material;
  });
}

function extractCookiePivot(scene: THREE.Object3D): THREE.Object3D | null {
  const pivot =
    scene.getObjectByName("Cookie_|_scroll_rotation_pivot") ??
    scene.getObjectByName("COOKIE_|_92_mm_organic_baked_dough");

  if (!pivot) return null;

  scene.traverse((child) => {
    if (child.name === "Seamless_studio_surface") {
      child.visible = false;
    }
  });

  scene.remove(pivot);
  return pivot;
}

function fitModelToView(model: THREE.Object3D, targetSize = 1.35): void {
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxAxis = Math.max(size.x, size.y, size.z);
  const scale = maxAxis > 0 ? targetSize / maxAxis : 1;

  model.position.sub(center);
  model.scale.setScalar(scale);
}

interface CookieParallaxSceneProps {
  scrollRootRef: React.RefObject<HTMLElement | null>;
  footerRef: React.RefObject<HTMLElement | null>;
}

export function CookieParallaxScene({ scrollRootRef, footerRef }: CookieParallaxSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scrollRoot = scrollRootRef.current;

    if (!canvas || !scrollRoot) return;

    const reducedMotion = prefersReducedMotion();

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf7f3ea, 8, 22);

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0.15, 2.1, 4.25);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const ambientLight = new THREE.AmbientLight(0xfff4e8, 0.55);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0dc, 1.35);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 24;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    keyLight.shadow.bias = -0.0008;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa96b35, 0.45);
    fillLight.position.set(-5, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(COLORS.warmHighlight, 0.85, 18);
    rimLight.position.set(0, -2, 4);
    scene.add(rimLight);

    const cookieGroup = new THREE.Group();
    scene.add(cookieGroup);

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 14),
      new THREE.ShadowMaterial({ opacity: 0.18 }),
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.85;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    const loader = new GLTFLoader();
    let modelLoaded = false;
    let loadedScene: THREE.Object3D | null = null;
    let animationFrame = 0;
    let gsapContext: gsap.Context | null = null;
    let scrollTrigger: ScrollTrigger | null = null;

    const target = {
      x: 0,
      y: 0,
      z: 0,
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      scale: 1,
    };

    const current = { ...target };

    const lerpFactor = reducedMotion ? 1 : 0.14;

    const applyTransforms = (): void => {
      cookieGroup.position.set(current.x, current.y, current.z);
      cookieGroup.rotation.set(current.rotX, current.rotY, current.rotZ);
      cookieGroup.scale.setScalar(current.scale);
    };

    const render = (): void => {
      animationFrame = requestAnimationFrame(render);

      if (!reducedMotion) {
        current.x += (target.x - current.x) * lerpFactor;
        current.y += (target.y - current.y) * lerpFactor;
        current.z += (target.z - current.z) * lerpFactor;
        current.rotX += (target.rotX - current.rotX) * lerpFactor;
        current.rotY += (target.rotY - current.rotY) * lerpFactor;
        current.rotZ += (target.rotZ - current.rotZ) * lerpFactor;
        current.scale += (target.scale - current.scale) * lerpFactor;
      }

      applyTransforms();
      renderer.render(scene, camera);
    };

    render();

    loader.load(
      cookieModelUrl,
      (gltf) => {
        loadedScene = gltf.scene;
        const model = extractCookiePivot(gltf.scene);

        if (!model) {
          console.error("Cookie pivot not found in GLB");
          return;
        }

        enhanceCookieMaterials(model);
        fitModelToView(model);
        cookieGroup.add(model);
        modelLoaded = true;

        const isNarrow = window.innerWidth < 768;
        const sideX = isNarrow ? 0.62 : 1.05;
        const baseY = isNarrow ? -0.28 : 0;
        const baseZ = isNarrow ? 0.85 : 0.75;

        if (reducedMotion) {
          target.x = sideX;
          target.y = baseY;
          target.z = baseZ;
          target.scale = 0.88;
          target.rotX = 0.42;
          target.rotY = 0.35;
          target.rotZ = 0;
          Object.assign(current, target);
          applyTransforms();
          return;
        }

        gsapContext = gsap.context(() => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: scrollRoot,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.1,
              invalidateOnRefresh: true,
            },
          });

          scrollTrigger = timeline.scrollTrigger ?? null;

          // Rich path: diagonal sweeps, vertical arcs, depth zooms, and tilts.
          // rotX stays below ~1.0 rad so the underside never faces the camera.
          timeline
            .fromTo(
              target,
              {
                x: sideX,
                y: baseY - 0.18,
                z: baseZ,
                rotX: 0.18,
                rotY: 0,
                rotZ: -0.12,
                scale: 0.78,
              },
              {
                x: sideX + 0.12,
                y: baseY + 0.42,
                z: baseZ + 0.22,
                rotX: 0.62,
                rotY: 0.85,
                rotZ: 0.18,
                scale: 0.86,
                ease: "none",
                duration: 0.16,
              },
              0,
            )
            .to(
              target,
              {
                x: sideX * 0.82,
                y: baseY + 0.55,
                z: baseZ + 0.35,
                rotX: 0.88,
                rotY: 1.65,
                rotZ: -0.22,
                scale: 0.92,
                ease: "none",
                duration: 0.14,
              },
              0.16,
            )
            .to(
              target,
              {
                x: -(sideX + 0.08),
                y: baseY + 0.22,
                z: baseZ + 0.18,
                rotX: 0.35,
                rotY: 2.45,
                rotZ: 0.28,
                scale: 0.84,
                ease: "none",
                duration: 0.14,
              },
              0.3,
            )
            .to(
              target,
              {
                x: -(sideX + 0.15),
                y: baseY - 0.35,
                z: baseZ + 0.42,
                rotX: 0.72,
                rotY: 3.35,
                rotZ: -0.3,
                scale: 0.9,
                ease: "none",
                duration: 0.14,
              },
              0.44,
            )
            .to(
              target,
              {
                x: -(sideX * 0.88),
                y: baseY - 0.48,
                z: baseZ + 0.55,
                rotX: 0.95,
                rotY: 4.2,
                rotZ: 0.15,
                scale: 0.96,
                ease: "none",
                duration: 0.12,
              },
              0.58,
            )
            .to(
              target,
              {
                x: sideX + 0.1,
                y: baseY + 0.08,
                z: baseZ + 0.28,
                rotX: 0.28,
                rotY: 5.1,
                rotZ: -0.25,
                scale: 0.82,
                ease: "none",
                duration: 0.14,
              },
              0.7,
            )
            .to(
              target,
              {
                x: sideX,
                y: baseY - 0.12,
                z: baseZ + 0.12,
                rotX: 0.55,
                rotY: 5.85,
                rotZ: 0.1,
                scale: 0.8,
                ease: "none",
                duration: 0.16,
              },
              0.84,
            );

          timeline.progress(timeline.scrollTrigger?.progress ?? 0);
          Object.assign(current, target);
          applyTransforms();
          ScrollTrigger.refresh();
        }, scrollRoot);
      },
      undefined,
      (error) => {
        console.error("Failed to load cookie model:", error);
      },
    );

    const handleResize = (): void => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const footer = footerRef.current;
    const footerOpacityTrigger = footer
      ? ScrollTrigger.create({
          trigger: footer,
          start: "top bottom",
          end: "top 70%",
          scrub: 0.5,
          onUpdate: (self) => {
            const opacity = 1 - self.progress;
            canvas.style.opacity = String(opacity);
            canvas.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
          },
        })
      : null;

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);

      footerOpacityTrigger?.kill();
      canvas.style.opacity = "";
      canvas.style.visibility = "";

      gsapContext?.revert();
      scrollTrigger?.kill();

      if (modelLoaded) {
        disposeObject3D(cookieGroup);
        if (loadedScene) {
          disposeObject3D(loadedScene);
        }
      }

      cookieGroup.clear();
      shadowPlane.geometry.dispose();
      (shadowPlane.material as THREE.Material).dispose();
      scene.clear();
      renderer.dispose();
    };
  }, [scrollRootRef, footerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[8] h-full w-full motion-reduce:opacity-80"
      aria-hidden="true"
    />
  );
}
