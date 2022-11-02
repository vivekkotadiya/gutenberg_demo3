/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { times, isEqual, isEmpty } from 'lodash';
import { Button, PanelBody, ToggleControl } from '@wordpress/components';
import { Component, Fragment, createContext } from '@wordpress/element';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import memize from 'memize';
import DisplaySettings from '../../utils/block-helpers';

/**
 * Module Constants
 */
const { Consumer, Provider } = createContext();

const ALLOWED_BLOCKS = ['tbblocks/timelineitem'];

const getPanesTemplate = memize((panes) =>
	times(panes, (index) => ['tbblocks/timelineitem', { itemId: ++index }])
);

class Edit extends Component {
	constructor() {
		super(...arguments);

		this.changeState = this.changeState.bind(this);
		this.addNewItem = this.addNewItem.bind(this);
		this.removeNewItem = this.removeNewItem.bind(this);
		this.getState = this.getState.bind(this);

		this.updateContentAttributes = this.updateContentAttributes.bind(this);

		this.state = {
			currentItem: 1,
			selectedItem: 0,
			isLockedPaddings: false,
		};
	}

	changeState(param, value) {
		this.setState({ [param]: value });
	}

	getState(value) {
		return this.state[value];
	}

	setInnerBlocksAttributes(callFrom = 'mount', prevProps, prevState) {
		const { select, dispatch } = window.wp.data;

		if (callFrom == 'Update') {
			if (isEqual(this.props.attributes, prevProps.attributes)) {
				return;
			}
		}

		const { getBlock } = select('core/block-editor');
		const block = getBlock(this.props.clientId);

		let innerBlocksOuter;
		if (block) {
			innerBlocksOuter = block.innerBlocks;
		}
		if (innerBlocksOuter) {
			if (innerBlocksOuter.length) {
				innerBlocksOuter.forEach(function (item, index) {
					if (
						(callFrom == 'Mount' &&
							isEmpty(item.attributes.outerParent)) ||
						callFrom == 'Update'
					) {
						//Inner blocks
						dispatch('core/block-editor').updateBlockAttributes(
							item.clientId,
							{}
						);
					}
				});
			}
		}
	}

	updateContentAttributes(contentBlockId) {
		const { dispatch, select } = window.wp.data;
		const { clientId } = this.props;

		const innerBlocksOuter =
			select('core/block-editor').getBlock(clientId).innerBlocks;

		innerBlocksOuter.forEach(function (item, index) {
			if (isEqual(contentBlockId, item.innerBlocks[0].clientId)) {
				dispatch('core/block-editor').updateBlockAttributes(
					contentBlockId,
					{}
				);
			}
		});
	}

	addNewItem(nextSlide) {
		const { setAttributes } = this.props;
		const { ItemArrays } = this.props.attributes;

		const items = JSON.parse(ItemArrays);
		const { changeState, getState } = this;

		if (items.length < nextSlide) {
			const amount = Math.abs(nextSlide - items.length);

			times(amount, (index) => {
				const itemNumber = nextSlide - index;

				items.push(
					//translators: %d is a counter 1, 2, 3
					sprintf(__('Item %d'), itemNumber)
				);
			});

			setAttributes({
				ItemArrays: JSON.stringify(items),
				itemCount: nextSlide,
			});
		} else {
			if (nextSlide - 1 < getState('selectedItem')) {
				changeState('selectedItem', nextSlide - 1);
				changeState('currentItem', nextSlide);
			}

			setAttributes({
				ItemArrays: JSON.stringify(items.slice(0, nextSlide)),
				itemCount: nextSlide,
			});
		}
	}

	removeNewItem(currentItem) {
		const { setAttributes } = this.props;
		const { ItemArrays } = this.props.attributes;

		const items = JSON.parse(ItemArrays);

		const { changeState, getState } = this;

		if (items.length == currentItem) {
			const amount = Math.abs(currentItem - items.length);

			times(amount, (index) => {
				const itemNumber = currentItem - index;

				items.push(
					//translators: %d is a counter 1, 2, 3
					sprintf(__('Item %d'), itemNumber)
				);
			});

			setAttributes({
				ItemArrays: JSON.stringify(items),
				itemCount: currentItem,
			});
		} else {
			if (currentItem - 1 < getState('selectedItem')) {
				changeState('selectedItem', currentItem - 1);
				changeState('currentItem', currentItem);
			}

			setAttributes({
				ItemArrays: JSON.stringify(items.slice(0, currentItem)),
				itemCount: currentItem,
			});
		}
	}

	componentDidMount() {
		this.setInnerBlocksAttributes('Mount');
	}

	componentDidUpdate(prevProps, prevState) {
		this.setInnerBlocksAttributes('Update', prevProps, prevState);
	}

	render() {
		const { changeState, getState } = this;
		const { itemCount, hideXS, hideMD, hideLG } = this.props.attributes;

		const { setAttributes } = this.props;

		const { addNewItem, removeNewItem } = this;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Display', 'tabler')}
						initialOpen={true}
					>
						<ToggleControl
							label="Hide on Smartphone"
							checked={hideXS}
							onChange={() =>
								setAttributes({
									hideXS: !hideXS,
								})
							}
						/>
						<ToggleControl
							label="Hide on Tablet"
							checked={hideMD}
							onChange={() =>
								setAttributes({
									hideMD: !hideMD,
								})
							}
						/>
						<ToggleControl
							label="Hide on Desktop"
							checked={hideLG}
							onChange={() =>
								setAttributes({
									hideLG: !hideLG,
								})
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div
					className={classnames(
						`timeline timeline--current-item-${getState(
							'currentItem'
						)}${DisplaySettings(this.props.attributes)}`
					)}
				>
					<div className={`timeline__content`}>
						<Provider value={this}>
							<InnerBlocks
								template={getPanesTemplate(itemCount)}
								templateLock="all"
								templateInsertUpdatesSelection={true}
								allowedBlocks={ALLOWED_BLOCKS}
							/>
						</Provider>
					</div>
					<div className="timeline__connector"></div>
				</div>
				<ul className={`timeline__titles`}>
					<Fragment>
						<li className="timeline__add-item">
							<Button
								icon="insert"
								onClick={() => addNewItem(itemCount + 1)}
								label={__('Add Item')}
							>
								Add Item
							</Button>
						</li>
						<li className="timeline__remove-item">
							<Button
								icon="dismiss"
								onClick={() => removeNewItem(itemCount - 1)}
								label={__('Remove Item')}
							>
								Remove Item
							</Button>
						</li>
					</Fragment>
				</ul>
			</Fragment>
		);
	}
}
export default compose(
	withSelect((select, props) => {
		const { getBlocks } = select('core/block-editor');

		return {
			childInnerBlocks: getBlocks(props.clientId),
		};
	})
)(Edit);

export { Consumer };
