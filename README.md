## 文章分类
### 1. 获取文章分类
```json
URL: http://127.0.0.1:3007/my/article/cates

method: GET 请求

response: 
  {
    "status": 0,
    "message": "获取文章分类数据成功！",
    "data": [
      {
        "Id": 1,
        "name": "科技",
        "alias": "KeJi",
        "is_delete": 0
      },
      {
        "Id": 2,
        "name": "历史",
        "alias": "LiShi",
        "is_delete": 0
      }
    ]
  }
```

### 2. 新增文章分类
```json
URL: http://127.0.0.1:3007/my/article/addcates
method: POST
data: {
  naem: string, 必传
  alias: string/字母、数字/ 必传
}
response：{
    "status": 0,
    "message": "新增文章分类成功！"
}

```

### 3. 根据id删除文章分类
```json
URL: http://127.0.0.1:3007/my/article/deletecate/:id
method: GET
params: {
  id: number 必传
}
response: {
    "status": 0,
    "message": "删除文章分类成功！"
}

```

### 3. 根据id获取文章分类
```json
URL: http://127.0.0.1:3007/my/article/getcate/:id
method: GET
params: {
  id: number 必传
}
response: {
    "status": 0,
    "message": "获取文章分类数据成功！",
    "data": {
        "Id": 1,
        "name": "科技",
        "alias": "KeJi",
        "is_delete": 1
    }
}

```

### 3. 根据id更新文章分类
```json
URL: http://127.0.0.1:3007/my/article/updatecate
method: GET
body: {
  id: number, 必传
  name: sting, 必传
  alias：string， 必传（字母或数字）
}
response: {
    "status": 0,
    "message": "更新文章分类成功！"
}

```