//---------------------------------------------------------------
	/*Arrays*/
	//VA Ratings
	var arrVARating230V = [0, 2.2, 2.9, 3.6, 4.9, 6.9, 8, 10, 12, 17, 28, 40, 50];
	var arrVARating208V = [0, 2.4, 3.2, 4, 5.4, 7.6, 8.8, 11, 13.2, 18.7, 30.8, 44, 55];
	var arrVARating200V = [0, 2.5, 3.3, 4.1, 5.6, 7.9, 9.2, 11.5, 13.8, 19.6, 32.2, 46, 57.5];
	var arrVARating115V = [0, 4.4, 5.8, 7.2, 9.8, 13.8, 16, 20, 24, 34, 56, 80, 100];
	var arrHPRatingText = ["0", "1/6", "1/4", "1/3", "1/2", "3/4", "1", "1 1/2", "2", "3", "5", "7 1/2", "10"]
	var arrHPRating = [0, 0.166666666666667, 0.25, 0.333333333333333, 0.5, 0.75, 1, 1.5, 2, 3, 5, 7.5, 10]
	
	//---------------------------------------------------------------
	//Appliance Types
	var arrFAtypes = ["Garbage Disposer", "Water Heater", "Dishwasher"];
	var arrCAtypes = ["Electric Range", "Cook Top", "Wall-Mounted Oven"];
	var arrMLtypes = ["Water Pump", "Washing Machine"];
	
	//---------------------------------------------------------------
	//Get the modal
	var modal = document.getElementById('myModal');
	var modalAbout=document.getElementById('aboutModal');
	
	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");
	var btnAbout = document.getElementById("btnAbout");
	
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	var span2 = document.getElementsByClassName("close2")[0];
	
	// When the user clicks the button, open the modal 
	btn.onclick = function() {
	    modal.style.display = "block";	   
	    calculateLoad();
	}
	
	btnAbout.onclick = function() {
	    modalAbout.style.display = "block";	   
	    
	}
	
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";	    
	}
	span2.onclick = function() {	    
	    modalAbout.style.display = "none";
	}
	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal || event.target == modalAbout) {	    		    	
	    	modal.style.display = "none";	    		       
	    	modalAbout.style.display = "none";
	    }
	}
	
	
	//---------------------------------------------------------------
	//MAIN FUNCTION
	function calculateLoad() {
		//Get Floor Area
		FA=document.getElementById("floorArea").value;
		
		//COMPUTATION FOR GLCRL
		GLCRL=FA*24;
		
		//COMPUTATION FOR BRANCH CIRCUIT LOADS
		SAL=document.getElementById("SAL").value;
		LL=document.getElementById("laundry").value;
		BL=document.getElementById("bathroom").value;
		TSAL=1500*SAL;
		TLL=1500*LL;
		TBL=1500*BL;
		
		//COMPUTATION FOR NET TOTAL LOAD FROM A TO D (GLCRL, SAL, LL, & BL)
		TOT=GLCRL+TSAL+TLL+TBL;

		//APPLICATION OF DEMAND FACTORS
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
		
		//FASTENED APPLIANCES
		
		//Garbage Disposer
		
		
		
	}
	
	
	//---------------------------------------------------------------
	//gen-purpose functions
	
	function myOnLoadFunction() {
		//POPULATE COMBOBOXES (first rows)		
		populateFAcbo("cboFA1");
		populateCAcbo("cboCA1");
		populateMLcbo("cboML1");		
		populateHPcbo("cboHP1");
		populateHLHPcbo("cboHLHP1");
		
		
    	//POPULATE VAs
    	setVARating("cboFAVA1");
    	setVARating("cboCAVA1");
    	setVARating("cboCDVA1");
    	setVARating("cboHLVA1");
    	setMLVARating("cboMLVA1", "VA");
	}
	
	function cboVoltageChanged(volt) {
		VOLTAGE=volt;
		
		//iterate all tables
		
		//FA table
		var table = document.getElementById("tblFA");
		var selectObjs = table.getElementsByTagName("select")
		var str="";
		var thisID="";
		for (var i=0; i< selectObjs.length;i++) {			
			str=selectObjs[i].id;
			thisID=str.substring(0,7);
			if (selectObjs[i].type == "select-one" && thisID == "cboFAVA") {
				setVARating(selectObjs[i].id);	
			}
		}
		
		//CA table
		table = document.getElementById("tblCA");
		selectObjs = table.getElementsByTagName("select")		
		for (var i=0; i< selectObjs.length;i++) {			
			str=selectObjs[i].id;
			thisID=str.substring(0,7);
			if (selectObjs[i].type == "select-one" && thisID == "cboCAVA") {
				setVARating(selectObjs[i].id);	
			}
		}
		
		//CD table
		table = document.getElementById("tblCD");
		selectObjs = table.getElementsByTagName("select")		
		for (var i=0; i< selectObjs.length;i++) {			
			str=selectObjs[i].id;
			thisID=str.substring(0,7);
			if (selectObjs[i].type == "select-one" && thisID == "cboCDVA") {
				setVARating(selectObjs[i].id);	
			}
		}
		
		//HL table
		table = document.getElementById("tblHL");
		selectObjs = table.getElementsByTagName("select")		
		for (var i=0; i< selectObjs.length;i++) {			
			str=selectObjs[i].id;
			thisID=str.substring(0,7);
			if (selectObjs[i].type == "select-one" && thisID == "cboHLVA") {
				var index=str.substring(7,str.length);
				//alert(index);
				var rType = document.getElementById("HLVA"+index).checked;
				if (rType==true) {
					//VA
					setHLVARating(selectObjs[i].id,"VA");
				} else {
					//HP					
					cboHLHPChanged(index);
				}							
			}
		}
		
		//ML table
		table = document.getElementById("tblML");
		selectObjs = table.getElementsByTagName("select")		
		for (var i=0; i< selectObjs.length;i++) {			
			str=selectObjs[i].id;
			thisID=str.substring(0,7);
			if (selectObjs[i].type == "select-one" && thisID == "cboMLVA") {
				var index=str.substring(7,str.length);
				//alert(index);
				var rType = document.getElementById("VA"+index).checked;
				if (rType==true) {
					//VA
					setMLVARating(selectObjs[i].id,"VA");
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
        //alert(rowsFA);
        cols += '<tr id="rowFA' + rowsFA + '">';
        cols += '<td width="5%">&nbsp;</td>';	        
        cols += '<td width="65%"><select id="cboFA' + rowsFA + '" onchange="cboFAChanged(' + rowsFA + ')" style="width:100%; text-align-last:right;" ></select></td>';		
       	cols += '<td width="10%"><input type="text" id="FAQty' + rowsFA + '" style="width:100%;text-align:center;" value="0"></td>';
       	cols += '<td width="15%"><select id="cboFAVA' + rowsFA + '" style="width:100%; text-align-last:center;" ><option selected value="0">0</option></select></td>';
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
        cols += '<td width="65%"><select id="cboCA' + rowsCA + '" onchange="cboCAChanged(' + rowsCA + ')" style="width:100%; text-align-last:right;" ></select></td>';		
       	cols += '<td width="10%"><input type="text" id="CAQty' + rowsCA + '" style="width:100%;text-align:center;" value="0"></td>';
       	cols += '<td width="15%"><select id="cboCAVA' + rowsCA + '" style="width:100%; text-align-last:center;" ><option selected value="0">0</option></select></td>';
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
	
	function addCD() {		
        var cols = "";        
        rowsCD = rowsCD+1;        
        cols += '<tr id="rowCD' + rowsCD + '">';
        cols += '<td width="5%">&nbsp;</td>';	        
        cols += '<td width="65%"><input type="text" id="CD' + rowsCD + '" style="width:100%;text-align:center;" value="Clothes Dryer ' + rowsCD + '"></td>';		
       	cols += '<td width="10%"><input type="text" id="CDQty' + rowsCD + '" style="width:100%;text-align:center;" value="0"></td>';
       	cols += '<td width="15%"><select id="cboCDVA' + rowsCD + '" style="width:100%; text-align-last:center;" ><option selected value="0">0</option></select></td>';
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
	
	function addHL() {		
        var cols = "";        
        rowsHL = rowsHL+1;        
        cols += '<tr id="rowHL' + rowsHL + '">';
        cols += '<td width="0%">&nbsp;</td>';	        
        cols += '<td width="30%" align="center"><div name="selectHLappliance' + rowsHL + '" id="selectHLappliance' + rowsHL + '"><input type="radio" id="heater' + rowsHL + '" name="selectHLappliance' + rowsHL + '" value="heater">Heater&nbsp;<input type="radio" id="acu' + rowsHL + '" name="selectHLappliance' + rowsHL + '" value="acu" checked>ACU</div></td>';
        cols += '<td width="25%" align="center"><div name="selectHLrating' + rowsHL + '" id="selectHLrating' + rowsHL + '"><input type="radio" id="HLVA' + rowsHL + '" name="selectHLrating' + rowsHL + '" onclick = "HLratingTypeChanged(this)" value="VA" checked>VA&nbsp;<input type="radio" id="HLHP' + rowsHL + '" name="selectHLrating' + rowsHL + '" onclick = "HLratingTypeChanged(this)" value="HP">HP</div></td>';
       	cols += '<td width="15%" align="center"><select id="cboHLHP' + rowsHL + '" onchange="cboHLHPChanged(' + rowsHL + ')" style="width:100%; text-align-last:right;" disabled></select></td>';
       	cols += '<td width="10%"><input type="text" id="HLQty' + rowsHL + '" style="width:100%;text-align:center;" value="0"></td>';
       	cols += '<td width="15%"><select id="cboHLVA' + rowsHL + '" style="width:100%; text-align-last:center;" ><option selected value="0">0</option></select></td>';
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
		cbo.innerHTML="";
		if (ratingType=="VA") {
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
			for(var i = 0; i < arr.length; i++) {
	    	    var opt = arr[i];
	    	    var el = document.createElement("option");
	    	    el.textContent = opt;
	    	    el.value = opt;
	    	    cbo.appendChild(el);
	    	}
		} else {
			var el = document.createElement("option");
    	    el.textContent = "0";
    	    el.value = "0";
    	    cbo.appendChild(el);
    	    
    		var str=cbo.id;		    		
    		var thisID=str.substring(7,str.length);		    		
    	    
    	    populateHLHPcbo("cboHLHP" + thisID);
		}
	}
	
	function cboHLHPChanged(index) {
		var thisIndex=document.getElementById("cboHLHP" + index).selectedIndex-1;
		if (thisIndex==-1) {
			var cbo = document.getElementById("cboHLVA" + index);
			cbo.innerHTML="";						
			var el = document.createElement("option");
		    el.textContent = "0";
		    el.value = "0";
		    cbo.appendChild(el);
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
			var thisVA=arr[thisIndex];
			var cbo = document.getElementById("cboHLVA" + index);
			cbo.innerHTML="";						
			var el = document.createElement("option");
		    el.textContent = thisVA;
		    el.value = thisVA;
		    cbo.appendChild(el);
		}
		
	}
	
	
	//---------------------------------------------------------------
	//ML functions
	
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
			cbo.innerHTML="";						
			var el = document.createElement("option");
		    el.textContent = "0";
		    el.value = "0";
		    cbo.appendChild(el);
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
			var thisVA=arr[thisIndex];
			var cbo = document.getElementById("cboMLVA" + index);
			cbo.innerHTML="";						
			var el = document.createElement("option");
		    el.textContent = thisVA;
		    el.value = thisVA;
		    cbo.appendChild(el);
		}
		
	}
	
	function addML() {		
        var cols = "";        
        rowsML = rowsML+1;        
        cols += '<tr id="rowML' + rowsML + '">';
        cols += '<td width="5%">&nbsp;</td>';	        
        cols += '<td width="25%"><select id="cboML' + rowsML + '" onchange="cboMLChanged(' + rowsML + ')" style="width:100%; text-align-last:right;" ></select></td>';		
       	cols += '<td width="25%" align="center"><div name="selectMLrating' + rowsML + '" id="selectMLrating' + rowsML + '"><input type="radio" id="VA' + rowsML + '" name="selectMLrating' + rowsML + '" onclick = "MLratingTypeChanged(this)" value="VA" checked>VA&nbsp;<input type="radio" id="HP' + rowsML + '" name="selectMLrating' + rowsML + '" onclick = "MLratingTypeChanged(this)" value="HP">HP</div></td>';
       	cols += '<td width="15%" align="center"><select id="cboHP' + rowsML + '" onchange="cboHPChanged(' + rowsML + ')" style="width:100%; text-align-last:right;" disabled></select></td>';
       	cols += '<td width="10%"><input type="text" id="MLQty' + rowsML + '" style="width:100%;text-align:center;" value="0"></td>';
       	cols += '<td width="15%"><select id="cboMLVA' + rowsML + '" style="width:100%; text-align-last:center;" ><option selected value="0">0</option></select></td>';       	
       	cols += '<td width="5%"><button class="buttonDelete" id="' + rowsML + '" onclick="deleteML(this)">-</button></td>';
       	cols += '</tr>';  
       	var tr=document.getElementById("tblML").insertRow(-1).innerHTML = cols;
       	populateMLcbo("cboML"+rowsML);
       	populateHPcbo("cboHP"+rowsML);
       	setMLVARating("cboMLVA"+rowsML,"VA");
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
		//var volt = document.getElementById("serviceVoltage").value;
		var volt = VOLTAGE;
		var arr=[];
		var cbo = document.getElementById(cboName);
		cbo.innerHTML="";
		if (ratingType=="VA") {
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
			for(var i = 0; i < arr.length; i++) {
	    	    var opt = arr[i];
	    	    var el = document.createElement("option");
	    	    el.textContent = opt;
	    	    el.value = opt;
	    	    cbo.appendChild(el);
	    	}
		} else {
			var el = document.createElement("option");
    	    el.textContent = "0";
    	    el.value = "0";
    	    cbo.appendChild(el);
    	    
    		var str=cbo.id;		    		
    		var thisID=str.substring(7,str.length);		    		
    	    
    	    populateHPcbo("cboHP" + thisID);
		}
		
	}