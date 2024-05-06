import Node, { addNodeClass } from '../core/Node.js';
import { attribute } from '../core/AttributeNode.js';
import { varying } from '../core/VaryingNode.js';
import { property } from '../core/PropertyNode.js';
import { normalize } from '../math/MathNode.js';
import { cameraViewMatrix } from './CameraNode.js';
import { modelNormalMatrix } from './ModelNode.js';
import { nodeImmutable, vec3 } from '../shadernode/ShaderNode.js';

class NormalNode extends Node {

	constructor( scope = NormalNode.LOCAL ) {

		super( 'vec3' );

		this.scope = scope;

	}

	isGlobal() {

		return true;

	}

	getHash( /*builder*/ ) {

		return `normal-${this.scope}`;

	}

	generate( builder ) {

		const scope = this.scope;

		let outputNode = null;

		if ( scope === NormalNode.GEOMETRY ) {

			const geometryAttribute = builder.hasGeometryAttribute( 'normal' );

			if ( geometryAttribute === false ) {

				outputNode = vec3( 0, 1, 0 );

			} else {

				outputNode = attribute( 'normal', 'vec3' );

			}

		} else if ( scope === NormalNode.LOCAL ) {

			outputNode = varying( normalGeometry );

		} else if ( scope === NormalNode.VIEW ) {

			const vertexNode = modelNormalMatrix.mul( normalLocal );
			outputNode = normalize( varying( vertexNode ) );

		} else if ( scope === NormalNode.WORLD ) {

			// To use inverseTransformDirection only inverse the param order like this: cameraViewMatrix.transformDirection( normalView )
			const vertexNode = normalView.transformDirection( cameraViewMatrix );
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

NormalNode.GEOMETRY = 'geometry';
NormalNode.LOCAL = 'local';
NormalNode.VIEW = 'view';
NormalNode.WORLD = 'world';

const normalGeometry = nodeImmutable( NormalNode, NormalNode.GEOMETRY );
const normalLocal = nodeImmutable( NormalNode, NormalNode.LOCAL ).temp( 'Normal' );
const normalView = nodeImmutable( NormalNode, NormalNode.VIEW );
const normalWorld = nodeImmutable( NormalNode, NormalNode.WORLD );
const transformedNormalView = property( 'vec3', 'TransformedNormalView' );
const transformedNormalWorld = transformedNormalView.transformDirection( cameraViewMatrix ).normalize();
const transformedClearcoatNormalView = property( 'vec3', 'TransformedClearcoatNormalView' );

addNodeClass( 'NormalNode', NormalNode );

export { NormalNode as default, normalGeometry, normalLocal, normalView, normalWorld, transformedClearcoatNormalView, transformedNormalView, transformedNormalWorld };
