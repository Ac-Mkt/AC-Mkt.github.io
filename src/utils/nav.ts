// True when `pathname` is the page at `href` or one of its children (e.g. /blog/post-name)
export function isActive(pathname: string, href: string): boolean {
	const path = pathname.replace(/\/$/, '') || '/';
	const target = href.replace(/\/$/, '') || '/';
	return path === target || path.startsWith(target + '/');
}
