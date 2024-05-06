import Node, { addNodeClass } from '../core/Node.js';

class LightingNode extends Node {

	constructor() {

		super( 'vec3' );

	}

	generate( /*builder*/ ) {

		console.warn( 'Abstract function.' );

	}

}

addNodeClass( 'LightingNode', LightingNode );

export { LightingNode as default };
