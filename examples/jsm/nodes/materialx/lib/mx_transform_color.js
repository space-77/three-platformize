import { tslFn, vec3, bvec3 } from '../../shadernode/ShaderNode.js';
import { greaterThan } from '../../math/OperatorNode.js';
import { pow, max, mix } from '../../math/MathNode.js';

// Three.js Transpiler

const mx_srgb_texture_to_lin_rec709 = tslFn( ( [ color_immutable ] ) => {

	const color = vec3( color_immutable ).toVar();
	const isAbove = bvec3( greaterThan( color, vec3( 0.04045 ) ) ).toVar();
	const linSeg = vec3( color.div( 12.92 ) ).toVar();
	const powSeg = vec3( pow( max( color.add( vec3( 0.055 ) ), vec3( 0.0 ) ).div( 1.055 ), vec3( 2.4 ) ) ).toVar();

	return mix( linSeg, powSeg, isAbove );

} );

// layouts

mx_srgb_texture_to_lin_rec709.setLayout( {
	name: 'mx_srgb_texture_to_lin_rec709',
	type: 'vec3',
	inputs: [
		{ name: 'color', type: 'vec3' }
	]
} );

export { mx_srgb_texture_to_lin_rec709 };
