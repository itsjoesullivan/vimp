


vim.text('asdf');

var vimp = new Vim();
// text ~ text or el or $(el)
var vimp = new Vim(text, opts); //Starting text

opts = 
	animate: bool | number,
	

vim.step('i'); // add a step entering insert mode


vimp.step('ihello!'); // Add a step entering insert mode and typing hello

vimp.step(['v','0']); // Add a step entering visual select mode and selecting the line.
// By declaring as an array, you may step through the animations, or animate them any way you place

// Animate, performing one member of array every 100 ms
var move = ['v','0'];
var opts = {
	animate: 100
};
vimp.step(move,opts);

}


/* control
enter / space ~ rarr
delete / backspace ~ larr

space / rarr -> perform next step
vimp.step() -> perform next step

ALT rarr -> force substeps
vimp.step({ bySubstep: 1}); // Go by each element of the array, if possible

SHIFT rarr -> skip substeps
vimp.ste({ skipSubsteps: 1 }) // Skip substeps even if normally there

vimp.step({ skipAnimation: 1}) //skip animation


larr
vimp.step({ backwards: 1});

SHIFT larr
vimp.step({ backwards: 1, skipSubsteps: 1 }) // go to beginning of this step if not at, otherwise beginning of prev

alt larr
vimp.step({ backwards: 1, bySubstep: 1 }) // go to previous substep if possible, otherwise previous step


