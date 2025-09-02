'use client';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { AsciiRenderer, Grid, OrbitControls, Outlines, Svg, Text, useGLTF, useTexture } from '@react-three/drei';

import { Bloom, EffectComposer, Glitch, Outline, Pixelation, Scanline } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';
import { BufferGeometry, Group, MathUtils, Mesh, MeshBasicMaterial, Raycaster, TextureLoader, Vector2, Vector3 } from 'three';
import { useEffect, useRef, useState, type JSX } from 'react';
import { useBreakpoint } from '@/hooks/use-breakpoint';


function Scene({ pointer }: { pointer: React.RefObject<Vector2> }) {
    const { nodes: nodes_hand, materials: materials_hand } = useGLTF('/models/hand_sculpture-v4.glb');
    const { nodes: nodes_pill, materials: materials_pill } = useGLTF('/models/blue_pill.glb');
    const enabled_interest = process.env.ENABLE_INTEREST_FORM == "true";
    const bluePillRef = useRef<Mesh>(null);
    const redPillRef = useRef<Mesh>(null);

    const floatSpeed = 2.0;   // oscillations per second
    const floatHeight = 0.02;  // dis


    const { width, height } = useThree(state => state.viewport);
    let position: [number, number, number] = [-width / 2 - 0.5, height / 2 + 0.5, -1];
    let scaleFactor = 1;
    let close = 0;
    const bp = useBreakpoint();

    if (bp == "lg" || bp == "xl") {

        position = [-width / 2 - 0.5, height / 2 + 0.5, -1];
        scaleFactor = 1;
        close = 0;
    } else {
        position = [0 - 1.2, height / 2 + 0.5, -1];
        scaleFactor = 0.8;
        close = 1;
    }
    const baseZ = -1 - close / 4;
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (bluePillRef.current && redPillRef.current) {
            bluePillRef.current.position.y = baseZ + Math.sin(t * floatSpeed) * floatHeight;
            redPillRef.current.position.y = baseZ + Math.sin(t * floatSpeed + 2) * floatHeight;


        }
    });

    return <group dispose={null}>
        <ambientLight intensity={2} />
        <directionalLight />
        {!enabled_interest && <><mesh geometry={(nodes_hand.hand_low_hand001_0 as Mesh).geometry} material={new MeshBasicMaterial({ color: "#29A80A" })} position={[-2 + close, -2, 0]} rotation={[0.4, -0.2, 0]} scale={1.5 * scaleFactor}>

            <Outlines thickness={2} color="#000000" />
        </mesh>
            <mesh ref={bluePillRef} geometry={(nodes_pill.Cylinder as Mesh).geometry} material={new MeshBasicMaterial({ color: "#045DE7" })} position={[-2 + close, -1, 0.5]} rotation={[1.4, 0.2, 0.5]} scale={0.3 * scaleFactor}>

                <Outlines thickness={2} color="#000000" />
            </mesh>
            <mesh ref={redPillRef} geometry={(nodes_pill.Cylinder as Mesh).geometry} material={new MeshBasicMaterial({ color: "#e61e1e" })} position={[2 - close, -1, 0.5]} rotation={[1.4, -0.2, -0.5]} scale={0.3 * scaleFactor}>

                <Outlines thickness={2} color="#000000" />
            </mesh>
            <mesh geometry={(nodes_hand.hand_low_hand001_0 as Mesh).geometry} material={new MeshBasicMaterial({ color: "#29A80A" })} position={[2 - close, -2, 0]} rotation={[0.4, 0.2, 0]} scale={[-1.5 * scaleFactor, 1.5 * scaleFactor, 1.5 * scaleFactor]}>

                <Outlines thickness={2} color="#000000" />
            </mesh></>}

        <Svg src={"TenetHack.svg"} position={position} scale={0.01} />
    </group >
}
useGLTF.preload("/models/hand_sculpture-v4.glb");
useGLTF.preload("/models/blue_pill.glb");
export default function ThreeCanvas() {
    const pointer = useRef(new Vector2());

    return <div id='canvas-container' className='h-full w-full fixed inset-0 -z-10'  >
        <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} onPointerMove={(e) => {

            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        }}>

            <EffectComposer >

                <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
                <Scanline
                    blendFunction={BlendFunction.OVERLAY} // blend mode
                    density={1.25} // scanline density
                />


            </EffectComposer>
            <Grid cellSize={0.5} sectionSize={0.5} position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]} cellThickness={0.3} cellColor={"#29A80A"} sectionColor={"#29A80A"} args={[20, 10]} />
            {/* <Grid height={6} width={12} cellSize={0.3} position={[0, 0, -2]} color='#29A80A' layers={1} /> */}
            <Scene pointer={pointer} />
        </Canvas>
    </div>
}


