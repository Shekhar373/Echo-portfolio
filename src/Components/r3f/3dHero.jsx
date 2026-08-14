import { useRef, useMemo, useEffect, useState } from "react";
// import { useControls } from "leva";
import { debounce } from "lodash";

// 3D
import * as THREE from "three";
// import { PointLightHelper } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import html2canvas from "html2canvas";

const useDomToCanvas = (domEl) => {
  const [texture, setTexture] = useState();
  useEffect(() => {
    if (!domEl) return;
    const convertDomToCanvas = async () => {
      const canvas = await html2canvas(domEl, { backgroundColor: null });
      setTexture(new THREE.CanvasTexture(canvas));
    };
   
    convertDomToCanvas();

    const debouncedResize = debounce(() => {
      convertDomToCanvas();
    }, 100);

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [domEl]);

  return texture;
};

function Lights() {
  const pointLightRef = useRef();
  return (
    <pointLight
      color="#ffffff"
      intensity={30}
      distance={12}
      decay={1}
      position={[2, 4, 6]}
    />
  );
}

function HeroScene() {
  const state = useThree();
  const { width, height } = state.viewport;
  const [domEl, setDomEl] = useState(null);

  const materialRef = useRef();
  const textureDOM = useDomToCanvas(domEl);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: textureDOM },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [textureDOM],
  );

  const mouseLerped = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const mouse = state.mouse;
    mouseLerped.current.x = THREE.MathUtils.lerp(
      mouseLerped.current.x,
      mouse.x,
      0.1,
    );
    mouseLerped.current.y = THREE.MathUtils.lerp(
      mouseLerped.current.y,
      mouse.y,
      0.1,
    );
    materialRef.current.uniforms.uMouse.value.x = mouseLerped.current.x;
    materialRef.current.uniforms.uMouse.value.y = mouseLerped.current.y;
  });

  return (
    <>
      <Html zIndexRange={[-1, -10]} prepend fullscreen>
        <div
          ref={(el) => setDomEl(el)}
          className="dom-element pb-20"
          style={{
            opacity: textureDOM ? 0 : 1,
          }}
        >
          <p className="h-screen max-md:pt-[60vh] px-5 lg:px-10 flex flex-col text-[20vw] lg:text-[16vw] leading-[16vw] lg:leading-[12vw] font-bold">
            INNOVATE <br />
            DESIGN <br />
            INSPIRE <br />
            REPEAT <br />
          </p>
        </div>
      </Html>
      <mesh>
        <planeGeometry args={[width, height, 312, 312]} />
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshStandardMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          flatShading
          // silent
        />
        <Lights />
      </mesh>
    </>
  );
}

export default HeroScene;
