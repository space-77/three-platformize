import Node, { addNodeClass } from '../core/Node.js';
import { nodeProxy, nodeImmutable } from '../shadernode/ShaderNode.js';
import { cameraFar, cameraNear } from '../accessors/CameraNode.js';
import { positionView } from '../accessors/PositionNode.js';
import { viewportDepthTexture } from './ViewportDepthTextureNode.js';

class ViewportDepthNode extends Node {

	constructor( scope, valueNode = null ) {

		super( 'float' );

		this.scope = scope;
		this.valueNode = valueNode;

		this.isViewportDepthNode = true;

	}

	generate( builder ) {

		const { scope } = this;

		if ( scope === ViewportDepthNode.DEPTH_PIXEL ) {

			return builder.getFragDepth();

		}

		return super.generate( builder );

	}

	setup( /*builder*/ ) {

		const { scope } = this;

		let node = null;

		if ( scope === ViewportDepthNode.DEPTH ) {

			node = viewZToOrthographicDepth( positionView.z, cameraNear, cameraFar );

		} else if ( scope === ViewportDepthNode.DEPTH_TEXTURE ) {

			const texture = this.valueNode || viewportDepthTexture();

			const viewZ = perspectiveDepthToViewZ( texture, cameraNear, cameraFar );
			node = viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

		} else if ( scope === ViewportDepthNode.DEPTH_PIXEL ) {

			if ( this.valueNode !== null ) {

 				node = depthPixelBase().assign( this.valueNode );

			}

		}

		return node;

	}

}

// NOTE: viewZ, the z-coordinate in camera space, is negative for points in front of the camera

// -near maps to 0; -far maps to 1
const viewZToOrthographicDepth = ( viewZ, near, far ) => viewZ.add( near ).div( near.sub( far ) );

// maps orthographic depth in [ 0, 1 ] to viewZ
const orthographicDepthToViewZ = ( depth, near, far ) => near.sub( far ).mul( depth ).sub( near );

// NOTE: https://twitter.com/gonnavis/status/1377183786949959682

// -near maps to 0; -far maps to 1
const viewZToPerspectiveDepth = ( viewZ, near, far ) => near.add( viewZ ).mul( far ).div( far.sub( near ).mul( viewZ ) );

// maps perspective depth in [ 0, 1 ] to viewZ
const perspectiveDepthToViewZ = ( depth, near, far ) => near.mul( far ).div( far.sub( near ).mul( depth ).sub( far ) );

ViewportDepthNode.DEPTH = 'depth';
ViewportDepthNode.DEPTH_TEXTURE = 'depthTexture';
ViewportDepthNode.DEPTH_PIXEL = 'depthPixel';

const depthPixelBase = nodeProxy( ViewportDepthNode, ViewportDepthNode.DEPTH_PIXEL );

const depth = nodeImmutable( ViewportDepthNode, ViewportDepthNode.DEPTH );
const depthTexture = nodeProxy( ViewportDepthNode, ViewportDepthNode.DEPTH_TEXTURE );
const depthPixel = nodeImmutable( ViewportDepthNode, ViewportDepthNode.DEPTH_PIXEL );

depthPixel.assign = ( value ) => depthPixelBase( value );

addNodeClass( 'ViewportDepthNode', ViewportDepthNode );

export { ViewportDepthNode as default, depth, depthPixel, depthTexture, orthographicDepthToViewZ, perspectiveDepthToViewZ, viewZToOrthographicDepth, viewZToPerspectiveDepth };
