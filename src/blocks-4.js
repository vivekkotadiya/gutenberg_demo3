import { registerBlock } from './utils/helper';

/**
 * Import Gutenburg Blocks here
 */

import * as Timeline from './blocks/timeline';
import * as TimelineItem from './blocks/timeline/timelineitem';
import * as Slider from './blocks/slider';
import * as SliderItem from './blocks/slider/sliderItem';
import * as LogoSlider from './blocks/logoSlider';
import * as LogoSliderItem from './blocks/logoSlider/logoSliderItem';
import * as TabSlider from './blocks/tabSlider';
import * as TabSliderItem from './blocks/tabSlider/tabSliderItem';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	Timeline,
	TimelineItem,
	Slider,
	SliderItem,
	LogoSlider,
	LogoSliderItem,
	TabSlider,
	TabSliderItem,
].forEach(registerBlock);
