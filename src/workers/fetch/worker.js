// eslint-disable-next-line no-undef

var LRUCache = function (capacity) {
  this.cache = new Map();
  this.capacity = capacity;
};

LRUCache.prototype.get = function (key) {
  if (this.cache.has(key)) {
    // 存在即更新
    let temp = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, temp);
    return temp;
  }
  return null;
};

LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    // 存在即更新（删除后加入）
    this.cache.delete(key);
  } else if (this.cache.size >= this.capacity) {
    // 不存在即加入
    // 缓存超过最大值，则移除最近没有使用的
    // new Map().keys() 返回一个新的 Iterator 对象
    this.cache.delete(this.cache.keys().next().value);
  }
  this.cache.set(key, value);
};

const cache = new LRUCache(10)

onmessage = function (e) {
  const appId = e.data
  const query = {
    appId,
    framework: 'react',
    pageSize: 999,
    pageNum: 1
  }
  // eslint-disable-next-line no-console
  if (cache.get(appId)) {
    // eslint-disable-next-line no-console
    postMessage(cache.get(appId))
    return
  }
  // params to query string
  const params = Object.keys(query).map(key => `${key}=${query[key]}`).join('&')
  fetch(`http://127.0.0.1:7070/api/v1/open/template/list?${params}`, {
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json()).then(({data}) => {
    const result = []
    const rows = data.rows.filter(item => {
      const schemaPath = item.bundleSchemaAddr.split('/').pop()
      if (schemaPath.indexOf('base-schema') > -1) return false
      if (schemaPath.indexOf('draft-schema') > -1 && !/\d+-\w+-draft-schema/.test(schemaPath)) return false
      return true
    }).map((row, i) => fetch(row.bundleSchemaAddr).then(res => res.json())
       .then(res => {
         result[i] = {
           appId,
           templateId: row.id,
           name: row.name,
           path: row.path,
           methods: res.methods,
           dataSource: res.dataSource
         }
         return result[i]
    }).catch(e => {
      result[i] = {

        templateId: row.id,
        name: row.name,
        path: row.path,
        error: e
      }
      return result[i]
    }))
    // 需要切片下
    Promise.all(rows).then(res => {
      cache.put(appId, res)
      // eslint-disable-next-line no-console
      postMessage(res)
    })
  })
};
