import { InstancedBufferAttribute } from '../../../../build/three.module.js';

class StorageInstancedBufferAttribute extends InstancedBufferAttribute {

	constructor( array, itemSize, typeClass = Float32Array ) {

		if ( ArrayBuffer.isView( array ) === false ) array = new typeClass( array * itemSize );

		super( array, itemSize );

		this.isStorageInstancedBufferAttribute = true;

	}

}

export { StorageInstancedBufferAttribute as default };
