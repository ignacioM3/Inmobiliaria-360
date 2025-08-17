import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import { Suspense, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

type Scene = {
  id: string;
  src: string;
  hotspots?: {
    position: [number, number, number];
    target: string;
    label: string;
  }[];
};

const scenes: Scene[] = [
  {
    id: "cuarto1",
    src: "/panos/cuarto-1.jpg",
    hotspots: [
      { position: [-250, 0, -100], target: "cuarto2", label: "Cuarto" },
    ],
  },
  {
    id: "cuarto2",
    src: "/panos/cuarto-2.jpg",
    hotspots: [{ position: [-60, 10, 80], target: "cuarto1", label: "Volver" }],
  },
];

function Panorama({ src }: { src: string }) {
  const texture = useTexture(src);

  // precargar imágenes
  useTexture.preload("/panos/cuarto-1.jpg");
  useTexture.preload("/panos/cuarto-2.jpg");

  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial
        map={texture}
        side={2} // usar BackSide para ver desde adentro sin invertir controles
      />
    </mesh>
  );
}

function Hotspot({
  position,
  onClick,
  label,
}: {
  position: [number, number, number];
  onClick: () => void;
  label: string;
}) {
  return (
    <group position={position}>
      <Html center>
        <button
          onClick={onClick}
          className="bg-gray-700/80 p-2 rounded-md text-white hover:bg-gray-600/80 transition-colors cursor-pointer w-[130px] flex items-center justify-center gap-2 "
        >
          <FaMapMarkerAlt className="text-red-500" /> Ir a {label}
        </button>
      </Html>
    </group>
  );
}

export default function TourViewer() {
  const [sceneId, setSceneId] = useState("cuarto1");
  const scene = scenes.find((s) => s.id === sceneId)!;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <Suspense fallback={null}>
          <Panorama src={scene.src} />
          {scene.hotspots?.map((h, i) => (
            <Hotspot
              key={i}
              position={h.position}
              label={h.label}
              onClick={() => setSceneId(h.target)}
            />
          ))}
          <OrbitControls enablePan={false} enableZoom={true} />
        </Suspense>
      </Canvas>
    </div>
  );
}
