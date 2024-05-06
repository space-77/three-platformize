import { mul, sub, div, add } from './OperatorNode.js';
import { addNodeElement } from '../shadernode/ShaderNode.js';
import { pow, sin, PI } from './MathNode.js';

// remapping functions https://iquilezles.org/articles/functions/
const parabola = ( x, k ) => pow( mul( 4.0, x.mul( sub( 1.0, x ) ) ), k );
const gain = ( x, k ) => x.lessThan( 0.5 ) ? parabola( x.mul( 2.0 ), k ).div( 2.0 ) : sub( 1.0, parabola( mul( sub( 1.0, x ), 2.0 ), k ).div( 2.0 ) );
const pcurve = ( x, a, b ) => pow( div( pow( x, a ), add( pow( x, a ), pow( sub( 1.0, x ), b ) ) ), 1.0 / a );
const sinc = ( x, k ) => sin( PI.mul( k.mul( x ).sub( 1.0 ) ) ).div( PI.mul( k.mul( x ).sub( 1.0 ) ) );


addNodeElement( 'parabola', parabola );
addNodeElement( 'gain', gain );
addNodeElement( 'pcurve', pcurve );
addNodeElement( 'sinc', sinc );

export { gain, parabola, pcurve, sinc };
