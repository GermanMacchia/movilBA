export const securityHeaders = {
	xContentType: {
		header: 'X-Content-Type-Options',
		content: 'nosniff',
	},
	strinctTransport: {
		header: 'Strict-Transport-Security',
		content: 'max-age=31536000; includeSubDomains',
	},
	xFrameOpt: {
		header: 'X-Frame-Options',
		content: 'DENY',
	},
	referrerPolicy: {
		header: 'Referrer-Policy',
		content: 'no-referrer',
	},
	xPermCrossDomPol: {
		header: 'X-Permitted-Cross-Domain-Policies',
		content: 'none',
	},
	contentSecurity: {
		header: 'Content-Security-Policy',
		content: 'default-src "self"',
	},
	permitionPolicy: {
		header: 'Permissions-Policy',
		content:
			'accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=(), clipboard-read=(), clipboard-write=(), gamepad=(), speaker-selection=(), conversion-measurement=(), focus-without-user-activation=(), hid=(), idle-detection=(), interest-cohort=(), serial=(), sync-script=(), trust-token-redemption=(), unload=(), window-placement=(), vertical-scroll=()',
	},
}
