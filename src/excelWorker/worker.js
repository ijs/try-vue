import XLSX from 'xlsx'
import { workBookToJSON } from './excel';

onmessage = function(e) {
  console.time('reader')
  const [file] = e.data;
  const reader = new FileReader();

  reader.onload = (e) => {
    console.timeEnd('reader')
    const data = new Uint8Array(e.target.result);
    console.time('xlsx')
    const workbook = XLSX.read(data, {type: 'array'});
    console.timeEnd('xlsx')
    console.time('data')
    const json = workBookToJSON(workbook);
    console.timeEnd('data')
    postMessage(json);
  };

  reader.readAsArrayBuffer(file);
};
