function onEdit(e) {

const ss = SpreadsheetApp.getActiveSpreadsheet(); 
const sheet = ss.getActiveSheet(); 
const range = sheet.getRange(3, e.range.getColumn()); 
const value = range.getValue(); 
const totalTasksRange = sheet.getRange(6, 1, sheet.getLastRow() - 5, sheet.getLastColumn()); 
const totalTasksArray = totalTasksRange.getValues(); 

if(value === "Priority") {
  
  fun.reprioritizeTaskRow(fun.getEventData(e).activeDataRowArray, fun.getEventData(e).priority, totalTasksArray, sheet, e.range.getRow() - 6)
}; 

}; 