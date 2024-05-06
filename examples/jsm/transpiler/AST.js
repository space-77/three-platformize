class Program {

	constructor() {

		this.body = [];

		this.isProgram = true;

	}

}

class VariableDeclaration {

	constructor( type, name, value = null, next = null, immutable = false ) {

		this.type = type;
		this.name = name;
		this.value = value;
		this.next = next;

		this.immutable = immutable;

		this.isVariableDeclaration = true;

	}

}

class Uniform {

	constructor( type, name ) {

		this.type = type;
		this.name = name;

		this.isUniform = true;

	}

}

class Varying {

	constructor( type, name ) {

		this.type = type;
		this.name = name;

		this.isVarying = true;

	}

}

class FunctionParameter {

	constructor( type, name, qualifier = null, immutable = true ) {

		this.type = type;
		this.name = name;
		this.qualifier = qualifier;
		this.immutable = immutable;

		this.isFunctionParameter = true;

	}

}

class FunctionDeclaration {

	constructor( type, name, params = [] ) {

		this.type = type;
		this.name = name;
		this.params = params;
		this.body = [];

		this.isFunctionDeclaration = true;

	}

}

class Expression {

	constructor( expression ) {

		this.expression = expression;

		this.isExpression = true;

	}

}

class Ternary {

	constructor( cond, left, right ) {

		this.cond = cond;
		this.left = left;
		this.right = right;

		this.isTernary = true;

	}

}

class Operator {

	constructor( type, left, right ) {

		this.type = type;
		this.left = left;
		this.right = right;

		this.isOperator = true;

	}

}


class Unary {

	constructor( type, expression, after = false ) {

		this.type = type;
		this.expression = expression;
		this.after = after;

		this.isUnary = true;

	}

}

class Number {

	constructor( value, type = 'float' ) {

		this.type = type;
		this.value = value;

		this.isNumber = true;

	}

}

class String {

	constructor( value ) {

		this.value = value;

		this.isString = true;

	}

}


class Conditional {

	constructor( cond = null ) {

		this.cond = cond;

		this.body = [];
		this.elseConditional = null;

		this.isConditional = true;

	}

}

class FunctionCall {

	constructor( name, params = [] ) {

		this.name = name;
		this.params = params;

		this.isFunctionCall = true;

	}

}

class Return {

	constructor( value ) {

		this.value = value;

		this.isReturn = true;

	}

}

class Accessor {

	constructor( property ) {

		this.property = property;

		this.isAccessor = true;

	}

}

class StaticElement {

	constructor( value ) {

		this.value = value;

		this.isStaticElement = true;

	}

}

class DynamicElement {

	constructor( value ) {

		this.value = value;

		this.isDynamicElement = true;

	}

}

class AccessorElements {

	constructor( property, elements = [] ) {

		this.property = property;
		this.elements = elements;

		this.isAccessorElements = true;

	}

}

class For {

	constructor( initialization, condition, afterthought ) {

		this.initialization = initialization;
		this.condition = condition;
		this.afterthought = afterthought;

		this.body = [];

		this.isFor = true;

	}

}

export { Accessor, AccessorElements, Conditional, DynamicElement, Expression, For, FunctionCall, FunctionDeclaration, FunctionParameter, Number, Operator, Program, Return, StaticElement, String, Ternary, Unary, Uniform, VariableDeclaration, Varying };
