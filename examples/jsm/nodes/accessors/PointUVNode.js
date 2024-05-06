import Node, { addNodeClass } from '../core/Node.js';
import { nodeImmutable } from '../shadernode/ShaderNode.js';

class PointUVNode extends Node {

	constructor() {

		super( 'vec2' );

		this.isPointUVNode = true;

	}

	generate( /*builder*/ ) {

		return 'vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y )';

	}

}

const pointUV = nodeImmutable( PointUVNode );

addNodeClass( 'PointUVNode', PointUVNode );

export { PointUVNode as default, pointUV };
