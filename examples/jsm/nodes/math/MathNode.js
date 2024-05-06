import TempNode from '../core/TempNode.js';
import { mul, sub, div } from './OperatorNode.js';
import { addNodeClass } from '../core/Node.js';
import { float, nodeProxy, addNodeElement, vec4, vec3, nodeObject } from '../shadernode/ShaderNode.js';

class MathNode extends TempNode {

	constructor( method, aNode, bNode = null, cNode = null ) {

		super();

		this.method = method;

		this.aNode = aNode;
		this.bNode = bNode;
		this.cNode = cNode;

	}

	getInputType( builder ) {

		const aType = this.aNode.getNodeType( builder );
		const bType = this.bNode ? this.bNode.getNodeType( builder ) : null;
		const cType = this.cNode ? this.cNode.getNodeType( builder ) : null;

		const aLen = builder.isMatrix( aType ) ? 0 : builder.getTypeLength( aType );
		const bLen = builder.isMatrix( bType ) ? 0 : builder.getTypeLength( bType );
		const cLen = builder.isMatrix( cType ) ? 0 : builder.getTypeLength( cType );

		if ( aLen > bLen && aLen > cLen ) {

			return aType;

		} else if ( bLen > cLen ) {

			return bType;

		} else if ( cLen > aLen ) {

			return cType;

		}

		return aType;

	}

	getNodeType( builder ) {

		const method = this.method;

		if ( method === MathNode.LENGTH || method === MathNode.DISTANCE || method === MathNode.DOT ) {

			return 'float';

		} else if ( method === MathNode.CROSS ) {

			return 'vec3';

		} else if ( method === MathNode.ALL ) {

			return 'bool';

		} else if ( method === MathNode.EQUALS ) {

			return builder.changeComponentType( this.aNode.getNodeType( builder ), 'bool' );

		} else if ( method === MathNode.MOD ) {

			return this.aNode.getNodeType( builder );

		} else {

			return this.getInputType( builder );

		}

	}

	generate( builder, output ) {

		const method = this.method;

		const type = this.getNodeType( builder );
		const inputType = this.getInputType( builder );

		const a = this.aNode;
		const b = this.bNode;
		const c = this.cNode;

		const isWebGL = builder.renderer.isWebGLRenderer === true;

		if ( method === MathNode.TRANSFORM_DIRECTION ) {

			// dir can be either a direction vector or a normal vector
			// upper-left 3x3 of matrix is assumed to be orthogonal

			let tA = a;
			let tB = b;

			if ( builder.isMatrix( tA.getNodeType( builder ) ) ) {

				tB = vec4( vec3( tB ), 0.0 );

			} else {

				tA = vec4( vec3( tA ), 0.0 );

			}

			const mulNode = mul( tA, tB ).xyz;

			return normalize( mulNode ).build( builder, output );

		} else if ( method === MathNode.NEGATE ) {

			return builder.format( '( - ' + a.build( builder, inputType ) + ' )', type, output );

		} else if ( method === MathNode.ONE_MINUS ) {

			return sub( 1.0, a ).build( builder, output );

		} else if ( method === MathNode.RECIPROCAL ) {

			return div( 1.0, a ).build( builder, output );

		} else if ( method === MathNode.DIFFERENCE ) {

			return abs( sub( a, b ) ).build( builder, output );

		} else {

			const params = [];

			if ( method === MathNode.CROSS || method === MathNode.MOD ) {

				params.push(
					a.build( builder, type ),
					b.build( builder, type )
				);

			} else if ( method === MathNode.STEP ) {

				params.push(
					a.build( builder, builder.getTypeLength( a.getNodeType( builder ) ) === 1 ? 'float' : inputType ),
					b.build( builder, inputType )
				);

			} else if ( ( isWebGL && ( method === MathNode.MIN || method === MathNode.MAX ) ) || method === MathNode.MOD ) {

				params.push(
					a.build( builder, inputType ),
					b.build( builder, builder.getTypeLength( b.getNodeType( builder ) ) === 1 ? 'float' : inputType )
				);

			} else if ( method === MathNode.REFRACT ) {

				params.push(
					a.build( builder, inputType ),
					b.build( builder, inputType ),
					c.build( builder, 'float' )
				);

			} else if ( method === MathNode.MIX ) {

				params.push(
					a.build( builder, inputType ),
					b.build( builder, inputType ),
					c.build( builder, builder.getTypeLength( c.getNodeType( builder ) ) === 1 ? 'float' : inputType )
				);

			} else {

				params.push( a.build( builder, inputType ) );
				if ( b !== null ) params.push( b.build( builder, inputType ) );
				if ( c !== null ) params.push( c.build( builder, inputType ) );

			}

			return builder.format( `${ builder.getMethod( method, type ) }( ${params.join( ', ' )} )`, type, output );

		}

	}

	serialize( data ) {

		super.serialize( data );

		data.method = this.method;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.method = data.method;

	}

}

// 1 input

MathNode.ALL = 'all';
MathNode.ANY = 'any';
MathNode.EQUALS = 'equals';

MathNode.RADIANS = 'radians';
MathNode.DEGREES = 'degrees';
MathNode.EXP = 'exp';
MathNode.EXP2 = 'exp2';
MathNode.LOG = 'log';
MathNode.LOG2 = 'log2';
MathNode.SQRT = 'sqrt';
MathNode.INVERSE_SQRT = 'inversesqrt';
MathNode.FLOOR = 'floor';
MathNode.CEIL = 'ceil';
MathNode.NORMALIZE = 'normalize';
MathNode.FRACT = 'fract';
MathNode.SIN = 'sin';
MathNode.COS = 'cos';
MathNode.TAN = 'tan';
MathNode.ASIN = 'asin';
MathNode.ACOS = 'acos';
MathNode.ATAN = 'atan';
MathNode.ABS = 'abs';
MathNode.SIGN = 'sign';
MathNode.LENGTH = 'length';
MathNode.NEGATE = 'negate';
MathNode.ONE_MINUS = 'oneMinus';
MathNode.DFDX = 'dFdx';
MathNode.DFDY = 'dFdy';
MathNode.ROUND = 'round';
MathNode.RECIPROCAL = 'reciprocal';
MathNode.TRUNC = 'trunc';
MathNode.FWIDTH = 'fwidth';
MathNode.BITCAST = 'bitcast';

// 2 inputs

MathNode.ATAN2 = 'atan2';
MathNode.MIN = 'min';
MathNode.MAX = 'max';
MathNode.MOD = 'mod';
MathNode.STEP = 'step';
MathNode.REFLECT = 'reflect';
MathNode.DISTANCE = 'distance';
MathNode.DIFFERENCE = 'difference';
MathNode.DOT = 'dot';
MathNode.CROSS = 'cross';
MathNode.POW = 'pow';
MathNode.TRANSFORM_DIRECTION = 'transformDirection';

// 3 inputs

MathNode.MIX = 'mix';
MathNode.CLAMP = 'clamp';
MathNode.REFRACT = 'refract';
MathNode.SMOOTHSTEP = 'smoothstep';
MathNode.FACEFORWARD = 'faceforward';

const EPSILON = float( 1e-6 );
const INFINITY = float( 1e6 );
const PI = float( Math.PI );
const PI2 = float( Math.PI * 2 );

const all = nodeProxy( MathNode, MathNode.ALL );
const any = nodeProxy( MathNode, MathNode.ANY );
const equals = nodeProxy( MathNode, MathNode.EQUALS );

const radians = nodeProxy( MathNode, MathNode.RADIANS );
const degrees = nodeProxy( MathNode, MathNode.DEGREES );
const exp = nodeProxy( MathNode, MathNode.EXP );
const exp2 = nodeProxy( MathNode, MathNode.EXP2 );
const log = nodeProxy( MathNode, MathNode.LOG );
const log2 = nodeProxy( MathNode, MathNode.LOG2 );
const sqrt = nodeProxy( MathNode, MathNode.SQRT );
const inverseSqrt = nodeProxy( MathNode, MathNode.INVERSE_SQRT );
const floor = nodeProxy( MathNode, MathNode.FLOOR );
const ceil = nodeProxy( MathNode, MathNode.CEIL );
const normalize = nodeProxy( MathNode, MathNode.NORMALIZE );
const fract = nodeProxy( MathNode, MathNode.FRACT );
const sin = nodeProxy( MathNode, MathNode.SIN );
const cos = nodeProxy( MathNode, MathNode.COS );
const tan = nodeProxy( MathNode, MathNode.TAN );
const asin = nodeProxy( MathNode, MathNode.ASIN );
const acos = nodeProxy( MathNode, MathNode.ACOS );
const atan = nodeProxy( MathNode, MathNode.ATAN );
const abs = nodeProxy( MathNode, MathNode.ABS );
const sign = nodeProxy( MathNode, MathNode.SIGN );
const length = nodeProxy( MathNode, MathNode.LENGTH );
const negate = nodeProxy( MathNode, MathNode.NEGATE );
const oneMinus = nodeProxy( MathNode, MathNode.ONE_MINUS );
const dFdx = nodeProxy( MathNode, MathNode.DFDX );
const dFdy = nodeProxy( MathNode, MathNode.DFDY );
const round = nodeProxy( MathNode, MathNode.ROUND );
const reciprocal = nodeProxy( MathNode, MathNode.RECIPROCAL );
const trunc = nodeProxy( MathNode, MathNode.TRUNC );
const fwidth = nodeProxy( MathNode, MathNode.FWIDTH );
const bitcast = nodeProxy( MathNode, MathNode.BITCAST );

const atan2 = nodeProxy( MathNode, MathNode.ATAN2 );
const min = nodeProxy( MathNode, MathNode.MIN );
const max = nodeProxy( MathNode, MathNode.MAX );
const mod = nodeProxy( MathNode, MathNode.MOD );
const step = nodeProxy( MathNode, MathNode.STEP );
const reflect = nodeProxy( MathNode, MathNode.REFLECT );
const distance = nodeProxy( MathNode, MathNode.DISTANCE );
const difference = nodeProxy( MathNode, MathNode.DIFFERENCE );
const dot = nodeProxy( MathNode, MathNode.DOT );
const cross = nodeProxy( MathNode, MathNode.CROSS );
const pow = nodeProxy( MathNode, MathNode.POW );
const pow2 = nodeProxy( MathNode, MathNode.POW, 2 );
const pow3 = nodeProxy( MathNode, MathNode.POW, 3 );
const pow4 = nodeProxy( MathNode, MathNode.POW, 4 );
const transformDirection = nodeProxy( MathNode, MathNode.TRANSFORM_DIRECTION );

const cbrt = ( a ) => mul( sign( a ), pow( abs( a ), 1.0 / 3.0 ) );
const lengthSq = ( a ) => dot( a, a );
const mix = nodeProxy( MathNode, MathNode.MIX );
const clamp = ( value, low = 0, high = 1 ) => nodeObject( new MathNode( MathNode.CLAMP, nodeObject( value ), nodeObject( low ), nodeObject( high ) ) );
const saturate = ( value ) => clamp( value );
const refract = nodeProxy( MathNode, MathNode.REFRACT );
const smoothstep = nodeProxy( MathNode, MathNode.SMOOTHSTEP );
const faceForward = nodeProxy( MathNode, MathNode.FACEFORWARD );

const mixElement = ( t, e1, e2 ) => mix( e1, e2, t );
const smoothstepElement = ( x, low, high ) => smoothstep( low, high, x );

addNodeElement( 'all', all );
addNodeElement( 'any', any );
addNodeElement( 'equals', equals );

addNodeElement( 'radians', radians );
addNodeElement( 'degrees', degrees );
addNodeElement( 'exp', exp );
addNodeElement( 'exp2', exp2 );
addNodeElement( 'log', log );
addNodeElement( 'log2', log2 );
addNodeElement( 'sqrt', sqrt );
addNodeElement( 'inverseSqrt', inverseSqrt );
addNodeElement( 'floor', floor );
addNodeElement( 'ceil', ceil );
addNodeElement( 'normalize', normalize );
addNodeElement( 'fract', fract );
addNodeElement( 'sin', sin );
addNodeElement( 'cos', cos );
addNodeElement( 'tan', tan );
addNodeElement( 'asin', asin );
addNodeElement( 'acos', acos );
addNodeElement( 'atan', atan );
addNodeElement( 'abs', abs );
addNodeElement( 'sign', sign );
addNodeElement( 'length', length );
addNodeElement( 'lengthSq', lengthSq );
addNodeElement( 'negate', negate );
addNodeElement( 'oneMinus', oneMinus );
addNodeElement( 'dFdx', dFdx );
addNodeElement( 'dFdy', dFdy );
addNodeElement( 'round', round );
addNodeElement( 'reciprocal', reciprocal );
addNodeElement( 'trunc', trunc );
addNodeElement( 'fwidth', fwidth );
addNodeElement( 'atan2', atan2 );
addNodeElement( 'min', min );
addNodeElement( 'max', max );
addNodeElement( 'mod', mod );
addNodeElement( 'step', step );
addNodeElement( 'reflect', reflect );
addNodeElement( 'distance', distance );
addNodeElement( 'dot', dot );
addNodeElement( 'cross', cross );
addNodeElement( 'pow', pow );
addNodeElement( 'pow2', pow2 );
addNodeElement( 'pow3', pow3 );
addNodeElement( 'pow4', pow4 );
addNodeElement( 'transformDirection', transformDirection );
addNodeElement( 'mix', mixElement );
addNodeElement( 'clamp', clamp );
addNodeElement( 'refract', refract );
addNodeElement( 'smoothstep', smoothstepElement );
addNodeElement( 'faceForward', faceForward );
addNodeElement( 'difference', difference );
addNodeElement( 'saturate', saturate );
addNodeElement( 'cbrt', cbrt );

addNodeClass( 'MathNode', MathNode );

export { EPSILON, INFINITY, PI, PI2, abs, acos, all, any, asin, atan, atan2, bitcast, cbrt, ceil, clamp, cos, cross, dFdx, dFdy, MathNode as default, degrees, difference, distance, dot, equals, exp, exp2, faceForward, floor, fract, fwidth, inverseSqrt, length, lengthSq, log, log2, max, min, mix, mixElement, mod, negate, normalize, oneMinus, pow, pow2, pow3, pow4, radians, reciprocal, reflect, refract, round, saturate, sign, sin, smoothstep, smoothstepElement, sqrt, step, tan, transformDirection, trunc };
