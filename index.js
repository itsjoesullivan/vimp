var Vimp = function(el, opts) {

	/* instance variables */

	this.steps = [];
	this.index = 0;
	this.substep = false;
	this.snapshots = {};

	/* Instantiate vim */
	this.vim  = vim;
	vim.edit({ 
		el: el ,
		listen: false
	});


	/* Listen */
	key('space', function() {
		this.step();
	}.bind(this));
};

Vimp.prototype = {};

/** Either move on with a step or set a step, jumping quickly to addStep
 */
Vimp.prototype.step = function(step) {
	if(_(step).isArray() || typeof step === 'string') {
		return this.addStep.apply(this,arguments);
	} else {
		// Is an option
		var opts = step;
		var step = this.getStep(opts);
		// TODO: where do we record current step?
		this.exec.apply(this,step);
	}

};

/** Add a step
 */
Vimp.prototype.addStep = function(commands,opts) {
	this.steps.push([ commands, opts ]);
};

/**
 * index
 *  options: {
 *    
 *  }
 *
 */
Vimp.prototype.getStep = function(options) {
	return this.steps[this.index];
};

Vimp.prototype.exec = function(commands, opts) {
	opts = opts || {};
	if(opts.backwards) {
		var snapshot = this.snapshots(this.index);
		this.vim.text(snapshot);
	} else {
		// Base case
		this.vim.exec(commands);
		this.index++;
	}
};


