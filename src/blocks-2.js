import { registerBlock } from './utils/helper';

/**
 * Import Gutenburg Blocks here
 */

import * as Header from './blocks/header';
import * as Navigation from './blocks/header/navigation';
import * as Breadcum from './blocks/header/breadcum';
import * as Footer from './blocks/footer';
import * as FooterInfo from './blocks/footer/contact';

/**
 * Function to register blocks provided by tbblocks.
 */
[Header, Navigation, Breadcum, Footer, FooterInfo].forEach(registerBlock);
