import LightingNode from './LightingNode.js';
import { addNodeClass } from '../core/Node.js';

class IrradianceNode extends LightingNode {

	constructor( node ) {

		super();

		this.node = node;

	}

	setup( builder ) {

		builder.context.irradiance.addAssign( this.node );

	}

}

addNodeClass( 'IrradianceNode', IrradianceNode );

export { IrradianceNode as default };
