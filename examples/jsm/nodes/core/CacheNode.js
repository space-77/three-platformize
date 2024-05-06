import Node, { addNodeClass } from './Node.js';
import NodeCache from './NodeCache.js';
import { nodeProxy, addNodeElement } from '../shadernode/ShaderNode.js';

class CacheNode extends Node {

	constructor( node, cache = new NodeCache() ) {

		super();

		this.isCacheNode = true;

		this.node = node;
		this.cache = cache;

	}

	getNodeType( builder ) {

		return this.node.getNodeType( builder );

	}

	build( builder, ...params ) {

		const previousCache = builder.getCache();
		const cache = this.cache || builder.globalCache;

		builder.setCache( cache );

		const data = this.node.build( builder, ...params );

		builder.setCache( previousCache );

		return data;

	}

}

const cache = nodeProxy( CacheNode );
const globalCache = ( node ) => cache( node, null );

addNodeElement( 'cache', cache );
addNodeElement( 'globalCache', globalCache );

addNodeClass( 'CacheNode', CacheNode );

export { cache, CacheNode as default, globalCache };
