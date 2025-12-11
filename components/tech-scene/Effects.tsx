'use client';

import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

const Effects: React.FC = () => {
    return (
        <EffectComposer>
            <Bloom
                luminanceThreshold={0.2}
                mipmapBlur
                intensity={1.2}
                radius={0.6}
                levels={6}
            />
            <Vignette eskil={false} offset={0.1} darkness={0.9} />
        </EffectComposer>
    );
};

export default Effects;
