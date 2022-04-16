# 介绍
这是根据`黑马程序员`做的一个新闻大事件的后台接口项目，该项目包含了四个模块，用户、个人中心、文章分类、文章。都要有基本的增删改查。其中，个人中心、文章分类和文章模块都需要token身份验证。

# 接口文档

## 登录注册
### 1. 注册用户
```
URL: http://127.0.0.1:3007/api/reguser

method: POST

response: 
  {
    "status": 0,
    "message": "注册成功！"
  }
```

| 参数名| 类型 | 是否必传 | 说明 |
| ---     | --- | --- | --- |
|username |string | 是 | 账号名 |
|password |string | 是 | 密码（必须为6-18位字母、数字） |

### 1. 用户登录
```
URL: http://127.0.0.1:3007/api/login

method: POST

response: 
  {
    "status": 0,
    "message": "登录成功！",
    "token": "Bearer `${tokenStr}`"
  }
```

| 参数名| 类型 | 是否必传 | 说明 |
| ---     | --- | --- | --- |
|username |string | 是 | 账号名 |
|password |string | 是 | 密码 |


## 个人中心
### 1. 获取用户信息
```
URL: http://127.0.0.1:3007/my/userinfo

method: GET

response: 
  {
    "status": 0,
    "message": "获取用户信息成功！",
    "data": {
      "id": 10,
      "username": "libai",
      "nickname": null,
      "email": null,
      "user_pic": null
    }
  }
```

### 2. 更新用户信息
```
URL: http://127.0.0.1:3007/my/userinfo

method: POST

response: 
  {
    "status": 0,
    "message": "更新用户信息成功！"
  }
```
| 参数名| 类型 | 是否必传 | 说明 |
| ---     | --- | --- | --- |
|id |number | 是 | 用户id |
|nickname |string | 是 | 用户别名 |
|email |string | 是 | 用户邮箱（符合邮箱格式） |

### 3. 更新用户密码
```
URL: http://127.0.0.1:3007/my/updatepwd

method: POST

response: 
  {
    "status": 0,
    "message": "更新密码成功！"
  }
```

| 参数名| 类型 | 是否必传 | 说明 |
| ---     | --- | --- | --- |
|oldPwd |string | 是 | 旧密码 |
|newPwd |string | 是 | 新密码（新密码不能等于旧密码，且必须为6-18位字母、数字） |

### 4. 更新用户头像
```
URL: http://127.0.0.1:3007/my/update/avatar

method: POST

response: 
  {
    "status": 0,
    "message": "更换头像成功！"
  }
```

| 参数名| 类型 | 是否必传 | 说明 |
| ---     | --- | --- | --- |
|avatar |string | 是 | 用户头像（支持base46位照片，base46不能太长）|



## 文章分类
### 1. 获取所有文章分类
```
URL: http://127.0.0.1:3007/my/article/cates

method: GET

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
```
URL: http://127.0.0.1:3007/my/article/addcates

method: POST

response
  {
    "status": 0,
    "message": "新增文章分类成功！"
  }
```

| 参数名| 类型 | 是否必传 | 说明 |
| ---     | --- | --- | --- |
|name |string | 是 |分类名称 |
|alias |string | 是 |分类别名（字母或数字） |


### 3. 删除文章分类
```
URL: http://127.0.0.1:3007/my/article/deletecate/:id

method: DELETE

response:
  {
    "status": 0,
    "message": "删除文章分类成功！"
  }
```

| 参数名| 类型 | 是否必传 | 说明 |
| ---     | --- | --- | --- |
|id |number | 是 |文章分类id |


### 4. 获取文章分类
```
URL: http://127.0.0.1:3007/my/article/getcate/:id

method: GET

response:
  {
    "status": 0,
    "message": "获取文章分类数据成功！",
    "data": {
        "id": 3,
        "name": "数学",
        "alias": "ShuXue",
        "is_delete": 0
    }
  }
```

| 参数名| 类型 | 是否必传 | 说明 |
| ---     | --- | --- | --- |
|id |number | 是 |文章分类id |


### 5. 更新文章分类
```
URL: http://127.0.0.1:3007/my/article/updatecate

method: POST

response:
  {
    "status": 0,
    "message": "更新文章分类成功！"
  }

```

| 参数名| 类型 | 是否必传 | 说明 |
| ---     | --- | --- | --- |
|id |number | 是 |文章分类id |
|name |sting | 是 |文章分类名称 |
|alias |sting | 是 |文章分类别名（字母或数字） |
 

 ## 文章
 ### 1. 发布新文章
 ```
URL: http://127.0.0.1:3007/my/article/add

method: POST

response:
  {
    "status": 0,
    "message": "发布文章成功！"
  }

```

| 参数名| 类型 | 是否必传 | 说明 |
| ---     | --- | --- | --- |
|title |sting | 是 |文章标题 |
|cate_id |number | 是 |文章分类id |
|content |sting | 是 |文章内容 |
|state |sting | 是 |文章状态（只能有已发布或草稿） |
 

 ### 2. 删除文章
 ```
URL: http://127.0.0.1:3007/my/article/delete/:id

method: DELETE

response:
  {
    "status": 0,
    "message": "删除文章成功！"
  }
```

| 参数名| 类型 | 是否必传 | 说明 |
| ---     | --- | --- | --- |
|id |number | 是 |文章id |


### 3. 更新文章
 ```
URL: http://127.0.0.1:3007/my/article/update

method: POST

response:
  {
    "status": 0,
    "message": "更新文章成功！"
  }

```

| 参数名| 类型 | 是否必传 | 说明 |
| ---     | --- | --- | --- |
|id |number | 是 |文章id |
|title |sting | 是 |文章标题 |
|cate_id |number | 是 |文章分类id |
|content |sting | 是 |文章内容 |
|state |sting | 是 |文章状态（只能有已发布或草稿） |


### 4. 查看文章
 ```
URL: http://127.0.0.1:3007/my/article/get/:id

method: GET

response:
  {
    "status": 0,
    "message": "获取文章数据成功！",
    "data": {
        "id": 3,
        "title": "活着",
        "content": "发士大夫撒旦",
        "cover_img": "",
        "pub_date": "2022-03-30 21:45:06.803",
        "state": "已发布",
        "is_delete": 0,
        "cate_id": 1,
        "author_id": 9
    }
  }

```

| 参数名| 类型 | 是否必传 | 说明 |
| ---     | --- | --- | --- |
|id |number | 是 |文章id |


### 5. 获取所有文章
 ```
URL: http://127.0.0.1:3007/my/article/getall

method: GET

response:
  {
    "status": 0,
    "message": "获取文章数据成功！",
    "data": [
        {
            "id": 3,
            "title": "活着",
            "content": "发士大夫撒旦",
            "cover_img": "",
            "pub_date": "2022-03-30 21:45:06.803",
            "state": "已发布",
            "is_delete": 0,
            "cate_id": 1,
            "author_id": 9
        },
        {
            "id": 4,
            "title": "追风筝的人",
            "content": "美国的文章",
            "cover_img": "",
            "pub_date": "2022-04-04 00:18:30.309",
            "state": "已发布",
            "is_delete": 0,
            "cate_id": 1,
            "author_id": 9
        }
    ]
  }
```