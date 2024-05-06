import Node, { addNodeClass } from './Node.js';

class StructTypeNode extends Node {

	constructor( types ) {

		super();

		this.types = types;
		this.isStructTypeNode = true;

	}

	getMemberTypes() {

		return this.types;

	}

}

addNodeClass( 'StructTypeNode', StructTypeNode );

export { StructTypeNode as default };
