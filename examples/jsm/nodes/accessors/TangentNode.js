import Node, { addNodeClass } from '../core/Node.js';
import { attribute } from '../core/AttributeNode.js';
import { temp } from '../core/VarNode.js';
import { varying } from '../core/VaryingNode.js';
import { normalize } from '../math/MathNode.js';
import { cameraViewMatrix } from './CameraNode.js';
import { modelViewMatrix } from './ModelNode.js';
import { nodeImmutable, vec4 } from '../shadernode/ShaderNode.js';

class TangentNode extends Node {

	constructor( scope = TangentNode.LOCAL ) {

		super();

		this.scope = scope;

	}

	getHash( /*builder*/ ) {

		return `tangent-${this.scope}`;

	}

	getNodeType() {

		const scope = this.scope;

		if ( scope === TangentNode.GEOMETRY ) {

			return 'vec4';

		}

		return 'vec3';

	}


	generate( builder ) {

		const scope = this.scope;

		let outputNode = null;

		if ( scope === TangentNode.GEOMETRY ) {

			outputNode = attribute( 'tangent', 'vec4' );

			if ( builder.geometry.hasAttribute( 'tangent' ) === false ) {

				builder.geometry.computeTangents();

			}

		} else if ( scope === TangentNode.LOCAL ) {

			outputNode = varying( tangentGeometry.xyz );

		} else if ( scope === TangentNode.VIEW ) {

			const vertexNode = modelViewMatrix.mul( vec4( tangentLocal, 0 ) ).xyz;
			outputNode = normalize( varying( vertexNode ) );

		} else if ( scope === TangentNode.WORLD ) {

			const vertexNode = tangentView.transformDirection( cameraViewMatrix );
			outputNode = normalize( varying( vertexNode ) );

		}

		return outputNode.build( builder, this.getNodeType( builder ) );

	}

	serialize( data ) {

		super.serialize( data );

		data.scope = this.scope;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.scope = data.scope;

	}

}

TangentNode.GEOMETRY = 'geometry';
TangentNode.LOCAL = 'local';
TangentNode.VIEW = 'view';
TangentNode.WORLD = 'world';

const tangentGeometry = nodeImmutable( TangentNode, TangentNode.GEOMETRY );
const tangentLocal = nodeImmutable( TangentNode, TangentNode.LOCAL );
const tangentView = nodeImmutable( TangentNode, TangentNode.VIEW );
const tangentWorld = nodeImmutable( TangentNode, TangentNode.WORLD );
const transformedTangentView = temp( tangentView, 'TransformedTangentView' );
const transformedTangentWorld = normalize( transformedTangentView.transformDirection( cameraViewMatrix ) );

addNodeClass( 'TangentNode', TangentNode );

export { TangentNode as default, tangentGeometry, tangentLocal, tangentView, tangentWorld, transformedTangentView, transformedTangentWorld };
