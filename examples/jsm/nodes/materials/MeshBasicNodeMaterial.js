import NodeMaterial, { addNodeMaterial } from './NodeMaterial.js';
import { MeshBasicMaterial } from '../../../../build/three.module.js';

const defaultValues = new MeshBasicMaterial();

class MeshBasicNodeMaterial extends NodeMaterial {

	constructor( parameters ) {

		super();

		this.isMeshBasicNodeMaterial = true;

		this.lights = false;
		//this.normals = false; @TODO: normals usage by context

		this.setDefaultValues( defaultValues );

		this.setValues( parameters );

	}

}

addNodeMaterial( 'MeshBasicNodeMaterial', MeshBasicNodeMaterial );

export { MeshBasicNodeMaterial as default };
