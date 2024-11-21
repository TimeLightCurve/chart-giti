
export function uuid(): string {
	const chr4 = () => Math.random().toString(16).slice(-4);
	return `${chr4() + chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4() + chr4() + chr4()}`;
}
