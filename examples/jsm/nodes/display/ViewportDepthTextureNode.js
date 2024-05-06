import ViewportTextureNode from './ViewportTextureNode.js';
import { addNodeClass } from '../core/Node.js';
import { nodeProxy, addNodeElement } from '../shadernode/ShaderNode.js';
import { viewportTopLeft } from './ViewportNode.js';
import { DepthTexture } from '../../../../build/three.module.js';

let sharedDepthbuffer = null;

class ViewportDepthTextureNode extends ViewportTextureNode {

	constructor( uvNode = viewportTopLeft, levelNode = null ) {

		if ( sharedDepthbuffer === null ) {

			sharedDepthbuffer = new DepthTexture();

		}

		super( uvNode, levelNode, sharedDepthbuffer );

	}

}

const viewportDepthTexture = nodeProxy( ViewportDepthTextureNode );

addNodeElement( 'viewportDepthTexture', viewportDepthTexture );

addNodeClass( 'ViewportDepthTextureNode', ViewportDepthTextureNode );

export { ViewportDepthTextureNode as default, viewportDepthTexture };
