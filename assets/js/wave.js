function wave(foes,id){
	this.foes = foes
	this.id = id
	this.start = start

	/*
	 * Makes all the creeps in the wave move towards the end
	 */
	function start(){
		for(i=0;i<foes.length;i++)
			foes[i].march;
		}
}
