//---------------------------------------------------------------
	
	/* GLOBAL VARS */

/*Row Counters*/
	var VOLTAGE=230;
	var rowsFA=1;
	var rowsCA=1;
	var rowsCD=1;
	var rowsHL=1;
	var rowsML=1;
	var note1VA=0, note1Qty=0;
	var note2VA=0, note2Qty=0;
	var note3VA=0, note3Qty=0;
	var note4VA=0, note4Qty=0;
	var note5VA=0, note5Qty=0;
	var colAQty=0, colAVA=0;
	var colBQty=0, colBVA=0;

	var TNCL=0, TCL=0, HML=0, ITFLC=0, IFLC=0, INTD=0, IDETD=0, INTB=0, ITB=0, VACD=0, NTD=0;
	var  ampacity=0, y=0;
	var ty1 = "", mat="";
	var totalFA=0;
	var totalCD=0;
	var totalMicroOven=0;
	var note = [];	
	var totalHLQty=0, totalHL=0;
	var totalMLQty=0, totalML=0;
	var AWP=0;
	var FA=0, GLCRL=0, TOT=0, NTL=0;
	var SAL=0, TSAL=0, LL=0, TLL=0, BL=0, TBL=0;
	var useColC=0;
	
	//Array Counters
	var ctrCookTop=-1, ctrCounterOven=-1, ctrFryer=-1, ctrElecRange=-1, ctrWallOven=-1;
	
		
	
	/*Arrays*/
	//VA Ratings
	var arrVARating230V = [0, 2.2, 2.9, 3.6, 4.9, 6.9, 8, 10, 12, 17, 28, 40, 50];
	var arrVARating208V = [0, 2.4, 3.2, 4, 5.4, 7.6, 8.8, 11, 13.2, 18.7, 30.8, 44, 55];
	var arrVARating200V = [0, 2.5, 3.3, 4.1, 5.6, 7.9, 9.2, 11.5, 13.8, 19.6, 32.2, 46, 57.5];
	var arrVARating115V = [0, 4.4, 5.8, 7.2, 9.8, 13.8, 16, 20, 24, 34, 56, 80, 100];
	var arrHPRatingText = ["0", "1/6", "1/4", "1/3", "1/2", "3/4", "1", "1 1/2", "2", "3", "5", "7 1/2", "10"];
	var arrHPRating = [0, 0.166666666666667, 0.25, 0.333333333333333, 0.5, 0.75, 1, 1.5, 2, 3, 5, 7.5, 10];
	var arrNoteCtr=[];
	var arrCAtableA=[];
	var arrCAtableB=[];
	var arrCAtableC=[];
	var arrClothesDryer=[];
	var arrVARatings=[];
	var arrConductorTypes=["TW","UF","RHW","THHW","THW","THWN","XHHW","USE","ZW","TBS","SA","SIS","FEP","FEPB","MI","RHH","RHW-2","THHN","THW-2","THWN-2","USE-2","XHH","XHHW-2","ZW-2"];	
	var arrAmperes=[1,3,6,10,15,20,25,30,35,40,45,50,60,70,80,90,100,110,125,150,175,200,225,250,300,350,400,450,500,600,601,700,800,1000,1200,1600,2000,2500,3000,4000,5000,6000];
	var arrCopper60=[20,25,30,40,55,70,90,100,120,135,160,185,210,240,260,280,315,370,395,405,445];
	var arrCopper75=[20,25,35,50,65,85,110,125,145,160,195,220,255,280,305,330,375,435,470,485,540];
	var arrCopper90=[25,30,40,55,70,90,115,130,150,170,205,225,265,295,345,355,400,470,530,545,580];
	var arrConductorSize=[2,3.5,5.5,8,14,22,30,38,50,60,80,100,125,150,175,200,250,325,375,400,500];
	var arrAluminum60=[0,20,25,30,40,55,65,75,95,100,120,140,165,185,205,220,255,305,315,335,370];
	var arrAluminum75=[0,20,30,40,50,65,80,90,110,120,145,170,200,225,245,265,305,365,380,405,440];
	var arrAluminum90=[0,25,35,45,65,80,90,105,125,135,165,190,225,250,275,300,345,410,430,460,495];
	
	//---------------------------------------------------------------
	//Appliance Types
	var arrFAtypes = ["Dishwasher", "Garbage Disposer", "Water Heater"];
	var arrCAtypes = ["Cook Top", "Counter-Mounted Oven", "Deep Fryer", "Electric Range", "Ordinary Microwave Oven", "Wall-Mounted Oven"];
	var arrMLtypes = ["Water Pump"];

	//---------------------------------------------------------------
	//DEBUG
	var divDebug = document.getElementById('debug');
	var debugContent = document.createTextNode("");
	divDebug.appendChild(debugContent);
	
	//---------------------------------------------------------------
	//Get the modal
	var modal = document.getElementById('myModal');
	var modalAbout=document.getElementById('aboutModal');
	var modalReccommendation=document.getElementById('reccommendationModal');
	
	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");
	var btnAbout = document.getElementById("btnAbout");
	var btnRecommend = document.getElementById("btnRecommend");
	
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	var span2 = document.getElementsByClassName("close2")[0];
	var span3 = document.getElementsByClassName("close3")[0];
	
	// When the user clicks the button, open the modal 
	btn.onclick = function() {
	    modal.style.display = "block";	   
	    calculateLoad();
	}
	
	btnAbout.onclick = function() {
	    modalAbout.style.display = "block";	   
	    
	}
	
	btnReccommend.onclick=function() {
		modal.style.display = "none";
		showReccommendation();
		modalReccommendation.style.display="block";
	}
	
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";	    
	}
	span2.onclick = function() {	    
	    modalAbout.style.display = "none";
	}
	
	span3.onclick = function() {	    
		modalReccommendation.style.display = "none";
	}
	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal || event.target == modalAbout || event.target == modalReccommendation) {	    		    	
	    	modal.style.display = "none";	    		       
	    	modalAbout.style.display = "none";
	    	modalReccommendation.style.display = "none";
	    }
	}
	
	
	
	
	//---------------------------------------------------------------
	//MAIN FUNCTION
	
	function showReccommendation(){
		var txtSF = document.getElementById("safetyFactor");
		var sFactor=0;
		if(txtSF.disabled==false){
			sFactor=parseInt(txtSF.value);
			ITFLC=IFLC/(sFactor/100);
		} else {
			ITFLC=IFLC;
		}
		addDebugText("Safety Factor = " + sFactor + "%");
		addDebugText("ITFLC = " + ITFLC + "VA");
		
		//ty
		ty=document.getElementById("cboConductorType").value;
		
		
		//FOR THE MAIN PROTECTIVE DEVICE
		ampacity=y;
		INTD=((TNCL-HML)+(3*HML))/VOLTAGE;
		IDETD=((TNCL-HML)+(1.75*HML))/VOLTAGE;
		INTB=((TNCL-HML)+(8*HML))/VOLTAGE;
		ITB=((TNCL-HML)+(2.5*HML))/VOLTAGE;		
		addDebugText("INTD = " + INTD + "Amp");
		addDebugText("IDETD = " + IDETD + "Amp");
		addDebugText("INTB = " + INTB + "Amp");
		addDebugText("ITB = " + ITB + "Amp");
		
		
				
		
		//material and type
		ty1=document.getElementById("cboConductorType").value;
		var sMat="";
		if(document.getElementById("copper").checked==true){
			mat="Cu";
			sMat="Copper";
		} else {
			mat="Al";
			sMat="Aluminum";
		}
		addDebugText("Conductor Material selected is " + sMat);
		
		var temperature=0;
		if(document.getElementById("cboTemperature").disabled==false){
			temperature=parseInt(document.getElementById("cboTemperature").value);
		}
		addDebugText("Wire Temperature is " + temperature);
		
		//RECCOMENDATIONS
		
		//INTD get higher Amps
		INTD=getHigherAmpere(INTD);
		addDebugText("Suggested INTD Ampere = " + INTD + "Amp");		
		RESCsuggest(mat, ty, temperature,INTD, "INTD");		
		
		//IDETD get higher Amps
		IDETD=getHigherAmpere(IDETD);
		addDebugText("Suggested IDETD Ampere = " + IDETD + "Amp");		
		RESCsuggest(mat, ty, temperature,IDETD, "IDETD");
		
		
		//INTB get higher Amps
		INTB=getHigherAmpere(INTB);
		addDebugText("Suggested INTB Ampere = " + INTB + "Amp");		
		RESCsuggest(mat, ty, temperature,INTB, "INTB");
		
		//ITB get higher Amps
		ITB=getHigherAmpere(ITB);
		addDebugText("Suggested ITB Ampere = " + ITB + "Amp");		
		RESCsuggest(mat, ty, temperature,ITB, "ITB");
		
	}
	
	function RESCsuggest(material, matType, temp, ATval, ATtype){
		var index=-1;
		var AT = ATval;		
		var arrNo=0;
		var arr=[];
		
		if(material=="Cu"){
			if (matType=="TW" || matType=="UF") {
				//copper60
				arrNo=1;
				arr=arrCopper60;				
			} else if(matType=="RHW" || matType=="THHW" || matType=="THW"|| matType=="THWN" || matType=="XHHW" || matType=="USE" || matType=="ZW"){
				//copper75 or copper90, select based on temperature
				if (temp==75){
					arrNo=2;
					arr=arrCopper75;
				} else if (temp==90){
					//copper90
					arrNo=3;
					arr=arrCopper90;
				}							
			} else {
				//copper90
				arrNo=3;
				arr=arrCopper90;
			}
		} else {
			if (matType=="TW" || matType=="UF") {
				//alum60
				arrNo=4;
				arr=arrAluminum60;				
			} else if(matType=="RHW" || matType=="THHW" || matType=="THW"|| matType=="THWN" || matType=="XHHW" || matType=="USE" || matType=="ZW"){
				//alum75 or alum90, select based on temperature
				if (temp==75){
					arrNo=5;
					arr=arrAluminum75;
				} else if (temp==90){
					//alum90
					arrNo=6;
					arr=arrAluminum90;
				}							
			} else {
				//alum90
				arrNo=6;
				arr=arrAluminum90;
			}
		}
		
		index=getIndexFromWireArray(arrNo,ATval);
		addDebugText("Wire index to use = " + index);
		if(index>-1){			
			var rec1="Use 1 - " + AT + " AT, 2 Pole, 250 V";
			var rec2="Use 2 - " + arrConductorSize[index] + " mm <sup>2</sup> " + matType + " " + material + " Wire (" + arr[index] + " A Ampacity)";
			if(ATtype=="INTD"){
				document.getElementById("NDF1").innerHTML=rec1;
				document.getElementById("NDF2").innerHTML=rec2;
				addDebugText("INTD Reccommendation: ");				
			} else if(ATtype=="IDETD") {
				document.getElementById("TDF1").innerHTML=rec1;
				document.getElementById("TDF2").innerHTML=rec2;
				addDebugText("IDETD Reccommendation: ");			
			} else if(ATtype=="INTB") {
				document.getElementById("INTB1").innerHTML=rec1;
				document.getElementById("INTB2").innerHTML=rec2;
				addDebugText("INTB Reccommendation: ");			
			}  else if(ATtype=="ITB") {
				document.getElementById("ITB1").innerHTML=rec1;
				document.getElementById("ITB2").innerHTML=rec2;
				addDebugText("ITB Reccommendation: ");			
			} 
			
			addDebugText(rec1);
			addDebugText(rec2);
		} else {
			//cannot find appropriate NTDF based on parameters
			document.getElementById("NDF1").innerHTML="Cannot find appropriate NTDF based on existing parameters.";
		}
	}
	

	
	function getIndexFromWireArray(arrNo, ATval){
		var arr=[];
		var AT=ATval;
		
		switch(arrNo) {
		
		case(1):
			arr=arrCopper60;
			break;
		case(2):
			arr=arrCopper75;
			break;
		case(3):
			arr=arrCopper90;
			break;
		case(4):
			arr=arrAluminum60;
			break;
		case(5):
			arr=arrAluminum75;
			break;
		case(6):
			arr=arrAluminum90;
			break;			
		}
		
		var lowRange=0, upRange=0;
		for (var i=0;i<arr.length; i++) {
			if(i==0){
				if(arrNo<4){
					lowRange=1;
				} else if(arrNo>3) {
					lowRange=0;
				}				
			} else {
				lowRange=arr[i-1];
			}
			upRange=arr[i];
			
			if ((AT>lowRange||ITFLC>lowRange) && (ITFLC<=upRange && AT<=upRange)){
				index=i;
				break;
			}
		}
		
		return index;		
	}
	
	function validateConductorType(){
		var ct = document.getElementById("cboConductorType").value;
		if (ct=="RHW" || ct=="THHW" || ct=="THW"|| ct=="THWN" || ct=="XHHW" || ct=="USE" || ct=="ZW"){
			document.getElementById("cboTemperature").disabled=false;
		} else {
			document.getElementById("cboTemperature").disabled=true;
		}
	}
	
	function getHigherAmpere(amp){
		var tempAmp=0;
			for(var i=0;i<arrAmperes.length;i++){
				if (arrAmperes[i]>amp){
					tempAmp=arrAmperes[i];
					break;
				}
			}
		return tempAmp;
	}
	
	
	function calculateLoad() {
		useColC=0;
		arrVARatings=[];
		
		//reset counters
		ctrCookTop=-1;
		ctrCounterOven=-1;
		ctrFryer=-1;
		ctrElecRange=-1;
		ctrWallOven=-1;
		colAQty=0;
		colAVA=0;
		colBQty=0;
		colBVA=0;
		note1VA=0;
		note2VA=0;
		note3VA=0;
		note4VA=0;
		note5VA=0;
		note1Qty=0;
		note2Qty=0;
		note3Qty=0;
		note4Qty=0;
		note5Qty=0;		
		addDebugText("DEBUG DETAILS:");
		addDebugText(Date());
		for (var x=0; x<5; x++) {
			arrNoteCtr[x]=-1;
		}
		
		//Get Floor Area
		FA=document.getElementById("floorArea").value;
		addDebugText("Floor Area: " + FA + "sqm");
		//COMPUTATION FOR GLCRL
		GLCRL=FA*24;
		addDebugText("GLCRL: " + GLCRL + "VA");
		
		//COMPUTATION FOR BRANCH CIRCUIT LOADS
		SAL=document.getElementById("SAL").value;
		LL=document.getElementById("laundry").value;
		BL=document.getElementById("bathroom").value;
		TSAL=1500*SAL;
		TLL=1500*LL;
		TBL=1500*BL;
		
		addDebugText("Total Small Appliance Load: " + TSAL + "VA");
		addDebugText("Total Laundry Load: " + TLL + "VA");
		addDebugText("Total Bathrooom Load: " + TBL + "VA");
		//COMPUTATION FOR NET TOTAL LOAD FROM A TO D (GLCRL, SAL, LL, & BL)
		TOT=GLCRL+TSAL+TLL+TBL;
		addDebugText("NET Total Load: " + TOT + "VA");

		//APPLICATION OF DEMAND FACTORS
		if(FA>150){
			NTL=0;
		} else {
			if (TOT>=3000) {
				var first=3000*1;
				var rem=(TOT-3000)*0.35;
				NTL=first+rem;			
			} else {
				var first=3000*1;
				var rem=(120000-3000)*0.35;
				var rem1=(TOT-120000)*0.25;
				NTL=first+rem+rem1;
			}
		}
		
		
		addDebugText("Demand Factor NTL = " + NTL + "VA");
		NTL=Math.round(NTL);
		addDebugText("Rounded to -> " + NTL + "VA");		
		//FASTENED APPLIANCES		
		totalFA=computeTotalFA();		
		addDebugText("Total Fastened Appliance Load = " + totalFA + "VA");
		
		//COOKING APPLIANCES
		//iterate on all values of table and compute totalMicroOven at the same time	
		totalMicroOven=computeTotalMicroOven();	
		
		////alert"VA Array length is =" + arrVARatings.length);
		
		//check if there is unequal rating
		if (arrVARatings.length==0){
			//no electric range
			note1VA=0;
			note1Qty=0;
			note2VA=0;
			note2Qty=0;
		} else if (arrVARatings.length==1) {
			//equal rating
			if(arrVARatings[0]>8750 && arrVARatings[0]<12000){
				//column c				
				processEqualRatingERColC();
				useColC=1;
			} else {
				processEqualRatingERNote1();
				useColC=0;
			}
			
		} else {
			//unequal rating
			//alert"will process unequal rating");
			processUnequalRatingER();
		}
		
		
		
		addDebugText("Total Ordinary Microwave Oven Load = " + totalMicroOven + "VA");
		addDebugText("Note 1 VA = " + note1VA + "VA");
		addDebugText("Note 1 Qty = " + note1Qty + " unit(s)");
		addDebugText("Note 2 VA = " + note2VA + "VA");
		addDebugText("Note 2 Qty = " + note2Qty + " unit(s)");
		addDebugText("Note 3 VA = " + note3VA + "VA");
		addDebugText("Note 3 Qty = " + note3Qty + " unit(s)");
		addDebugText("Note 4 VA = " + note4VA + "VA");
		addDebugText("Note 4 Qty = " + note4Qty + " unit(s)");
		addDebugText("Note 5 VA = " + note5VA + "VA");
		addDebugText("Note 5 Qty = " + note5Qty + " unit(s)");		
		note=computeLoadByNote();
		for (var i=0;i<5;i++){
			TCL+=note[i];
		}
		addDebugText("Note1=" + note[0]);
		addDebugText("Note2=" + note[1]);
		addDebugText("Note3=" + note[2]);
		addDebugText("Note4=" + note[3]);
		addDebugText("Note5=" + note[4]);
		addDebugText("Total Cooking Load = " + TCL + "VA");
		
		totalCD=computeTotalCD();
		addDebugText("Total Clothes Dryer Load = " + totalCD + "VA");
		
		totalHL=computeTotalHL();
		addDebugText("Total ACU/Space Heater Load = " + totalHL + "VA");
		
		totalML=computeTotalML();
		addDebugText("Total Water Pump Load = " + totalML + "VA");
		addDebugText("AWP = " + AWP + "AMP");
		addDebugText("Highest Motor Load = " + HML + "VA");
		
		//TOTAL NET COMPUTED LOAD
		if(FA>150){
			
			var others=0;
			others=(TLL+TSAL+TBL+totalML+totalMicroOven+totalFA+totalCD)*0.40;
			TNCL=totalHL+GLCRL+TCL + others;
		} else {
			TNCL=NTL + totalFA + totalCD + totalML + totalHL + TCL + totalMicroOven;
		}
		
		addDebugText("TOTAL NET COMPUTED LOAD = " + TNCL + "VA");
		TNCL=Math.round(TNCL);
		addDebugText("Rounded to -> " + TNCL + "VA");
		document.getElementById("lblPhaseLoad").innerHTML=TNCL;
		document.getElementById("lblPhaseLoad2").innerHTML=TNCL;
		//TOTAL FULL LOAD CURRENT COMPUTATION
		IFLC=(TNCL+((0.25)*(HML)))/VOLTAGE;
		addDebugText("Full Load Current Computaton = " + IFLC + "Amp");
		IFLC=Math.round(IFLC);
		addDebugText("Rounded to -> " + IFLC + "Amp");		
	}
	
	function processEqualRatingERNote1() {
		var table = document.getElementById("tblCA");
		var selectObjs = table.getElementsByTagName("select");
		var str="";
		var thisID="";
		var index="";
		var thisQty=0, thisVA=0;
		var tempQty=0;
		var tempVA=arrVARatings[0];		
		
		for (var i=0; i<selectObjs.length;i++) {			
			str=selectObjs[i].id;
			thisID=str.substring(0,5);
			index=str.substring(5,str.length);					
			thisQty=parseInt(document.getElementById("CAQty"+index).value);
			
			if (selectObjs[i].value == "Electric Range") {
				tempQty+=thisQty;
			}			
		}
		note1Qty=tempQty;
		note1VA=tempVA;
	}
	function processEqualRatingERColC() {
		var table = document.getElementById("tblCA");
		var selectObjs = table.getElementsByTagName("select");
		var str="";
		var thisID="";
		var index="";
		var thisQty=0, thisVA=0;
		var tempQty=0;
		var tempVA=arrVARatings[0];		
		
		for (var i=0; i<selectObjs.length;i++) {			
			str=selectObjs[i].id;
			thisID=str.substring(0,5);
			index=str.substring(5,str.length);
			//alert"will get qty");
			thisQty=parseInt(document.getElementById("CAQty"+index).value);
			//alert"thisQty="+thisQty);
			if (selectObjs[i].value == "Electric Range") {
				tempQty = tempQty + thisQty;
			}			
		}
		note1Qty=tempQty;
		note1VA=tempVA;
		//alert"Done with ColC");
	}
	
	function processUnequalRatingER() {
		var table = document.getElementById("tblCA");
		var selectObjs = table.getElementsByTagName("select");
		var str="";
		var thisID="";
		var index="";
		var thisQty=0, thisVA=0;
		var tempQty=0;
		var tempVA=0;		
		
		for (var i=0; i<selectObjs.length;i++) {			
			str=selectObjs[i].id;
			thisID=str.substring(0,5);
			index=str.substring(5,str.length);
			
			thisQty=parseInt(document.getElementById("CAQty"+index).value);
			
			thisVA=parseInt(document.getElementById("cboCAVA"+index).value);
			////alert"here 539");
			////alert"qty="+thisQty+": VA="+thisVA);
			if (selectObjs[i].value == "Electric Range") {
				tempQty = tempQty + thisQty;
				tempVA = tempVA+(thisVA*thisQty);
			}			
		}
		note2Qty=tempQty;
		note2VA=tempVA;
		//alert"done unequal rating");
	}
	
	
	function computeTotalHL(){
		var computedLoad=0;
		var table = document.getElementById("tblHL");
		var selectObjs = table.getElementsByTagName("input");
		var str="";
		var thisID="";
		var index="";
		var thisQty=0, thisVA=0;
		var tempVA=0, tempQty;
		for (var i=0; i< selectObjs.length;i++) {			
			str=selectObjs[i].id;
			thisID=str.substring(0,7);
			index=str.substring(7,str.length);			
			if (selectObjs[i].type == "text" && thisID == "cboHLVA") {
				thisVA=parseInt(selectObjs[i].value);				
				thisQty=parseInt(document.getElementById("HLQty"+index).value);						
				tempVA += thisVA * thisQty;
				tempQty+=thisQty;
				//highest motor load validation
				if (thisVA>HML){
					HML=thisVA;
				}
			}
		}
		totalHLQty=tempQty;
		computedLoad=tempVA;
		return computedLoad;
	}
	
	
	function computeTotalML(){
		var computedLoad=0;
		var computedLoad=0;
		var table = document.getElementById("tblML");
		var selectObjs = table.getElementsByTagName("input");
		var str="";
		var thisID="";
		var index="";
		var thisQty=0, thisVA=0;
		var tempVA=0, tempQty;
		for (var i=0; i< selectObjs.length;i++) {			
			str=selectObjs[i].id;
			thisID=str.substring(0,7);
			index=str.substring(7,str.length);			
			if (selectObjs[i].type == "text" && thisID == "cboMLVA") {
				thisVA=parseInt(selectObjs[i].value);						
				thisQty=parseInt(document.getElementById("MLQty"+index).value);				
				tempVA += thisVA * thisQty;
				tempQty+=thisQty;
				//highest motor load validation
				if (thisVA>HML){
					HML=thisVA;
				}
			}
		}
		totalHLQty=tempQty;
		computedLoad=tempVA;
		AWP=tempVA/VOLTAGE;
		return computedLoad;		
	}
	
	function addDebugText(debugText){
		var para = document.createElement("p");
		para.style="margin-top:0px;margin-bottom:0px;";
		debugContent = document.createTextNode('\n' + debugText);
		para.appendChild(debugContent);
		divDebug.appendChild(para);
	}
	
	
	function computeLoadByNote() {
		//Compute by Note
		var tempNote=[];
		var iQty=0;
		var iVA=0;
		var avgVA=0;
		var equivLoad=0;
		var excessVA=0;
		var demandInc=0;		
		var computedLoad=0;		
		//NOTE 1		
			iQty=note1Qty;					
			iVA=note1VA;	
			avgVA=iVA/iQty;		
			if (useColC==1) {
				if(iQty>25){
					
					var extraLoad=0;
					if (iQty<41){
						extraLoad=1000;
					} else {
						extraLoad=750;
					}				
					equivLoad=arrCAtableC[iQty]*1000;				
					equivLoad=equivLoad+(extraLoad*iQty);
					//excessVA=(avgVA-12000)/1000;
					//demandInc=excessVA*0.05;
					//demandInc=demandInc*equivLoad;					
					computedLoad=equivLoad;					
				} else {
					computedLoad=arrCAtableC[iQty]*1000;
				}	
			} else {
				//note1
				if(iQty>0 && iQty<26){
					equivLoad=arrCAtableC[iQty]*1000;				
					excessVA=(note1VA-12000)/1000;					
					demandInc=excessVA*0.05;				
					demandInc=demandInc*equivLoad;				
					computedLoad=equivLoad+demandInc;				
				}else if(iQty>25){
					var extraLoad=0;
					if (iQty<41){
						extraLoad=1000;
					} else {
						extraLoad=750;
					}
					equivLoad=arrCAtableC[iQty]*1000;				
					equivLoad=equivLoad+(extraLoad*iQty);
					excessVA=(note1VA-12000)/1000;
					demandInc=excessVA*0.05;
					demandInc=demandInc*equivLoad;
					computedLoad=equivLoad+demandInc;				
				}
			}
			
			tempNote[0]=computedLoad;
		
			computedLoad=0;
			
			//NOTE 2			
			iQty=note2Qty;			
			iVA=note2VA;	
			avgVA=iVA/iQty;		
			avgVA=Math.round((avgVA/1000));
			avgVA=avgVA*1000;
			if(iQty>0 && iQty<26){
				equivLoad=arrCAtableC[iQty]*1000;					
				excessVA=(avgVA-12000)/1000;				
				demandInc=excessVA*0.05;				
				demandInc=demandInc*equivLoad;
				computedLoad=equivLoad+demandInc;
			}else if(iQty>25){
				var extraLoad=0;
				if (iQty<41){
					extraLoad=1000;
				} else {
					extraLoad=750;
				}
				equivLoad=arrCAtableC[iQty]*1000;				
				equivLoad=equivLoad+(extraLoad*thisQty);
				excessVA=(avgVA-12000)/1000;
				demandInc=excessVA*0.05;
				demandInc=demandInc*equivLoad;
				computedLoad=equivLoad+demandInc;				
			}
			
			tempNote[1]=computedLoad;		
			
			computedLoad=0;			
			//NOTE 3
			var percent1=0, percent2=0;
			var group1VA=0, group2VA=0;			
			percent1=arrCAtableA[colAQty]/100;
			percent2=arrCAtableB[colBQty]/100;
			group1VA=colAVA*percent1;
			group2VA=colBVA*percent2;
			computedLoad=group1VA+group2VA;
			tempNote[2]=computedLoad;
			
			computedLoad=0;			
			//NOTE 4
			/*
			iQty=note4Qty;					
			iVA=note4VA;	
			avgVA=iVA/iQty;			
			if(iQty>0 && iQty<26){
				equivLoad=arrCAtableC[iQty]*1000;				
				excessVA=(avgVA-12000)/1000;					
				demandInc=excessVA*0.05;				
				demandInc=demandInc*equivLoad;				
				computedLoad=equivLoad+demandInc;				
			}else if(iQty>25){
				var extraLoad=0;
				if (iQty<41){
					extraLoad=1000;
				} else {
					extraLoad=750;
				}
				equivLoad=arrCAtableC[iQty]*1000;				
				equivLoad=equivLoad+(extraLoad*thisQty);
				excessVA=(avgVA-12000)/1000;
				demandInc=excessVA*0.05;
				demandInc=demandInc*equivLoad;
				computedLoad=equivLoad+demandInc;				
			}
			tempNote[3]=computedLoad;
			*/
			tempNote[3]=computedLoad;
			//NOTE 5
			computedLoad=note5VA;
			tempNote[4]=computedLoad;
			
		return tempNote;
	}
	
	function appendToVAarray(VAval){
		//check first if VA is already existing		
		var existing=0;
		if (arrVARatings.length>0){
			for (var i=0;i<arrVARatings.length;i++){
				if(VAval==arrVARatings[i]){
					//VA already existing
					existing=1;
					break;
				}
			}
			if (existing==0){
				//then append
				arrVARatings[arrVARatings.length]=VAval;
			}
		} else {
			arrVARatings[0]=VAval;			
		}
	}
	
	function computeTotalMicroOven(){
		var table = document.getElementById("tblCA");
		var selectObjs = table.getElementsByTagName("select");
		var str="";
		var thisID="";
		var index="";
		var thisQty=0, thisVA=0;
		var tempVA=0;		
		
		for (var i=0; i<selectObjs.length;i++) {			
			str=selectObjs[i].id;
			thisID=str.substring(0,5);
			index=str.substring(5,str.length);
			thisVA=parseInt(document.getElementById("cboCAVA"+index).value);			
			thisQty=parseInt(document.getElementById("CAQty"+index).value);
			
			if (selectObjs[i].value == "Ordinary Microwave Oven") {								
				tempVA += thisVA * thisQty;				
			} else {
				if(thisVA>8750 && thisVA<=27000) {
					//append to VA array to check unequal ratings
					appendToVAarray(thisVA);					
					//NOTE 1
					//note1Qty+=thisQty;
					//note1VA+=thisQty*thisVA;
				} else if(thisVA>8750 && thisVA<=12000) {
					appendToVAarray(thisVA);
					//NOTE 2
					//round up na late nang nasabi at hindi na-discuss!
					/*
					if(thisVA>=8750 && thisVA<12000){
						thisVA=12000;
					}
					note2Qty = note2Qty + thisQty;
					note2VA = note2VA + (thisQty*thisVA);
					*/
				} else if(thisVA>=3500 && thisVA<=8750) {
					//NOTE 3
					note3Qty+=thisQty;
					note3VA+=thisQty*thisVA;
					colBQty+=thisQty;
					colBVA+=thisVA*thisQty;						
					
				} else if(thisVA<3500 && thisVA>1750) {
					//NOTE 4
					note4Qty+=thisQty;
					note4VA+=thisQty*thisVA;					
					colAQty+=thisQty;
					colAVA+=thisVA*thisQty;
					
				}  else if(thisVA<=1750 && thisVA>=1) {
					//NOTE 5
					note5Qty+=thisQty;
					note5VA+=thisQty*thisVA;
				}
			} 							
		}				
		return tempVA;
	}
	
	function computeTotalFA(){
		var table = document.getElementById("tblFA");
		var selectObjs = table.getElementsByTagName("input");
		var str="";
		var thisID="";
		var index="";
		var thisQty=0, thisVA=0;
		var tempVA=0;
		for (var i=0; i< selectObjs.length;i++) {			
			str=selectObjs[i].id;
			thisID=str.substring(0,7);
			index=str.substring(7,str.length);			
			if (selectObjs[i].type == "text" && thisID == "cboFAVA") {
				thisVA=parseInt(selectObjs[i].value);				
				thisQty=parseInt(document.getElementById("FAQty"+index).value);				
				tempVA += thisVA * thisQty;				
			}
		}
		return tempVA;
	}
	
	function computeTotalCD(){
		var table = document.getElementById("tblCD");
		var selectObjs = table.getElementsByTagName("input");
		var str="";
		var thisID="";
		var index="";
		var thisQty=0, thisVA=0;
		var tempVA=0, tempQty=0;
		for (var i=0; i< selectObjs.length;i++) {			 
			str=selectObjs[i].id;
			thisID=str.substring(0,7);
			index=str.substring(7,str.length);			
			if (selectObjs[i].type == "text" && thisID == "cboCDVA") {
				thisVA = parseInt(selectObjs[i].value);				
				if(thisVA>0){
					thisQty=parseInt(document.getElementById("CDQty"+index).value);					
					if(thisVA<5000){
						thisVA=5000;
					}
					tempVA = tempVA + (thisVA * thisQty);	
					tempQty = tempQty + thisQty;
				}							
			}
		}
		//addDebugText("Clothes Dryer Total Qty = " + tempQty);
		//addDebugText("Clothes Dryer Total VA = " + tempVA);
		var dFactor = arrClothesDryer[tempQty]/100;
		//addDebugText("Clothes Dryer dFactor = " + dFactor);
		var ttlCDVA = dFactor * tempVA;		
		//addDebugText("Clothes Dryer Load = " + ttlCDVA);
		return ttlCDVA;
	}
	
	
	
	//---------------------------------------------------------------
	//gen-purpose functions
	
	function myOnLoadFunction() {
		//POPULATE COMBOBOXES (first rows)		
		populateBLcbo();
		populateFAcbo("cboFA1");
		populateCAcbo("cboCA1");
		populateMLcbo("cboML1");		
		populateHPcbo("cboHP1");
		populateHLHPcbo("cboHLHP1");	
		populateCAtables();		
		populateClothesDryer();
		populateConductorTypecbo()
		
		
	}
	
	function populateConductorTypecbo() {
		var cbo = document.getElementById("cboConductorType");
		var el = document.createElement("option");		
    	for(var i = 0; i < arrConductorTypes.length; i++) {    	    
    	    el = document.createElement("option");
    	    el.textContent = arrConductorTypes[i];
    	    el.value =  arrConductorTypes[i];    	    
    	    cbo.appendChild(el);    	    
    	}
	}
	
	
	
	function populateClothesDryer(){
		arrClothesDryer[0]=0;
		arrClothesDryer[1]=100;
		arrClothesDryer[2]=100;
		arrClothesDryer[3]=100;
		arrClothesDryer[4]=100;
		arrClothesDryer[5]=85;
		arrClothesDryer[6]=75;
		arrClothesDryer[7]=65;
		arrClothesDryer[8]=60;
		arrClothesDryer[9]=55;
		arrClothesDryer[10]=50;
		arrClothesDryer[11]=47;
		arrClothesDryer[12]=46;
		arrClothesDryer[13]=45;
		arrClothesDryer[14]=44;
		arrClothesDryer[15]=43;
		arrClothesDryer[16]=42;
		arrClothesDryer[17]=41;
		arrClothesDryer[18]=40;
		arrClothesDryer[19]=39;
		arrClothesDryer[20]=38;
		arrClothesDryer[21]=37;
		arrClothesDryer[22]=36;
		arrClothesDryer[23]=35;
		arrClothesDryer[24]=34.5;
		arrClothesDryer[25]=34;
		arrClothesDryer[26]=33.5;
		arrClothesDryer[27]=33;
		arrClothesDryer[28]=32.5;
		arrClothesDryer[29]=32;
		arrClothesDryer[30]=31.5;
		arrClothesDryer[31]=31;
		arrClothesDryer[32]=30.5;
		arrClothesDryer[33]=30;
		arrClothesDryer[34]=29.5;
		arrClothesDryer[35]=29;
		arrClothesDryer[36]=28.5;
		arrClothesDryer[37]=28;
		arrClothesDryer[38]=27.5;
		arrClothesDryer[39]=27;
		arrClothesDryer[40]=26.5;
		arrClothesDryer[41]=26;
		arrClothesDryer[42]=25.5;
		
		for (var i=43;i<101;i++){
			arrClothesDryer[i]=25;
		}
	}
	
	function populateCAtables(){
		arrCAtableA[0]=0;
		arrCAtableA[1]=80;
		arrCAtableA[2]=75;
		arrCAtableA[3]=70;
		arrCAtableA[4]=66;
		arrCAtableA[5]=62;
		arrCAtableA[6]=59;
		arrCAtableA[7]=56;
		arrCAtableA[8]=53;
		arrCAtableA[9]=51;
		arrCAtableA[10]=49;
		arrCAtableA[11]=47;
		arrCAtableA[12]=45;
		arrCAtableA[13]=43;
		arrCAtableA[14]=41;
		arrCAtableA[15]=40;
		arrCAtableA[16]=39;
		arrCAtableA[17]=38;
		arrCAtableA[18]=37;
		arrCAtableA[19]=36;
		arrCAtableA[20]=35;
		arrCAtableA[21]=34;
		arrCAtableA[22]=33;
		arrCAtableA[23]=32;
		arrCAtableA[24]=31;
		arrCAtableA[25]=30;
		
		arrCAtableB[0]=0;
		arrCAtableB[1]=80;
		arrCAtableB[2]=65;
		arrCAtableB[3]=55;
		arrCAtableB[4]=50;
		arrCAtableB[5]=45;
		arrCAtableB[6]=43;
		arrCAtableB[7]=40;
		arrCAtableB[8]=36;
		arrCAtableB[9]=35;
		arrCAtableB[10]=34;
		arrCAtableB[11]=32;
		arrCAtableB[12]=32;
		arrCAtableB[13]=32;
		arrCAtableB[14]=32;
		arrCAtableB[15]=32;
		arrCAtableB[16]=28;
		arrCAtableB[17]=28;
		arrCAtableB[18]=28;
		arrCAtableB[19]=28;
		arrCAtableB[20]=28;
		arrCAtableB[21]=26;
		arrCAtableB[22]=26;
		arrCAtableB[23]=26;
		arrCAtableB[24]=26;
		arrCAtableB[25]=26;
		
		arrCAtableC[0]=0;
		arrCAtableC[1]=8;
		arrCAtableC[2]=11;
		arrCAtableC[3]=14;
		arrCAtableC[4]=17;
		arrCAtableC[5]=20;
		arrCAtableC[6]=21;
		arrCAtableC[7]=22;
		arrCAtableC[8]=23;
		arrCAtableC[9]=24;
		arrCAtableC[10]=25;
		arrCAtableC[11]=26;
		arrCAtableC[12]=27;
		arrCAtableC[13]=28;
		arrCAtableC[14]=29;
		arrCAtableC[15]=30;
		arrCAtableC[16]=31;
		arrCAtableC[17]=32;
		arrCAtableC[18]=33;
		arrCAtableC[19]=34;
		arrCAtableC[20]=35;
		arrCAtableC[21]=36;
		arrCAtableC[22]=37;
		arrCAtableC[23]=38;
		arrCAtableC[24]=39;
		arrCAtableC[25]=40;
		
		for (var i=26;i<101;i++) {
			arrCAtableA[i]=30;
			if (i<31){
				arrCAtableB[i]=24;
				arrCAtableC[i]=15;
			} else if (i<41){
				arrCAtableB[i]=22;
				arrCAtableC[i]=15;
			} else if (i<51){
				arrCAtableB[i]=20;
				arrCAtableC[i]=25;
			} else if (i<60){
				arrCAtableB[i]=18;
				arrCAtableC[i]=25;
			} else if (i<101){
				arrCAtableB[i]=16;
				arrCAtableC[i]=25;
			}			
		}
	}
	
	function populateBLcbo(){
		var cboSAL = document.getElementById("SAL");
		var cboLaundry = document.getElementById("laundry");
		var cboBathroom = document.getElementById("bathroom");
		var el1 = document.createElement("option");
		var el2 = document.createElement("option");
		var el3 = document.createElement("option");
    	for(var i = 2; i < 11; i++) {    	    
    	    el1 = document.createElement("option");
    	    el1.textContent = i;
    	    el1.value = i;
    	    el2 = document.createElement("option");
    	    el2.textContent = i;
    	    el2.value = i;
    	    el3 = document.createElement("option");
    	    el3.textContent = i;
    	    el3.value = i;
    	    cboLaundry.appendChild(el1);
    	    cboBathroom.appendChild(el2);
    	    cboSAL.appendChild(el3);
    	}
    	
	}
	
	
	function validateFloorArea(val) {		
		if (isNaN(val)){
			//alert"Invalid Value. Please enter a valid floor area in square meters.");
			document.getElementById("floorArea").value=0;
		}
		
		if (val<0 || val=="" || val.indexOf(' ') >= 0){
			//alert"Please enter a valid floor area in square meters.");
			document.getElementById("floorArea").value=0;
		}
		
		
		
	}
	
	
	function cboVoltageChanged(volt) {
		VOLTAGE=volt;
		
		//iterate on tables
		
		//HL table
		table = document.getElementById("tblHL");
		selectObjs = table.getElementsByTagName("input")		
		for (var i=0; i< selectObjs.length;i++) {			
			str=selectObjs[i].id;
			thisID=str.substring(0,7);			
			if (selectObjs[i].type == "text" && thisID == "cboHLVA") {
				var index=str.substring(7,str.length);
				//var rType = document.getElementById("HLVA"+index).checked;
				if (document.getElementById("HLVA"+index).checked==true) {
					//VA
					document.getElementById("cboHLVA"+index).value=0;
				} else {
					//HP					
					cboHLHPChanged(index);
				}							
			}
		}
		
		//ML table
		table = document.getElementById("tblML");
		selectObjs = table.getElementsByTagName("input")		
		for (var i=0; i< selectObjs.length;i++) {			
			str=selectObjs[i].id;
			thisID=str.substring(0,7);
			if (selectObjs[i].type == "text" && thisID == "cboMLVA") {
				var index=str.substring(7,str.length);
				////alertindex);
				var rType = document.getElementById("VA"+index).checked;
				if (rType==true) {
					//VA					
					document.getElementById("cboMLVA"+index).value=0;
				} else {
					//HP					
					cboHPChanged(index);
				}							
			}
		}			
	}
	
	function setVARating(cboName) {
		var volt = document.getElementById("serviceVoltage").value;
		var arr=[];
		if (volt==230) {
			arr=arrVARating230V;			
		}
		else if(volt==208){
			arr=arrVARating208V;
		}
		else if(volt==200) {
			arr=arrVARating200V;
		}
		else {
			//volt=115
			arr=arrVARating115V;
		}
			
		var cbo = document.getElementById(cboName); 
		cbo.innerHTML="";
		for(var i = 0; i < arr.length; i++) {
    	    var opt = arr[i];
    	    var el = document.createElement("option");
    	    el.textContent = opt;
    	    el.value = opt;
    	    cbo.appendChild(el);
    	}
	}
	
	
	
	
	//---------------------------------------------------------------
	//FA functions
	function validateFAQty(objName) {
		var index=objName.substring(5,objName.length);
		var thisQty=document.getElementById(objName).value;
		if (isNaN(thisQty)){
			//alert"Invalid Value. Please enter a valid Quantity for this Fastened Appliance.");
			document.getElementById(objName).value=0;
		}
		
		if (thisQty<0 || thisQty=="" || thisQty.indexOf(' ') >= 0){
			//alert"Please enter a valid Quantity for this Fastened  Appliance.");
			document.getElementById(objName).value=0;
		}
		
	}
	
	function validateFAVA(objName) {
		var index=objName.substring(7,objName.length);
		var thisVA=document.getElementById(objName).value;
		if (isNaN(thisVA)){
			//alert"Invalid Value. Please enter a valid VA Rating for this Fastened Appliance.");
			document.getElementById(objName).value=0;
		}
		
		if (thisVA<0 || thisVA=="" || thisVA.indexOf(' ') >= 0){
			//alert"Please enter a valid VA Rating for this Fastened  Appliance.");
			document.getElementById(objName).value=0;
		}
		
	}
	
	
	function populateFAcbo(cboName){
		var cbo = document.getElementById(cboName); 
		var el = document.createElement("option");
	    el.textContent = "SELECT Fastened Appliance";
	    el.value = "";
	    el.selected=true;
	    el.disabled=true;
	    cbo.appendChild(el);

    	for(var i = 0; i < arrFAtypes.length; i++) {
    	    var opt = arrFAtypes[i];
    	    el = document.createElement("option");
    	    el.textContent = opt;
    	    el.value = opt;
    	    cbo.appendChild(el);
    	}
    	
	}
	
	function cboFAChanged(index) {
		setVARating("cboFAVA" + index)
	}
	
	function addFA() {		
		
		
		var cols = "";        
        rowsFA = rowsFA+1;
        
        cols += '<tr id="rowFA' + rowsFA + '">';
        cols += '<td width="5%">&nbsp;</td>';	        
        cols += '<td width="70%"><select id="cboFA' + rowsFA + '" onchange="cboFAChanged(' + rowsFA + ')" style="width:100%; text-align-last:right;" ></select></td>';		
       	cols += '<td width="10%"><input type="text" id="FAQty' + rowsFA + '" style="width:100%;text-align:center;" value="0" onchange="validateFAQty(this.id)"></td>';
       	cols += '<td width="10%"><input type="text" id="cboFAVA' + rowsFA + '" style="width:100%;text-align:center;" value="0" onchange="validateFAVA(this.id)"></td>';
       	cols += '<td width="5%"><button class="buttonDelete" id="' + rowsFA + '" onclick="deleteFA(this)">-</button></td>';
       	cols += '</tr>';       	
       	var tr=document.getElementById("tblFA").insertRow(-1).innerHTML = cols;
       	populateFAcbo("cboFA"+rowsFA);      
       	setVARating("cboFAVA"+rowsFA);
       	
		
	}
	
	function deleteFA(obj){		
		var index = obj.closest("tr").rowIndex;
		document.getElementById("tblFA").deleteRow(index);    	   
	}
	
	
	//---------------------------------------------------------------
	//CA functions
	function validateCAQty(objName) {
		var index=objName.substring(5,objName.length);
		var thisQty=document.getElementById(objName).value;
		if (isNaN(thisQty)){
			//alert"Invalid Value. Please enter a valid Quantity for this Cooking Appliance.");
			document.getElementById(objName).value=0;
		}
		
		if (thisQty<0 || thisQty=="" || thisQty.indexOf(' ') >= 0){
			//alert"Please enter a valid Quantity for this Cooking Appliance.");
			document.getElementById(objName).value=0;
		}
		
	}
	
	function validateCAVA(cboName) {		
		var index=cboName.substring(7,cboName.length);
		var thisVA=document.getElementById(cboName).value;
		var selIndex = document.getElementById("cboCA"+index).selectedIndex;
		
		if (isNaN(thisVA)){
			//alert"Invalid Value. Please enter a valid VA Rating for this Cooking Appliance.");
			document.getElementById(cboName).value=0;
		}
		if (selIndex==0) {
			//alert"Please select first a valid Cooking Appliance.");
			document.getElementById(cboName).value=0;
		} else if (selIndex==4 && thisVA<0) {
			//alert"Please enter a valid VA Rating for this Cooking Appliance.");
			document.getElementById(cboName).value=0;
		} else if (selIndex!=4 && selIndex!=0 && (thisVA<0 || thisVA>8750 || thisVA=="" || thisVA.indexOf(' ') >= 0)) {
			//alert"Please enter a valid VA Rating for this Cooking Appliance.");
			document.getElementById(cboName).value=0;
		} else if (thisVA>27000 && selIndex==4) {
			//alert"VA Rating for Electric Range can be up to 27K VA only.");
			document.getElementById(cboName).value=0;
		}
		
		
	}
	
	function populateCAcbo(cboName){
		var cbo = document.getElementById(cboName); 
		var el = document.createElement("option");
	    el.textContent = "SELECT Cooking Appliance";
	    el.value = "";
	    el.selected=true;
	    el.disabled=true;
	    cbo.appendChild(el);

    	for(var i = 0; i < arrCAtypes.length; i++) {
    	    var opt = arrCAtypes[i];
    	    el = document.createElement("option");
    	    el.textContent = opt;
    	    el.value = opt;
    	    cbo.appendChild(el);
    	}
    	
	}
	
	function cboCAChanged(index) {
		setVARating("cboCAVA" + index)
	}
	
	function addCA() {		
        var cols = "";        
        rowsCA = rowsCA+1;        
        cols += '<tr id="rowCA' + rowsCA + '">';
        cols += '<td width="5%">&nbsp;</td>';	        
        cols += '<td width="60%"><select id="cboCA' + rowsCA + '" onchange="cboCAChanged(' + rowsCA + ')" style="width:100%; text-align-last:right;" ></select></td>';		
       	cols += '<td width="10%"><input type="text" id="CAQty' + rowsCA + '" style="width:100%;text-align:center;" value="0" onchange="validateCAQty(this.id)"></td>';
       	cols += '<td width="10%"><input type="text" id="cboCAVA' + rowsCA + '" style="width:100%;text-align:center;" value="0"  onchange="validateCAVA(this.id)"></td>';
       	cols += '<td width="5%"><button class="buttonDelete" id="' + rowsCA + '" onclick="deleteCA(this)">-</button></td>';
       	cols += '</tr>';       	
       	var tr=document.getElementById("tblCA").insertRow(-1).innerHTML = cols;
       	populateCAcbo("cboCA"+rowsCA);  
       	setVARating("cboCAVA"+rowsCA);
	}
	
	function deleteCA(obj){		
		var index = obj.closest("tr").rowIndex;
		document.getElementById("tblCA").deleteRow(index);    	   
	}
	
	
	//---------------------------------------------------------------
	//CD functions
	
	function validateCDQty(objName) {
		var index=objName.substring(5,objName.length);
		var thisQty=document.getElementById(objName).value;
		if (isNaN(thisQty)){
			//alert"Invalid Value. Please enter a valid Quantity for this Clothes Dryer.");
			document.getElementById(objName).value=0;
		}
		
		if (thisQty<0 || thisQty=="" || thisQty.indexOf(' ') >= 0){
			//alert"Please enter a valid Quantity for this Clothes Dryer.");
			document.getElementById(objName).value=0;
		}
		
	}
	
	function validateCDVA(objName) {
		var index=objName.substring(7,objName.length);
		var thisVA=document.getElementById(objName).value;
		if (isNaN(thisVA)){
			//alert"Invalid Value. Please enter a valid VA Rating for this Clothes Dryer.");
			document.getElementById(objName).value=0;
		}
		
		if (thisVA<0 || thisVA=="" || thisVA.indexOf(' ') >= 0){
			//alert"Please enter a valid VA Rating for this Clothes Dryer.");
			document.getElementById(objName).value=0;
		}
		
	}
	
	function addCD() {		
        var cols = "";        
        rowsCD = rowsCD+1;        
        cols += '<tr id="rowCD' + rowsCD + '">';
        cols += '<td width="5%">&nbsp;</td>';	        
        cols += '<td width="70%"><input type="text" id="CD' + rowsCD + '" style="width:100%;text-align:center;" value="Clothes Dryer ' + rowsCD + '"></td>';		
       	cols += '<td width="10%"><input type="text" id="CDQty' + rowsCD + '" style="width:100%;text-align:center;" value="0" onchange="validateCDQty(this.id)"></td>';
       	cols += '<td width="10%"><input type="text" id="cboCDVA' + rowsCD + '" style="width:100%;text-align:center;" value="0" onchange="validateCDVA(this.id)"></td>';
       	cols += '<td width="5%"><button class="buttonDelete" id="btnDeleteCD' + rowsCD + '" onclick="deleteCD(this)">-</button></td>';
       	cols += '</tr>';       	
       	var tr=document.getElementById("tblCD").insertRow(-1).innerHTML = cols;   
       	setVARating("cboCDVA" + rowsCD)
	}
	
	function deleteCD(obj){		
		var index = obj.closest("tr").rowIndex;
		document.getElementById("tblCD").deleteRow(index);    	   
	}
	
	
	//---------------------------------------------------------------
	//HL functions
	function validateHLQty(objName) {
		var index=objName.substring(5,objName.length);
		var thisQty=document.getElementById(objName).value;
		if (isNaN(thisQty)){
			//alert"Invalid Value. Please enter a valid Quantity for this Heater or AC Unit.");
			document.getElementById(objName).value=0;
		}
		
		if (thisQty<0 || thisQty=="" || thisQty.indexOf(' ') >= 0){
			//alert"Please enter a valid Quantity for this Heater or AC Unit.");
			document.getElementById(objName).value=0;
		}
		
	}
	
	function validateHLVA(objName) {
		var index=objName.substring(7,objName.length);
		var thisVA=document.getElementById(objName).value;
		if (isNaN(thisVA)){
			//alert"Invalid Value. Please enter a valid VA Rating for this Heater or AC Unit.");
			document.getElementById(objName).value=0;
		}
		
		if (thisVA<0 || thisVA=="" || thisVA.indexOf(' ') >= 0){
			//alert"Please enter a valid VA Rating for this Heater or AC Unit.");
			document.getElementById(objName).value=0;
		}
		
	}
	
	function addHL() {		
        var cols = "";        
        rowsHL = rowsHL+1;        
        cols += '<tr id="rowHL' + rowsHL + '">';
        cols += '<td width="0%">&nbsp;</td>';	        
        cols += '<td width="35%" align="center"><div name="selectHLappliance' + rowsHL + '" id="selectHLappliance' + rowsHL + '"><input type="radio" id="heater' + rowsHL + '" name="selectHLappliance' + rowsHL + '" value="heater">Heater&nbsp;<input type="radio" id="acu' + rowsHL + '" name="selectHLappliance' + rowsHL + '" value="acu" checked>ACU</div></td>';
        cols += '<td width="25%" align="center"><div name="selectHLrating' + rowsHL + '" id="selectHLrating' + rowsHL + '"><input type="radio" id="HLVA' + rowsHL + '" name="selectHLrating' + rowsHL + '" onclick = "HLratingTypeChanged(this)" value="VA" checked>VA&nbsp;<input type="radio" id="HLHP' + rowsHL + '" name="selectHLrating' + rowsHL + '" onclick = "HLratingTypeChanged(this)" value="HP">HP</div></td>';
       	cols += '<td width="15%" align="center"><select id="cboHLHP' + rowsHL + '" onchange="cboHLHPChanged(' + rowsHL + ')" style="width:100%; text-align-last:right;" disabled></select></td>';
       	cols += '<td width="10%"><input type="text" id="HLQty' + rowsHL + '" style="width:100%;text-align:center;" value="0" onchange="validateHLQty(this.id)"></td>';
       	cols += '<td width="10%"><input type="text" id="cboHLVA' + rowsHL + '" style="width:100%;text-align:center;" value="0" onchange="validateHLVA(this.id)"></td>';
       	cols += '<td width="5%"><button class="buttonDelete" id="btnDeleteHL' + rowsHL + '" onclick="deleteHL(this)">-</button></td>';
       	cols += '</tr>';       	
       	var tr=document.getElementById("tblHL").insertRow(-1).innerHTML = cols;  
       	populateHLHPcbo("cboHLHP" + rowsHL);
       	setVARating("cboHLVA" + rowsHL)
	}
	
	function deleteHL(obj){		
		var index = obj.closest("tr").rowIndex;
		document.getElementById("tblHL").deleteRow(index);    	   
	}
	
	function HLratingTypeChanged(obj) {
		var index = obj.closest("tr").rowIndex;
		var str=obj.id;		
		var thisID=str.substring(4,str.length);		
		var cbo=document.getElementById("cboHLHP" + thisID);
		if (obj.value=="HP") {
			cbo.disabled=false;
			setHLVARating("cboHLVA" + thisID, "HP");
			populateHLHPcbo("cboHLHP"+thisID);
		} else {
			cbo.disabled=true;			
			setHLVARating("cboHLVA" + thisID, "VA");
		}
		

	}
	
	function populateHLHPcbo(cboName){
		var cbo = document.getElementById(cboName); 
		cbo.innerHTML="";
		var el = document.createElement("option");
	    el.textContent = "SELECT Horsepower";
	    el.value = "";
	    el.selected=true;
	    el.disabled=true;
	    cbo.appendChild(el);

    	for(var i = 0; i < arrHPRating.length; i++) {
    	    var opt = arrHPRatingText[i];
    	    el = document.createElement("option");
    	    el.textContent = opt;
    	    el.value = arrHPRating[i];
    	    cbo.appendChild(el);
    	}
    	
	}
	
	function setHLVARating(cboName, ratingType) {
		var volt = VOLTAGE;
		var arr=[];
		var cbo = document.getElementById(cboName);		
		if (ratingType=="VA") {						
    	    cbo.value=0.0;    	    
    		var str=cbo.id;		    		
    		var thisID=str.substring(7,str.length);		    		    	    
    	    populateHLHPcbo("cboHLHP" + thisID);
		}
	}
	
	function cboHLHPChanged(index) {
		var thisIndex=document.getElementById("cboHLHP" + index).selectedIndex-1;
		if (thisIndex==-1) {
			var cbo = document.getElementById("cboHLVA" + index);
			cbo.value=0;									
		} else {
			var volt = VOLTAGE;
			var arr=[];
			if (volt==230) {
				arr=arrVARating230V;			
			} else if(volt==208){
				arr=arrVARating208V;
			} else if(volt==200) {
				arr=arrVARating200V;
			} else {
				//volt=115
				arr=arrVARating115V;
			}
			var thisVA=arr[thisIndex]*volt;
			var cbo = document.getElementById("cboHLVA" + index);
			cbo.value = thisVA;		    
		}		
	}
	
	
	//---------------------------------------------------------------
	//ML functions
	
	function validateMLQty(objName) {
		var index=objName.substring(5,objName.length);
		var thisQty=document.getElementById(objName).value;
		if (isNaN(thisQty)){
			//alert"Invalid Value. Please enter a valid Quantity for this Motor Unit.");
			document.getElementById(objName).value=0;
		}
		
		if (thisQty<0 || thisQty=="" || thisQty.indexOf(' ') >= 0){
			//alert"Please enter a valid Quantity for this Motor Unit.");
			document.getElementById(objName).value=0;
		}
		
	}
	
	function validateMLVA(objName) {
		var index=objName.substring(7,objName.length);
		var thisVA=document.getElementById(objName).value;
		if (isNaN(thisVA)){
			//alert"Invalid Value. Please enter a valid VA Rating for this Motor Unit.");
			document.getElementById(objName).value=0;
		}
		
		if (thisVA<0 || thisVA=="" || thisVA.indexOf(' ') >= 0){
			//alert"Please enter a valid VA Rating for this Motor Unit.");
			document.getElementById(objName).value=0;
		}
		
	}
	
	function populateMLcbo(cboName){
		var cbo = document.getElementById(cboName); 
		var el = document.createElement("option");
	    el.textContent = "SELECT Motor Appliance";
	    el.value = "";
	    el.selected=true;
	    el.disabled=true;
	    cbo.appendChild(el);

    	for(var i = 0; i < arrMLtypes.length; i++) {
    	    var opt = arrMLtypes[i];
    	    el = document.createElement("option");
    	    el.textContent = opt;
    	    el.value = opt;
    	    cbo.appendChild(el);
    	}
    	
	}
	
	function populateHPcbo(cboName){
		var cbo = document.getElementById(cboName); 
		cbo.innerHTML="";
		var el = document.createElement("option");
	    el.textContent = "SELECT Horsepower";
	    el.value = "";
	    el.selected=true;
	    el.disabled=true;
	    cbo.appendChild(el);

    	for(var i = 0; i < arrHPRating.length; i++) {
    	    var opt = arrHPRatingText[i];
    	    el = document.createElement("option");
    	    el.textContent = opt;
    	    el.value = arrHPRating[i];
    	    cbo.appendChild(el);
    	}
    	
	}
	
	
	function cboMLChanged(index) {
		var obj=document.getElementById("VA" + index);		
		if (obj.checked==true) {
			setMLVARating("cboMLVA" + index, "VA");	
		} else {
			setMLVARating("cboMLVA" + index, "HP");
		}						
	}
	
	function cboHPChanged(index) {
		var thisIndex=document.getElementById("cboHP" + index).selectedIndex-1;
		if (thisIndex==-1) {
			var cbo = document.getElementById("cboMLVA" + index);
			cbo.value = "0";		    
		} else {
			var volt = VOLTAGE;
			var arr=[];
			if (volt==230) {
				arr=arrVARating230V;			
			} else if(volt==208){
				arr=arrVARating208V;
			} else if(volt==200) {
				arr=arrVARating200V;
			} else {
				//volt=115
				arr=arrVARating115V;
			}
			var thisVA=arr[thisIndex]*volt;
			var cbo = document.getElementById("cboMLVA" + index);
			cbo.value = thisVA;		    
		}
		
	}
	
	function addML() {		
        var cols = "";        
        rowsML = rowsML+1;        
        cols += '<tr id="rowML' + rowsML + '">';
        cols += '<td width="0%">&nbsp;</td>';	        
        cols += '<td width="35%"><select id="cboML' + rowsML + '" onchange="cboMLChanged(' + rowsML + ')" style="width:100%; text-align-last:right;" ></select></td>';		
       	cols += '<td width="25%" align="center"><div name="selectMLrating' + rowsML + '" id="selectMLrating' + rowsML + '"><input type="radio" id="VA' + rowsML + '" name="selectMLrating' + rowsML + '" onclick = "MLratingTypeChanged(this)" value="VA" checked>VA&nbsp;<input type="radio" id="HP' + rowsML + '" name="selectMLrating' + rowsML + '" onclick = "MLratingTypeChanged(this)" value="HP">HP</div></td>';
       	cols += '<td width="15%" align="center"><select id="cboHP' + rowsML + '" onchange="cboHPChanged(' + rowsML + ')" style="width:100%; text-align-last:right;" disabled></select></td>';
       	cols += '<td width="10%"><input type="text" id="MLQty' + rowsML + '" style="width:100%;text-align:center;" value="0" onchange="validateMLQty(this.id)"></td>';
       	cols += '<td width="10%"><input type="text" id="cboMLVA' + rowsML + '" style="width:100%;text-align:center;" value="0" onchange="validateMLVA(this.id)"></td>';       	
       	cols += '<td width="5%"><button class="buttonDelete" id="' + rowsML + '" onclick="deleteML(this)">-</button></td>';
       	cols += '</tr>';  
       	var tr=document.getElementById("tblML").insertRow(-1).innerHTML = cols;
       	populateMLcbo("cboML"+rowsML);
       	populateHPcbo("cboHP"+rowsML);
       	setMLVARating("cboMLVA"+rowsML,"VA");
       	window.scrollTo(0,document.body.scrollHeight);
	}
	
	function deleteML(obj){		
		var index = obj.closest("tr").rowIndex;
		document.getElementById("tblML").deleteRow(index);    	   
	}
	
	function MLratingTypeChanged(obj) {
		var index = obj.closest("tr").rowIndex;
		var str=obj.id;		
		var thisID=str.substring(2,str.length);		
		var cbo=document.getElementById("cboHP" + thisID);
		if (obj.value=="HP") {
			cbo.disabled=false;
			setMLVARating("cboMLVA" + thisID, "HP");
			populateHPcbo("cboHP"+thisID);
		} else {
			cbo.disabled=true;			
			setMLVARating("cboMLVA" + thisID, "VA");
		}
		

	}
	
	function setMLVARating(cboName, ratingType) {
		var volt = VOLTAGE;
		var arr=[];
		var cbo = document.getElementById(cboName);		
		if (ratingType=="VA") {						
    	    cbo.value=0.0;    	    
    		var str=cbo.id;		    		
    		var thisID=str.substring(7,str.length);		    		    	    
    	    populateHLHPcbo("cboHP" + thisID);
		}
	}
	
	
	
	function reccommendationChanged(ans) {
		if(ans=="YES"){
			document.getElementById("safetyFactor").disabled=false;			
		} else {
			document.getElementById("safetyFactor").disabled=true;			
		}
	}
	
	function validateSafetyFactor() {
		var thisID=document.getElementById("safetyFactor").id;
		var thisVal=document.getElementById("safetyFactor").value;
		if (isNaN(thisVal)){
			//alert"Invalid Value. Please enter a valid Safety Factor.");
			document.getElementById(thisID).value=0;
		}
		
		if (thisVal<0 || thisVal=="" || thisVal.indexOf(' ') >= 0){
			//alert"Please enter a valid Safety Factor.");
			document.getElementById(thisID).value=0;
		}
	}
	//---------------------------------------------------------------
	//FLOATING MENU
	
	topMenu.add('floatdivTop',  
	        {  
	            // Represents distance from left or right browser window  
	            // border depending upon property used. Only one should be  
	            // specified.  
	            // targetLeft: 0,  
	            targetRight: 0,  
	  
	            // Represents distance from top or bottom browser window  
	            // border depending upon property used. Only one should be  
	            // specified.  
	            targetTop: 0,  
	            // targetBottom: 0,  
	  
	            // Uncomment one of those if you need centering on  
	            // X- or Y- axis.  
	             //centerX: true,  
	             //centerY: true,  
	  
	            // Remove this one if you don't want snap effect  
	            snap: false  
	        });  
	
	bottomMenu.add('floatdivBottom',  
	        {  
	            // Represents distance from left or right browser window  
	            // border depending upon property used. Only one should be  
	            // specified.  
	            // targetLeft: 0,  
	            targetRight: 0,  
	  
	            // Represents distance from top or bottom browser window  
	            // border depending upon property used. Only one should be  
	            // specified.  
	            //targetTop: 0,  
	             targetBottom: 0,  
	  
	            // Uncomment one of those if you need centering on  
	            // X- or Y- axis.  
	             //centerX: true,  
	             //centerY: true,  
	  
	            // Remove this one if you don't want snap effect  
	            snap: false  
	        });  
