const worker = new Worker('./worker.js', { type: 'module' });

export default worker