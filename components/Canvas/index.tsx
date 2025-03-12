"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// will be fetched from deepeek:
import { useColour } from '@/context/ColourContext';

export default function Canvas() {
    const pathRef = useRef<SVGPathElement>(null);
    const blobsRef = useRef<HTMLDivElement[]>([]);
    const { colours } = useColour();

    useGSAP(() => {
        gsap.registerPlugin(MotionPathPlugin);                

        if (blobsRef.current.length > 0 && pathRef.current) {
            const tl = gsap.timeline({repeat: -1});

            tl.to(blobsRef.current, {
                opacity: 1,
                scale: 1,
                duration: 2,
                ease: "power2.out",
                transformOrigin: "center center",
                stagger: 1,
            });

            tl.to(blobsRef.current, {
                motionPath: {
                    path: pathRef.current,
                    align: pathRef.current,
                    alignOrigin: [0.5, 0.5],
                },
                duration: 15,
                ease: "power1.inOut",
                stagger: 1,
            }, "-=4.5");

            tl.to(blobsRef.current, {
                opacity: 0,
                scale: 0,
                duration: 1,
                stagger: 1,
            }, "-=3");
        }
    }, [colours]);

    return (
        <div className="fixed -z-1 top-0 left-0 w-[100vw] h-[100vh] bg-[#f1f1f1]">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="170 150 170 170"
                preserveAspectRatio="xMidYMid meet"
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            >
                <path 
                    ref={pathRef}
                    id="path"
                    style={{
                        fill: "rgb(255, 255, 255, 0)",
                        stroke: "rgb(0, 0, 0, 0)"
                    }} 
                    d="M 276.858 236.805 C 270.631 244.821 265.1 246.897 261.49 248.276 C 254.124 251.089 247.645 245.849 244.429 241.765 C 240.539 237.233 240.902 228.145 246.187 224.35 C 268.31 208.465 307.68 203.612 296.505 239.629 C 292.809 251.543 277.06 258.01 267.183 259.245 C 244.793 262.043 224.382 255.167 224.382 228.837 C 224.382 222.217 224.765 214.454 229.381 209.094 C 241.11 195.473 276.216 185.98 292.916 192.693 C 312.885 200.721 328.9 243.546 321.015 262.868 C 303.242 306.421 238.135 321.948 211.149 277.843 C 203.997 266.155 202.653 254.565 202.653 241.337 C 202.653 232.419 203.931 220.135 208.071 211.981 C 212.022 204.199 221.476 197.591 228.098 193.344 C 251.762 178.166 267.644 172.222 295.034 172.222 C 303.521 172.222 317.033 173.273 324.751 177.734 C 341.445 187.386 351.052 214.48 356.533 231.488 C 361.94 248.27 368.959 273.04 357.816 288.912 C 341.927 311.545 308.558 316.998 282.911 317.795 C 240.44 319.115 233.021 313.914 183.003 275.903 C 168.659 265.002 166.83 259.261 165.596 255.222 C 161.981 243.393 169.232 210.291 174.234 201.838 C 182.177 188.415 194.125 175.531 205.48 166.263 C 237.712 139.955 324.671 104.448 345.825 162.43 C 360.22 201.886 340.301 257.072 305.914 279.386 C 290.016 289.703 268.816 292.8 250.487 295.75 C 233.75 298.444 210.264 302.926 194.992 292.94 C 186.697 287.516 181.279 277.32 177.95 268.272 C 164.711 232.295 193.531 201.964 228.658 198.711 C 243.731 197.316 262.599 198.135 274.271 216.36 C 281.677 227.924 280.78 232.474 276.858 236.805 Z"
                />
            </svg>
            {colours?.map((blob, index) => (
                <div 
                    key={index}
                    ref={el => {blobsRef.current[index] = el as HTMLDivElement}}
                    className="blobs"
                    style={{
                        width: `200px`,
                        height: `200px`,
                        backgroundColor: blob,
                        opacity: 0,
                        filter: 'blur(120px)',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                ></div>
            ))}
        </div>
    );
}
