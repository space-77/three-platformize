import { bitangentView } from './BitangentNode.js';
import { normalView, transformedNormalView } from './NormalNode.js';
import { tangentView } from './TangentNode.js';
import { mat3 } from '../shadernode/ShaderNode.js';
import { mix } from '../math/MathNode.js';
import { anisotropyB, anisotropy, roughness } from '../core/PropertyNode.js';
import { positionViewDirection } from './PositionNode.js';

const TBNViewMatrix = mat3( tangentView, bitangentView, normalView );

const parallaxDirection = positionViewDirection.mul( TBNViewMatrix )/*.normalize()*/;
const parallaxUV = ( uv, scale ) => uv.sub( parallaxDirection.mul( scale ) );

const transformedBentNormalView = ( () => {

	// https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy

	let bentNormal = anisotropyB.cross( positionViewDirection );
	bentNormal = bentNormal.cross( anisotropyB ).normalize();
	bentNormal = mix( bentNormal, transformedNormalView, anisotropy.mul( roughness.oneMinus() ).oneMinus().pow2().pow2() ).normalize();

	return bentNormal;


} )();

export { TBNViewMatrix, parallaxDirection, parallaxUV, transformedBentNormalView };
