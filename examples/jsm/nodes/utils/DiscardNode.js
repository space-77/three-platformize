import CondNode from '../math/CondNode.js';
import { expression } from '../code/ExpressionNode.js';
import { addNodeClass } from '../core/Node.js';
import { nodeProxy, addNodeElement } from '../shadernode/ShaderNode.js';

let discardExpression;

class DiscardNode extends CondNode {

	constructor( condNode ) {

		discardExpression = discardExpression || expression( 'discard' );

		super( condNode, discardExpression );

	}

}

const inlineDiscard = nodeProxy( DiscardNode );
const discard = ( condNode ) => inlineDiscard( condNode ).append();

addNodeElement( 'discard', discard ); // @TODO: Check... this cause a little confusing using in chaining

addNodeClass( 'DiscardNode', DiscardNode );

export { DiscardNode as default, discard, inlineDiscard };
