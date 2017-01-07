window.plankton = {};
window.plankton.mixin = function(mixin) {
	Object.keys(mixin).forEach(function(key) {
		window.plankton[key] = mixin.value;
	});
};