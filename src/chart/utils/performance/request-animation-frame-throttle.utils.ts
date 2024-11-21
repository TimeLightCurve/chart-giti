
let fired = false;
export let animationFrameId = 0;

// map is faster than record
const actions: Map<string, () => void> = new Map<string, () => void>();
const priorActions: Map<string, () => void> = new Map<string, () => void>();

const animFrame = () => {
	if (!fired) {
		fired = true;
		animationFrameId = requestAnimationFrame(() => {
			priorActions.forEach((action, key) => {
				action();
				priorActions.delete(key);
			});
			actions.forEach((action, key) => {
				action();
				actions.delete(key);
			});
			fired = false;
		});
	}
};

export const animationFrameThrottled = (name: string, action: () => void) => {
	actions.set(name, action);
	animFrame();
};

export const cancelThrottledAnimationFrame = (name: string) => {
	actions.delete(name);
};

/**
 * Prior actions will be called before regular actions
 * An example of regular action - draw event
 * @param name
 * @param action
 */
export const animationFrameThrottledPrior = (name: string, action: () => void) => {
	priorActions.set(name, action);
	animFrame();
};
