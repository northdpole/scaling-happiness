function wave(foes,id){
	this.foes = foes
	this.id = id
	this.start = start

	function add_foe(foe){this.foes.push(foe);}

	function remove_foe(id){
		for(i=0;i,foes.length;i++)
			if(foes[i].id == id)
				delete foes[i];
	}
	/*
	 * Makes all the creeps in the wave move towards the end
	 */
	function start(){
		for(i=0;i<foes.length;i++)
			foes[i].march;
		}
}
