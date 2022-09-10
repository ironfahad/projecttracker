function onOpen(e) {
  SpreadsheetApp.getUi()
  .createMenu('CMYK')
  .addItem('Archive Completed Tasks', 'archiveCompleted')
  .addToUi(); 
}; 

function archiveCompleted() {

  const ss = SpreadsheetApp.getActiveSpreadsheet(); 
  const sheet = ss.getSheetByName('Assignments'); 
  const totalTasksRange = sheet.getRange(6, 1, sheet.getLastRow() - 5, sheet.getLastColumn()); 
  const totalTasksArray = totalTasksRange.getValues(); 
  

  const completedTasksArray = totalTasksArray.filter( task => {

    return task[3].includes('Done'); 
    
  }); 

  const otherTasksArray = totalTasksArray.filter( task => {
    return !task[3].includes('Done'); 
  })



  Logger.log("Completed tasks array will come here. lets see"); 

  Logger.log(completedTasksArray); 

  Logger.log("Other tasks array will come here"); 
  Logger.log(otherTasksArray); 

  totalTasksRange.clear(); 
  const otherTasksRange = sheet.getRange(6, 1, otherTasksArray.length, otherTasksArray[0].length); 
  otherTasksRange.setValues(otherTasksArray); 
  
  otherTasksArray.forEach(row => {

    // 1. we need to get status cell value 
    // 2. need to get row number 
    // 3. set the target range
    // 4. start conditional statement 
    // 5. set formatting parameters
     
     const statusCellValue = row[3]; 
     Logger.log(`status cell value is ${statusCellValue}`); 
     const rowNumber = otherTasksArray.indexOf(row) + 6
     Logger.log(`row number for optimizing loop is ${rowNumber}`); 
    
     formatRange = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()); 
     fun.setStatusHighlighting(ss, rowNumber, statusCellValue ); 
     
    

  });

  const targetArchiveSheet = ss.getSheetByName('Completed Tasks'); 
  const targetRange = targetArchiveSheet.getRange(targetArchiveSheet.getLastRow(), 1, completedTasksArray.length, completedTasksArray[0].length); 
  targetRange.setValues(completedTasksArray); 
  targetRange.setHorizontalAlignment("center"); 
  targetRange.clearFormat(); 


}


function onEdit(e) {

const ss = SpreadsheetApp.getActiveSpreadsheet(); 
const sheet = ss.getActiveSheet(); 
const range = sheet.getRange(3, e.range.getColumn()); 
const value = range.getValue(); 
const totalTasksRange = sheet.getRange(6, 1, sheet.getLastRow() - 5, sheet.getLastColumn()); 
const totalTasksArray = totalTasksRange.getValues(); 
const currentTaskTotalRange = sheet.getRange(e.range.getRow(), 1, 1, e.range.getLastRow()); 
let currentTaskTotalArray = currentTaskTotalRange.getValues(); 

if(value === "Priority") {

  // const priorityNewValue = e.range.getValue(); 
  // Logger.log("the new priority value for testing is ");
  // Logger.log(priorityNewValue); 
  // const newPendingInputValue = fun.getEventData(e).taskStatus; 
  
  fun.reprioritizeTaskRow(fun.getEventData(e).activeDataRowArray, fun.getEventData(e).priority, totalTasksArray, sheet, e.range.getRow() - 6)

  // fun.setStatusHighlighting(ss, priorityNewValue + 6, newPendingInputValue); 
  // fun.setStatusHighlighting(ss, fun.getEventData(e).priority + 6, fun.getEventData(e).taskStatus); 

  totalTasksArray.forEach(row => {

    // 1. we need to get status cell value 
    // 2. need to get row number 
    // 3. set the target range
    // 4. start conditional statement 
    // 5. set formatting parameters
     
     const statusCellValue = row[3]; 
     Logger.log(`status cell value is ${statusCellValue}`); 
     const rowNumber = totalTasksArray.indexOf(row) + 6
     Logger.log(`row number for optimizing loop is ${rowNumber}`); 
    
     formatRange = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()); 
     fun.setStatusHighlighting(ss, rowNumber, statusCellValue ); 

  }); 


} else if (value === "Status"){

  fun.setStatusHighlighting(ss, e.range.getRow(), fun.getEventData(e).taskStatus); 

} else if (value == "Task") {

  const taskID = Math.floor(Math.random() * 100000);
  const taskType = "Required"; 
  let startDate = new Date();  
  const statusValue = "New Task"; 
  const assignedPerson = "Mr. Fahad"; 
  const priorityvValue = ""; 

  currentTaskTotalArray[0][0] = taskID; 
  currentTaskTotalArray[0][1] = taskType; 
  currentTaskTotalArray[0][3] = statusValue; 
  currentTaskTotalArray[0][6] = startDate
  currentTaskTotalArray[0][4] = assignedPerson; 

  currentTaskTotalRange.clearFormat(); 
  currentTaskTotalRange.setValues(currentTaskTotalArray); 
  fun.setStatusHighlighting(ss, e.range.getRow(), fun.getEventData(e).taskStatus)

}; 


}; 