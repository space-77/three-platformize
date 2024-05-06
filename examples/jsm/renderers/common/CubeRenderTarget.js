import { WebGLCubeRenderTarget, BoxGeometry, BackSide, NoBlending, Mesh, Scene, LinearMipmapLinearFilter, LinearFilter, CubeCamera } from '../../../../build/three.module.js';
import { equirectUV } from '../../nodes/utils/EquirectUVNode.js';
import { texture } from '../../nodes/accessors/TextureNode.js';
import { positionWorldDirection } from '../../nodes/accessors/PositionNode.js';
import { createNodeMaterialFromType } from '../../nodes/materials/NodeMaterial.js';

// @TODO: Consider rename WebGLCubeRenderTarget to just CubeRenderTarget

class CubeRenderTarget extends WebGLCubeRenderTarget {

	constructor( size = 1, options = {} ) {

		super( size, options );

		this.isCubeRenderTarget = true;

	}

	fromEquirectangularTexture( renderer, texture$1 ) {

		const currentMinFilter = texture$1.minFilter;
		const currentGenerateMipmaps = texture$1.generateMipmaps;

		texture$1.generateMipmaps = true;

		this.texture.type = texture$1.type;
		this.texture.colorSpace = texture$1.colorSpace;

		this.texture.generateMipmaps = texture$1.generateMipmaps;
		this.texture.minFilter = texture$1.minFilter;
		this.texture.magFilter = texture$1.magFilter;

		const geometry = new BoxGeometry( 5, 5, 5 );

		const uvNode = equirectUV( positionWorldDirection );

		const material = createNodeMaterialFromType( 'MeshBasicNodeMaterial' );
		material.colorNode = texture( texture$1, uvNode, 0 );
		material.side = BackSide;
		material.blending = NoBlending;

		const mesh = new Mesh( geometry, material );

		const scene = new Scene();
		scene.add( mesh );

		// Avoid blurred poles
		if ( texture$1.minFilter === LinearMipmapLinearFilter ) texture$1.minFilter = LinearFilter;

		const camera = new CubeCamera( 1, 10, this );
		camera.update( renderer, scene );

		texture$1.minFilter = currentMinFilter;
		texture$1.currentGenerateMipmaps = currentGenerateMipmaps;

		mesh.geometry.dispose();
		mesh.material.dispose();

		return this;

	}

}

export { CubeRenderTarget as default };
