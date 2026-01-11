import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ApricotBlossomTreeProps {
    progress: number; // 0 to 1
}

const ApricotBlossomTree: React.FC<ApricotBlossomTreeProps> = ({ progress }) => {
    const treeRef = useRef<SVGSVGElement>(null);

    useLayoutEffect(() => {
        const tree = treeRef.current;
        if (!tree) return;
        
        const trunk = tree.querySelector<SVGPathElement>('.trunk');
        const branches = tree.querySelectorAll<SVGGElement>('.branch');
        const buds = tree.querySelectorAll<SVGCircleElement>('.bud circle');
        const blossoms = tree.querySelectorAll<SVGGElement>('.blossom g');

        gsap.killTweensOf([trunk, branches, buds, blossoms]);

        const duration = 0.8;

        // Trunk thickens and lengthens
        if (trunk) {
            gsap.to(trunk, {
                scaleY: 0.1 + progress * 0.9,
                scaleX: 0.4 + progress * 0.6,
                duration,
                ease: 'power2.out',
                transformOrigin: '50% 100%'
            });
        }
        
        // Branches appear and grow out after trunk has started
        const branchProgress = gsap.utils.clamp(0, 1, (progress - 0.1) / 0.5); // Start at 10%, fully grown by 60%
        branches.forEach(branch => {
            gsap.to(branch, {
                scale: branchProgress,
                autoAlpha: branchProgress,
                duration,
                ease: 'power2.out',
                transformOrigin: '0% 100%'
            });
        });

        // Buds appear as branches are finishing their growth
        const budProgress = gsap.utils.clamp(0, 1, (progress - 0.5) / 0.4); // Start at 50%, fully grown by 90%
         gsap.to(buds, {
            scale: budProgress,
            autoAlpha: budProgress,
            stagger: 0.03,
            duration,
            ease: 'power2.out',
            transformOrigin: '50% 50%'
        });

        // Blossoms appear and open up as the final step
        const blossomProgress = gsap.utils.clamp(0, 1, (progress - 0.7) / 0.3); // Start at 70%, fully bloomed by 100%
        gsap.to(blossoms, {
            scale: blossomProgress,
            autoAlpha: blossomProgress,
            rotation: (i) => (i % 2 === 0 ? -15 : 15) * blossomProgress,
            stagger: 0.03,
            duration,
            ease: 'back.out(1.7)',
            transformOrigin: '50% 50%'
        });

    }, [progress]);

    return (
        <div className="absolute bottom-0 left-0 w-full h-full flex justify-center items-end pointer-events-none z-0 opacity-80">
            <svg ref={treeRef} viewBox="0 0 400 600" className="w-full max-w-lg h-auto">
                <g transform="translate(200, 580)">
                    {/* Trunk */}
                    <path className="trunk" d="M0,0 V-150" stroke="#5D4037" strokeWidth="15" fill="none" strokeLinecap="round" />
                    
                    {/* Branches */}
                    <g>
                        <g className="branch">
                             <path d="M0,-140 C20,-180 60,-200 100,-240" stroke="#5D4037" strokeWidth="10" fill="none" strokeLinecap="round" />
                        </g>
                        <g className="branch">
                           <path d="M0,-100 C-20,-150 -60,-160 -120,-200" stroke="#5D4037" strokeWidth="10" fill="none" strokeLinecap="round" />
                        </g>
                         <g className="branch">
                           <path d="M-120,-200 C-150,-220 -160,-250 -150,-280" stroke="#5D4037" strokeWidth="6" fill="none" strokeLinecap="round" />
                        </g>
                         <g className="branch">
                            <path d="M100,-240 C130,-260 150,-290 140,-320" stroke="#5D4037" strokeWidth="6" fill="none" strokeLinecap="round" />
                        </g>
                         <g className="branch">
                           <path d="M0,-50 C 30, -70, 40, -100, 60, -120" stroke="#5D4037" strokeWidth="8" fill="none" strokeLinecap="round" />
                        </g>
                    </g>

                    {/* Buds (Small circles) */}
                    <g className="bud">
                        <circle cx="105" cy="-245" r="4" fill="#6a3a4b" />
                        <circle cx="-125" cy="-205" r="4" fill="#6a3a4b" />
                        <circle cx="65" cy="-125" r="4" fill="#6a3a4b" />
                        <circle cx="-155" cy="-285" r="4" fill="#6a3a4b" />
                        <circle cx="145" cy="-325" r="4" fill="#6a3a4b" />
                    </g>
                    
                    {/* Blossoms */}
                    <g className="blossom">
                        <g transform="translate(100, -240)">
                            <circle r="10" fill="#a78bfa"/>
                            <circle r="4" fill="#fef5fa"/>
                        </g>
                         <g transform="translate(-120, -200)">
                            <circle r="10" fill="#ff3071"/>
                             <circle r="4" fill="#fef5fa"/>
                        </g>
                        <g transform="translate(-150, -280)">
                            <circle r="12" fill="#fef5fa"/>
                            <circle r="5" fill="#a78bfa"/>
                        </g>
                         <g transform="translate(140, -320)">
                            <circle r="12" fill="#a78bfa"/>
                            <circle r="5" fill="#ff3071"/>
                        </g>
                         <g transform="translate(60, -120)">
                            <circle r="9" fill="#ff3071"/>
                            <circle r="3" fill="#fef5fa"/>
                        </g>
                         <g transform="translate(115, -255)">
                            <circle r="8" fill="#fef5fa"/>
                            <circle r="3" fill="#a78bfa"/>
                        </g>
                         <g transform="translate(-135, -215)">
                            <circle r="8" fill="#a78bfa"/>
                            <circle r="3" fill="#ff3071"/>
                        </g>
                         <g transform="translate(-160, -290)">
                            <circle r="10" fill="#ff3071"/>
                            <circle r="4" fill="#fef5fa"/>
                        </g>
                         <g transform="translate(150, -330)">
                            <circle r="10" fill="#fef5fa"/>
                            <circle r="4" fill="#a78bfa"/>
                        </g>
                         <g transform="translate(70, -135)">
                            <circle r="7" fill="#a78bfa"/>
                            <circle r="2" fill="#ff3071"/>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default ApricotBlossomTree;