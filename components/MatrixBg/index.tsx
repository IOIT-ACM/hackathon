'use client';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { AsciiRenderer, Grid, Html, OrbitControls, Outlines, Svg, Text, useGLTF, useTexture } from '@react-three/drei';

import { Bloom, EffectComposer, Glitch, Outline, Pixelation, Scanline } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';
import { BufferGeometry, Group, MathUtils, Mesh, MeshBasicMaterial, Raycaster, TextureLoader, Vector2, Vector3 } from 'three';
import { useEffect, useRef, useState, type JSX } from 'react';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import Footer from '../footer';
import { cn } from '@/lib/utils';
import { VT323 } from 'next/font/google';

const vt323 = VT323({
    weight: '400',
    subsets: ['latin']
})
function Scene() {
    const { nodes: nodes_hand, materials: materials_hand } = useGLTF('/models/hand_sculpture-v4.glb');
    const { nodes: nodes_pill, materials: materials_pill } = useGLTF('/models/blue_pill.glb');
    const enabled_interest = process.env.ENABLE_INTEREST_FORM == "true";
    const bluePillRef = useRef<Mesh>(null);
    const redPillRef = useRef<Mesh>(null);
    const leftHandRef = useRef<Mesh>(null);
    const rightHandRef = useRef<Mesh>(null);
    const { pointer } = useThree();

    const floatSpeed = 2.0;   // oscillations per second
    const floatHeight = 0.02;  // dis


    const { width, height } = useThree(state => state.viewport);
    let position: [number, number, number];
    let scaleFactor = 1;
    let close = 0;
    const bp = useBreakpoint();

    if (bp == "lg" || bp == "xl") {
        position = [width / 2 - 3.5, height / 2 + 0.5, -1];
        scaleFactor = 1;
        close = 0;
    } else {
        position = [width / 2 - 2.5, height / 2 + 0.5, -1];
        scaleFactor = 0.8;
        close = 1;
    }
    let baseZB = -1 - close / 4;
    let baseZR = -1 - close / 4;

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (bluePillRef.current && redPillRef.current) {
            bluePillRef.current.position.y = baseZB + Math.sin(t * floatSpeed) * floatHeight;
            redPillRef.current.position.y = baseZR + Math.sin(t * floatSpeed + 2) * floatHeight;

            const lerpFactor = 0.1;
            if (leftHandRef.current && rightHandRef.current) {
                // Left hand targets
                const leftTargetY = pointer.x < 0 ? -1.5 + close : -2;
                const leftTargetX = -2 + close;
                leftHandRef.current.position.x += (leftTargetX - leftHandRef.current.position.x) * lerpFactor;
                leftHandRef.current.position.y += (leftTargetY - leftHandRef.current.position.y) * lerpFactor;

                // Right hand targets (symmetrical/mirrored logic)
                const rightTargetY = pointer.x > 0 ? -1.5 + close : -2;
                const rightTargetX = 2 - close;
                rightHandRef.current.position.x += (rightTargetX - rightHandRef.current.position.x) * lerpFactor;
                rightHandRef.current.position.y += (rightTargetY - rightHandRef.current.position.y) * lerpFactor;

                // Left pill (baseZB)
                const targetBaseZB = pointer.x < 0 ? -1 - close / 4 + 1 : -1 - close / 4;
                baseZB += (targetBaseZB - baseZB) * lerpFactor;

                // Right pill (baseZR) - mirrored for x > 0
                const targetBaseZR = pointer.x > 0 ? -1 - close / 4 + 1 : -1 - close / 4;
                baseZR += (targetBaseZR - baseZR) * lerpFactor;
            }
        }
    });

    return <group dispose={null}>
        <ambientLight intensity={2} />
        <directionalLight />
        {!enabled_interest && <><mesh geometry={(nodes_hand.hand_low_hand001_0 as Mesh).geometry} ref={leftHandRef} material={new MeshBasicMaterial({ color: "#29A80A" })} position={[-2 + close, -2, 0]} rotation={[0.4, -0.2, 0]} scale={1.5 * scaleFactor}>

            <Outlines thickness={2} color="#000000" />
        </mesh>
            <mesh ref={bluePillRef} geometry={(nodes_pill.Cylinder as Mesh).geometry} material={new MeshBasicMaterial({ color: "#045DE7" })} position={[-2 + close, -1, 0.5]} rotation={[1.4, 0.2, 0.5]} scale={0.3 * scaleFactor}>

                <Outlines thickness={2} color="#000000" />
            </mesh>
            <mesh ref={redPillRef} geometry={(nodes_pill.Cylinder as Mesh).geometry} material={new MeshBasicMaterial({ color: "#e61e1e" })} position={[2 - close, -1, 0.5]} rotation={[1.4, -0.2, -0.5]} scale={0.3 * scaleFactor}>

                <Outlines thickness={2} color="#000000" />
            </mesh>
            <mesh geometry={(nodes_hand.hand_low_hand001_0 as Mesh).geometry} ref={rightHandRef} material={new MeshBasicMaterial({ color: "#29A80A" })} position={[2 - close, -2, 0]} rotation={[0.4, 0.2, 0]} scale={[-1.5 * scaleFactor, 1.5 * scaleFactor, 1.5 * scaleFactor]}>

                <Outlines thickness={2} color="#000000" />
            </mesh></>}

        <Svg src={"TenetHack.svg"} position={position} scale={0.01} />
        <Html center className='h-screen w-screen flex flex-col'>
            <div className='flex flex-col gap-2 mx-auto my-auto z-10 px-10'>
                <h1 className={cn('text-center font-bold text-5xl md:text-7xl text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)] text-shadow-2xl text-[#05BE2B]', vt323.className)}>The Matrix <span className="animate-blink">_</span></h1>
                <p className={cn('text-center text-xl md:text-4xl text-white', vt323.className)}>11 Oct 2025</p>
                <p className={cn('text-center text-xl md:text-4xl text-white', vt323.className)}>Tenet Hack is over! Thanks to all participants <br /> who made it an incredible journey of innovation and collaboration.</p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <a className="relative cursor-pointer mt-2 w-54 py-2 text-lg font-medium text-black bg-[#141710] hover:bg-primary-white hover:w-60 transition-all" target="_blank" href={"https://discord.gg/ZK6b2NkqSB"}>
                        <p className={cn("text-xl text-white mx-auto text-center", vt323.className)} >Join the Community</p>
                        <span className="absolute left-0 top-0 h-full w-3 border-l-3 border-t-3 border-b-3 border-primary-white"></span>
                        <span className="absolute right-0 top-0 h-full w-3 border-r-3 border-t-3 border-b-3 border-primary-white"></span>
                    </a>
                    <a className="relative cursor-pointer mt-2 w-54 py-2 text-lg font-medium text-black bg-[#141710] hover:bg-primary-white hover:w-60 transition-all" href={"/result-final"}>
                        <p className={cn("text-xl text-white mx-auto text-center", vt323.className)} >View Results</p>
                        <span className="absolute left-0 top-0 h-full w-3 border-l-3 border-t-3 border-b-3 border-primary-white"></span>
                        <span className="absolute right-0 top-0 h-full w-3 border-r-3 border-t-3 border-b-3 border-primary-white"></span>
                    </a>
                </div>
            </div>
            <Footer className=" mb-10" />
        </Html>
    </group >
}
useGLTF.preload("/models/hand_sculpture-v4.glb");
useGLTF.preload("/models/blue_pill.glb");
export default function ThreeCanvas() {


    return <div id='canvas-container' className='h-full w-full fixed inset-0 -z-10'  >
        <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>

            <EffectComposer >

                <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
                <Scanline
                    blendFunction={BlendFunction.OVERLAY} // blend mode
                    density={1.25} // scanline density
                />


            </EffectComposer>
            <Grid cellSize={0.5} sectionSize={0.5} position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]} cellThickness={0.3} cellColor={"#29A80A"} sectionColor={"#29A80A"} args={[20, 10]} />
            {/* <Grid height={6} width={12} cellSize={0.3} position={[0, 0, -2]} color='#29A80A' layers={1} /> */}
            <Scene />
        </Canvas>
    </div>
}