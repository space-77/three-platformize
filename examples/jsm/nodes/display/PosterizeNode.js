import TempNode from '../core/TempNode.js';
import { addNodeClass } from '../core/Node.js';
import { nodeProxy, addNodeElement } from '../shadernode/ShaderNode.js';

class PosterizeNode extends TempNode {

	constructor( sourceNode, stepsNode ) {

		super();

		this.sourceNode = sourceNode;
		this.stepsNode = stepsNode;

	}

	setup() {

		const { sourceNode, stepsNode } = this;

		return sourceNode.mul( stepsNode ).floor().div( stepsNode );

	}

}

const posterize = nodeProxy( PosterizeNode );

addNodeElement( 'posterize', posterize );

addNodeClass( 'PosterizeNode', PosterizeNode );

export { PosterizeNode as default, posterize };
