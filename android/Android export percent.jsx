/*******************************************************

  Eniris
  2013-03-12

  Export files to XHDPI, HDPI and LDPI sizes. Base size is
  MDPI: 320x480dp
  
  based form Francisco de la Rosa code

********************************************************/

// Document reference
var doc = app.activeDocument;

displayDialogs = DialogModes.NO;
preferences.rulerUnits = Units.PERCENT;

// PNG Settings
var options = new PNGSaveOptions();
options.compression = 0;
options.interlaced = false;

// Folders and sizes
var folderPaths = ["/apk/drawable-mdpi/", "/apk/drawable-xhdpi/", "/apk/drawable-hdpi/", "/apk/drawable-ldpi/"];
var sizes = [100, 200, 150, 75];


/***********************
    Export Process
***********************/

// Save current document state
var defaultState = doc.activeHistoryState;

for (var i=0; i<4; i++){

	var resize = doc.resizeImage(sizes[i], sizes[i], null, ResampleMethod.BICUBIC);

	// Create new File and save it
	var saveFile = new File(decodeURI(activeDocument.fullName.fsName).slice(0, -4) + ".png");
	app.activeDocument.saveAs(saveFile, options, false, Extension.LOWERCASE);

	// Copy file into new folder
	var destFolder = activeDocument.fullName.parent + folderPaths[i];

	if( !Folder(destFolder).exists ){
		Folder(destFolder).create();
	}

	var destFile = new File(destFolder + activeDocument.fullName.name.slice(0, -4) + ".png");
	saveFile.copy(destFile);
	saveFile.remove();
	saveFile.close();

	doc.activeHistoryState = defaultState;

}

alert("Done.");
