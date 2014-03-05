﻿/*******************************************************

  Eniris
  2014-03-05

  Export files to XXHDPI, XHDPI, HDPI and MDPI sizes. 
  Base size is XHDPI: 320dpi

********************************************************/
// enable double clicking from the 
// Macintosh Finder or the Windows Explorer
#target photoshop

// Make Photoshop the frontmost application
app.bringToFront();

// Document reference
var doc = app.activeDocument;

// Save the current preferences
var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;

// Set Adobe Photoshop to use pixels and display no dialogs
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.NO;

// The document resolution
var the_resolution = doc.resolution;

if (the_resolution == '320'){// resolution is 320dpi

	// PNG Settings
	var options = new PNGSaveOptions();
	options.compression = 0;
	options.interlaced = false;

	// Folders and resolutions
	var folderPaths = [
		"/elements/drawable-xhdpi/", 
		"/elements/drawable-xxhdpi/", 
		"/elements/drawable-hdpi/", 
		"/elements/drawable-mdpi/"
	];
	var resolutions = [
		320, // xhdpi
		480, // xxhdpi
		240, // hdpi
		160 // mdpi
	];


	/***********************
		Export Process
	***********************/

	// Save current document state
	var defaultState = doc.activeHistoryState;

	// Ask user for input folder
	var theExportDocName = prompt('Exported file name. Leave empty if you want to actual file name.', '');
	//alert (theExportDocName);
	if ( !theExportDocName ){
		// Document Name for file export name
		var theExportDocName = activeDocument.fullName.name.slice(0, -4);
	}

	for (var i=0; i<4; i++){

		// Resize the file
		var resize = doc.resizeImage(null, null, resolutions[i], ResampleMethod.BICUBIC);

		// Create new file and save it
		var saveFile = new File(decodeURI(activeDocument.fullName.fsName).slice(0, -4) + ".png");
		app.activeDocument.saveAs(saveFile, options, false, Extension.LOWERCASE);

		// Copy file into new folder
		var destFolder = activeDocument.fullName.parent + folderPaths[i];

		if( !Folder(destFolder).exists ){
			Folder(destFolder).create();
		}

		var destFile = new File(destFolder + theExportDocName + ".png");
		saveFile.copy(destFile);
		saveFile.remove();
		saveFile.close();

		doc.activeHistoryState = defaultState;

	}

	alert("Android export done.");
	
}else{ // resolution isn't 320dpi
		
	alert ("Your document resolution isn't 320dpi") ; 
	
} //end if resolution

// Reset the application preferences
app.preferences.rulerUnits = startRulerUnits;
app.preferences.typeUnits = startTypeUnits;
app.displayDialogs = startDisplayDialogs;
