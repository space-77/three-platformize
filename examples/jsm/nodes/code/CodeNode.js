import Node, { addNodeClass } from '../core/Node.js';
import { nodeProxy } from '../shadernode/ShaderNode.js';

class CodeNode extends Node {

	constructor( code = '', includes = [], language = '' ) {

		super( 'code' );

		this.isCodeNode = true;

		this.code = code;
		this.language = language;

		this.includes = includes;

	}

	isGlobal() {

		return true;

	}

	setIncludes( includes ) {

		this.includes = includes;

		return this;

	}

	getIncludes( /*builder*/ ) {

		return this.includes;

	}

	generate( builder ) {

		const includes = this.getIncludes( builder );

		for ( const include of includes ) {

			include.build( builder );

		}

		const nodeCode = builder.getCodeFromNode( this, this.getNodeType( builder ) );
		nodeCode.code = this.code;

		return nodeCode.code;

	}

	serialize( data ) {

		super.serialize( data );

		data.code = this.code;
		data.language = this.language;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.code = data.code;
		this.language = data.language;

	}

}

const code = nodeProxy( CodeNode );

const js = ( src, includes ) => code( src, includes, 'js' );
const wgsl = ( src, includes ) => code( src, includes, 'wgsl' );
const glsl = ( src, includes ) => code( src, includes, 'glsl' );

addNodeClass( 'CodeNode', CodeNode );

export { code, CodeNode as default, glsl, js, wgsl };
