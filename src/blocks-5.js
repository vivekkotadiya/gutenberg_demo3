import { registerBlock } from './utils/helper';

/**
 * Import Gutenburg Blocks here
 */

import * as Map from './blocks/map';
import * as Button from './blocks/button';
import * as IconBoxItem from './blocks/iconbox/iconboxitem';
import * as IconBox from './blocks/iconbox';
import * as Person from './blocks/contactperson/person';
import * as PersonCollection from './blocks/contactperson';
import * as ContactForm from './blocks/contactform';

/**
 * Function to register blocks provided by tbblocks.
 */
[
	Map,
	Button,
	IconBoxItem,
	IconBox,
	Person,
	PersonCollection,
	ContactForm,
].forEach(registerBlock);
