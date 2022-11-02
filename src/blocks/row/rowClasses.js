/**
 * Return row Dynamic generated Classes
 */

function rowClasses(attributes) {
	const {
		xlAlignH,
		lgAlignH,
		mdAlignH,
		smAlignH,
		xsAlignH,
		xlAlignV,
		lgAlignV,
		mdAlignV,
		smAlignV,
		xsAlignV,
		xlReverseCol,
		lgReverseCol,
		mdReverseCol,
		smReverseCol,
		xsReverseCol,
		colheight,
		contentwidth,
		colgap,
	} = attributes;

	let rowClasses = '';

	// Horizontal
	if (
		xsAlignH == smAlignH &&
		smAlignH == mdAlignH &&
		mdAlignH == lgAlignH &&
		lgAlignH == xlAlignH
	) {
		rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
	} else if (
		smAlignH == mdAlignH &&
		mdAlignH == lgAlignH &&
		lgAlignH == xlAlignH
	) {
		rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
		rowClasses += smAlignH != '' ? ' row--sm-' + smAlignH : '';
	} else if (mdAlignH == lgAlignH && lgAlignH == xlAlignH) {
		if (xsAlignH == smAlignH) {
			rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
			rowClasses += mdAlignH != '' ? ' row--md-' + mdAlignH : '';
		} else if (xsAlignH != smAlignH && smAlignH == mdAlignH) {
			rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
			rowClasses += smAlignH != '' ? ' row--sm-' + smAlignH : '';
		} else {
			rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
			rowClasses += smAlignH != '' ? ' row--sm-' + smAlignH : '';
			rowClasses += mdAlignH != '' ? ' row--md-' + mdAlignH : '';
		}
	} else if (lgAlignH == xlAlignH) {
		if (xsAlignH == smAlignH && smAlignH == mdAlignH) {
			rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
		} else {
			if (xsAlignH == smAlignH) {
				rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
			} else if (smAlignH == mdAlignH) {
				rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
				rowClasses += smAlignH != '' ? ' row--sm-' + smAlignH : '';
			} else if (xsAlignH == smAlignH && mdAlignH == lgAlignH) {
				rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
				rowClasses += mdAlignH != '' ? ' row--md-' + mdAlignH : '';
			} else {
				rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
				rowClasses += smAlignH != '' ? ' row--sm-' + smAlignH : '';
			}
			rowClasses +=
				smAlignH != mdAlignH && mdAlignH != ''
					? ' row--md-' + mdAlignH
					: '';
		}
		rowClasses += lgAlignH != '' ? ' row--lg-' + lgAlignH : '';
	} else {
		if (
			xsAlignH != smAlignH &&
			smAlignH != mdAlignH &&
			mdAlignH != lgAlignH &&
			lgAlignH != xlAlignH
		) {
			rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
			rowClasses += smAlignH != '' ? ' row--sm-' + smAlignH : '';
			rowClasses += mdAlignH != '' ? ' row--md-' + mdAlignH : '';
			rowClasses += lgAlignH != '' ? ' row--lg-' + lgAlignH : '';
			rowClasses += xlAlignH != '' ? ' row--xl-' + xlAlignH : '';
		} else if (
			xsAlignH == smAlignH &&
			smAlignH == mdAlignH &&
			mdAlignH == lgAlignH
		) {
			rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
		} else {
			if (xsAlignH == smAlignH && smAlignH == mdAlignH) {
				rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
			} else if (xsAlignH == smAlignH) {
				rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
			}
			if (xsAlignH != smAlignH && smAlignH == mdAlignH) {
				rowClasses += xsAlignH != '' ? ' row--xs-' + xsAlignH : '';
				rowClasses += smAlignH != '' ? ' row--sm-' + smAlignH : '';
			} else if (mdAlignH == lgAlignH) {
				rowClasses += mdAlignH != '' ? ' row--md-' + mdAlignH : '';
			}
			if (mdAlignH == xlAlignH) {
				if (smAlignH != mdAlignH) {
					rowClasses += mdAlignH != '' ? ' row--md-' + mdAlignH : '';
				}
				rowClasses += lgAlignH != '' ? ' row--lg-' + lgAlignH : '';
				rowClasses += xlAlignH != '' ? ' row--xl-' + xlAlignH : '';
			}
		}

		rowClasses +=
			mdAlignH != xlAlignH && xlAlignH != ''
				? ' row--xl-' + xlAlignH
				: '';
	}

	// vertical
	if (
		xsAlignV == smAlignV &&
		smAlignV == mdAlignV &&
		mdAlignV == lgAlignV &&
		lgAlignV == xlAlignV
	) {
		rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
	} else if (
		smAlignV == mdAlignV &&
		mdAlignV == lgAlignV &&
		lgAlignV == xlAlignV
	) {
		rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
		rowClasses += smAlignV != '' ? ' row--sm-' + smAlignV : '';
	} else if (mdAlignV == lgAlignV && lgAlignV == xlAlignV) {
		if (xsAlignV == smAlignV) {
			rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
			rowClasses += mdAlignV != '' ? ' row--md-' + mdAlignV : '';
		} else if (xsAlignV != smAlignV && smAlignV == mdAlignV) {
			rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
			rowClasses += smAlignV != '' ? ' row--sm-' + smAlignV : '';
		} else {
			rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
			rowClasses += smAlignV != '' ? ' row--sm-' + smAlignV : '';
			rowClasses += mdAlignV != '' ? ' row--md-' + mdAlignV : '';
		}
	} else if (lgAlignV == xlAlignV) {
		if (xsAlignV == smAlignV && smAlignV == mdAlignV) {
			rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
		} else {
			if (xsAlignV == smAlignV) {
				rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
			} else if (smAlignV == mdAlignV) {
				rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
				rowClasses += smAlignV != '' ? ' row--sm-' + smAlignV : '';
			} else if (xsAlignV == smAlignV && mdAlignV == lgAlignV) {
				rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
				rowClasses += mdAlignV != '' ? ' row--md-' + mdAlignV : '';
			} else {
				rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
				rowClasses += smAlignV != '' ? ' row--sm-' + smAlignV : '';
			}
			rowClasses +=
				smAlignV != mdAlignV && mdAlignV != ''
					? ' row--md-' + mdAlignV
					: '';
		}
		rowClasses += lgAlignV != '' ? ' row--lg-' + lgAlignV : '';
	} else {
		if (
			xsAlignV != smAlignV &&
			smAlignV != mdAlignV &&
			mdAlignV != lgAlignV &&
			lgAlignV != xlAlignV
		) {
			rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
			rowClasses += smAlignV != '' ? ' row--sm-' + smAlignV : '';
			rowClasses += mdAlignV != '' ? ' row--md-' + mdAlignV : '';
			rowClasses += lgAlignV != '' ? ' row--lg-' + lgAlignV : '';
			rowClasses += xlAlignV != '' ? ' row--xl-' + xlAlignV : '';
		} else if (
			xsAlignV == smAlignV &&
			smAlignV == mdAlignV &&
			mdAlignV == lgAlignV
		) {
			rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
		} else {
			if (xsAlignV == smAlignV && smAlignV == mdAlignV) {
				rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
			} else if (xsAlignV == smAlignV) {
				rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
			}
			if (xsAlignV != smAlignV && smAlignV == mdAlignV) {
				rowClasses += xsAlignV != '' ? ' row--xs-' + xsAlignV : '';
				rowClasses += smAlignV != '' ? ' row--sm-' + smAlignV : '';
			} else if (mdAlignV == lgAlignV) {
				rowClasses += mdAlignV != '' ? ' row--md-' + mdAlignV : '';
			}
			if (mdAlignV == xlAlignV) {
				if (smAlignV != mdAlignV) {
					rowClasses += mdAlignV != '' ? ' row--md-' + mdAlignV : '';
				}
				rowClasses += lgAlignV != '' ? ' row--lg-' + lgAlignV : '';
				rowClasses += xlAlignV != '' ? ' row--xl-' + xlAlignV : '';
			}
		}

		rowClasses +=
			mdAlignV != xlAlignV && xlAlignV != ''
				? ' row--xl-' + xlAlignV
				: '';
	}

	if (
		xlReverseCol == true &&
		lgReverseCol == true &&
		mdReverseCol == true &&
		smReverseCol == true &&
		xsReverseCol == true
	) {
		rowClasses += ' row--xs-rv';
	} else if (
		xlReverseCol == true &&
		lgReverseCol == true &&
		mdReverseCol == true &&
		smReverseCol == true &&
		xsReverseCol == false
	) {
		rowClasses += ' row--sm-rv';
	} else if (
		xlReverseCol == true &&
		lgReverseCol == true &&
		mdReverseCol == true &&
		smReverseCol == false &&
		xsReverseCol == false
	) {
		rowClasses += ' row--md-rv';
	} else if (
		xlReverseCol == true &&
		lgReverseCol == true &&
		mdReverseCol == false &&
		smReverseCol == false &&
		xsReverseCol == false
	) {
		rowClasses += ' row--lg-rv';
	} else if (
		xlReverseCol == true &&
		lgReverseCol == false &&
		mdReverseCol == false &&
		smReverseCol == false &&
		xsReverseCol == false
	) {
		rowClasses += ' row--xl-rv';
	} else {
		rowClasses += xlReverseCol == true ? ' row--xl-rv' : '';

		rowClasses += lgReverseCol == true ? ' row--lg-rv' : '';

		rowClasses += mdReverseCol == true ? ' row--md-rv' : '';

		rowClasses += smReverseCol == true ? ' row--sm-rv' : '';

		rowClasses += xsReverseCol == true ? ' row--xs-rv' : '';
	}

	if (colheight == true) {
		rowClasses += ' row--col-ht';
	}

	rowClasses += colgap ? ` row--gap-${colgap}` : '';

	return [rowClasses];
}
export default rowClasses;
