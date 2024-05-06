import Object3DNode from './Object3DNode.js';
import { addNodeClass } from '../core/Node.js';
import { nodeImmutable } from '../shadernode/ShaderNode.js';

class ModelNode extends Object3DNode {

	constructor( scope = ModelNode.VIEW_MATRIX ) {

		super( scope );

	}

	update( frame ) {

		this.object3d = frame.object;

		super.update( frame );

	}

}

const modelDirection = nodeImmutable( ModelNode, ModelNode.DIRECTION );
const modelViewMatrix = nodeImmutable( ModelNode, ModelNode.VIEW_MATRIX ).label( 'modelViewMatrix' ).temp( 'ModelViewMatrix' );
const modelNormalMatrix = nodeImmutable( ModelNode, ModelNode.NORMAL_MATRIX );
const modelWorldMatrix = nodeImmutable( ModelNode, ModelNode.WORLD_MATRIX );
const modelPosition = nodeImmutable( ModelNode, ModelNode.POSITION );
const modelScale = nodeImmutable( ModelNode, ModelNode.SCALE );
const modelViewPosition = nodeImmutable( ModelNode, ModelNode.VIEW_POSITION );

addNodeClass( 'ModelNode', ModelNode );

export { ModelNode as default, modelDirection, modelNormalMatrix, modelPosition, modelScale, modelViewMatrix, modelViewPosition, modelWorldMatrix };
