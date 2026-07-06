"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { skillsData, skillConnections, SkillNode } from "@/data/skills";

// Individual Node component
function NodeItem({
  node,
  isSelected,
  onClick,
  onHover,
}: {
  node: SkillNode;
  isSelected: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Animate floating motion
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = node.y + Math.sin(clock.getElapsedTime() + node.x) * 0.15;
    }
  });

  // Calculate size based on skill level
  const size = useMemo(() => 0.15 + (node.level / 10) * 0.12, [node.level]);

  // Color mapping based on category
  const color = useMemo(() => {
    switch (node.category) {
      case "frontend":
        return "#06b6d4"; // Cyan
      case "backend":
        return "#7c3af5"; // Purple
      case "systems":
        return "#10b981"; // Emerald
      case "creative":
        return "#f59e0b"; // Amber
      default:
        return "#a1a1aa";
    }
  }, [node.category]);

  return (
    <group position={[node.x, node.y, node.z]}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          setHovered(false);
          onHover(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered || isSelected ? 1.5 : 0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Floating text labels */}
      <Text
        position={[0, size + 0.2, 0]}
        fontSize={0.16}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
      >
        {node.name}
      </Text>
    </group>
  );
}

// Connections component
function LinkItem({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const lineObj = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      opacity: 0.12,
      transparent: true,
    });
    return new THREE.Line(geometry, material);
  }, [start, end]);

  return <primitive object={lineObj} />;
}

// Core scene component containing auto-rotation
function SkillScene({
  selectedNodeId,
  onNodeClick,
  onNodeHover,
}: {
  selectedNodeId: string | null;
  onNodeClick: (node: SkillNode) => void;
  onNodeHover: (node: SkillNode | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Slow rotation when no node is specifically focused
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  // Calculate links
  const links = useMemo(() => {
    return skillConnections
      .map((conn) => {
        const startNode = skillsData.find((n) => n.id === conn.source);
        const endNode = skillsData.find((n) => n.id === conn.target);
        if (startNode && endNode) {
          return {
            id: `${conn.source}-${conn.target}`,
            start: [startNode.x, startNode.y, startNode.z] as [number, number, number],
            end: [endNode.x, endNode.y, endNode.z] as [number, number, number],
          };
        }
        return null;
      })
      .filter((l) => l !== null);
  }, []);

  return (
    <group ref={groupRef}>
      {/* Draw Nodes */}
      {skillsData.map((node) => (
        <NodeItem
          key={node.id}
          node={node}
          isSelected={selectedNodeId === node.id}
          onClick={() => onNodeClick(node)}
          onHover={(hovered) => onNodeHover(hovered ? node : null)}
        />
      ))}

      {/* Draw Connections */}
      {links.map((link) => (
        <LinkItem key={link!.id} start={link!.start} end={link!.end} />
      ))}
    </group>
  );
}

// Primary Export Wrapper
export function SkillGraph() {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);

  const displayNode = hoveredNode || selectedNode;

  return (
    <div className="relative w-full h-[500px] glass-panel rounded-2xl overflow-hidden glass-panel-glow">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <SkillScene
          selectedNodeId={selectedNode?.id || null}
          onNodeClick={setSelectedNode}
          onNodeHover={setHoveredNode}
        />
        <OrbitControls enableZoom={true} maxDistance={8} minDistance={3} enablePan={false} />
      </Canvas>

      {/* Interactive Overlay displaying node specifications */}
      <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-sm glass-panel p-4 rounded-xl border border-white/10 pointer-events-none select-none z-20">
        {displayNode ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-bold tracking-tight text-white">{displayNode.name}</h4>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider text-black"
                style={{
                  backgroundColor:
                    displayNode.category === "frontend"
                      ? "#06b6d4"
                      : displayNode.category === "backend"
                      ? "#7c3af5"
                      : displayNode.category === "systems"
                      ? "#10b981"
                      : "#f59e0b",
                }}
              >
                {displayNode.category}
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Proficiency Level: <span className="text-white font-bold">{displayNode.level}/10</span>
            </p>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
              {displayNode.category === "frontend" && "Responsive frameworks and micro-animation systems."}
              {displayNode.category === "backend" && "Distributed storage pipelines, gRPC protocols, and databases."}
              {displayNode.category === "systems" && "CI/CD automation pipelines, cluster management, and orchestration."}
              {displayNode.category === "creative" && "3D scene composition, shader calculations, and animations."}
            </p>
          </div>
        ) : (
          <div>
            <h4 className="text-sm font-semibold tracking-tight text-zinc-200">Interactive Tech Mesh</h4>
            <p className="text-xs text-zinc-500 mt-1">
              Drag to rotate the 3D cluster. Hover or click nodes to isolate individual technological nodes and view details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
