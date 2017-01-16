window.plankton = {};
window.plankton.mixin = function(mixin) {
	for (var key in mixin) {
		window.plankton[key] = mixin[key];
	}
};