import XLSX from 'xlsx';
// excel read json
export function workBookToJSON(workbook) {
  console.time('start')
  const result = workbook.SheetNames.reduce(function(acc, sheetName, index) {
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    sheet.map((x, idx) => {
      x.key = idx
      return x
    })
    if (sheet.length) {
      acc[index] = sheet;
    }

    return acc;
  }, []);
  console.timeEnd('start')
  console.log('result',result)
  // return JSON.stringify(result, 2, 2);
  return result
}
