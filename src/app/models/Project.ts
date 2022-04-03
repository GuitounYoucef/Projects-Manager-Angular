class Projectkey{
	num: number=0;
    annee: number=0;
}

export class Project {
	projectkey:Projectkey= new Projectkey();
	id:number=0;
	nomProjet: string='';
	numChapitre?: number;
	numSousChapitre?: number;
	numArticle?: number;
	montant: number=0;
	reste: number=0;
	credit: number=0;
}