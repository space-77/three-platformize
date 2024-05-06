import Node, { addNodeClass } from './Node.js';
import { nodeImmutable, nodeObject } from '../shadernode/ShaderNode.js';

class PropertyNode extends Node {

	constructor( nodeType, name = null, varying = false ) {

		super( nodeType );

		this.name = name;
		this.varying = varying;

		this.isPropertyNode = true;

	}

	getHash( builder ) {

		return this.name || super.getHash( builder );

	}

	isGlobal( /*builder*/ ) {

		return true;

	}

	generate( builder ) {

		let nodeVar;

		if ( this.varying === true ) {

			nodeVar = builder.getVaryingFromNode( this, this.name );
			nodeVar.needsInterpolation = true;

		} else {

			nodeVar = builder.getVarFromNode( this, this.name );

		}

		return builder.getPropertyName( nodeVar );

	}

}

const property = ( type, name ) => nodeObject( new PropertyNode( type, name ) );
const varyingProperty = ( type, name ) => nodeObject( new PropertyNode( type, name, true ) );

const diffuseColor = nodeImmutable( PropertyNode, 'vec4', 'DiffuseColor' );
const roughness = nodeImmutable( PropertyNode, 'float', 'Roughness' );
const metalness = nodeImmutable( PropertyNode, 'float', 'Metalness' );
const clearcoat = nodeImmutable( PropertyNode, 'float', 'Clearcoat' );
const clearcoatRoughness = nodeImmutable( PropertyNode, 'float', 'ClearcoatRoughness' );
const sheen = nodeImmutable( PropertyNode, 'vec3', 'Sheen' );
const sheenRoughness = nodeImmutable( PropertyNode, 'float', 'SheenRoughness' );
const iridescence = nodeImmutable( PropertyNode, 'float', 'Iridescence' );
const iridescenceIOR = nodeImmutable( PropertyNode, 'float', 'IridescenceIOR' );
const iridescenceThickness = nodeImmutable( PropertyNode, 'float', 'IridescenceThickness' );
const alphaT = nodeImmutable( PropertyNode, 'float', 'AlphaT' );
const anisotropy = nodeImmutable( PropertyNode, 'float', 'Anisotropy' );
const anisotropyT = nodeImmutable( PropertyNode, 'vec3', 'AnisotropyT' );
const anisotropyB = nodeImmutable( PropertyNode, 'vec3', 'AnisotropyB' );
const specularColor = nodeImmutable( PropertyNode, 'color', 'SpecularColor' );
const specularF90 = nodeImmutable( PropertyNode, 'float', 'SpecularF90' );
const shininess = nodeImmutable( PropertyNode, 'float', 'Shininess' );
const output = nodeImmutable( PropertyNode, 'vec4', 'Output' );
const dashSize = nodeImmutable( PropertyNode, 'float', 'dashSize' );
const gapSize = nodeImmutable( PropertyNode, 'float', 'gapSize' );
const pointWidth = nodeImmutable( PropertyNode, 'float', 'pointWidth' );
const ior = nodeImmutable( PropertyNode, 'float', 'IOR' );
const transmission = nodeImmutable( PropertyNode, 'float', 'Transmission' );
const thickness = nodeImmutable( PropertyNode, 'float', 'Thickness' );
const attenuationDistance = nodeImmutable( PropertyNode, 'float', 'AttenuationDistance' );
const attenuationColor = nodeImmutable( PropertyNode, 'color', 'AttenuationColor' );

addNodeClass( 'PropertyNode', PropertyNode );

export { alphaT, anisotropy, anisotropyB, anisotropyT, attenuationColor, attenuationDistance, clearcoat, clearcoatRoughness, dashSize, PropertyNode as default, diffuseColor, gapSize, ior, iridescence, iridescenceIOR, iridescenceThickness, metalness, output, pointWidth, property, roughness, sheen, sheenRoughness, shininess, specularColor, specularF90, thickness, transmission, varyingProperty };
