import { $document } from '../../../build/three.module.js';
import { Loader, TextureLoader, Data3DTexture, RGBAFormat, UnsignedByteType, LinearFilter, ClampToEdgeWrapping } from '../../../build/three.module.js';

class LUTImageLoader extends Loader {

	constructor( flipVertical = false ) {

		//The NeutralLUT.png has green at the bottom for Unreal ang green at the top for Unity URP Color Lookup
		//post-processing. If you're using lut image strips from a Unity pipeline then pass true to the constructor

		super();

		this.flip = flipVertical;

	}

	load( url, onLoad, onProgress, onError ) {

		const loader = new TextureLoader( this.manager );

		loader.setCrossOrigin( this.crossOrigin );

		loader.setPath( this.path );
		loader.load( url, texture => {

			try {

				let imageData;

				if ( texture.image.width < texture.image.height ) {

					imageData = this.getImageData( texture );

				} else {

					imageData = this.horz2Vert( texture );

				}

				onLoad( this.parse( imageData.data, Math.min( texture.image.width, texture.image.height ) ) );

			} catch ( e ) {

				if ( onError ) {

					onError( e );

				} else {

					console.error( e );

				}

				this.manager.itemError( url );

			}

		}, onProgress, onError );

	}

	getImageData( texture ) {

		const width = texture.image.width;
		const height = texture.image.height;

		const canvas = $document.createElement( 'canvas' );
		canvas.width = width;
		canvas.height = height;

		const context = canvas.getContext( '2d' );

		if ( this.flip === true ) {

			context.scale( 1, - 1 );
			context.translate( 0, - height );

		}

		context.drawImage( texture.image, 0, 0 );

		return context.getImageData( 0, 0, width, height );

	}

	horz2Vert( texture ) {

		const width = texture.image.height;
		const height = texture.image.width;

		const canvas = $document.createElement( 'canvas' );
		canvas.width = width;
		canvas.height = height;

		const context = canvas.getContext( '2d' );

		if ( this.flip === true ) {

			context.scale( 1, - 1 );
			context.translate( 0, - height );

		}

		for ( let i = 0; i < width; i ++ ) {

			const sy = i * width;
			const dy = ( this.flip ) ? height - i * width : i * width;
			context.drawImage( texture.image, sy, 0, width, width, 0, dy, width, width );

		}

		return context.getImageData( 0, 0, width, height );

	}

	parse( dataArray, size ) {

		const data = new Uint8Array( dataArray );

		const texture3D = new Data3DTexture();
		texture3D.image.data = data;
		texture3D.image.width = size;
		texture3D.image.height = size;
		texture3D.image.depth = size;
		texture3D.format = RGBAFormat;
		texture3D.type = UnsignedByteType;
		texture3D.magFilter = LinearFilter;
		texture3D.minFilter = LinearFilter;
		texture3D.wrapS = ClampToEdgeWrapping;
		texture3D.wrapT = ClampToEdgeWrapping;
		texture3D.wrapR = ClampToEdgeWrapping;
		texture3D.generateMipmaps = false;
		texture3D.needsUpdate = true;

		return {
			size,
			texture3D,
		};

	}

}

export { LUTImageLoader };
