import ReferenceNode from './ReferenceNode.js';
import { addNodeClass } from '../core/Node.js';
import { nodeObject } from '../shadernode/ShaderNode.js';

class MaterialReferenceNode extends ReferenceNode {

	constructor( property, inputType, material = null ) {

		super( property, inputType, material );

		this.material = material;

		//this.updateType = NodeUpdateType.RENDER;

	}

	/*setNodeType( node ) {

		super.setNodeType( node );

		this.node.groupNode = renderGroup;

	}*/

	updateReference( state ) {

		this.reference = this.material !== null ? this.material : state.material;

		return this.reference;

	}

}

const materialReference = ( name, type, material ) => nodeObject( new MaterialReferenceNode( name, type, material ) );

addNodeClass( 'MaterialReferenceNode', MaterialReferenceNode );

export { MaterialReferenceNode as default, materialReference };
