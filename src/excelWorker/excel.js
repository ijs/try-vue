import XLSX from 'xlsx';
// excel read json
export function workBookToJSON(workbook) {
  const result = workbook.SheetNames.reduce(function(acc, sheetName, index) {
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    if (sheet.length) {
      acc[index] = sheet;
    }

    return acc;
  }, []);

  return JSON.stringify(result, 2, 2);
}
