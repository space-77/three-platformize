import Node, { addNodeClass } from './Node.js';

class UniformGroupNode extends Node {

	constructor( name, shared = false ) {

		super( 'string' );

		this.name = name;
		this.version = 0;

		this.shared = shared;

		this.isUniformGroup = true;

	}

	set needsUpdate( value ) {

		if ( value === true ) this.version ++;

	}

}

const uniformGroup = ( name ) => new UniformGroupNode( name );
const sharedUniformGroup = ( name ) => new UniformGroupNode( name, true );

const frameGroup = sharedUniformGroup( 'frame' );
const renderGroup = sharedUniformGroup( 'render' );
const objectGroup = uniformGroup( 'object' );

addNodeClass( 'UniformGroupNode', UniformGroupNode );

export { UniformGroupNode as default, frameGroup, objectGroup, renderGroup, sharedUniformGroup, uniformGroup };
