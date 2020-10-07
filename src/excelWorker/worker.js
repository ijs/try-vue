import XLSX from 'xlsx'
import { workBookToJSON } from './excel';

onmessage = function(e) {
  const [file] = e.data;
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, {type: 'array'});
    const json = workBookToJSON(workbook);
    postMessage(json);
  };

  reader.readAsArrayBuffer(file);
};
