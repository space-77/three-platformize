import { mx_perlin_noise_float, mx_perlin_noise_vec3, mx_worley_noise_float as mx_worley_noise_float$1, mx_worley_noise_vec2 as mx_worley_noise_vec2$1, mx_worley_noise_vec3 as mx_worley_noise_vec3$1, mx_cell_noise_float as mx_cell_noise_float$1, mx_fractal_noise_float as mx_fractal_noise_float$1, mx_fractal_noise_vec2 as mx_fractal_noise_vec2$1, mx_fractal_noise_vec3 as mx_fractal_noise_vec3$1, mx_fractal_noise_vec4 as mx_fractal_noise_vec4$1 } from './lib/mx_noise.js';
export { mx_hsvtorgb, mx_rgbtohsv } from './lib/mx_hsv.js';
export { mx_srgb_texture_to_lin_rec709 } from './lib/mx_transform_color.js';
import { smoothstep, mix } from '../math/MathNode.js';
import { uv } from '../accessors/UVNode.js';
import { float, vec2, vec4, int } from '../shadernode/ShaderNode.js';

const mx_aastep = ( threshold, value ) => {

	threshold = float( threshold );
	value = float( value );

	const afwidth = vec2( value.dFdx(), value.dFdy() ).length().mul( 0.70710678118654757 );

	return smoothstep( threshold.sub( afwidth ), threshold.add( afwidth ), value );

};

const _ramp = ( a, b, uv, p ) => mix( a, b, uv[ p ].clamp() );
const mx_ramplr = ( valuel, valuer, texcoord = uv() ) => _ramp( valuel, valuer, texcoord, 'x' );
const mx_ramptb = ( valuet, valueb, texcoord = uv() ) => _ramp( valuet, valueb, texcoord, 'y' );

const _split = ( a, b, center, uv, p ) => mix( a, b, mx_aastep( center, uv[ p ] ) );
const mx_splitlr = ( valuel, valuer, center, texcoord = uv() ) => _split( valuel, valuer, center, texcoord, 'x' );
const mx_splittb = ( valuet, valueb, center, texcoord = uv() ) => _split( valuet, valueb, center, texcoord, 'y' );

const mx_transform_uv = ( uv_scale = 1, uv_offset = 0, uv_geo = uv() ) => uv_geo.mul( uv_scale ).add( uv_offset );

const mx_safepower = ( in1, in2 = 1 ) => {

	in1 = float( in1 );

	return in1.abs().pow( in2 ).mul( in1.sign() );

};

const mx_contrast = ( input, amount = 1, pivot = .5 ) => float( input ).sub( pivot ).mul( amount ).add( pivot );

const mx_noise_float = ( texcoord = uv(), amplitude = 1, pivot = 0 ) => mx_perlin_noise_float( texcoord.convert( 'vec2|vec3' ) ).mul( amplitude ).add( pivot );
//export const mx_noise_vec2 = ( texcoord = uv(), amplitude = 1, pivot = 0 ) => mx_perlin_noise_vec3( texcoord.convert( 'vec2|vec3' ) ).mul( amplitude ).add( pivot );
const mx_noise_vec3 = ( texcoord = uv(), amplitude = 1, pivot = 0 ) => mx_perlin_noise_vec3( texcoord.convert( 'vec2|vec3' ) ).mul( amplitude ).add( pivot );
const mx_noise_vec4 = ( texcoord = uv(), amplitude = 1, pivot = 0 ) => {

	texcoord = texcoord.convert( 'vec2|vec3' ); // overloading type

	const noise_vec4 = vec4( mx_perlin_noise_vec3( texcoord ), mx_perlin_noise_float( texcoord.add( vec2( 19, 73 ) ) ) );

	return noise_vec4.mul( amplitude ).add( pivot );

};

const mx_worley_noise_float = ( texcoord = uv(), jitter = 1 ) => mx_worley_noise_float$1( texcoord.convert( 'vec2|vec3' ), jitter, int( 1 ) );
const mx_worley_noise_vec2 = ( texcoord = uv(), jitter = 1 ) => mx_worley_noise_vec2$1( texcoord.convert( 'vec2|vec3' ), jitter, int( 1 ) );
const mx_worley_noise_vec3 = ( texcoord = uv(), jitter = 1 ) => mx_worley_noise_vec3$1( texcoord.convert( 'vec2|vec3' ), jitter, int( 1 ) );

const mx_cell_noise_float = ( texcoord = uv() ) => mx_cell_noise_float$1( texcoord.convert( 'vec2|vec3' ) );

const mx_fractal_noise_float = ( position = uv(), octaves = 3, lacunarity = 2, diminish = .5, amplitude = 1 ) => mx_fractal_noise_float$1( position, int( octaves ), lacunarity, diminish ).mul( amplitude );
const mx_fractal_noise_vec2 = ( position = uv(), octaves = 3, lacunarity = 2, diminish = .5, amplitude = 1 ) => mx_fractal_noise_vec2$1( position, int( octaves ), lacunarity, diminish ).mul( amplitude );
const mx_fractal_noise_vec3 = ( position = uv(), octaves = 3, lacunarity = 2, diminish = .5, amplitude = 1 ) => mx_fractal_noise_vec3$1( position, int( octaves ), lacunarity, diminish ).mul( amplitude );
const mx_fractal_noise_vec4 = ( position = uv(), octaves = 3, lacunarity = 2, diminish = .5, amplitude = 1 ) => mx_fractal_noise_vec4$1( position, int( octaves ), lacunarity, diminish ).mul( amplitude );

export { mx_aastep, mx_cell_noise_float, mx_contrast, mx_fractal_noise_float, mx_fractal_noise_vec2, mx_fractal_noise_vec3, mx_fractal_noise_vec4, mx_noise_float, mx_noise_vec3, mx_noise_vec4, mx_ramplr, mx_ramptb, mx_safepower, mx_splitlr, mx_splittb, mx_transform_uv, mx_worley_noise_float, mx_worley_noise_vec2, mx_worley_noise_vec3 };
