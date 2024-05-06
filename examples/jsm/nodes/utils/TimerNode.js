import UniformNode from '../core/UniformNode.js';
import { NodeUpdateType } from '../core/constants.js';
import { nodeImmutable, nodeObject } from '../shadernode/ShaderNode.js';
import { addNodeClass } from '../core/Node.js';

class TimerNode extends UniformNode {

	constructor( scope = TimerNode.LOCAL, scale = 1, value = 0 ) {

		super( value );

		this.scope = scope;
		this.scale = scale;

		this.updateType = NodeUpdateType.FRAME;

	}
	/*
	@TODO:
	getNodeType( builder ) {

		const scope = this.scope;

		if ( scope === TimerNode.FRAME ) {

			return 'uint';

		}

		return 'float';

	}
*/
	update( frame ) {

		const scope = this.scope;
		const scale = this.scale;

		if ( scope === TimerNode.LOCAL ) {

			this.value += frame.deltaTime * scale;

		} else if ( scope === TimerNode.DELTA ) {

			this.value = frame.deltaTime * scale;

		} else if ( scope === TimerNode.FRAME ) {

			this.value = frame.frameId;

		} else {

			// global

			this.value = frame.time * scale;

		}

	}

	serialize( data ) {

		super.serialize( data );

		data.scope = this.scope;
		data.scale = this.scale;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.scope = data.scope;
		this.scale = data.scale;

	}

}

TimerNode.LOCAL = 'local';
TimerNode.GLOBAL = 'global';
TimerNode.DELTA = 'delta';
TimerNode.FRAME = 'frame';

// @TODO: add support to use node in timeScale
const timerLocal = ( timeScale, value = 0 ) => nodeObject( new TimerNode( TimerNode.LOCAL, timeScale, value ) );
const timerGlobal = ( timeScale, value = 0 ) => nodeObject( new TimerNode( TimerNode.GLOBAL, timeScale, value ) );
const timerDelta = ( timeScale, value = 0 ) => nodeObject( new TimerNode( TimerNode.DELTA, timeScale, value ) );
const frameId = nodeImmutable( TimerNode, TimerNode.FRAME ).uint();

addNodeClass( 'TimerNode', TimerNode );

export { TimerNode as default, frameId, timerDelta, timerGlobal, timerLocal };
