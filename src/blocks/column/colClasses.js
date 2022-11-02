/**
 * Return Jnext Timeline Block Dynamic generated Classes
 */

function colClasses(attributes) {
	const {
		xlwidth,
		lgwidth,
		mdwidth,
		smwidth,
		xswidth,
		xloffset,
		lgoffset,
		mdoffset,
		smoffset,
		xsoffset,
		colPadding,
		xlalignV,
		lgalignV,
		mdalignV,
		smalignV,
		xsalignV,
		hideLG,
		hideMD,
		hideXS,
	} = attributes;

	let colClasses = '';

	// col width
	if (
		xswidth == smwidth &&
		smwidth == mdwidth &&
		mdwidth == lgwidth &&
		lgwidth == xlwidth
	) {
		colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
	} else if (smwidth == mdwidth && mdwidth == lgwidth && lgwidth == xlwidth) {
		colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
		colClasses += smwidth != 0 ? ' col--sm-' + smwidth : '';
	} else if (mdwidth == lgwidth && lgwidth == xlwidth) {
		if (xswidth == smwidth) {
			colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
			colClasses += mdwidth != 0 ? ' col--md-' + mdwidth : '';
		} else if (xswidth != smwidth && smwidth == mdwidth) {
			colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
			colClasses += smwidth != 0 ? ' col--sm-' + smwidth : '';
		} else {
			colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
			colClasses += smwidth != 0 ? ' col--sm-' + smwidth : '';
			colClasses += mdwidth != 0 ? ' col--md-' + mdwidth : '';
		}
	} else if (lgwidth == xlwidth) {
		if (xswidth == smwidth && smwidth == mdwidth) {
			colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
		} else {
			if (xswidth == smwidth) {
				colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
			} else if (smwidth == mdwidth) {
				colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
				colClasses += smwidth != 0 ? ' col--sm-' + smwidth : '';
			} else if (xswidth == smwidth && mdwidth == lgwidth) {
				colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
				colClasses += mdwidth != 0 ? ' col--md-' + mdwidth : '';
			} else {
				colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
				colClasses += smwidth != 0 ? ' col--sm-' + smwidth : '';
			}
			colClasses +=
				smwidth != mdwidth && mdwidth != 0 ? ' col--md-' + mdwidth : '';
		}
		colClasses += lgwidth != 0 ? ' col--lg-' + lgwidth : '';
	} else {
		if (
			xswidth != smwidth &&
			smwidth != mdwidth &&
			mdwidth != lgwidth &&
			lgwidth != xlwidth
		) {
			colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
			colClasses += smwidth != 0 ? ' col--sm-' + smwidth : '';
			colClasses += mdwidth != 0 ? ' col--md-' + mdwidth : '';
			colClasses += lgwidth != 0 ? ' col--lg-' + lgwidth : '';
			colClasses += xlwidth != 0 ? ' col--xl-' + xlwidth : '';
		} else if (
			xswidth == smwidth &&
			smwidth == mdwidth &&
			mdwidth == lgwidth
		) {
			colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
		} else {
			if (xswidth == smwidth && smwidth == mdwidth) {
				colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
			} else if (xswidth == smwidth) {
				colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
			}
			if (xswidth != smwidth && smwidth == mdwidth) {
				colClasses += xswidth != 0 ? ' col--xs-' + xswidth : '';
				colClasses += smwidth != 0 ? ' col--sm-' + smwidth : '';
			} else if (mdwidth == lgwidth) {
				colClasses += mdwidth != 0 ? ' col--md-' + mdwidth : '';
			}
			if (mdwidth == xlwidth) {
				if (smwidth != mdwidth) {
					colClasses += mdwidth != 0 ? ' col--md-' + mdwidth : '';
				}
				colClasses += lgwidth != 0 ? ' col--lg-' + lgwidth : '';
				colClasses += xlwidth != 0 ? ' col--xl-' + xlwidth : '';
			}
		}

		colClasses +=
			mdwidth != xlwidth && xlwidth != '' ? ' col--xl-' + xlwidth : '';
	}
	// col offset
	if (
		xsoffset == smoffset &&
		smoffset == mdoffset &&
		mdoffset == lgoffset &&
		lgoffset == xloffset
	) {
		colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
	} else if (
		smoffset == mdoffset &&
		mdoffset == lgoffset &&
		lgoffset == xloffset
	) {
		colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
		colClasses += smoffset != -1 ? ' col--sm-os-' + smoffset : '';
	} else if (mdoffset == lgoffset && lgoffset == xloffset) {
		if (xsoffset == smoffset) {
			colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
			colClasses += mdoffset != -1 ? ' col--md-os-' + mdoffset : '';
		} else if (xsoffset != smoffset && smoffset == mdoffset) {
			colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
			colClasses += smoffset != -1 ? ' col--sm-os-' + smoffset : '';
		} else {
			colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
			colClasses += smoffset != -1 ? ' col--sm-os-' + smoffset : '';
			colClasses += mdoffset != -1 ? ' col--md-os-' + mdoffset : '';
		}
	} else if (lgoffset == xloffset) {
		if (xsoffset == smoffset && smoffset == mdoffset) {
			colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
		} else {
			if (xsoffset == smoffset) {
				colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
			} else if (smoffset == mdoffset) {
				colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
				colClasses += smoffset != -1 ? ' col--sm-os-' + smoffset : '';
			} else if (xsoffset == smoffset && mdoffset == lgoffset) {
				colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
				colClasses += mdoffset != -1 ? ' col--md-os-' + mdoffset : '';
			} else {
				colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
				colClasses += smoffset != -1 ? ' col--sm-os-' + smoffset : '';
			}
			colClasses +=
				smoffset != mdoffset && mdoffset != -1
					? ' col--md-os-' + mdoffset
					: '';
		}
		colClasses += lgoffset != -1 ? ' col--lg-os-' + lgoffset : '';
	} else {
		if (
			xsoffset != smoffset &&
			smoffset != mdoffset &&
			mdoffset != lgoffset &&
			lgoffset != xloffset
		) {
			colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
			colClasses += smoffset != -1 ? ' col--sm-os-' + smoffset : '';
			colClasses += mdoffset != -1 ? ' col--md-os-' + mdoffset : '';
			colClasses += lgoffset != -1 ? ' col--lg-os-' + lgoffset : '';
			colClasses += xloffset != -1 ? ' col--xl-os-' + xloffset : '';
		} else if (
			xsoffset == smoffset &&
			smoffset == mdoffset &&
			mdoffset == lgoffset
		) {
			colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
		} else {
			if (xsoffset == smoffset && smoffset == mdoffset) {
				colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
			} else if (xsoffset == smoffset) {
				colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
			}
			if (xsoffset != smoffset && smoffset == mdoffset) {
				colClasses += xsoffset != -1 ? ' col--xs-os-' + xsoffset : '';
				colClasses += smoffset != -1 ? ' col--sm-os-' + smoffset : '';
			} else if (mdoffset == lgoffset) {
				colClasses += mdoffset != -1 ? ' col--md-os-' + mdoffset : '';
			}
			if (mdoffset == xloffset) {
				if (smoffset != mdoffset) {
					colClasses +=
						mdoffset != -1 ? ' col--md-os-' + mdoffset : '';
				}
				colClasses += lgoffset != -1 ? ' col--lg-os-' + lgoffset : '';
				colClasses += xloffset != -1 ? ' col--xl-os-' + xloffset : '';
			}
		}

		colClasses +=
			mdoffset != xloffset && xloffset != -1
				? ' col--xl-os-' + xloffset
				: '';
	}

	// col Vertical align
	if (
		xsalignV == smalignV &&
		smalignV == mdalignV &&
		mdalignV == lgalignV &&
		lgalignV == xlalignV
	) {
		colClasses +=
			xsalignV == 'init'
				? ' col--xs-vr-init'
				: xsalignV != ''
				? ' col--xs-' + xsalignV
				: '';
	} else if (
		smalignV == mdalignV &&
		mdalignV == lgalignV &&
		lgalignV == xlalignV
	) {
		colClasses +=
			xsalignV == 'init'
				? ' col--xs-vr-init'
				: xsalignV != ''
				? ' col--xs-' + xsalignV
				: '';
		colClasses +=
			smalignV == 'init'
				? ' col--sm-vr-init'
				: smalignV != ''
				? ' col--sm-' + smalignV
				: '';
	} else if (mdalignV == lgalignV && lgalignV == xlalignV) {
		if (xsalignV == smalignV) {
			colClasses +=
				xsalignV == 'init'
					? ' col--xs-vr-init'
					: xsalignV != ''
					? ' col--xs-' + xsalignV
					: '';
			colClasses +=
				mdalignV == 'init'
					? ' col--md-vr-init'
					: mdalignV != ''
					? ' col--md-' + mdalignV
					: '';
		} else if (xsalignV != smalignV && smalignV == mdalignV) {
			colClasses +=
				xsalignV == 'init'
					? ' col--xs-vr-init'
					: xsalignV != ''
					? ' col--xs-' + xsalignV
					: '';
			colClasses +=
				smalignV == 'init'
					? ' col--sm-vr-init'
					: smalignV != ''
					? ' col--sm-' + smalignV
					: '';
		} else {
			colClasses +=
				xsalignV == 'init'
					? ' col--xs-vr-init'
					: xsalignV != ''
					? ' col--xs-' + xsalignV
					: '';
			colClasses +=
				smalignV == 'init'
					? ' col--sm-vr-init'
					: smalignV != ''
					? ' col--sm-' + smalignV
					: '';
			colClasses +=
				mdalignV == 'init'
					? ' col--md-vr-init'
					: mdalignV != ''
					? ' col--md-' + mdalignV
					: '';
		}
	} else if (lgalignV == xlalignV) {
		if (xsalignV == smalignV && smalignV == mdalignV) {
			colClasses +=
				xsalignV == 'init'
					? ' col--xs-vr-init'
					: xsalignV != ''
					? ' col--xs-' + xsalignV
					: '';
		} else {
			if (xsalignV == smalignV) {
				colClasses +=
					xsalignV == 'init'
						? ' col--xs-vr-init'
						: xsalignV != ''
						? ' col--xs-' + xsalignV
						: '';
			} else if (smalignV == mdalignV) {
				colClasses +=
					xsalignV == 'init'
						? ' col--xs-vr-init'
						: xsalignV != ''
						? ' col--xs-' + xsalignV
						: '';
				colClasses +=
					smalignV == 'init'
						? ' col--sm-vr-init'
						: smalignV != ''
						? ' col--sm-' + smalignV
						: '';
			} else if (xsalignV == smalignV && mdalignV == lgalignV) {
				colClasses +=
					xsalignV == 'init'
						? ' col--xs-vr-init'
						: xsalignV != ''
						? ' col--xs-' + xsalignV
						: '';
				colClasses +=
					mdalignV == 'init'
						? ' col--md-vr-init'
						: mdalignV != ''
						? ' col--md-' + mdalignV
						: '';
			} else {
				colClasses +=
					xsalignV == 'init'
						? ' col--xs-vr-init'
						: xsalignV != ''
						? ' col--xs-' + xsalignV
						: '';
				colClasses +=
					smalignV == 'init'
						? ' col--sm-vr-init'
						: smalignV != ''
						? ' col--sm-' + smalignV
						: '';
			}
			colClasses +=
				smalignV != mdalignV &&
				smalignV != 'init' &&
				mdalignV != 'init' &&
				mdalignV != ''
					? ' col--md-' + mdalignV
					: '';
			colClasses +=
				smalignV != mdalignV && smalignV == 'init' && mdalignV == 'init'
					? ' col--md-vr-init'
					: '';
		}
		colClasses += lgalignV != '' ? ' col--lg-' + lgalignV : '';
	} else {
		if (
			xsalignV != smalignV &&
			smalignV != mdalignV &&
			mdalignV != lgalignV &&
			lgalignV != xlalignV
		) {
			colClasses +=
				xsalignV == 'init'
					? ' col--xs-vr-init'
					: xsalignV != ''
					? ' col--xs-' + xsalignV
					: '';
			colClasses +=
				smalignV == 'init'
					? ' col--sm-vr-init'
					: smalignV != ''
					? ' col--sm-' + smalignV
					: '';
			colClasses +=
				mdalignV == 'init'
					? ' col--md-vr-init'
					: mdalignV != ''
					? ' col--md-' + mdalignV
					: '';
			colClasses +=
				lgalignV == 'init'
					? ' col--lg-vr-init'
					: lgalignV != ''
					? ' col--lg-' + lgalignV
					: '';
			colClasses +=
				xlalignV == 'init'
					? ' col--xl-vr-init'
					: xlalignV != ''
					? ' col--xl-' + xlalignV
					: '';
		} else if (
			xsalignV == smalignV &&
			smalignV == mdalignV &&
			mdalignV == lgalignV
		) {
			colClasses +=
				xsalignV == 'init'
					? ' col--xs-vr-init'
					: xsalignV != ''
					? ' col--xs-' + xsalignV
					: '';
		} else {
			if (xsalignV == smalignV && smalignV == mdalignV) {
				colClasses +=
					xsalignV == 'init'
						? ' col--xs-vr-init'
						: xsalignV != ''
						? ' col--xs-' + xsalignV
						: '';
			} else if (xsalignV == smalignV) {
				colClasses +=
					xsalignV == 'init'
						? ' col--xs-vr-init'
						: xsalignV != ''
						? ' col--xs-' + xsalignV
						: '';
			}
			if (xsalignV != smalignV && smalignV == mdalignV) {
				colClasses +=
					xsalignV == 'init'
						? ' col--xs-vr-init'
						: xsalignV != ''
						? ' col--xs-' + xsalignV
						: '';
				colClasses +=
					smalignV == 'init'
						? ' col--sm-vr-init'
						: smalignV != ''
						? ' col--sm-' + smalignV
						: '';
			} else if (mdalignV == lgalignV) {
				colClasses +=
					mdalignV == 'init'
						? ' col--md-vr-init'
						: mdalignV != ''
						? ' col--md-' + mdalignV
						: '';
			}
			if (mdalignV == xlalignV) {
				if (smalignV != mdalignV) {
					colClasses +=
						mdalignV == 'init'
							? ' col--md-vr-init'
							: mdalignV != ''
							? ' col--md-' + mdalignV
							: '';
				}
				colClasses +=
					lgalignV == 'init'
						? ' col--lg-vr-init'
						: lgalignV != ''
						? ' col--lg-' + lgalignV
						: '';
				colClasses +=
					xlalignV == 'init'
						? ' col--xl-vr-init'
						: xlalignV != ''
						? ' col--xl-' + xlalignV
						: '';
			}
		}

		colClasses +=
			mdalignV != xlalignV &&
			mdalignV != 'init' &&
			xlalignV != 'init' &&
			xlalignV != ''
				? ' col--xl-' + xlalignV
				: '';
		colClasses +=
			mdalignV != xlalignV && mdalignV == 'init' && xlalignV == 'init'
				? ' col--xl-vr-init'
				: '';
	}

	colClasses += ' col--pd-' + colPadding;

	if (hideLG == true) {
		colClasses += ' col--lg-hide';
	}
	if (hideMD == true) {
		colClasses += ' col--md-hide';
	}
	if (hideXS == true) {
		colClasses += ' col--xs-hide';
	}

	return [colClasses];
}
export default colClasses;
