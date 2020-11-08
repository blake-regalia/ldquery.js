
import {DataFactory} from '@graphy/core';

import FactorySuite from '../../helper/factory-suite.mjs';

(new FactorySuite({
	export: '@graphy/core',
	factory: DataFactory,
})).run();
