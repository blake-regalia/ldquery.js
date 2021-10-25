import type {
	Union,
} from 'ts-toolbelt';

import type {
	Equals,
	Extends,
} from 'ts-toolbelt/out/Any/_api';

import type {
	And,
	Not,
	Or,
} from 'ts-toolbelt/out/Boolean/_api';

import type {
	If,
} from 'ts-toolbelt/out/Any/If';

import type {
	Merge,
} from 'ts-toolbelt/out/Object/_api';

import type {
	Join,
} from 'ts-toolbelt/out/String/_api';

import type {
	ASSERT_TRUE,
	ASSERT_FALSE,
	ASSERT_SAME,
	True,
	False,
	AsBool,
	Coerce,
	IsOnlyLiteralStrings,
	StringsMatch,
	ToPrimitiveBoolean,
	ActualStringsMatch,
} from './utility';

import {
	RdfMode_11,
	RdfMode_star,
	RdfMode_easier,
	SupportedRdfMode,
	DescribeRdfMode,
} from './const';

import {
	BypassDescriptor,
	Descriptor,
	FromQualifier,
	Qualifier,
} from './descriptor';


declare const debug_hint: unique symbol;

// Debug and Error types
type Debug<
	A extends any,
	Hint extends any,
> = {
	[debug_hint]: Hint;
} & A;

type InvalidTermTypeError<
	TermTypeString extends string,
	Disguise=unknown,
> = Debug<Disguise, `'${TermTypeString}' is an invalid value for the .termType property`>;

type IncompatibleTermTypeError<
	TermTypeString extends string,
	Category extends string,
	Disguise=unknown,
> = Debug<Disguise, `'${TermTypeString}' is an incompatible .termType value for ${Category}`>;



type FavorTermType<
	TermTypeSring extends string,
	KeysSet extends TermTypeKey=TermTypeKey,
> = Coerce<TermTypeSring, string, KeysSet>;


interface TermTypes {
	NamedNode: NamedNode;
	BlankNode: BlankNode;
	Literal: Literal;
	Variable: {};
	DefaultGraph: {};
	Quad: {};
}


type ValidTermTypes<
	KeysSet extends string,
	TermTypeStringA extends string,
	TermTypeStringB extends string,
> = And<
	If<
		IsOnlyLiteralStrings<TermTypeStringA>,
		Extends<TermTypeStringA, KeysSet>,
		True
	>,
	If<
		IsOnlyLiteralStrings<TermTypeStringB>,
		Extends<TermTypeStringB, KeysSet>,
		True
	>
>;

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const HS: ASSERT_FALSE<Extends<string, ObjectTypeKey>> = 1;
	const HN: ASSERT_TRUE<Extends<'NamedNode', ObjectTypeKey>> = 1;
	const HD: ASSERT_FALSE<Extends<'DefaultGraph', ObjectTypeKey<RdfMode_11>>> = 1;
	const HI: ASSERT_FALSE<Extends<'Invalid', ObjectTypeKey<RdfMode_11>>> = 1;

	const OSS: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, string, string>> = 1;
	const OSD: ASSERT_FALSE<ValidTermTypes<ObjectTypeKey<RdfMode_11>, string, 'DefaultGraph'>> = 1;
	const OSI: ASSERT_FALSE<ValidTermTypes<ObjectTypeKey<RdfMode_11>, string, 'Invalid'>> = 1;
	const ODS: ASSERT_FALSE<ValidTermTypes<ObjectTypeKey<RdfMode_11>, 'DefaultGraph', string>> = 1;
	const OIS: ASSERT_FALSE<ValidTermTypes<ObjectTypeKey, 'Invalid', string>> = 1;
	const ODD: ASSERT_FALSE<ValidTermTypes<ObjectTypeKey<RdfMode_11>, 'DefaultGraph', 'DefaultGraph'>> = 1;
	const ODI: ASSERT_FALSE<ValidTermTypes<ObjectTypeKey, 'DefaultGraph', 'Invalid'>> = 1;
	const OID: ASSERT_FALSE<ValidTermTypes<ObjectTypeKey, 'Invalid', 'DefaultGraph'>> = 1;
	const OII: ASSERT_FALSE<ValidTermTypes<ObjectTypeKey, 'Invalid', 'Invalid'>> = 1;

	const OSN: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, string, 'NamedNode'>> = 1;
	const ONS: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, 'NamedNode', string>> = 1;
	const ONN: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, 'NamedNode', 'NamedNode'>> = 1;
	const OND: ASSERT_FALSE<ValidTermTypes<ObjectTypeKey<RdfMode_11>, 'NamedNode', 'DefaultGraph'>> = 1;
	const ONI: ASSERT_FALSE<ValidTermTypes<ObjectTypeKey, 'NamedNode', 'Invalid'>> = 1;

	const OSB: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, string, 'BlankNode'>> = 1;
	const OBS: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, 'BlankNode', string>> = 1;
	const OBB: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, 'BlankNode', 'BlankNode'>> = 1;
	const OBD: ASSERT_FALSE<ValidTermTypes<ObjectTypeKey<RdfMode_11>, 'BlankNode', 'DefaultGraph'>> = 1;
	const OBI: ASSERT_FALSE<ValidTermTypes<ObjectTypeKey, 'BlankNode', 'Invalid'>> = 1;

	const OSL: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, string, 'Literal'>> = 1;
	const OLS: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, 'Literal', string>> = 1;
	const OLL: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, 'Literal', 'Literal'>> = 1;
	const OLD: ASSERT_FALSE<ValidTermTypes<ObjectTypeKey<RdfMode_11>, 'Literal', 'DefaultGraph'>> = 1;
	const OLI: ASSERT_FALSE<ValidTermTypes<ObjectTypeKey, 'Literal', 'Invalid'>> = 1;

	const ONB: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, 'NamedNode', 'BlankNode'>> = 1;
	const ONL: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, 'NamedNode', 'Literal'>> = 1;

	const OBN: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, 'BlankNode', 'NamedNode'>> = 1;
	const OBL: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, 'BlankNode', 'Literal'>> = 1;

	const OLN: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, 'Literal', 'NamedNode'>> = 1;
	const OLB: ASSERT_TRUE<ValidTermTypes<ObjectTypeKey, 'Literal', 'BlankNode'>> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}

export type Optional<z_arg> = z_arg | null | undefined;

/**
 * Union of all valid .termType string value types
 */
export type TermTypeKey = keyof TermTypes;

/**
 * The .termType string value type "NamedNode"
 */
export type NamedNodeTypeKey = Extract<TermTypeKey, 'NamedNode'>;

/**
 * The .termType string value type "BlankNode"
 */
export type BlankNodeTypeKey = Extract<TermTypeKey, 'BlankNode'>;

/**
 * The .termType string value type "Literal"
 */
export type LiteralTypeKey = Extract<TermTypeKey, 'Literal'>;

/**
 * The .termType string value type "DefaultGraph"
 */
export type DefaultGraphTypeKey = Extract<TermTypeKey, 'DefaultGraph'>;

/**
 * The .termType string value type "Quad"
 */
export type QuadTypeKey = Extract<TermTypeKey, 'Quad'>;

/**
 * The .termType string value type "Variable"
 */
export type VariableTypeKey = Extract<TermTypeKey, 'Variable'>;


/**
 * Union of NamedNode and BlankNode term types
 */
export type NodeTypeKey = NamedNodeTypeKey | BlankNodeTypeKey;

/**
 * Union of valid .termType string value types which only require the .termType and .value properties.
 */
export type TrivialTypeKey = NodeTypeKey | DefaultGraphTypeKey | VariableTypeKey;

/**
 * Union of valid .termType string value types which carry actual data.
 */
export type DataTypeKey = Exclude<TermTypeKey, VariableTypeKey>;

/**
 * Union of valid .termType string value types which carry actual data.
 */
export type ValuableTypeKey = Extract<TermTypeKey, NodeTypeKey | LiteralTypeKey | VariableTypeKey>;

/**
 * Union of valid .termType string value types which carry actual data.
 */
export type UnvaluableTypeKey = Exclude<TermTypeKey, ValuableTypeKey>;

/**
 * Union of valid .termType string value types which carry actual data and ARE NOT required to have an empty .value property.
 */
export type ValuableDataTypeKey = Extract<DataTypeKey, ValuableTypeKey>;

/**
 * Union of valid .termType string value types which carry actual data and ARE required to have an empty .value property.
 */
export type UnvaluableDataTypeKey = Exclude<DataTypeKey, ValuableDataTypeKey>;


/**
 * `<RdfMode extends AllowedRdfMode=RdfMode_11> => TermTypeKey`
 *
 * Returns the union of valid .termType string values for Terms that appear in the subject position for the given `RdfMode`
 */
export type SubjectTypeKey<
	RdfMode extends SupportedRdfMode=SupportedRdfMode,
> = Merge<
	{[K in RdfMode_11]: NodeTypeKey},
		Merge<
			{[K in RdfMode_star]: NodeTypeKey | QuadTypeKey},
			{[K in RdfMode_easier]: DataTypeKey}
		>
>[RdfMode];

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const _: ASSERT_SAME<SubjectTypeKey, DataTypeKey> = 1;
	const N: ASSERT_SAME<SubjectTypeKey<RdfMode_11>, NodeTypeKey> = 1;
	const S: ASSERT_SAME<SubjectTypeKey<RdfMode_star>, NodeTypeKey | QuadTypeKey> = 1;
	const E: ASSERT_SAME<SubjectTypeKey<RdfMode_easier>, DataTypeKey> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}


/**
 * `<RdfMode extends AllowedRdfMode=RdfMode_11> => TermTypeKey`
 *
 * Returns the union of valid .termType string values for Terms that appear in the predicate position for the given `RdfMode`
 */
export type PredicateTypeKey<
	RdfMode extends SupportedRdfMode=SupportedRdfMode,
> = Merge<
	{[K in RdfMode_11 | RdfMode_star]: NamedNodeTypeKey},
	{[K in RdfMode_easier]: DataTypeKey}
>[RdfMode];

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const _: ASSERT_SAME<PredicateTypeKey, DataTypeKey> = 1;
	const N: ASSERT_SAME<PredicateTypeKey<RdfMode_11>, NamedNodeTypeKey> = 1;
	const S: ASSERT_SAME<PredicateTypeKey<RdfMode_star>, NamedNodeTypeKey> = 1;
	const E: ASSERT_SAME<PredicateTypeKey<RdfMode_easier>, DataTypeKey> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}


/**
 * `<RdfMode extends AllowedRdfMode=RdfMode_11> => TermTypeKey`
 *
 * Returns the union of valid .termType string values for Terms that appear in the object position for the given `RdfMode`
 */
export type ObjectTypeKey<
	RdfMode extends SupportedRdfMode=SupportedRdfMode,
> = Merge<
	{[K in RdfMode_11]: ValuableDataTypeKey},
		Merge<
			{[K in RdfMode_star]: ValuableDataTypeKey | QuadTypeKey},
			{[K in RdfMode_easier]: DataTypeKey}
		>
>[RdfMode];

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const _: ASSERT_SAME<ObjectTypeKey, DataTypeKey> = 1;
	const N: ASSERT_SAME<ObjectTypeKey<RdfMode_11>, ValuableDataTypeKey> = 1;
	const S: ASSERT_SAME<ObjectTypeKey<RdfMode_star>, ValuableDataTypeKey | QuadTypeKey> = 1;
	const E: ASSERT_SAME<ObjectTypeKey<RdfMode_easier>, DataTypeKey> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}


/**
 * `<RdfMode extends AllowedRdfMode=RdfMode_11> => TermTypeKey`
 *
 * Returns the union of valid .termType string values for Terms that appear in the graph position for the given `RdfMode`
 */
export type GraphTypeKey<
	RdfMode extends SupportedRdfMode=SupportedRdfMode,
> = Merge<
	{[K in RdfMode_11 | RdfMode_star]: NodeTypeKey | DefaultGraphTypeKey},
	{[K in RdfMode_easier]: DataTypeKey}
>[RdfMode];

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const _: ASSERT_SAME<GraphTypeKey, DataTypeKey> = 1;
	const N: ASSERT_SAME<GraphTypeKey<RdfMode_11>, NodeTypeKey | DefaultGraphTypeKey> = 1;
	const S: ASSERT_SAME<GraphTypeKey<RdfMode_star>, NodeTypeKey | DefaultGraphTypeKey> = 1;
	const E: ASSERT_SAME<GraphTypeKey<RdfMode_easier>, DataTypeKey> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}


/**
 * `<RdfMode extends AllowedRdfMode=RdfMode_11> => TermTypeKey`
 *
 * Returns the union of valid .termType string values for Terms that appear in the datatype position for the given `RdfMode`
 */
export type DatatypeTypeKey<
	RdfMode extends SupportedRdfMode=SupportedRdfMode,
> = Merge<
	{[K in RdfMode_11 | RdfMode_star]: NamedNodeTypeKey},
	{[K in RdfMode_easier]: DataTypeKey}
>[RdfMode];

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const _: ASSERT_SAME<DatatypeTypeKey, DataTypeKey> = 1;
	const N: ASSERT_SAME<DatatypeTypeKey<RdfMode_11>, NamedNodeTypeKey> = 1;
	const S: ASSERT_SAME<DatatypeTypeKey<RdfMode_star>, NamedNodeTypeKey> = 1;
	const E: ASSERT_SAME<DatatypeTypeKey<RdfMode_easier>, DataTypeKey> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}



/**
 * Type for Term data as an argument
 */
export type TermDataArgument<
	a_descriptor extends Descriptor | BypassDescriptor = BypassDescriptor,
	s_term extends string=string,
> = a_descriptor extends Descriptor
	? AsTypedTermData<a_descriptor>
	: {
		// core
		termType: s_term;
		value: string;

		// literal
		language?: string;
		datatype?: Datatype;

		// quad
		subject?: TermDataArgument;
		predicate?: TermDataArgument;
		object?: TermDataArgument;
		graph?: TermDataArgument;
	};


/**
 * Base type for term data (i.e., no methods, just data fields)
 */
export type CoreData<
	a_descriptor extends Descriptor = Descriptor,
> = {
	termType: Descriptor.Access<a_descriptor, 'termType'>;
	value: Descriptor.Access<a_descriptor, 'value'>;
};

/**
 * Type for Literal term data (i.e., no methods, just data fields)
 */
export type LiteralData<
	a_descriptor extends Descriptor<LiteralTypeKey> = Descriptor<LiteralTypeKey>,
	> = Merge<CoreData<a_descriptor>, {
		language: Descriptor.Access<a_descriptor, 'language'>;
		datatype: DatatypeData<
			FromQualifier<[NamedNodeTypeKey, Descriptor.Access<a_descriptor, 'datatype'>]>
		>;
	}>;


/**
 * Type for quad term data (i.e., no methods, just data fields)
 */
export type QuadData<
	a_descriptor extends Descriptor<QuadTypeKey> = Descriptor<QuadTypeKey>,
> = Merge<CoreData<a_descriptor>, {
	subject: SubjectData<Descriptor.Access<a_descriptor, 'subject'>>;
	predicate: PredicateData<Descriptor.Access<a_descriptor, 'predicate'>>;
	object: ObjectData<Descriptor.Access<a_descriptor, 'object'>>;
	graph: GraphData<Descriptor.Access<a_descriptor, 'graph'>>;
}>;


type SafeTermType<
	a_descriptor extends Descriptor,
	s_term_restrict extends TermTypeKey,
	s_category extends string = Join<Union.ListOf<s_term_restrict>, ', '>,
	s_term extends string = Descriptor.Access<a_descriptor, 'termType'>,
> = s_term extends s_term_restrict
	? (s_term extends TermTypeKey
		? AsTypedTermData<a_descriptor>
		: never
	)
	: IncompatibleTermTypeError<s_term, s_category, CoreData>;


type BlankNodeData<
	a_descriptor extends Descriptor,
	s_category extends string = 'a blank node',
> = SafeTermType<a_descriptor, 'BlankNode', s_category>


type NamedNodeData<
	a_descriptor extends Descriptor,
	s_category extends string = 'a named node',
> = SafeTermType<a_descriptor, 'NamedNode', s_category>


type NodeData<
	a_descriptor extends Descriptor,
	s_category extends string = 'a node type',
> = SafeTermType<a_descriptor, NodeTypeKey, s_category>


type DatatypeData<
	a_descriptor extends Descriptor,
> = NamedNodeData<a_descriptor, 'a datatype'>;


type CategorySubjectPosition = 'the subject position';
type CategoryPredicatePosition = 'the predicate position';
type CategoryObjectPosition = 'the object position';
type CategoryGraphPosition = 'the graph position';

type ExplainPosition<
	Category extends string,
	RdfMode extends SupportedRdfMode,
> = `${Category} in ${DescribeRdfMode<RdfMode>}`;


/**
 * Type for subject argument
 */
export type SubjectArg<
	s_mode extends SupportedRdfMode=SupportedRdfMode,
> = SubjectData<FromQualifier<[SubjectTypeKey<s_mode>]>, s_mode>;


/**
 * Type for predicate argument
 */
export type PredicateArg<
	s_mode extends SupportedRdfMode = SupportedRdfMode,
> = PredicateData<FromQualifier<[PredicateTypeKey<s_mode>]>, s_mode>;


/**
 * Type for object argument
 */
export type ObjectArg<
	s_mode extends SupportedRdfMode=SupportedRdfMode,
> = ObjectData<FromQualifier<[ObjectTypeKey<s_mode>]>, s_mode>;

/**
 * Type for graph argument
 */
export type GraphArg<
	s_mode extends SupportedRdfMode = SupportedRdfMode,
	> = GraphData<FromQualifier<[GraphTypeKey<s_mode>]>, s_mode>;

/**
 * Type for quad argument
 */
export type QuadArg<
	s_mode extends SupportedRdfMode = SupportedRdfMode,
> = QuadData<FromQualifier<{termType:QuadTypeKey; mode:s_mode}>>;

type SHO = FromQualifier<{ termType: QuadTypeKey; mode: RdfMode_11 }>;
type INSPECT = QuadArg<RdfMode_easier>;

/**
 * Type for subject position term data
 */
export type SubjectData<
	a_descriptor extends Descriptor<SubjectTypeKey> = Descriptor<SubjectTypeKey>,
	s_mode extends SupportedRdfMode=Descriptor.Access<a_descriptor, 'mode'>,
	s_category extends string = ExplainPosition<CategorySubjectPosition, s_mode>,
> = Merge<
	{
		[K in RdfMode_11]: NodeData<a_descriptor, s_category>;
	},
	Merge<
		{
			[K in RdfMode_star]: SafeTermType<a_descriptor, SubjectTypeKey<s_mode>, s_category>;
		},
		{
			[K in RdfMode_easier]: AllowedTermType<a_descriptor, TermTypeKey>;
		}
	>
>[s_mode];


/**
 * Type for predicatte position term data
 */
export type PredicateData<
	a_descriptor extends Descriptor<PredicateTypeKey> = Descriptor<PredicateTypeKey>,
	s_mode extends SupportedRdfMode = Descriptor.Access<a_descriptor, 'mode'>,
	s_category extends string = ExplainPosition<CategoryPredicatePosition, s_mode>,
> = Merge<
	{
		[K in RdfMode_11 | RdfMode_star]: NamedNodeData<a_descriptor, s_category>;
	},
	{
		[K in RdfMode_easier]: AllowedTermType<a_descriptor, TermTypeKey>;
	}
>[s_mode];


/**
 * Type for object position term data
 */
export type ObjectData<
	a_descriptor extends Descriptor<ObjectTypeKey> = Descriptor<ObjectTypeKey>,
	s_mode extends SupportedRdfMode = Descriptor.Access<a_descriptor, 'mode'>,
	s_category extends string = ExplainPosition<CategoryObjectPosition, s_mode>,
> = Merge<
	{
		[K in RdfMode_11]: SafeTermType<a_descriptor, ObjectTypeKey<s_mode>, s_category>;
	},
	Merge<
		{
			[K in RdfMode_star]: SafeTermType<a_descriptor, ObjectTypeKey<s_mode>, s_category>;
		},
		{
			[K in RdfMode_easier]: AllowedTermType<a_descriptor, TermTypeKey>;
		}
	>
>[s_mode];


/**
 * Type for graph position term data
 */
export type GraphData<
	a_descriptor extends Descriptor<GraphTypeKey> = Descriptor<GraphTypeKey>,
	s_mode extends SupportedRdfMode = Descriptor.Access<a_descriptor, 'mode'>,
	s_category extends string = ExplainPosition<CategoryGraphPosition, s_mode>,
> = Merge<
	{
		[K in RdfMode_11 | RdfMode_star]: SafeTermType<a_descriptor, GraphTypeKey<s_mode>, s_category>;
	},
	{
		[K in RdfMode_easier]: AllowedTermType<a_descriptor, TermTypeKey>;
	}
>[s_mode];



/**
 * Routes to a term data type based on descriptor
 */
type AsTypedTermData<
	a_descriptor extends Descriptor,
> = Merge<
	{
		[K in QuadTypeKey]: a_descriptor extends Descriptor<QuadTypeKey>? QuadData<a_descriptor>: never;
		// 	Descriptor.Filter<a_descriptor, Descriptor.Access<a_descriptor, 'termType'>>
		// >;
	},
	Merge<
		{
			[K in LiteralTypeKey]: a_descriptor extends Descriptor<LiteralTypeKey>? LiteralData<a_descriptor>: never;
			// 	Descriptor.Filter<a_descriptor, Descriptor.Access<a_descriptor, 'termType'>>
			// >;
		},
		// Merge<
			{
				[K in TermTypeKey]: CoreData<
					Descriptor.Filter<a_descriptor, Descriptor.Access<a_descriptor, 'termType'>>
				>
			}
		// >
	>
>[Descriptor.Access<a_descriptor, 'termType'>];


type InputTermData<
	s_term extends string=TermTypeKey,
> = {
	termType: s_term;
	value: string;
	language?: string;
	datatype?: CoreData;
	subject?: InputTermData<SubjectTypeKey<SupportedRdfMode>>;
	predicate?: InputTermData<PredicateTypeKey<SupportedRdfMode>>;
	object?: InputTermData<ObjectTypeKey<SupportedRdfMode>>;
	graph?: InputTermData<GraphTypeKey<SupportedRdfMode>>;
}

export type FromTermData<
	g_data extends InputTermData,
> = FromQualifier<{
	termType: g_data['termType'];
	value: g_data['value'];
	language: g_data extends {language: string}? g_data['language']: void;
	datatype: g_data extends { datatype: TermDataArgument } ? g_data['datatype']['value'] : void;
	subject: g_data extends { subject: TermDataArgument } ? g_data['subject'] : void;
	predicate: g_data extends { predicate: TermDataArgument } ? g_data['predicate'] : void;
	object: g_data extends { object: TermDataArgument } ? g_data['object'] : void;
	graph: g_data extends { graph: TermDataArgument } ? g_data['graph'] : void;
	mode: g_data extends { mode: string } ? g_data['mode'] : void;
}>;

/**
 * Complements term data type with RDFJS methods
 */
type Term<
	z_qualifier_a extends Qualifier = BypassDescriptor,
> = FromQualifier<z_qualifier_a> extends infer a_descriptor_a
	? (a_descriptor_a extends Descriptor
		? Merge<
			AsTypedTermData<a_descriptor_a>,
			z_qualifier_a extends BypassDescriptor
			? {
				equals<
					z_other extends TermDataArgument | null | undefined,
				>(y_other: z_other): z_other extends null | undefined? false: boolean;
			}
			: {
				equals<
					z_other extends InputTermData,
				>(y_other: z_other): TermsEqual<a_descriptor_a, FromTermData<z_other>>;
			}
		>
		: never
	)
	: never;

// {
// 	type TEST = FromQualifier<['Literal', string, void, void]>;
// 	type LitDesc = Descriptor<'Literal'>;
// 	type SHO = TEST extends LitDesc? 'Y': 'N';
// 	type TEST1 = Term<['Literal', string, void, void]>;

// 	type F = TermDataArgument<BypassDescriptor, TermTypeKey>;
// 	type DD = FromQualifier<{
// 		termType: F['termType'];
// 		value: F['value'];
// 		language: F['language'];
// 		datatype: F['datatype']['value'];
// 	}>;
// 	type TK = DD extends Descriptor? 'Y': 'N';

// 	type S = FromQualifier<['Literal', string, void, void]>;
// 	type L = FromQualifier<['Literal', string, 'en', void]>;
// 	type EQ = TermsEqual<S, L>;
// }

type RawTermsEqual<
	a_descriptor_a extends Descriptor,
	a_descriptor_b extends Descriptor,

	s_term_a extends string=Descriptor.Access<a_descriptor_a, 'termType'>,
	s_term_b extends string=Descriptor.Access<a_descriptor_b, 'termType'>,
> = And<
		StringsMatch<s_term_a, s_term_b>,
		ActualStringsMatch<
			Descriptor.Access<a_descriptor_a, 'value'>,
			Descriptor.Access<a_descriptor_b, 'value'>
		>
	> extends infer b_terms_and_values_match
		// (TermType|Value)StringsMatch := a.(termType|value) === b.(termType|value)
		// ? (Not<AsBool<TermTypeAndValueStringsMatch>> extends True
		? (b_terms_and_values_match extends False
			// a.termType !== b.termType || a.value !== b.value
			? False
			// mixed termTypes and values
			: (Or<
				Equals<s_term_a, 'Literal'>,
				Equals<s_term_b, 'Literal'>
			> extends True
				// (a|b).termType === 'Literal'
				? If<
					Or<
						Not<StringsMatch<
							Descriptor.Access<a_descriptor_a, 'language'>,
							Descriptor.Access<a_descriptor_b, 'language'>
						>>,
						Not<StringsMatch<
							Descriptor.Access<a_descriptor_a, 'datatype'>,
							Descriptor.Access<a_descriptor_b, 'datatype'>
						>>
					>,
					// a.language !== b.language || a.datatype !== b.datatype
					False,
					// return a.language === b.language && a.datatype === b.datatype
					And<
						AsBool<b_terms_and_values_match>,
						And<
							StringsMatch<
								Descriptor.Access<a_descriptor_a, 'language'>,
								Descriptor.Access<a_descriptor_b, 'language'>
							>,
							StringsMatch<
								Descriptor.Access<a_descriptor_a, 'datatype'>,
								Descriptor.Access<a_descriptor_b, 'datatype'>
							>
						>
					>
				>
				: AsBool<b_terms_and_values_match>
			)
		)
		: never;

export type TermsEqual<
	a_descriptor_a extends Descriptor=Descriptor,
	a_descriptor_b extends Descriptor=Descriptor,
> = ToPrimitiveBoolean<
	RawTermsEqual<a_descriptor_a, a_descriptor_b>
>;




type AllowedTermType<
	a_descriptor extends Descriptor,
	s_term_restrict extends TermTypeKey,
	s_category extends string=Join<Union.ListOf<s_term_restrict>, ', '>,
	s_term extends string=Descriptor.Access<a_descriptor, 'termType'>,
> = s_term extends s_term_restrict
	? AsTypedTermData<a_descriptor>
	: InvalidTermTypeError<s_term, CoreData>;




export type NamedNode<
	s_value extends string=string,
> = Term<['NamedNode', s_value]>;

export type BlankNode<
	s_value extends string=string,
> = Term<['BlankNode', s_value]>;

export type Literal<
	s_value extends string=string,
	s_language extends string|void=string,
	s_datatype extends string|void=string,
> = Term<['Literal', s_value, s_language, s_datatype]>;

export type DefaultGraph = Term<['DefaultGraph', '']>;

export type Variable<
	s_value extends string=string,
> = Term<['Variable', s_value]>;

export type Datatype<
	s_datatype extends string=string,
> = NamedNode<s_datatype>;

export type Node<
	s_term extends string=TermTypeKey,
	s_value extends string=string,
> = FavorTermType<s_term> extends infer s_favored
	? (s_favored extends NodeTypeKey
		? {
			[K in NodeTypeKey]: Term<[s_favored, s_value]>
		}[s_favored]
		: never
	)
	: never;

export type Subject<
	s_term extends string=string,
	s_value extends string=string,
> = Node<s_term, s_value>;

export type Predicate<
	s_term extends string=string,
	s_value extends string=string,
> = s_term extends `${infer ActualTermTypeString}`
	? (ActualTermTypeString extends NamedNodeTypeKey
		? NamedNode<s_value>
		: never
	)
	: NamedNode<s_value>;

export type Object<
	s_term extends string=string,
	s_value extends string=string,
	s_language extends string=string,
	s_datatype extends string=string,
> = s_term extends `${infer ActualTermTypeString}`
	? (ActualTermTypeString extends NodeTypeKey
		? Node<ActualTermTypeString, s_value>
		: (ActualTermTypeString extends LiteralTypeKey
			? Literal<ActualTermTypeString, s_language, s_datatype>
			: never)
	)
	: Node<s_term, s_value> | Literal<s_value, s_language, s_datatype>;

export type Graph<
	s_term extends string=string,
	s_value extends string=string,
> = s_term extends `${infer ActualTermTypeString}`
	? Node<ActualTermTypeString, s_value> | DefaultGraph
	: Node<s_term, s_value> | DefaultGraph;




// // TermTypesAnd

// // SrcTermTypeString extends `${infer ActualSrcTermTypeString}`
// // 	? (ArgTermTypeString extends `${infer ActualArgTermTypeString}`
// // 		? (ActualArgTermTypeString extends ActualSrcTermTypeString

// // 		)
// // 		: boolean
// // 	)
// // 	: boolean;


// type QuadsMatch<
// 	TermTypeStringA extends string,
// 	ValueStringA extends string,
// 	s_languageA extends string,
// 	s_datatypeA extends string,

// 	SubjectTermTypeStringA extends string,
// 	SubjectValueStringA extends string,
// 	PredicateTermTypeStringA extends string,
// 	PredicateValueStringA extends string,
// 	ObjectTermTypeStringA extends string,
// 	ObjectValueStringA extends string,
// 	Objects_languageA extends string,
// 	Objects_datatypeA extends string,
// 	GraphTermTypeStringA extends string,
// 	GraphValueStringA extends string,

// 	TermTypeStringB extends string,
// 	ValueStringB extends string,
// 	s_languageB extends string,
// 	s_datatypeB extends string,

// 	SubjectTermTypeStringB extends string,
// 	SubjectValueStringB extends string,
// 	PredicateTermTypeStringB extends string,
// 	PredicateValueStringB extends string,
// 	ObjectTermTypeStringB extends string,
// 	ObjectValueStringB extends string,
// 	Objects_languageB extends string,
// 	Objects_datatypeB extends string,
// 	GraphTermTypeStringB extends string,
// 	GraphValueStringB extends string,
// > = And<
// 	And<
// 		And<
// 			StringPairsMatch<SubjectTermTypeStringA, SubjectTermTypeStringB, SubjectValueStringA, SubjectValueStringB>,
// 			StringPairsMatch<PredicateTermTypeStringA, PredicateTermTypeStringB, PredicateValueStringA, PredicateValueStringB>,
// 		>,
// 		ObjectsEqual<
// 			ObjectTermTypeStringA,
// 			ObjectValueStringA,
// 			Objects_languageA,
// 			Objects_datatypeA,
// 			ObjectTermTypeStringB,
// 			ObjectValueStringB,
// 			Objects_languageB,
// 			Objects_datatypeB,
// 		>,
// 	>,
// 	StringPairsMatch<GraphTermTypeStringA, GraphTermTypeStringB, GraphValueStringA, GraphValueStringB>,
// >;

// // {
// //     const SsSs: StringPairsMatch<string,      string,      string, string> = EITHER;

// //     const SsSv: StringPairsMatch<string,      string,      string, 'z://'> = EITHER;
// //     const SvSs: StringPairsMatch<string,      string,      'z://', string> = EITHER;
// //     const SsNs: StringPairsMatch<string,      'NamedNode', string, string> = EITHER;
// //     const NsSs: StringPairsMatch<'NamedNode', string,      string, string> = EITHER;

// //     const SvSv: StringPairsMatch<string,      string,      'z://', 'z://'> = EITHER;
// //     const SvSx: StringPairsMatch<string,      string,      'z://', 'y://'> = FALSE;
// //     const SsNv: StringPairsMatch<string,      'NamedNode', string, 'z://'> = EITHER;
// //     const SvNs: StringPairsMatch<string,      'NamedNode', 'z://', string> = EITHER;
// //     const NsSv: StringPairsMatch<'NamedNode', string,      string, 'z://'> = EITHER;
// //     const NvSs: StringPairsMatch<'NamedNode', string,      'z://', string> = EITHER;
// //     const NsNs: StringPairsMatch<'NamedNode', 'NamedNode', string, string> = EITHER;
// //     const NsBs: StringPairsMatch<'NamedNode', 'BlankNode', string, string> = FALSE;

// //     const SvNv: StringPairsMatch<string,      'NamedNode', 'z://', 'z://'> = EITHER;
// //     const SvNx: StringPairsMatch<string,      'NamedNode', 'z://', 'y://'> = FALSE;
// //     const NvNs: StringPairsMatch<'NamedNode', 'NamedNode', 'z://', string> = EITHER;
// //     const NvBs: StringPairsMatch<'NamedNode', 'BlankNode', 'z://', string> = FALSE;
// //     const NsNv: StringPairsMatch<'NamedNode', 'NamedNode', string, 'z://'> = EITHER;
// //     const NsBv: StringPairsMatch<'NamedNode', 'BlankNode', string, 'z://'> = FALSE;
// //     const NvSv: StringPairsMatch<'NamedNode', string,      'z://', 'z://'> = EITHER;
// //     const NvSx: StringPairsMatch<'NamedNode', string,      'z://', 'y://'> = FALSE;
// //     const NvNv: StringPairsMatch<'NamedNode', 'NamedNode', 'z://', 'z://'> = TRUE;
// //     const NvNx: StringPairsMatch<'NamedNode', 'NamedNode', 'z://', 'y://'> = FALSE;
// //     const NvBv: StringPairsMatch<'NamedNode', 'BlankNode', 'z://', 'z://'> = FALSE;
// //     const NvBx: StringPairsMatch<'NamedNode', 'BlankNode', 'z://', 'x://'> = FALSE;
// // }


// export type Quad<
// 	SubjectTermTypeStringA extends string=string,
// 	SubjectValueStringA extends string=string,
// 	PredicateTermTypeStringA extends string=string,
// 	PredicateValueStringA extends string=string,
// 	ObjectTermTypeStringA extends string=string,
// 	ObjectValueStringA extends string=string,
// 	Objects_languageA extends string=string,
// 	Objects_datatypeA extends string=string,
// 	GraphTermTypeStringA extends string=string,
// 	GraphValueStringA extends string=string,
// > = {
// 	type: 'Quad';
// 	value: '';
// 	equals<
// 		TypeB extends BasicTerm=BasicTerm,
// 		// TermTypeStringB extends string=string,
// 		// ValueStringB extends string=string,
// 		// SubjectTermTypeStringB extends string=string,
// 		// SubjectValueStringB extends string=string,
// 		// PredicateTermTypeStringB extends string=string,
// 		// PredicateValueStringB extends string=string,
// 		// ObjectTermTypeStringB extends string=string,
// 		// ObjectValueStringB extends string=string,
// 		// Objects_languageB extends string=string,
// 		// Objects_datatypeB extends string=string,
// 		// GraphTermTypeStringB extends string=string,
// 		// GraphValueStringB extends string=string,
// 	>(y_other: TypeB):
// 		TypeB extends Quad<infer TermTypeStringB, ValueStringB, >l

// 		OtherType extends Term<OtherTermType, OtherValueString>
// 			? OtherTermTypeString extends `${infer ActualOtherTermTypeString}`
// 				? (ActualOtherTermTypeString extends 'Quad'
// 				? (And<StringsMatch<SubjectTermTypeString, OtherSubjectTermTypeString>, StringsMatch<SubjectValueString, OtherSubjectValueString>> extends infer SubjectsMatch
// 					? (StringsMatch<PredicateValueString, OtherPredicateValueString> extends infer PredicatesMatch
// 						? (And<
// 								And<
// 									And<
// 										StringsMatch<ObjectTermTypeString, OtherObjectTermTypeString>,
// 										StringsMatch<ObjectValueString, OtherObjectTermTypeString>
// 									>,
// 									StringsMatch<Objects_language, OtherObjects_language>
// 						>)
// 						? And<And<And<SubjectsMatch, PredicatesMatch>, ObjectsEqual>, GraphsMatch>


// 					? (OtherValueString extends `${infer ActualOtherValueString}`
// 						? (ActualOtherValueString extends ''
// 							? (OtherType extends Quad<
// 								OtherSubjectTermTypeString,
// 								OtherSubjectValueString,
// 								OtherPredicateTermTypeString,
// 								OtherPredicateValueString,
// 								OtherObjectTermTypeString,
// 								OtherObjectValueString,
// 								OtherObjects_language,
// 								OtherObjects_datatype,
// 								OtherGraphTermTypeString,
// 								OtherGraphValueString,
// 							>
// 								? (OtherSubjectTermTypeString extends `${infer ActualOtherSubjectTermTypeString}`
// 									? (ActualOtherSubjectTermTypeString extends SubjectTermTypeString
// 										? (

// 										)
// 										: false
// 									)
// 									: boolean
// 								)
// 								: booleann
// 							)
// 							: false
// 						)
// 						: false  // other.value
// 					)
// 					: never  // other.termType !== 'Quad'
// 				)
// 				: boolean
// 			: boolean;


// 			(TermTypeString extends `${infer ActualTermTypeString}`
// 				? TermTypeString extends TermTypeKey
// 					? OtherTermType extends `${infer ActualOtherTermTypeString}`
// 						? ActualOtherTermTypeString extends ActualTermTypeString
// 							// this.termType === other.termType
// 							? ValueString extends `${infer ActualValueString}`
// 								? OtherValueString extends `${infer ActualOtherValueString}`
// 									? ActualOtherValueString extends ActualValueString
// 										? true  // this.value === other.value
// 										: false  // this.value !== other.value
// 									: boolean
// 								: boolean
// 							// this.termType !== other.termType
// 							: false
// 						: boolean
// 					: boolean
// 				: never)  // !RDFJS.TermTypes.includes(this.termType)
// 			& (ValueString extends `${infer ActualValueString}`
// 				? OtherValueString extends `${infer ActualOtherValueString}`
// 					? ActualOtherValueString extends ActualValueString
// 						? boolean  // this.value === other.value
// 						: false  // this.value !== other.value
// 					: boolean
// 				: boolean);

// 	subject: Subject<SubjectTermTypeString, SubjectValueString>;
// 	predicate: Predicate<PredicateTermTypeString, PredicateValueString>;
// 	object: Object<ObjectTermTypeString, ObjectValueString, Objects_language, Objects_datatype>;
// 	graph: Graph<GraphTermTypeString, GraphValueString>;
// };

// let ggg!: Quad<'NamedNode', 'hi'>;
// let g2!: Quad<'NamedNode', 'hi'>;
// const fff = ggg.equals(g2);
