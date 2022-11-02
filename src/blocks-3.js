import { registerBlock } from './utils/helper';

/**
 * Import Gutenburg Blocks here
 */

import * as Paragraph from './blocks/paragraph';
import * as List from './blocks/list';
import * as Video from './blocks/video';
import * as Headline from './blocks/headline';
import * as Image from './blocks/image';
import * as Preview from './blocks/preview';
import * as Divider from './blocks/divider';

/**
 * Function to register blocks provided by tbblocks.
 */
[Headline, Paragraph, List, Video, Image, Preview, Divider].forEach(registerBlock);
