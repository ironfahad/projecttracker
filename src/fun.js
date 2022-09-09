//WITH THE NAME OF ALLAH, THE MOST MERCIFUL, THE MOST BENEFICIENT! 

const fun = {

  tasksSheetName: 'Tasks',

  printMessage: function (targetCellRange, message) {

    targetCellRange.setValue(message); 


  },

  findTargetEmployeeSpreadSheet: function (employeeName) {

    const nameOfEmployee = employeeName; 
    const employeesArray = resources.hrSS().employeesDataValues; 
    Logger.log('test employees array will come here!!')
    Logger.log(employeesArray); 
    const targetEmployeeDataRow = employeesArray.filter( row => {
      return row[1].includes(nameOfEmployee); 
    }); 

    Logger.log(targetEmployeeDataRow); 

    const employeeSpreadsheetId = targetEmployeeDataRow[0][6]; 

    return {employeeSpreadsheetId, targetEmployeeDataRow}; 
    
    },

    findRowNumber: function (spreadSheetId, sheetName, rowID) {
       
      const iDofSpreadsheet = spreadSheetId; 
      Logger.log('id of the test spreadsheet will come here')
      Logger.log(iDofSpreadsheet); // correct spreadsheetID is being extracted~ we are close to our problem! 
      const _sheetName = sheetName; 
      Logger.log('name of sheet will come here'); 
      Logger.log(_sheetName); // correct name is being extracted! 
      const iDofRow = rowID;
      Logger.log(iDofRow); 

      const tasksSheet = SpreadsheetApp.openById(iDofSpreadsheet).getSheetByName(_sheetName); 

      const targetSheetArray = tasksSheet.getRange(2, 1, tasksSheet.getLastRow() - 1, tasksSheet.getLastColumn()).getValues(); 

      const targetRow = targetSheetArray.filter( row => {
        return row[0] === iDofRow; 
      }); 

      Logger.log('target Row will come here'); 
      Logger.log(targetRow); 

      const indexOfTargetRow = targetSheetArray.indexOf(targetRow[0]); 

      const actualRowNumber = indexOfTargetRow + 2; 

      Logger.log('Actual Row Number will come here'); 

      Logger.log(actualRowNumber); // There seems to be some sort of an issue going on here as well! 


      return actualRowNumber; 

    },

    findtargetTaskRow: function (spreadSheetId, sheetName, rowID) {
       
      const iDofSpreadsheet = spreadSheetId; 
      Logger.log('id of the test spreadsheet will come here')
      Logger.log(iDofSpreadsheet); // correct spreadsheetID is being extracted~ we are close to our problem! 
      const _sheetName = sheetName; 
      Logger.log('name of sheet will come here'); 
      Logger.log(_sheetName); // correct name is being extracted! 
      const iDofRow = rowID;
      Logger.log(iDofRow); 

      const tasksSheet = SpreadsheetApp.openById(iDofSpreadsheet).getSheetByName(_sheetName); 

      const targetSheetArray = tasksSheet.getRange(2, 1, tasksSheet.getLastRow() - 1, tasksSheet.getLastColumn()).getValues(); 

      const targetRow = targetSheetArray.filter( row => {
        return row[0] === iDofRow; 
      }); 

      Logger.log('target Row will come here'); 
      Logger.log(targetRow); 

      const indexOfTargetRow = targetSheetArray.indexOf(targetRow[0]); 

      const actualRowNumber = indexOfTargetRow + 2; 

      Logger.log('Actual Row Number will come here'); 

      Logger.log(actualRowNumber); // There seems to be some sort of an issue going on here as well! 


      return targetRow; 

    },

  toggleTargetSheetToActiveColor: function (spreadSheetId, sheetName, rowNumber) {

    const ssId = spreadSheetId; 
    const sheet = sheetName; 
    const numberRow = rowNumber; 
    Logger.log('Row number will come here'); 
    Logger.log(numberRow); 

    const targetSheet = SpreadsheetApp.openById(ssId).getSheetByName(sheet); 
    
    const targetRange = targetSheet.getRange(numberRow, 1, 1, targetSheet.getLastColumn()); 
    targetRange.setBackground("#ffe28a"); 


    Logger.log('Color Function Executed Successfully!');
  }, 

  reprioritizeTaskRow: function (taskRowArray, priorityValue, totalTasksArray, targetSheet, indexOfDataRow ) {

    const _taskRow = taskRowArray[0];
    const _indexOfDataRow = indexOfDataRow; 
    Logger.log(' _task row will come here ')
    Logger.log(_taskRow); 

    const _priorityValue = priorityValue; // suppose requested priority value is 1 what will happen then? 

    const _totalTasksArray = totalTasksArray; 

    Logger.log('reprioritizetTaskRow function Total Tasks Array will come here'); 
    Logger.log(_totalTasksArray); 

    const _targetSheet = targetSheet; 

    const range = _targetSheet.getRange(6, 1, _targetSheet.getLastRow() - 5, _targetSheet.getLastColumn()); 

   

     _totalTasksArray.splice(_indexOfDataRow, 1); 
    Logger.log('after first splice'); 
    Logger.log(_indexOfDataRow); 
    Logger.log(_totalTasksArray); 

    _totalTasksArray.splice(_priorityValue, 0, _taskRow); 

   

    Logger.log('after second splice'); 
    Logger.log(_totalTasksArray); 

    for ( let i = 0; i < _totalTasksArray.length; i++) {

      _totalTasksArray[i].splice(5, 1, i); 

    }

    Logger.log(_totalTasksArray); 

    range.setValues(_totalTasksArray); 

  },

  highLightColor: function (spreadSheetId, sheetName, rowNumber) {

    const ssId = spreadSheetId; 
    const sheet = sheetName; 
    const numberRow = rowNumber; 
    Logger.log('Row number will come here'); 
    Logger.log(numberRow); 

    const targetSheet = SpreadsheetApp.openById(ssId).getSheetByName(sheet); 
    
    const targetRange = targetSheet.getRange(numberRow, 1, 1, targetSheet.getLastColumn()); 
    targetRange.setBackground("#fffeb3"); 


    Logger.log('Highlight Color Function Executed Successfully!');
  }, 

  unHighLightColor: function (spreadSheetId, sheetName, rowNumber) {

    const ssId = spreadSheetId; 
    const sheet = sheetName; 
    const numberRow = rowNumber; 
    Logger.log('Row number will come here'); 
    Logger.log(numberRow); 

    const targetSheet = SpreadsheetApp.openById(ssId).getSheetByName(sheet); 
    
    const targetRange = targetSheet.getRange(numberRow, 1, 1, targetSheet.getLastColumn()); 
    targetRange.setBackground("white"); 


    Logger.log('unHighlight Color Function Executed Successfully!');
  }, 

  getEventData: function (e) {

    const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(); 
    const activesheet = activeSpreadsheet.getActiveSheet(); 
    const sheetName = activesheet.getSheetName(); 
    Logger.log('Event data Sheet Name Check will come here ')
    Logger.log(sheetName); // correct sheet is being extracted! 
    const dataRange = activesheet.getRange(6, 1, activesheet.getLastRow() - 5, activesheet.getLastColumn());
    const totalDataArray = dataRange.getValues(); 
    const activeRowRange = activesheet.getRange(e.range.getRow(), 1, 1, activesheet.getLastColumn()); 
    const activeDataRowArray = activeRowRange.getValues(); 
    Logger.log("ActiveDataRow Array will come here"); 
    Logger.log(activeDataRowArray); 

    // const activeRowNumber = activesheet.getRow(); 
    // const activeRowArrayIndex = activeRowNumber - 2; 



    const taskID = activeDataRowArray[0][0]; 
    const taskType = activeDataRowArray[0][1]; 
    const primarytask = activeDataRowArray[0][2]; 
    const taskStatus = activeDataRowArray[0][3]; 
    const assignedTo = activeDataRowArray[0][4]; 
    const priority = activeDataRowArray[0][5]; 
    const startDate = activeDataRowArray[0][6]; 
    const dueDate = activeDataRowArray[0][7]; 
    const blankColumn = activeDataRowArray[0][8]; 
    

    Logger.log('Event Object Executed Successfully'); 


    return {taskID, taskType, primarytask, taskStatus, assignedTo, priority, startDate, dueDate, blankColumn, activeDataRowArray}; 
    

  },  

  generateUniqueArray: function (targetArray) {

    const duplicateEliminatedArray = targetArray.filter((name, index, array) => {

      return array.indexOf(name) === index; 

    }); 

    return duplicateEliminatedArray; 

  },

  getTargetEmployeeData: function (employeeName) {

    const ss = ''; 

    const taskSheet = ''; 
    const taskSheetName = ''; 

    const trainingSheet = ''; 
    const trainingSheetName = ''; 
    

    const taskSheetDataRange = ''; 
    const taskSheetTotalDataArray = ''; 

    const taskSingleRowArray = ''; 


  }, 

  setStatusHighlighting: function (spreadSheet, rowNum, rowStatus) {

    const targetSheet = spreadSheet.getActiveSheet(); 
    const targetRange = targetSheet.getRange(rowNum, 1, 1, targetSheet.getLastColumn()); 
    Logger.log("Status highling function in progress! ;-)")
    Logger.log("RowStatus Value will come here") 
    Logger.log(rowStatus); 
    Logger.log("Row number will come here") 
    Logger.log(rowNum); 
    targetRange.clearFormat(); 

    if (rowStatus === "Not Started") {
      targetRange
      .setBackground("white")
      .setFontStyle('normal')
      .setFontColor('black'); 
    } else if ( rowStatus === "In Progress") {
      targetRange
      .setBackground("#f37735")
      .setFontStyle("bold")
      .setFontStyle("italic")
      .setFontColor("white"); 
    } else if (rowStatus === "Pending Input") {
      targetRange
      .setBackground("#ffc425")
      .setFontStyle("italic")
      .setFontColor("red"); 
    } else if(rowStatus === "Stuck") {
      targetRange
      .setBackground("#d11141")
      .setFontColor("white")
      .setFontWeight('bold') 
    } else if( rowStatus === "Done") {
      targetRange
      .setBackground("#00b159")
      .setFontColor("white")
      .setFontStyle("italic")
      .setFontLine('line-through'); 
    } else if(rowStatus === "Skipped") {
      targetRange
      .setBackground("#aa6f73")
      .setFontColor("white")
      .setFontStyle("italic")
      .setFontLine('line-through')
    } else if ( rowStatus === "New Task") {
      targetRange
      .setBackground("#00aedb")
      .setFontColor('white')
      .setFontWeight('bold')
    } else if ( rowStatus === "Paused") {
      targetRange
      .setBackground('grey')
      .setFontColor('white')
      .setFontStyle('italic'); 
    }  else {
      Logger.log("No matching criteria for status highlighting found"); 
    }; 

    Logger.log("Status Highlighting successfully applied")

  }

}; 

