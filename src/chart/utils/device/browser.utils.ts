
let isMobileCache: boolean | undefined = undefined;
/**
 * @doc-tags utility,mobile
 */
export const isMobile = () => {
	if (!isMobileCache) {
		isMobileCache = !!navigator.userAgent.match(/Android|iPhone|Opera Mini/) || false;
	}
	return isMobileCache;
};
