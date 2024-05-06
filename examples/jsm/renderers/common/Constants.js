const AttributeType = {
	VERTEX: 1,
	INDEX: 2,
	STORAGE: 4
};

// size of a chunk in bytes (STD140 layout)

const GPU_CHUNK_BYTES = 16;

// @TODO: Move to src/constants.js

const BlendColorFactor = 211;
const OneMinusBlendColorFactor = 212;

export { AttributeType, BlendColorFactor, GPU_CHUNK_BYTES, OneMinusBlendColorFactor };
