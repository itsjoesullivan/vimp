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
	vim.exec('gg');


	/* Listen */
	key('right', function() {
		this.step();
	}.bind(this));

	key('left', function() {
		this.step({backwards: 1});
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
		var step = this.getStep(opts).slice();
		step[1] = opts;

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
	if(this.index < 0) this.index = 0;
	if(this.steps.length <= this.index) {
		this.index--;
	}
	return this.steps[this.index];
};

Vimp.prototype.exec = function(commands, opts) {
	opts = opts || {};
	if(opts.backwards) {
		this.index--
		var snapshot = this.snapshots['' + this.index];
		this.vim.exec('esc');
		this.vim.mode(snapshot.mode);
		this.vim.curDoc.text(snapshot.text);
		this.vim.curDoc.cursor.position(snapshot.cursor);
		this.vim.curDoc.selection(snapshot.selection);
		this.vim.text(snapshot);
	} else {
		// Base case
		this.snapshots['' + this.index] = this.vim.toJSON();
		this.vim.exec(commands);
		this.index++;
	}
};


