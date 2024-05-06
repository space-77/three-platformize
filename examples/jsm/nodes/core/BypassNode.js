import Node, { addNodeClass } from './Node.js';
import { nodeProxy, addNodeElement } from '../shadernode/ShaderNode.js';

class BypassNode extends Node {

	constructor( returnNode, callNode ) {

		super();

		this.isBypassNode = true;

		this.outputNode = returnNode;
		this.callNode = callNode;

	}

	getNodeType( builder ) {

		return this.outputNode.getNodeType( builder );

	}

	generate( builder ) {

		const snippet = this.callNode.build( builder, 'void' );

		if ( snippet !== '' ) {

			builder.addLineFlowCode( snippet );

		}

		return this.outputNode.build( builder );

	}

}

const bypass = nodeProxy( BypassNode );

addNodeElement( 'bypass', bypass );

addNodeClass( 'BypassNode', BypassNode );

export { bypass, BypassNode as default };
