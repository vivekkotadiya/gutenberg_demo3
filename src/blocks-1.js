import { registerBlock } from './utils/helper';

// Styles
// index.scss name implies editor styles. Output will be tbblocks-1.js.
import './styles/index.scss';
// style.scss name implies frontend styles. Output will be style-tbblocks-1.js.
import './styles/style.scss';

/**
 * Plugins for exsiting gutenburg code
 */

import * as pagemeta from './seo-plugin';

/**
 * Import Gutenburg Blocks here
 */

import * as postcontent from './blocks/postcontent';
import * as section from './blocks/section';
import * as row from './blocks/row';
import * as column from './blocks/column';

/**
 * Function to register blocks provided by tbblocks.
 */
[postcontent, section, row, column].forEach(registerBlock);
