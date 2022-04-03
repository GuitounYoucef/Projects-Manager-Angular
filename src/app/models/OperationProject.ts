export class Operationkey{
	num: number=0;
    annee: number=0;
	numOpr: number=0;
}

export class OperationProject {
    operationkey:Operationkey =new Operationkey();
	typeOpr: number=0;
	descriptionOpr: string='';
	montantOpr: number=0;
	nouvMontant: number=0;
	ancienMontant: number=0;
}

