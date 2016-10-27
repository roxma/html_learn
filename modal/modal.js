/*
 * 简易通用 modal dialog
 * 支持递归 modal
 * 用法：
 * <div class="modal_frame">
 * ...
 * </div>
 *
 * $('.modal_frame').modal('show');
 */

(function($){

	// static local variables
	var modalStack = [];

	var overlay = null;
	function getOverlay() {
		if(!overlay) {
			overlay = $('<div class="modal_overlay"></div>')
			$('body').append(overlay);
		}
		return overlay;
	}

	var cmd = {};

	cmd['show'] = function () {
		if(this.is(':visible')) {
			return;
		}
		if (modalStack.length > 0) {
			// 支持递归
			modalStack[modalStack.length-1].fadeToggle();
		}
		if(!getOverlay().is(':visible')) {
			getOverlay().fadeToggle();
		}
		this.fadeToggle();
		modalStack.push(this);
		this.trigger('show.modal');
		return this;
	};

	cmd['hide'] = function () {
		if(!this.is(':visible')) {
			return;
		}
		modalStack.pop();
		this.fadeToggle();
		this.trigger('hide.modal');
		if (modalStack.length > 0) {
			// 支持递归
			modalStack[modalStack.length-1].fadeToggle();
		} else {
			getOverlay().fadeToggle();
		}
		return this;
	};

	$.fn.modal = function(command) {
		cmd[command].apply(this,arguments);
	};

})(jQuery);


