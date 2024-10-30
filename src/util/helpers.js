const POSITION_CLASSNAMES = {
	'top left': 'is-position-top-left',
	'top center': 'is-position-top-center',
	'top right': 'is-position-top-right',
	'center left': 'is-position-center-left',
	'center center': 'is-position-center-center',
	center: 'is-position-center-center',
	'center right': 'is-position-center-right',
	'bottom left': 'is-position-bottom-left',
	'bottom center': 'is-position-bottom-center',
	'bottom right': 'is-position-bottom-right',
};

export function excerpt( text, max ) {
	const stext = text.replace( /<[^>]*>?/gm, '' );
	return stext && stext.length > max ? stext.slice( 0, max ).split( ' ' ).slice( 0, -1 ).join( ' ' ) : stext;
}

export function dimRatioToClass( ratio ) {
	return ratio === 0 || ratio === 50 || ! ratio
		? null
		: 'has-background-dim-' + 10 * Math.round( ratio / 10 );
}

export function backgroundImageStyles( url ) {
	return url ? { backgroundImage: `url(${ url })` } : {};
}

export function isContentPositionCenter( contentPosition ) {
	return (
		! contentPosition ||
		contentPosition === 'center center' ||
		contentPosition === 'center'
	);
}
export function getPositionClassName( contentPosition ) {
	/*
	 * Only render a className if the contentPosition is not center (the default).
	 */
	if ( isContentPositionCenter( contentPosition ) ) return '';

	return POSITION_CLASSNAMES[ contentPosition ];
}
