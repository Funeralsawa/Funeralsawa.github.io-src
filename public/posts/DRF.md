# DRF

**Django Rest Framework**

## API接口

- 市面上大部分公司开发人员使用的接口规范主要有：`restful`、`RPC`

### RPC[了解]

RPC(Remote Procedure Call)，这种接口一般以服务或者过程式代码提供。

- 服务器提供一个**唯一的访问入口地址**

- 客户端请求服务端的时候，所有的操作都理解为**动作(action)**，如果是web开发时，对应的就是`Http`请求的`post`请求。

- 通过**请求体**参数，指定要调用的接口名称和接口所需的参数。

    ```http
    http://api.xxx.com/?action=get_all_student&class=301&sex=1
    ```

- 基本上实现RPC的数据传输格式：`protobuf(GO语言的gRPC框架衍生)` 、`json`、`xml`

**优点**：`RPC`的有点很明显，因为是单一入口，所以容易实现一些垂直业务，类似权限，限流，同时因为`rpc`直接通过请求体或请求参数直接表达对服务器的操作，所以相对比较直观，而且因为函数名都是开发者自定义的，非常灵活。

**缺点**：缺点是当`RPC`的接口多了，对应的函数名和参数也就多了，客户端在请求服务器的`api`接口时就比较难找，对于年代久远的`RPC`服务端代码也容易出现重复的接口。



### Restful[掌握]

Restful是多入口的，它把服务端提供的所有数据/文件都看成资源，那么通过`API`接口向服务端请求数据的操作，本质上来说就是对资源的操作了。因此Restful中要求当前接口对外提供对哪种资源的操作，就<font color=red>**把资源名称写在`url`地址**</font>。而被操作的资源就是资源状态的转换。如：

```http
http://xxx.yyy.com/api/settings/students/get_student_names/
```

简单而言：

- <font color=red>**把资源名称写在`url`地址**</font>
- <font color=red>**要严格按照`Http`请求方法来操作资源**</font>

`Http`请求方法分类：

```http
POST 	添加某一个数据
GET 	获取某一个数据
DELETE 	删除某一个数据
PUT 	修改某一个数据
PATCH 	修改某个数据的部分信息
OPTIONS 获取信息，关于资源的哪些属性是客户端可以改变的
```

#### 详细规范

REST，全称是`Representation State Transfer`，首次出现在2000年Roy Fielding的博士论文中。

`Restful`是一种专门为web开发而定义的`API`接口风格，尤其适用于前后端分离的应用模式中。

并非所有规范都需要要被严格遵守，而是有选择性地去遵守即可。

- ==域名==

    应该尽量把`API`项目部署在专用域名之下。

    ```http
    https://api.example.com/api/
    ```

- ==版本(version)==

    应该将`API`的版本号放入`URL`或请求头中。

    ```http
    https://api.example.com/api/1.0/foo
    ```

    ```http
    https://api.example.com/api/2.0/foo
    ```

- ==路径(Endpoint)==

    路径又称为终点。表示`API`的具体网址，每个网址代表一种资源

    1. **资源作为网址，只能有名词不能有动词，而且所用名词往往与数据库表名对应**

        ```http
        /getProduct
        ```

    2. **API当中的名词应该使用复数，无论子资源或者所有资源**

        ```http
        http://www.example.com/api/AppName/resr/products/1
        ```

- ==**Http动词(请求方法)**==

    对于资源的具体类型，由动词来表示

    ```http
    https://api.example.com/api/1.0/GET/zoos	列出所有动物园
    ```

- ==过滤信息(Filtering)==

    如果记录数量很多，服务器不能把它们全返回给用户。`API`应该提供参数，过滤返回结果。

- ==状态码(Status Codes)==

    - 1xx：表示当前请求持续中，没结束
    - 2xx：表示当前请求成功
    - 3xx：表示当前请求成功，但是服务器进行代理操作
    - 4xx：表示当前请求失败，主要是客户端发生了错误
    - 5xx：表示当前请求失败，主要是服务器发生了错误

- ==错误处理(Error handling)==

    如果状态码是4xx或者5xx，服务端应该向用户返回出错信息，一般来说返回信息中将`error`作为键名，出错信息作为键值即可。一般格式是`json`。

    ```json
    {
        error: "Invalid API key"
    }
    ```

- ==返回结果(Result)==

    `Restful`针对不同操作，服务器向用户返回的结果应该符合以下规范。

    - `GET/collections`：返回资源对象的列表
    - `GET/collections/ID`：返回单个资源字典
    - `POST/collections`：返回新生成的资源字典`json`
    - `PUT/collections/ID`：返回修改后的资源字典`json`
    - `DELETE/collections/ID`：返回一个空文档（空字符串，空字典）

- ==超媒体(Hypermedia API)==

    `Restful`规范最好做到在返回结果中提供链接，连向其他`API`方法，使用户不查文档也可以知道下一步应该做什么。例如`Github`的`API`就是这种设计。访问[api.github.com](https://api.github.com)会得到一个所有可用的`API`的网址列表。

    ```json
    {
        'current_url': "https://api.github.com/user",
        'authorizations_url': "https://api.github.com/authorizations"
    }
    ```

- ==其他==

    服务端返回的数据格式应该尽量使用`json`，避免使用`xml` 。

    

#### **`API`接口的幂等性**

`API`接口实现过程中会存在幂等性问题。也就是指客户端多次发起同样请求时是否对于服务端里的资源产生不同的结果。如果多次请求服务端结果一样，则是**幂等接口**，否则是**非幂等接口**。

一般而言，`Http`方法的幂等性如下：

| 请求方式  | 是否幂等 | 是否安全 |
| --------- | -------- | -------- |
| GET       | 幂等     | 安全     |
| POST      | 不幂等   | 不安全   |
| PUT/PATCH | 幂等     | 不安全   |
| DELETE    | 幂等     | 不安全   |

- 针对幂等不安全的接口，要进行参数的校验
- 针对不幂等不安全的接口，要做幂等性校验（增加唯一性判断）

*所谓幂等性校验，就是避免同一个接口反复提交*

==幂等性校验方式==

1. 增加唯一判断，给提交的数据字段设置唯一索引
2. 给提交的数据增加一个随机数或者`uuid`，如果两次数据的随机数一样则表示重复提交
3. 限流，或者强制刷新



## 序列化与反序列化

`API`接口开发，最核心常见的一个代码编写过程就是序列化，所谓序列化就是把数据转换格式变成`json`、`pickle`、`base64`等等。

序列化可以分成两个阶段：

1. **序列化**：把识别的数据转成指定格式提供给别人。

    例如：`django`中获取的数据默认是模型对象，但是模型对象数据无法直接提供给前端或者别的平台使用所以需要把数据进行序列化变成字符串或者`json`数据提供给别人。

2. **反序列化**：把别人提供的数据转换还原成我们需要的数据格式。

    例如：前端提供的`json`数据对`python`而言就是字符串，需要反序列化成字典。



## DRF概述

DRF（Django Rest Framework），是一个建立在`Django`之上的web应用子框架，可以快速地开发`REST API`接口应用。在`DRF`中提供了序列化器`Serialzier`的定义，可以帮助我们简化序列化和反序列的过程，并且为我们提供了丰富的类视图、扩展类、视图集来简化视图的编写工作。`DRF`还提供了认证、权限、限流、过滤、分页、接口文档等功能的支持。`DRF`还提供了一个测试`API`接口的可视化界面。



##  前提环境

DRF需要以下依赖：

- python3 (3.5以上)
- Django (2.2以上)



## 安装

```python
pip install djangorestframework

#在settings.py中增加应用
INSTALLED_APPS = [
    ...
    'rest_framework',
]
```





## 序列化器Serializer

### 作用

1. **序列化**：序列化器会把模型对象转换成字典，经过视图中的`response`对象以后变成`json`字符串返回给客户端。
2. **反序列化**：把客户端发送过来的数据经过视图中的`request`对象以后变成字典，序列化器可以把字典转化成模型。
3. **完成数据校验**：反序列化之后自动做数据校验功能。



### 定义序列化器

`DRF`中使用类来定义序列化器，必须**直接或间接继承自`DRF`中的`rest_framework.serializers.Serializer`**

```python
from rest_framework import serializers
# 序列化器基类：serializers.Serializer
# 常用序列化器类：ModelSerializer

class StudentExampleSerializer(serializers.Serializer):
    # 1. 声明要转换的字段
    id = serializers.IntegerField()
    name = serializers.CharField()
    sex = serializers.BooleanField()
    description = serializers.CharField() #注意没有TextField这个字段类型，所有的文本类型都用CharField来表示

    # 2. 如果当前序列化器继承的是ModelSerializer类，则需要声明调用的模型信息
    class Meta:
        model = None
        fields = "__all__"
    # 3. 验证代码的对象方法，格式一定要对，否则会报错
    def validate(self, attrs): # 这是固定的验证多字段的写法, attrs是客户端传递过来的字典数据
        pass
    
    '''
    def vaildate_<字段名>(self, data): # 这是验证单个字段的写法, data是客户端传递过来的字段值
        pass
    '''

    #4. 模型操作的代码,格式一定要对，否则会报错
    def create(self, validated_data): # 添加数据操作，添加数据以后，自动实现从字典转换为对象的操作
        pass

    def update(self, instance, validated_data): # 更新数据操作，更新数据以后，自动实现从字典转换为对象的操作
        pass

    # 删除操作和查询操作不需要实现，因为不需要转换为对象
```

**<font color=red>注意：Serializer不是只能为数据库模型类转换数据格式，也可以为非数据库模型类转换数据格式，Serializer是独立于数据库之外的存在</font>**



### 常用字段类型

*注：这些字段声明是提供给客户端显示的，所以序列化器有的一些数据库的字段并没有，同理数据库字段有的序列化器字段可能也没有*

| 字段                      | 模型字段                                                     | 字段构造方式                                                 |
| ------------------------- | ------------------------------------------------------------ | :----------------------------------------------------------- |
| **`BooleanField`**        | `models.BooleanField`                                        | `serializers.BooleanField()`                                 |
| **`CharField`**           | `models.CharField/TextField等`                               | `serializers.CharField(max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)` |
| **`EmailField`**          | `models.EmailField`                                          | `serializers.EmailField(max_length=None, min_length=None, allow_blank=False` |
| **`RegexField`**          | `models.CharField`                                           | `serializers.RegexField(regex=, max_length=None, min_length=None, allow_blank=False)` |
| **`SlugField`**           | `models.SlugField`                                           | `serializers.SlugField(max_length=None, min_length=None, allow_blank=False)`<br /><br />验证正则模式 [a-zA-Z0-9*-]+ |
| **`URLField`**            | `models.URLField`                                            | `serializers.URLField(max_length=None, min_length=None, allow_blank=False)` |
| **`UUIDField`**           | `models.UUIDField`                                           | `serializers.UUIDField(format='hex_verbose')`<br /><br />- `hex_verbose`：如“5ce0e9a5-5ffa-654b-cee0-1238041fb31a”， 是默认格式<br />- `hex`：如“5ce0e9a55ffa654bcee01238041fb31a”<br />- `int`：如”123456789012312313134124512351145145114“<br />- `urn：如”urn:uuid:5ce0e9a5-5ffa-654b-cee0-1238041fb31a“ |
| **`IPAddressField`**      | `models.IPAddressField`                                      | `serializers.IPAddressField(protocol='both', unpack_ipv4=False, **options)` |
| **`IntegerField`**        | `models.SmallIntegerField`<br />`models.IntegerField`<br />`models.BigIntegerField` | `serializers.IntegerressField(max_value=None, min_value=None)` |
| **`FloatField`**          | `models.FloatField`                                          | `serializers.FloatField(max_value=None, min_value=None)`     |
| **`DecimalField`**        | `models.DecimalField`                                        | `serializers.DecimalField(max_digits, decimal_places, coerce_to_string=None, max_value=None, min_value=None)`<br /><br />- `max_digits`：数字长度<br />- `decimal_places`：小数点位置 |
| **`DateTimeField`**       | `models.DateTimeField`                                       | `serializers.DateTimeField(format=api_settings.DATETIME_FORMAT, input_formats=None)`<br /><br />api_settings.DATETIME_FORMAT（时间格式）：`2025-04-06T22:05:33` |
| **`DateField`**           | `models.DateField`                                           | `serializers.DateField(format=api_settings.DATETIME_FORMAT, input_formats=None)` |
| **`TimeField`**           | `models.TimeField`                                           | `serializers.TimeField(format=api_settings.DATETIME_FORMAT, input_formats=None)` |
| **`DurationField`**       | `models.DurationField`                                       | `serializers.DurationField()`                                |
| **`ChoiceField`**         | 无                                                           | `serializers.ChoiceField(choices)`<br /><br />- `choices`与`Django`用法相同 |
| **`MultipleChoiceField`** | 无                                                           | `serializers.MultipleChoiceField(choices)`<br /><br />- `choices`与`Django`用法相同 |
| **`FileField`**           | `models.FileField`                                           | `serializers.FileField(max_length=None, allow_empty_file=False, use_url=UPLOADED_FILES_USE_URL)` |
| **`ImageField`**          | `models.ImageField`                                          | `serializers.ImageField(max_length=None, allow_empty_file=False, use_url=UPLOADED_FILES_USE_URL)` |
| **`ListField`**           | 无。对应的是`python`里的`list`                               | `serializers.ListField(child=, max_length=None, min_length=None)`<br /><br />- `child`：模型列表 |
| **`DictField`**           | 无。对应的是`python`里的`dict`                               | `serializers.ListField(child=)`<br /><br />- `child`：模型对象 |



#### 常用字段参数

| 参数名          | 作用                   |
| --------------- | ---------------------- |
| max_length      | 最大长度               |
| min_length      | 最小长度               |
| allow_blank     | 是否允许为空           |
| trim_whitespace | 是否去除字符串前后空格 |
| max_value       | 最大数值               |
| min_value       | 最小数值               |



#### 通用参数

| 参数名         | 作用                                                         |
| -------------- | ------------------------------------------------------------ |
| read_only      | 该字段是否仅用于序列化，默认False，表示客户端传数据给服务端的时候会不会校验当前字段 |
| write_only     | 该字段是否仅用于反序列化参数，默认False，也就是客户端给服务端 |
| required       | 该字段在反序列化时必须输入，默认True                         |
| default        | 反序列化时使用的默认值，默认为None                           |
| allow_null     | 该字段反序列化时是否允许传入None，默认False                  |
| validators     | 该字段反序列化时使用的验证器，属性值是一个集合，集合里放置这个字段的验证函数，函数接收一个参数表示字段值 |
| error_messages | 反序列化时验证出错了返回的包含错误字段与错误信息的字典，可以不设置 |
| label          | 用于HTML展示API界面时显示字段名，不写则默认使用模型字段名，前提是当前序列化器已经继承了`ModelSerializer` |
| help_text      | 用于HTML展示API页面时，显示字段的辅助帮助信息，不写则默认使用模型字段名，前提是当前序列化器已经继承了`ModelSerializer` |
| invalid        | 用于反序列化时候数据格式校对                                 |



## Serializer对象

### 创建Serializer对象

定义好`Serializer`类后，就可以创建`Serializer`对象了。这个对象帮我们进行序列化与反序列化的操作过程，减少我们的工作量。

- **构造方法**：

    ```python
    Serializer(instance=None, data=empty, many=False, context=**kwargs, partial=False)
    
    '''
    1. 用于序列化时，将模型类对象传入instance对象
    2. 用于反序列化时，将要被反序列的数据传入data参数，一般是request.body之类的
    3. 用于序列化时，当对多个模型对象进行序列化（也就是instance是一个QuerySet类型时），则需要声明many=True，如果是对单个模型对象序列化则不需要写。
    4. 除了instance和data参数之外，在构造Serializer对象时，还可通过context参数额外添加数据到序列化器中。
    5. partial参数表示对不存在的数据，不需要按照序列化器的字段列表进行验证，默认False
    '''
    
    # 常见写法
    Serializer = StudentSerializer(instance=student)
    Serializer = StudentSerializer(instance=student_list, many=True)
    Serializer = StudentSerializer(instance=student_list, context={"request": reuqest})
    
    ```
    
    - 序列化器声明以后**不会自动执行**，需要我们在视图中进行调用才可以。
    
    - 序列化器无法直接接收数据，需要在视图中实例化序列化器对象时把使用的数据通过instance传递过来
    
    - 序列化器的字段声明类似于我们前面使用过的模型
    
    - 开发`restful API`时，序列化器会帮我们把模型对象转换成字典
    
        
    
### 序列化

#### 使用示例

- `model`
```python
from django.db import models

# Create your models here.
class Student(models.Model):
    '''学生信息'''
    name = models.CharField(max_length=55, verbose_name='姓名')
    sex = models.BooleanField(default=True, verbose_name='性别')
    age = models.IntegerField(default=0, verbose_name='年龄')
    description = models.TextField(default='', verbose_name='描述')
    class_name = models.CharField(max_length=55, verbose_name='班级')

    class Meta:
        db_table = 'tb_student'
        verbose_name = '学生'
        verbose_name_plural = '学生'
```
- `serializers.py`

```python
class StudentSerializer(serializers.Serializer):
    # 1. 声明要转换的字段

    # 学生信息序列化器，这里是要序列化的模型字段。
    id = serializers.IntegerField()
    name = serializers.CharField()
    sex = serializers.BooleanField()
    description = serializers.CharField() #注意没有TextField这个字段类型，所有的文本类型都用CharField来表示
```
- `views.py`
```python
from django.shortcuts import render
from .models import Student
from django.http import JsonResponse
from django.views import View
from .serializers import StudentSerializer

# Create your views here.

class Student1View(View):
    def get1(self, request):
        # 1. 获取一个学生对象，这里获取的是第一个学生对象
        student = Student.objects.first()
        print(student)
        # 1. 实例化序列化器对象，把模型对象传入序列化器中转换数据格式
        serializer = StudentSerializer(instance=student, many=False)
        print(serializer.data)
        return JsonResponse(serializer.data, safe=False) # safe=False表示可以返回非字典类型的数据

    def get(self, request):
        # 1. 获取所有的学生对象
        students = Student.objects.all()
        # 2. 实例化序列化器对象，把模型对象传入序列化器中转换数据格式
        serializer = StudentSerializer(instance=students, many=True)
        print(serializer.data)
        return JsonResponse(serializer.data, safe=False)
```
- 前端输出

```json
[
    {
        "id": 1,
        "name": "hsz",
        "sex": true,
        "description": "why7wdhgwu8 j dionmwd"
    },
    {
        "id": 2,
        "name": "rfwef",
        "sex": true,
        "description": "sdawdawd"
    }
]
```

 

### 反序列化

#### 数据验证

使用序列化器进行反序列化时，需要对数据进行验证后，才能获得验证成功的数据保存成模型类对象。

在获取反序列化的数据前，必须调用**`is_valid()`**方法进行验证，验证成功返回True否则返回False

如果验证失败，可以通过序列化器对象的**`errors`**属性获取错误信息，返回字典。包含了字段和字段的错误。如果是非字段错误，可以通过修改`REST framework`配置中的`NON_FIELD_ERRORS_KEY` 来控制错误字典中的键名。

 验证成功，可以通过序列化器对象的**`validated_data`**属性获取数据。

在定义序列化器时，指明每个字段的序列化类型和选项参数，本身就是一种验证行为。

**验证器类型：**

- 内置验证器：`error_messages`、`validators`
- 外置验证器：
    - 多字段：`validate`
    - 单字段：`validate_<字段名>`

#### 函数and属性

- `is_validI()`：验证数据，不直接抛出异常，验证通过返回`True`
- `is_valid(raise_exception=True)`：验证数据，直接抛出异常，无返回值
- `save()`：自动调用序列化器中的`create()`函数或者`update()`函数
- `errors`：如果`is_valid`验证失败的话错误信息会传入这个属性
- `error_messages`：同上，但不能被`validate`函数自定义报错信息。
- `validated_data`：数据验证通过的话，验证通过的数据会传入这个属性
- `data`：获取序列化后的数据

#### *示例*

- 序列化器类

```python
from rest_framework import serializers

def check(data): # 自定义验证函数，data是要验证的字段的值
    if data != "你好":
        raise serializers.ValidationError(detail="数据不允许为空", code="name")
    return data

class StudentSerializer(serializers.Serializer):
    # 1. 声明要转换的字段
    id = serializers.IntegerField(read_only=True) # read_only=True表示只读字段，不能修改
    name = serializers.CharField(max_length=100, min_length=2, error_messages={
        "max_length": "姓名长度不能超过100个字符",
        "min_length": "姓名长度不能少于2个字符",
    })
    age = serializers.IntegerField(max_value=100, min_value=1, error_messages={
        "max_value": "年龄不能超过100岁",
        "min_value": "年龄不能小于0岁",
        "required": "年龄不能为空",
        "invalid": "年龄格式不正确",
    })
    sex = serializers.BooleanField(default=True, error_messages = {
        "required": "性别不能为空",
        "invalid": "性别格式不正确",
    }) # 默认值为True
    description = serializers.CharField(validators=[check]) #注意没有TextField这个字段类型，所有的文本类型都用CharField来表示
    
    # 也可以自己再定义错误信息
    def validate(self, attrs): # 这是固定的验证多字段的写法, attrs是客户端传递过来的字典数据
        # 1. 验证多个字段的值
        if len(attrs["password"]) < 20:
            raise serializers.ValidationError(detail="密码不能小于20", code="name_age")
        # 2. 验证单个字段的值
        if attrs["name"] == "root":
            raise serializers.ValidationError(detail="姓名不能为root", code="name")
        # attrs["name"] = "hello" #这样会覆盖客户端传递过来的数据
        return attrs # 返回验证通过的字典数据，这一步不可以少

    def validate_name(self, data): # 这是验证单个字段的写法, data是客户端传递过来的字段值
        print(data)
        if data == "张三":
            raise serializers.ValidationError(detail=f"姓名不能为{data}", code="name")
        return data #这一步不可以少
```

- 视图

```python
from django.shortcuts import render
from .models import Student
from django.http import JsonResponse
from django.views import View
from .serializers import StudentSerializer

# Create your views here.

class Student1View(View):
    def get(self, request):
        # 序列化器基本使用，反序列化器的使用

        # 1. 实例化序列化器对象，把字典数据传入序列化器中转换数据格式
        data = {
            "name": "李四",
            "age": 18,
            "sex": True,
            "class_name": "三年级一班",
            "description": "这是一个学生",
            "password": "123456",
        }

        # 实例化序列化器类用于反序列化
        serializer = StudentSerializer(data=data)

        # 2. 校验数据是否合法
        res = serializer.is_valid() #验证失败不会抛出异常
        
        # raise_exception=True表示校验不合法时，抛出异常，是常用方法，且此时异常会直接抛入终端和前端因此不需要再使用res接收验证结果
        # 如果验证失败则不会再执行后面的代码
        # serializer.is_valid(raise_exception=True)
        
        if res: 
            print("验证通过")
            print(serializer.validated_data) # 打印转换后的数据
        else: 
            print(serializer.errors) # 打印错误信息

        return JsonResponse("ok", safe=False)
```



#### 异常类

| 类名                                        | 作用                                   |
| ------------------------------------------- | -------------------------------------- |
| `serializers.ValidationError(detail, code)` | 用于`validate`函数抛出异常使得验证失败 |



#### 保存数据

前面的数据验证成功后，我们可以使用序列化器来完成数据的反序列化的过程，这个过程可以把数据转成模型类对象。可以通过实现`create()`和`update()`两个方法来实现。

*示例*：

- `serializers.py`

    ```python
    def create(self, validated_data): 
            '''添加数据操作，添加数据以后，自动实现从字典转换为对象的操作'''
            student = Student.objects.create(**{
                "name": validated_data["name"],
                "age": validated_data["age"],
                "sex": validated_data["sex"],
                "description": validated_data["description"],
                "class_name": validated_data["class_name"],
            })
            # 注意是可以把新增的模型对象作为返回值返回给serializer类的save方法中
            return student
    ```

- `views.py`

    ```python
    def get(self, request):
            '''保存数据'''
            data = {
                "name": "小明",
                "age": 18,
                "sex": True,
                "class_name": "三年级一班",
                "description": "dwdwd",
                "password": "12345611111111111111111111111111",
            }
            serialiazer = StudentSerializer(data=data)
            serialiazer.is_valid(raise_exception=True)
            '''
            save()源码中，根据实例化序列化器时候传入的参数有没有instance来判断使用create还是update方法
            如果传入了instance参数，则调用update方法，否则调用create方法
            如果调用create，则validated_data会被传入create方法中
            如果调用update，则会把instance对象和validated_data都传入到update方法中
            '''
            res = serialiazer.save()
            print(res)
            # 3. 返回数据，还可以使用serialiazer.data来获取序列化后的数据
            return JsonResponse(serialiazer.data, safe=False)
    ```

    

#### 修改数据

前面的数据验证成功后，我们可以使用序列化器来完成数据的反序列化的过程，这个过程可以把数据转成模型类对象。可以通过实现`create()`和`update()`两个方法来实现。

*示例*：

- `serializations.py`

    ```python
    def update(self, instance, validated_data): # 更新数据操作，更新数据以后，自动实现从字典转换为对象的操作
            '''更新数据操作，更新数据以后，自动实现从字典转换为对象的操作'''
            instance.name = validated_data.get("name", instance.name) # get方法可以设置默认值
            instance.age = validated_data.get("age", instance.age)
            instance.sex = validated_data.get("sex", instance.sex)
            instance.description = validated_data.get("description", instance.description)
            instance.class_name = validated_data.get("class_name", instance.class_name)
            instance.save() #这是模型对象的保存方法
            return instance
    ```

- `views.py`

    ```python
    def get(self, request):
            '''修改数据'''
            data = {
                "name": "小明",
                "age": 100,
                "sex": True,
                "class_name": "三年级一班",
                "description": "dwdwd",
                "password": "12345611111111111111111111111111",
            }
            student = Student.objects.filter(name=data["name"]).first()
            serialiazer = StudentSerializer(instance=student, data=data)
            serialiazer.is_valid(raise_exception=True)
            '''
            save()源码中，根据实例化序列化器时候传入的参数有没有instance来判断使用create还是update方法
            如果传入了instance参数，则调用update方法，否则调用create方法
            如果调用create，则validated_data会被传入create方法中
            如果调用update，则会把instance对象和validated_data都传入到update方法中
            '''
            res = serialiazer.save() # save也是有返回值的，这个返回值是create或者update方法赋予的
            print(res)
            # 3. 返回数据，还可以使用serialiazer.data来获取序列化后的数据
            return JsonResponse(serialiazer.data, safe=False)
    ```

#### 附加说明

1. 在使用序列器的`save()`函数进行保存数据时候，可以提供额外的数据，这些数据可以被`create()`和`update()`函数中的`validated_data`参数获取到。但是注意，**此时的`validated_data`参数和序列化器内的`validated_data`是不同的。

#### save函数的源码

```python
# 出现**kwargs，说明可以由开发者自己再提供一些数据进去，这与对象中的context是相同的
def save(self, **kwargs):
    validated_data = {**self.validated_data, **kwargs}

    if self.instance is not None:
        self.instance = self.update(self.instance, validated_data)
        assert self.instance is not None, (
            '`update()` did not return an object instance.'
        )
    else:
        self.instance = self.create(validated_data)
        assert self.instance is not None, (
            '`create()` did not return an object instance.'
        )

    return self.instance
```



### 一份完整的Serializer类

- `serializers.py`

    ```python
    #注意某些数据与上文有出入
    from rest_framework import serializers
    from .models import Student # 导入模型类
    # 序列化器基类：serializers.Serializer
    # 常用序列化器delSerializer类：Mo

    def check(data): # 自定义验证函数，data是客户端传递过来的字段值
        if not data:
            raise serializers.ValidationError(detail="数据不允许为空", code="name")
        return data

    class StudentSerializer(serializers.Serializer):
        # 1. 声明要转换的字段
        id = serializers.IntegerField(read_only=True) # read_only=True表示只在序列化时使用，反序列化时不使用
        name = serializers.CharField(max_length=100, min_length=2, error_messages={
            "max_length": "姓名长度不能超过100个字符",
            "min_length": "姓名长度不能少于2个字符",
        })
        age = serializers.IntegerField(max_value=100, min_value=1, error_messages={
            "max_value": "年龄不能超过100岁",
            "min_value": "年龄不能小于0岁",
            "required": "年龄不能为空",
            "invalid": "年龄格式不正确",
        })
        sex = serializers.BooleanField(default=True, error_messages = {
            "required": "性别不能为空",
            "invalid": "性别格式不正确",
        }) # 默认值为True
        description = serializers.CharField(validators=[check]) #注意没有TextField这个字段类型，所有的文本类型都用CharField来表示
        password = serializers.CharField(write_only=True, allow_null=True, error_messages={
            "required": "密码不能为空",
            "invalid": "密码格式不正确",
        }) # write_only表示只在反序列化时使用，序列化时不使用
        class_name = serializers.CharField(max_length=100, min_length=2, error_messages={
            "max_length": "班级长度不能超过100个字符",
            "min_length": "班级长度不能少于2个字符",
        })

        '''
        # 2. 如果当前序列化器继承的是ModelSerializer类，则需要声明调用的模型信息
        class Meta:
            model = None
            fields = "__all__"
        '''

        # 3. 验证代码的对象方法，格式一定要对，否则会报错
        def validate(self, attrs): # 这是固定的验证多字段的写法, attrs是客户端传递过来的字典数据
            # 1. 验证多个字段的值
            if len(attrs["password"]) < 20:
                raise serializers.ValidationError(detail="密码不能小于20", code="name_age")
            # 2. 验证单个字段的值
            if attrs["name"] == "root":
                raise serializers.ValidationError(detail="姓名不能为root", code="name")
            return attrs # 返回验证通过的字典数据

        def validate_name(self, data): # 这是验证单个字段的写法, data是客户端传递过来的字段值
            if data == "张三":
                raise serializers.ValidationError(detail=f"姓名不能为{data}", code="name")
            return data

        # #4. 模型操作的代码,格式一定要对，否则会报错
        # 添加数据操作，添加数据以后，自动实现从字典转换为对象的操作，需要视图调用save方法保存数据
        def create(self, validated_data): 
            '''添加数据操作，添加数据以后，自动实现从字典转换为对象的操作'''
            student = Student.objects.create(**{
                "name": validated_data["name"],
                "age": validated_data["age"],
                "sex": validated_data["sex"],
                "description": validated_data["description"],
                "class_name": validated_data["class_name"],
            })
            # 注意是可以把新增的模型对象作为返回值返回给serializer类的save方法中
            return student

        def update(self, instance, validated_data): # 更新数据操作，更新数据以后，自动实现从字典转换为对象的操作
            '''更新数据操作，更新数据以后，自动实现从字典转换为对象的操作'''
            instance.name = validated_data.get("name", instance.name) # get方法可以设置默认值
            instance.age = validated_data.get("age", instance.age)
            instance.sex = validated_data.get("sex", instance.sex)
            instance.description = validated_data.get("description", instance.description)
            instance.class_name = validated_data.get("class_name", instance.class_name)
            instance.save() #这是模型对象的保存方法
            return instance

    ```

- `views.py`

    ```python
    from django.shortcuts import render
    from .models import Student
    from django.http import JsonResponse
    from django.views import View
    from .serializers import StudentSerializer
    
    # Create your views here.
    
    class Student1View(View):
        def get1(self, request):
            # 1. 获取一个学生对象，这里获取的是第一个学生对象
            student = Student.objects.first()
            print(student)
            # 1. 实例化序列化器对象，把模型对象传入序列化器中转换数据格式
            serializer = StudentSerializer(instance=student, many=False)
            print(serializer.data)
            return JsonResponse(serializer.data, safe=False) # safe=False表示可以返回非字典类型的数据
        
        def get2(self, request):
            # 1. 获取所有的学生对象
            students = Student.objects.all()
            # 2. 实例化序列化器对象，把模型对象传入序列化器中转换数据格式
            serializer = StudentSerializer(instance=students, many=True)
            print(serializer.data)
            return JsonResponse(serializer.data, safe=False)
        
        def get3(self, request):
            # 序列化器基本使用，反序列化器的使用
    
            # 1. 实例化序列化器对象，把字典数据传入序列化器中转换数据格式
            data = {
                "name": "李四",
                "age": 18,
                "sex": True,
                "class_name": "三年级一班",
                "description": "dwdwd",
                "password": "12345611111111111111111111111111",
            }
    
            # 实例化序列化器类用于反序列化
            serializer = StudentSerializer(data=data)
    
            # 2. 校验数据是否合法
            res = serializer.is_valid() #验证失败不会抛出异常
            # res = serializer.is_valid(raise_exception=True) # raise_exception=True表示校验不合法时，抛出异常，是常用方法
            if res: 
                print("验证通过")
                print(serializer.validated_data) # 打印转换后的数据
                serializer.save() # 调用序列化器的create或update方法
            else: 
                print(serializer.errors) # 打印错误信息
    
            return JsonResponse("ok", safe=False)
        
        def get4(self, request):
            '''保存数据'''
            data = {
                "name": "小明",
                "age": 18,
                "sex": True,
                "class_name": "三年级一班",
                "description": "dwdwd",
                "password": "12345611111111111111111111111111",
            }
            serialiazer = StudentSerializer(data=data)
            serialiazer.is_valid(raise_exception=True)
            '''
            save()源码中，根据实例化序列化器时候传入的参数有没有instance来判断使用create还是update方法
            如果传入了instance参数，则调用update方法，否则调用create方法
            如果调用create，则validated_data会被传入create方法中
            如果调用update，则会把instance对象和validated_data都传入到update方法中
            '''
            res = serialiazer.save()
            print(res)
            # 3. 返回数据，还可以使用serialiazer.data来获取序列化后的数据
            return JsonResponse(serialiazer.data, safe=False)
        
        def get(self, request):
            '''修改数据'''
            data = {
                "name": "小明",
                "age": 99,
                "sex": True,
                "class_name": "三年级一班",
                #"description": "dwdwd",
                "password": "12345611111111111111111111111111",
            }
            student = Student.objects.filter(name=data["name"]).first()
            serialiazer = StudentSerializer(instance=student, data=data, partial=True)
            serialiazer.is_valid(raise_exception=True)
            '''
            save()源码中，根据实例化序列化器时候传入的参数有没有instance来判断使用create还是update方法
            如果传入了instance参数，则调用update方法，否则调用create方法
            如果调用create，则validated_data会被传入create方法中
            如果调用update，则会把instance对象和validated_data都传入到update方法中
            '''
            res = serialiazer.save() # save也是有返回值的，这个返回值是create或者update方法赋予的
            print(res)
            # 3. 返回数据，还可以使用serialiazer.data来获取序列化后的数据
            return JsonResponse(serialiazer.data, safe=False)
    ```



## 模型序列化器ModelSerializer

### 概述

如果想要序列化器对应的是`Django`的模型类，DRF提供了`ModelSerializer`模型类序列化器。使得我们可以快速构建一个`Serializer`类。

`ModelSerializer`与常规的`Serializer`用法基本相同，但是额外提供了

- 基于模型类自动生成的一系列序列化字段
- 基于模型类自动为`Serializer`生成`validators`，比如`unique_together`
- 包含默认的`create()`和`update()`的实现



### `Meta`类里的属性

| 属性                | 必填 | 含义                                                         | 可填值                                                       |
| ------------------- | ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `model`             | 是   | 序列化器的指定模型类                                         | 模型类名                                                     |
| `fields`            | 是   | 哪些字段需要被序列化器使用，包括模型类字段以及模型外字段     | 模型内字段名以及模型外字段名<br />`__all__`表示模型内所有字段 |
| `read_only_fields`  | 否   | `fields`属性里，定义只用于序列化阶段使用的字段               | 字段名，默认值为`[]`                                         |
| `write_only_fields` | 否   | `fields`属性里，定义只用于反序列化阶段使用的字段             | 字段名，默认值为`[]`                                         |
| `exclude`           | 否   | 排除模型里某个既不序列化也不反序列的字段，是`fields`的互斥属性，一般不用 | 字段名，默认值为`[]`                                         |
| `extra_kwargs`      | 否   | 对`fields`属性里某个字段进行额外的说明，使用字典来实现       | 字段名与说明内容组成的字典                                   |



### 定义ModelSerializer

### 示例

- `models.py`

    ```python
    from django.db import models
    
    # Create your models here.
    class Student(models.Model):
        '''学生信息'''
        name = models.CharField(max_length=55, verbose_name='姓名')
        sex = models.BooleanField(default=True, verbose_name='性别')
        age = models.IntegerField(default=0, verbose_name='年龄')
        description = models.TextField(default='', verbose_name='描述')
        class_name = models.CharField(max_length=55, verbose_name='班级')
    
        class Meta:
            db_table = 'tb_student'
            verbose_name = '学生'
            verbose_name_plural = '学生'
    ```

- `serializers.py`

    ```python
    class StudentModelSerializer(serializers.ModelSerializer):
        age = serializers.IntegerField(max_value=100, min_value=1, error_messages={
            "max_value": "年龄不能超过100岁",
            "min_value": "年龄不能小于0岁",
            "required": "年龄不能为空",
            "invalid": "年龄格式不正确",
        })
        password = serializers.CharField(min_length=8, write_only=True, allow_null=True, error_messages={
            "required": "密码不能为空",
            "invalid": "密码格式不正确",
            "min_length": "密码长度不能小于8个字符",
        }) # write_only表示只在反序列化时使用，序列化时不使用
    
        re_password = serializers.CharField(min_length=8, write_only=True, allow_null=True, error_messages={
            "required": "确认密码不能为空",
            "invalid": "确认密码格式不正确",
            "min_length": "确认密码长度不能小于8个字符",
        }) # write_only表示只在反序列化时使用，序列化时不使用
    
        def validate(self, attrs): # 这是固定的验证多字段的写法, attrs是客户端传递过来的字典数据
            if attrs["password"] != attrs["re_password"]:
                raise serializers.ValidationError(detail="两次密码不一致", code="name_age")
            # 由于确认密码字段是一个临时字段，所以在验证完成后需要删除,，所以可以在validate方法中删除
            # 避免在保存数据的时候出错（因为数据库中并没有这两个字段）
            # 这里的attrs是一个字典对象，pop方法可以删除字典中的指定键值对
            attrs.pop("re_password") # 删除确认密码字段
            attrs.pop("password") # 删除密码字段
            return attrs
    
        class Meta:
            model = Student # 指定模型类，必填
    
            # 指定要序列化的字段，fields表示指定字段，必填
            fields = ["name", "age", "sex", "description", "class_name", "password", "re_password"]
    
            #fields = "__all__"   # 指定要序列化的字段，__all__表示所有字段
    
            read_only_fields = ["id", "sex"] # 指定只读字段，read_only_fields表示只序列化字段，默认值为[]
            write_only_fields = ["password", "re_password"] # 指定只写字段，write_only_fields表示只反序列化字段，默认值为[]
    
            '''fields里的参数的额外说明可以放到这里
            extra_kwargs = {
                "age": {
                    "min_value": 1, # age字段的最小值
                    "max_value": 100, # age字段的最大值
                    "required": True, # age字段是必填字段
                    "error_messages": {
                        "required": "年龄不能为空",
                        "invalid": "年龄格式不正确",
                    },
                },
            }
            '''
    ```

- `views.py`

    ```python
    def get6(self, request):
            student = Student.objects.all()
            serializer = StudentModelSerializer(instance=student, many=True)
            return JsonResponse(serializer.data, safe=False)
        
        def get(self, request):
            '''ModelSerializer的反序列化阶段'''
            data = {
                "name": "小明",
                "age": 100,
                "class_name": "三年级一班",
                "description": "dwdwd",
                "Sex": True,
                "password": "12345611111111111111111111111111",
                "re_password": "12345611111111111111111111111111",
            }
            serializer = StudentModelSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
    ```

    

### 附加说明

对于一些复杂的数据库，如果多对多模型，`ModelSerializer`仍然会有效果。只不过处理过程会相对麻烦。例如在有外键的时候，`ModelSerializer`会自动把主键`id`设置为另一个表字段的显示内容。

例如有如下模型：

```python
class Tag(models.Model):
    name = models.CharField(max_length=50)

class Article(models.Model):
    title = models.CharField(max_length=100)
    tags = models.ManyToManyField(Tag)
```

可以直接使用`ModelSerializer`这样序列化`Article`：

```python
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
```

DRF 会默认把 `tags` 显示为主键 ID 列表：

```python
{
  "title": "Test Article",
  "tags": [1, 2, 3] # Tag模型对应的主键id
}
```

而如果想要在序列化`Article`时让`Tag`字段显示`name`属性，只需要使用==**嵌套序列化器**==。例如：

```python
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class ArticleSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'tags']
```

此时返回内容会变成：

```python
{
  "id": 1,
  "title": "Test Article",
  "tags": [
    {"id": 1, "name": "Python"},
    {"id": 2, "name": "Django"}
  ]
}
```

而在使用`create()`和`update()`函数的时候需要注意：

<p style="color: red; font-size: 1.4em;"><strong>嵌套序列化器是不能自动处理多表关联写入的，因此需要重写create()和update()函数</strong></p>





## Serializer和ModelSerializer对比

- `Serializer`
    - 字段声明（必选）
    - 字段验证（可选）
    - 添加/保存数据功能（可选）
- `ModelSerializer`
    - 字段声明（可选）
    - 验证（可选）
    - 添加/保存数据功能（已经自动实现基础的添加和保存功能）
    - `Meta`类声明（必选）

**如果数据需要从数据库中获取，则使用`ModelSerializer`，否则一般用`Serializer`**





## `Http`请求与响应

DRF除了在数据序列化部分简写代码外，还在视图中提供了简写操作。在`django.views.View`类的基础上，DRF封装了多个视图子类。其主要作用有：

- **控制序列化器的执行、检验、保存、转换数据**
- **控制数据库查询的执行**
- **调用请求类和响应类（这两个类是由DRF扩展的功能类）**

**类视图**

```python
from rest_framework.views import APIView
```



### 内容协商

在客户端和服务器之间的数据通信过程中，给予协议增加数据格式的声明，方便对端理解本端发送的数据格式和期望返回的数据格式。DRF实现的`Request`和`Response`子类都是基于内容协商来完成数据的转换的。

- **$request \rightarrow parser(http请求解析类) \rightarrow 识别客户端请求头中的Content-Type来完成数据转换 \rightarrow 类字典(QueryDict，字典的子类)$**
- **$response \rightarrow render(http响应渲染类) \rightarrow 识别客户端中的Accept来提取客户端期望的返回数据格式 \rightarrow 转成客户端期望的数据格式$**

```http
Content-Type: application/json;
Accept: application/json, text/html;
```

*如果请求头中并没有`Accept`，那么默认按照`Content_Type`格式来返回*

<p style="opacity: 0.8;">浏览器一般会带一个`Accept`请求头表示期望返回一个`text/html`格式的数据，而Django默认是没有内容协商的</p>



### `Request`

DRF传入视图的`request`对象不再是`Django`默认的`HttpRequest`对象，而是DRF提供的扩展类`Request`类的对象。DRF提供了`Parser`解析器，在接收到请求后会自动根据`Content-Type`指明的请求数据类型将请求数据进行解析，解析为类字典`QueryDict`对象保存到`Request`对象中。

**`Request`对象的数据是自动根据前端发送数据的格式进行解析之后的结果。无论前端发送的哪种格式的数据，都可以以统一的方式(`request.data`)读取客户端提交的数据。**

- 如果客户端提交的是`json`数据，则`request.data`得到的是一个`dict`字典
- 如果客户端提交的是表单数据，则`request.data`得到的是一个`QueryDict`类字典



#### 常用属性

| 属性名         | 含义                                                         |
| -------------- | ------------------------------------------------------------ |
| `data`         | 返回解析之后<font color=red>**请求体**</font>的数据，包含了对`POST`、`PUT`和`PATCH`的支持 |
| `query_params` | 查询参数，也叫查询字符串(query string)，**与`Django`标准的`request.GET`相同**，只是更换了名称 |
| `_request`     | 获取`Django`封装的`HttpRequest`对象                          |



#### 使用示例

- `views.py`

```python
from rest_framework.views import APIView
from rest_framework.response import Response

class StudentAPIView(APIView):
    def get(self, request):
        return Response({"code": 200, "msg": "ok"})
```



### `Response`

DRF提供了响应类`Response`，使用该类实例化响应对象时，响应的具体数据内容会被转换(renderer渲染器)成符合前端需求的数据。

DRF提供了`render`渲染器，用来根据请求头中的`Accept`参数来自动转换响应数据到对应格式。如前端并未声明`Accept`，则会采用`Content_Type`方式处理响应数据。可以通过配置来修改默认响应格式。

可以在`rest_framework/settings.py`查找所有的DRF默认配置选项。

```python
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': {
        'rest_framework.renderers.JSONRenderer', #json渲染器，返回json数据
        'rest_framework.renderers.BrowsableAPIRenderer', #浏览器API渲染器，返回测试界面
    }
}
```

**import**

```python
from rest_framework.response import Response
```



#### 构造方式

```pythonm
Response(data, status=None, template_name=None, headers=None, content-type=None)
```

- `data`：要传给前端的数据，DRF会自动使用`renderer`渲染器处理，只能是基础数据类型
- `status`：后端返回给前端的状态码，默认200，DRF中提供了一个HTTP响应状态码的文件
- `template_name`：模板名称，如果使用`HTMLRenderer`时需指明
- `headers`：用于存放响应头信息的字典
- `content_type`：**响应数据的**`Content_Type`，通常此参数无需传递，但如果偶尔需要后端强制性指定返回参数类型时需要指定



#### 常用属性

| 属性名        | 含义                                                       |
| ------------- | ---------------------------------------------------------- |
| `data`        | 传给`Response`对象的数据序列化后但尚未被`render`处理的数据 |
| `status_code` | 状态码的数字                                               |
| `status_text` | 状态码的信息                                               |
| `content`     | 经过`render`处理之后的响应数据，几乎不用                   |



#### 状态码

DRF的状态码也支持像`Django`那样直接写入数字，如`status=200`，但DRF提供了一个一目了然的状态码类。

**import **

```python
from rest_framework import status
```

- 消息告知

    - `HTTP_100_CONTINUE`
    - `HTTP_101_SWITCHING_PROTOCOLS`
- 成功

    - `HTTP_200_OK`
    - `HTTP_201_CREATED`
    - `HTTP_202_ACCEPTED`
    - `HTTP_203_NON_AUTHORITATIVE_INFORMATION`
    - `HTTP_204_NO_CONTENT`
- 重定向

    - `HTTP_300_MULTIPLE_CHOICES`
    - `HTTP_301_MOVED_PERMANENTLY`
    - `HTTP_302_FOUND`
    - `HTTP_303_SEE_OTHER`
    - `HTTP_304_NOT_MODIFIED`
    - `HTTP_306_RESERVED`
    - `HTTP_307_TEMPORARY_REDIRECT`
- 客户端错误

    - `HTTP_400_BAD_REQUEST`
    - `HTTP_401_UNAUTHORIZED`
    - `HTTP_402_PAYMENT_REQUIRED`
    - `HTTP_403_FORBIDDEN`
    - `HTTP_404_NOT_FOUND`
    - `HTTP_405_METHOD_NOT_ALLOWED`
    - `HTTP_406_NOT_ACCEPTABLE`
    - `HTTP_407_PROXY_AUTHENTICATION_REQUIRED`
    - `HTTP_408_REQUEST_TIMEOUT`
    - `HTTP_413_REQUEST_ENTITY_TOO_LARGE`
    - `HTTP_414_REQUEST_URI_TOO_LONG`
    - `HTTP_429_TOO_MANY_REQUESTS`
    - `HTTP_415_UNSUPPORTED_MEDIA_TYPE`
    - `HTTP_431_REQUEST_HEADER_FIELDS_TOO_LARGE`
- 服务器错误
    - `HTTP_500_INTERNAL_SERVER_ERROR`
    - `HTTP_501_NOT_IMPLEMENTED`
    - `HTTP_502_BAD_GATEWAY`
    - `HTTP_503_SERVICE_UNAVAILABLE`
    - `HTTP_504_GATEWAY_TIMEOUT`
    - `HTTP_505_HTTP_VERSION_NOT_SUPPORTED`
    - `HTTP_507_INSUFFICIENT_STORAGE`
    - `HTTP_511_NETWORK_AUTHENTICATION_REQUIRED`





## 视图

DRF视图的四大核心：**`APIView`、`GenericAPIView`、视图扩展类(Mixins)、视图集(ViewSet)**。

DRF提供视图的主要作用有：

- 控制序列化器的执行
- 控制数据库模型的操作



### 普通视图

#### `APIView`

##### import

```python
from rest_framework.views import APIView
```

##### 详细说明

`APIView`是DRF提供的所有视图类的基类，继承自`Django`的`View`类。其不同之处为：

- 传入到视图方法的是DRF中的`Request`对象而不是`Django`的`HttpRequest`对象
- 视图方法可以返回`DRF`的`Response`对象，视图会为响应数据设置`renderer`转换数据格式
- 任何`APIException`异常都会被捕捉到，并且处理成合适格式的响应信息返回给客户端
- 重新声明了一个`as_view()`方法并在`dispatch()`进行路由分发前会对客户端进行身份认证，权限检查，流量控制等

同时，`APIView`除了继承`View`原有的属性方法外，还新增了类属性：

- **`Authenticated_classes`：列表或元组，身份认证**
- **`permission_classes`：列表或元组，权限检查**
- **`throttle_classes`：列表或元组，流量控制**

在`APIView`中仍然以常规的类视图定义方法来实现`GET`，`POST`等请求方法

##### 示例

- `serializers.py`

    ```python
    from rest_framework import serializers
    from sers.models import Student
    
    class StudentModelSerializer(serializers.ModelSerializer):
        '''
        age = serializers.IntegerField(max_value=25, min_value=1, error_messages={
            'max_value': '年龄不能超过25岁',
            'min_value': '年龄不能小于1岁',
        })
        '''
        class Meta:
            model = Student
            fields = '__all__'
            extra_kwargs = {
                'age': {
                    'max_value': 25,
                    'min_value': 1,
                    'error_messages': {
                        'max_value': '年龄不能超过25岁',
                        'min_value': '年龄不能小于1岁',
                    },
                }
            }
    ```

- `views.py`

    ```python
    from django.shortcuts import render
    from rest_framework.views import APIView
    from rest_framework.response import Response
    from sers.models import Student
    from .serializers import StudentModelSerializer
    # Create your views here.
    
    class StudentAPIView(APIView):
        def get(self, request):
            '''获取所有学生信息'''
            instance_list = Student.objects.all()
            serializer = StudentModelSerializer(instance_list, many=True)
            serializer_data = serializer.data
            return Response(serializer_data)
    
        def post(self, request):
            '''添加学生信息'''
            serializer = StudentModelSerializer(data=request.data, many=False)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
    
    class StudentInfoAPIView(APIView):
        def get(self, request, pk):
            '''获取单个学生信息'''
            instance = Student.objects.get(pk=pk)
            serializer = StudentModelSerializer(instance)
            return Response(serializer.data) 
    
        def put(self, request, pk):
            '''更新学生信息'''
            instance = Student.objects.get(pk=pk)
            serializer = StudentModelSerializer(instance, data=request.data, many=False, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)
        
        def delete(self, request, pk):
            '''删除学生信息'''
            Student.objects.filter(pk=pk).delete()
            return Response(status=204)
    ```

    

#### `GenericAPIView`

##### import

```python
from rest_framework.generics import GenericAPIView
```



##### 详细说明

通用视图类，继承自`APIView`，主要增加了操作序列化器和数据库查询的方法，作用是为下面的`Mixin`扩展类的执行提供方法支持以及方便我们复用自己的代码。通常会在使用时搭配一个或多个`Mixin`扩展类。**主要需要掌握的就是2属性和4方法。**

##### 增加的属性和方法

- **属性**

    - **serializer_class**：指明视图使用的序列化器基类，值是一个序列化器类【掌握】
    - **`queryset`**：指明使用的数据查询集【掌握】
    - **`pagination_class`**：指明分页控制类
    - **`filter_backends`**：指明数据过滤控制后端，允许客户端通过地址栏传递参数

- **函数**

    - **`get_serializer_class(self)`**【掌握】

        当出现一个视图类中出现多个序列化器时，可通过条件判断在`get_serializer_class`方法中通过返回不同的序列化器类名就可以让视图函数执行不同的序列化器对象了。

        返回序列化器类，默认返回`serializer_class`，可以重写，如：

        ```python
        ```

    - **`get_serializer(self, args, *kwargs)`**【掌握】

        返回序列化器对象，主要用来提供给`Mixin`混入类使用，如果在视图中想要获取序列化器对象，也可以直接调用此方法。

        <div style="background-color: aqua">
            <p style="opacity: 0.8; color: green;">注意，该方法在提供序列化对象的时候，会向序列化器对象的context属性补充三个数据：request、
                format、view，这三个数据对象可以在序列化器内部使用。</p>
            <ul>
                <li>request：当前视图的请求对象</li>
                <li>view：当前请求的类试图对象</li>
                <li>format：当前请求期望返回的数据格式，不常用</li>
            </ul>
        </div>

    - **`get_queryset(self)`**【掌握】

        返回视图使用的查询集，主要用来提供给`Mixin`扩展类使用，是列表视图与详情视图获取数据的基础，默认返回`queryset`属性。可以重写，如：

        ```python
        def get_queryset(self):
            user = self.request.user
            return user.accounts.all()
        ```

    - **`get_object(self)`**【掌握】

        返回详情视图所需的1个模型类数据对象，主要用来提供给`Mixin`混入类使用。在视图中可以调用该方法获取详情信息的模型类对象。==若详情访问的模型类对象不存在则返回404==。该方法会默认使用`APIView`提供的`check_object_permissions`方法检查当前客户端是否有权限访问。示例：

        ```python
        class BookDetailView(GenericAPIView):
            queryset = BookInfo.objects.all()
            serializer_class = BookInfoSerializer
            
            def get(self, request, pk):
                '''获取一本书的信息'''
                book = self.get_object()
                serialzier = self.get_serializer(book)
                return Response(serializer.data)
        ```



##### 示例

```python
from rest_framework.generics import GenericAPIView

class StudentGenericAPIView(GenericAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentModelSerializer
    
    def get(self, request, pk=None):
        '''获取所有学生信息'''
        instance_list = self.get_queryset()
        serializer = self.get_serializer(instance_list, many=True)
        return Response(serializer.data)

    def post(self, request):
        '''添加学生信息'''
        serializer = self.get_serializer(data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class CourseGenericAPIView(GenericAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseModelSerializer
    
    def get(self, request, pk=None):
        '''获取所有学生信息'''
        instance_list = self.get_queryset()
        serializer = self.get_serializer(instance_list, many=True)
        return Response(serializer.data)

    def post(self, request):
        '''添加学生信息'''
        serializer = self.get_serializer(data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
```



### 五个视图混入类（扩展类）

作用：**提供了几种后端视图（对数据资源进行增删改查）处理流程的实现。**

这几个扩展类**需要搭配`GenericAPIView`通用视图基类**。因为其需要实现调用`GenericAPIView`提供的序列化器与数据库查询的方法。



#### `ListModelMixin`

列表视图混入类，提供**`list(request, *args, **kwargs)`**函数快速实现列表视图。返回200状态码。该`Mixin`的`list`方法会对数据进行过滤和分页。



#### `CreateModelMixin`

创建视图扩展类，提供**`create(request, *args, kwargs)`**函数快速实现创建资源的视图。成功返回201状态码。

如果序列化器对前端发送的数据验证失败，则返回400错误。



#### `RetrieveModelMixin`

详情视图扩展类。提供**`retrieve(request, *args, **kwargs)`**函数，可以快速返回一个存在的对象。

如果存在，返回2000，否则返回404。



#### `UpdateModelMixin`

更新视图扩展类。提供**`update(request, *args, **kwargs)`**函数，可以快速实现更新一个存在的对象。

同时也提供**`partial_update(request, *args, **kwargs)`**函数，可以实现局部更新。

成功返回200， 序列化器校验失败时，返回400错误。



#### `DestroyModelMixin`

删除视图扩展类，提供**`destroy(request, *args, **kwargs)`**函数，可以快速实现删除一个存在的数据对象。

成功返回204， 不存在返回404。



#### 示例

```python
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import CreateModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.mixins import DestroyModelMixin

class StudentListAPIView(GenericAPIView, ListModelMixin, CreateModelMixin):
    queryset = Student.objects.all()
    serializer_class = StudentModelSerializer
    def get(self, request):
        return self.list(request)
    
    def post(self, request):
        '''添加学生信息'''
        return self.create(request)


class StudentRetrieveAPIView(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Student.objects.all()
    serializer_class = StudentModelSerializer
    
    def get(self, request, pk):
        '''获取单个学生的信息'''
        return self.retrieve(request, pk=pk)
    
    def put(self, request, pk):
        '''更新学生信息'''
        return self.update(request, pk=pk, partial=True)
    
    def delete(self, request, pk):
        '''删除学生信息'''
        return self.destroy(request, pk=pk)
```





### 视图子类（9个）

**视图子类 = 通用视图类(GenericAPIView) + 模型混入类(Mixins)**

####  **`ListAPIView`**
`GenericAPIView` + `ListModelMixin`，列表视图子类，提供了`get`方法，内部调用了模型扩展类的`list`方法



#### **`CreateAPIView`**
`GenericAPIView` + `CreateModelMixin`，创建视图子类，提供了`post`方法，内部调用了模型扩展类的`create`方法



#### **`RetrieveAPIView`**
`GenericAPIView` + `RetrieveModelMixin`，详情视图子类，提供了`get`方法，内部调用了模型扩展类的`retrieve`方法



#### **`DestroyAPIView`**
`GenericAPIView` + `DestroyModelMixin`，删除视图子类，提供了`delete`方法，内部调用了模型扩展类的`destroy`方法



#### **`UpdateAPIView`**
`GenericAPIView` + `UpdateModelMixin`，更新视图子类，提供了`put`和`patch`方法，内部调用了模型扩展类的`update`方法或`update_partial`方法。



#### **`ListCreateAPIView`**
`GenericAPIView` + `ListModelMixin` + `CreateModelMixin`，提供了`get`和`post`方法



#### **`RetrieveUpdateAPIView`**
`GenericAPIView` + `RetrieveModelMixin` + `UpdateModelMixin`，提供了`get`、`put`、`patch`方法



#### **`RetrieveUpdateAPIView`**
`GenericAPIView` + `RetrieveModelMixin` + `UpdateModelMixin`，提供了`get`、`put`、`patch`方法



#### **`RetrieveDestroySPIView`**

`GenericAPIView` + `RetrieveModelMixin` + `DestroyModelMixin`，提供了`get`、`delete`方法



#### **`RetrieveUpdateDestroyAPIView`**

`GenericAPIView` + `RetrieveModelMixin` +` UpdateModelMixin` + `DestroyModelMixin`，提供了`get`、`put`、`patch`、`delete`方法



#### 示例

```python
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import UpdateAPIView
from rest_framework.generics import DestroyAPIView

class StuListAPIView(ListAPIView, CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentModelSerializer

class StuRetrieveAPIView(RetrieveAPIView, UpdateAPIView, DestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentModelSerializer
```





### 视图集(`ViewSet`)

#### 详细说明

视图集(`ViewSet`)可以将一系列视图相关的代码逻辑和相关的`Http`请求动作封装到一个类中。一般使用的方法名是：

- **`list()`**：提供一组数据
- **`retrieve()`**：提供单个数据
- **`create()`**：创建数据
- **`update()`**：更新某个数据
- **`destroy()`**：删除数据

`ViewSet`视图集不再限制视图方法名只允许`get()`、`post()`等这种情况了，而是 实现允许开发者根据自己的需要自定义方法名，然后经过路由中使用`Http`和这些视图的方法名进行绑定调用。

**视图集只在使用`as_view()`的方法时，允许将代表视图方法名的`action`动作与具体请求方式对应上。**



#### 路由的写法

==**views.StudentViewSet.as_view({"http请求方法名": "视图方法名", ...})**==



#### 示例

- `views.py`

    ```python
    '''使用ViewSet实现五个功能'''
    from rest_framework.viewsets import ViewSet
    
    class StudentListViewSet(ViewSet):
        def list(self, request):
            '''方法名是可以改变的'''
            instance_list = Student.objects.all()
            serializer = StudentModelSerializer(instance_list, many=True)
            return Response(serializer.data)
        
        def create(self, request):
            serializer = StudentModelSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=201)
        
        def retrieve(self, request, pk):
            instance = Student.objects.get(id=pk)
            serializer = StudentModelSerializer(instance)
            return Response(serializer.data)
        
        def update(self, request, pk):
            instance = Student.objects.get(id=pk)
            serializer = StudentModelSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=200)
        
        def destroy(self, request, pk):
            Student.objects.filter(pk=pk).delete()
            return Response(status=204)
    
    
    ```

- `urls.py`

    ```python
    # 视图集的路由写法：views.StudentViewSet.as_view({"http请求方法名": "视图方法名", ...})
        path("students4/", views.StudentListViewSet.as_view({"get": "list", "post": "create"}), name="students4"),
        re_path(r"students4/(?P<pk>\d+)/$", views.StudentListViewSet.as_view({
            "get": "retrieve",
            "put": "update",
            "delete": "destroy",
        }), name="student_info4"),
    ```



### 通用视图集(GenericViewSet)

可以使用`GenericAPIView`的属性和方法。

#### 示例

- `views.py`

    ```python
    from rest_framework.viewsets import GenericViewSet
    
    class StudentGenericViewSet(GenericViewSet):
        queryset = Student.objects.all()
        serializer_class = StudentModelSerializer
    
        def list(self, request):
            instance_list = self.get_queryset()
            serializer = self.get_serializer(instance_list, many=True)
            return Response(serializer.data)
        
        def create(self, request):
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=201)
        
        def retrieve(self, request, pk):
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        
        def update(self, request, pk):
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=200)
        
        def destroy(self, request, pk):
            instance = self.get_object()
            instance.delete()
            return Response(status=204)
    ```

- `urls.py`

    ```python
    # GenericViewSet的路由写法
    path("students5/", views.StudentGenericViewSet.as_view({"get": "list", "post": "create"}), name="students5"),
    re_path(r"students5/(?P<pk>\d+)/$", views.StudentGenericViewSet.as_view({
        "get": "retrieve",
        "put": "update",
        "delete": "destroy",
    })),
    ```

    

#### 使用通用视图集 + 模型扩展类

- `views.py`

    ```python
    # 通用视图集 + 模型扩展类，直接达到简写API的目的
    class StudentGenViewSet(GenericViewSet, ListModelMixin, CreateModelMixin, RetrieveModelMixin, 
                            UpdateModelMixin, DestroyModelMixin):
        queryset = Student.objects.all()
        serializer_class = StudentModelSerializer 
    ```

- `urls.py`

    ```python
    # 通用视图集 + 模型扩展类的路由函数
    path("students6/", views.StudentGenViewSet.as_view({"get": "list", "post": "create"}), name="students6"),
    re_path(r"students6/(?P<pk>\d+)/$", views.StudentGenViewSet.as_view({
        "get": "retrieve",
        "put": "update",
        "delete": "destroy",
    }), name="student_info6"),
    ```

    

#### 使用`ModelViewSet`

`ModelViewSet`继承于`GenericViewSet`, `ListModelMixin`, `CreateModelMixin`, `RetrieveModelMixin`, `UpdateModelMixin`, `DestroyModelMixin`。

因此直接继承`ModelViewSet`就可以达到上面的效果。

- `views.py`

    ```python
    # 直接使用ModelViewSet实现五个功能
    from rest_framework.viewsets import ModelViewSet
    
    class StudentModelViewSet(ModelViewSet):
        queryset = Student.objects.all()
        serializer_class = StudentModelSerializer
    ```

- `urls.py`

    ```python
    # ModelViewSet的路由写法
    path("students7/", views.StudentModelViewSet.as_view({"get": "list", "post": "create"}), name="students7"),
    re_path(r"students7/(?P<pk>\d+)/$", views.StudentModelViewSet.as_view({
        "get": "retrieve",
        "put": "update",
        "delete": "destroy",
    }), name="student_info7"),
    ```

    

#### 使用`ReadOnlyModelViewSet`

与`ModelViewSet`不一样的是，`ReadOnlyModelViewSet`只继承了`GenericViewSet`、`ListModelMixin`、`RetrieveModelMixin`。

- `views.py`

    ```python
    # 使用ReadOnlyModelViewSet实现只读API
    from rest_framework.viewsets import ReadOnlyModelViewSet
    
    class StudentReadOnlyModelViewSet(ReadOnlyModelViewSet):
        queryset = Student.objects.all()
        serializer_class = StudentModelSerializer
    ```

- `urls.py`

    ```python
    # 使用ReadOnlyModelViewSet的路由写法
    path("students8/", views.StudentReadOnlyModelViewSet.as_view({"get": "list"}), name="students8"),
    re_path(r"students8/(?P<pk>\d+)/$", views.StudentReadOnlyModelViewSet.as_view({
        "get": "retrieve",
    }), name="student_info8"),
    ```





## 路由集(`Routers`)

### 说明

对于视图集，除了可以自己手动指明请求方式与动作`action`之间的对应关系之外，还可以使用`Routers`来帮助我们快速实现路由信息。如果是非视图集，不需要使用路由集`Routers`。

DRF提供了两个`Router`类，使用方式一致。结果多一个或者少一个根目录的`url`地址的问题而已。

- **`SimpleRouter`**：线上运营项目一般用这个
- **`DefaultRouter`**：本地开发，项目上线前一般使用这个

需要导包：

```python
from rest_framework.routers imoprt SimpleRouter, DefaultRouter
```

注意：实际工作中其实很多接口并不能简单归类到数据库的增删改查里。例如登录，登出，投票等。



### 使用方法

```python
from rest_framework.routers import DefaultRouter, SimpleRouter

urlpatterns = [
    
]

# 实例化路由对象
router = DefaultRouter()
# 注册视图集，每次注册一个视图集类，就需要调用register方法
router.register("students9", views.StudentModelViewSet, basename="students9")

print(router.urls)  # 打印路由列表,router.urls是一个列表，里面存放的是路由对象
# 拼接路由列表到urlpatterns
urlpatterns += router.urls
```



### `router`形成`url`的方式

- `SimpleRouter`

    ```python
    SimpleRouter(prefix=路由前缀, viewset=视图集类, basename=路由别名)
    ```

- `DefaultRouter`同此



### 别名的生成方式

如[使用方法](#使用方法)中的例子，最终会生成如下的路由别名：

```python
url: ^students9/$		name= students9-list
url: ^students9/(?P<pk>[^/.]+)/$		name= students9-detail
```



### 添加到`django`的`urlpatterns`中的方式

1. 拼接

    ```python
    urlpatterns += router.urls
    ```

2. 直接在`urlpatterns`里`include`

    ```python
    re_path("", include(router.urls)),
    ```



### 视图集中附加`action`的声明

在视图集中，如果想要让`Router`自动为自定义视图方法生成路由信息，需要使用`rest_framework.decorators.action`装饰器。

`action`装饰器可以让开发者在视图中绑定要路由集生成的`url`地址。

`action`装饰器可以接收三个参数（一般只是用前两个参数）：

- **`methods`**：声明该`action`对应的请求方式，列表参数，值是一个列表如：`["GET", "POST"]`
- **`detail`**：声明该`action`的路径是否与单一资源对应，也就是是否生成附带`pk`值的`url`路径
    - `True`：表示路径格式是`xxx/<pk>/路由后缀/`
    - `False`：表示路径格式是`xxx/路由后缀/`
- **`url_path`**：声明该`action`的路由后缀。默认是视图方法名。

**示例**：

```python
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action

class StudentModelViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentModelSerializer

    @action(detail=False, methods=["get"], url_path="login")
    def login(self, request):
        '''自定义登录方法'''
        print(self.action) #获取视图方法名
        return Response({"msg": "登录成功"}, status=200)
    
# 此时的路径为：students9/login/
```





## 八大组件

### 认证`Authentication`

#### 基础使用

可以在配置文件中配置全局默认的认证方式/认证方案。

开发中常见的认证方式：`cookie`、`session`、`token`。

于`rest_framework/settings.py`中有默认的配置文件（只会影响DRF框架里的认证）：

```python
REST_FRAMEWORK = {
    # 配置默认认证方式的选项
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication', # Basic认证
        'rest_framework.authentication.SessionAuthentication', # Session认证
    ]
}
```

也可以在具体的视图类中通过设置**`authentication_classes`**类属性来设置单独的不同的认证方式:

```python
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.views import APIView

class ExampleView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    def get(self, request):
        pass
```

认证失败会有两种可能的返回值，这个需要配合权限组件来使用：

- **401`Unauthorized`**    未认证
- **403`Permission Denied`**    权限被禁止



#### 自定义认证方式

可以写一个新类，通过**继承`BaseAuthentication`**以及**重写`authenticate`函数**来自定义认证方式。如：

- `authentication.py`

    ```python
    from rest_framework.authentication import BaseAuthentication
    from django.contrib.auth.models import User
    
    class CustomAuthentication(BaseAuthentication):
        def authenticate(self, request):
            '''核心认证方法'''
            user = request.query_params.get('user')
            password = request.query_params.get('password')
            if user != 'acs' or password != '123':
                return None # 返回None相同于认证失败
            try:
                user = User.objects.get(username=user, is_superuser=True, is_active=True)
                return (user, None)  # 返回用户和None（没有认证凭据）
            	#(user, auth)，第二个值一般用于区别该用户是通过什么方式认证的，可以通过request.auth获取该用户的认证方式
            except User.DoesNotExist:
                return None
    ```

- `views.py`

    ```python
    from rest_framework.views import APIView
    from rest_framework.response import Response
    from .authentication import CustomAuthentication
    
    class AuthenticationView(APIView):
        # 局部认证属性，支持多个认证方式
        authentication_classes = [CustomAuthentication]
        def get(self, request):
            print(request.user)
            return Response({"message": "Hello, world!"})
    ```

甚至可以加入全局配置中：

```python
REST_FRAMEWORK = {
    # 配置认证方式的选项
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'component.authentication.CustomAuthentication', # 自定义认证
        'rest_framework.authentication.BasicAuthentication', # Basic认证
        'rest_framework.authentication.SessionAuthentication', # Session认证
    ]
}
```





### 权限`Permissions`

#### 基础使用

权限控制可以限制用户对于视图的访问和对于具体模型对象的访问。

- 在执行`APIView`视图的`dispatch()`方法中的`initial()`方法时，会先进行对视图访问权限的判断。
- 在执行`GenericAPIView`通过`get_object()`获取具体的模型对象时，会进行模型对象访问权限的判断。



可以在配置文件`rest_framework/settings.py`中全局设置默认的权限管理类，如：

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
    	'rest_framework.permissions.AllowAny', #允许任何用户访问站点视图
    ]
}
```



也可以在具体的视图类中通过属性`permission_classes`属性来进行局部设置，如：

```python
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
class PermissionAPIView(ModelViewSet):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated] #局部配置权限
    queryset = Student.objects.all()
    serializer_class = StudentModelSerializer
```



常用权限列表： 

```python
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly
```

| 权限                        | 作用                                         |
| --------------------------- | -------------------------------------------- |
| `AllowAny`                  | 允许任何用户                                 |
| `IsAuthenticated`           | 用户访问视图必须登录(`request.user`必须有值) |
| `IsAdminUser`               | 用户必须登录且必须为管理员                   |
| `IsAuthenticatedOrReadOnly` | 登录的用户可以进行修改，没有登录则只能查看   |



#### 自定义权限

如需自定义权限，需继承`rest_framework.permissions.BasePermission`父类，并实现以下两个方法的至少一个方法：

- **`has_permission(self, request, view)`**：是否可以访问视图，`view`表示当前的视图对象，`request`可以通过`user`属性获取当前用户。
- **`has_object_permission(self, request, view, obj)`**：是否可以访问模型对象，`view`表示当前视图，`obj`为模型数据对象。

示例：

- `permissions.py`

    ```python
    from rest_framework.permissions import BasePermission
    
    class IsVip(BasePermission): #VIP权限
        '''
        自定义权限，可用于全局配置，也可以用于局部配置
        '''
        def has_permission(self, request, view):
            user = request.query_params.get("id")
            return user == "vip"
        
        def has_object_permission(self, request, view, obj):
            from sers.models import Student
            if isinstance(obj, Student):
                user = request.query_params.get("id")
                return user == "vip"
    ```

- `views.py`

    ```python
    from rest_framework.viewsets import ModelViewSet
    from demo.serializers import StudentModelSerializer
    from rest_framework.authentication import SessionAuthentication
    from rest_framework.permissions import IsAuthenticated
    from .permissions import IsVip
    class PermissionAPIView(ModelViewSet):
        authentication_classes = [SessionAuthentication]
        permission_classes = [IsVip]
        queryset = Student.objects.all()
        serializer_class = StudentModelSerializer
    ```



同认证类，权限自定义类也可以放入默认权限设置中：

```python
REST_FRAMEWORK = {
    # 配置认证方式的选项
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'component.authentication.CustomAuthentication', # 自定义认证
        'rest_framework.authentication.BasicAuthentication', # Basic认证
        'rest_framework.authentication.SessionAuthentication', # Session认证
    ],

    'DEFAULT_PERMISSION_CLASSES': [
        # 'rest_framework.permissions.IsAuthenticatedOrReadOnly', # 认证权限
        'component.permissions.IsVip',
    ],
}
```



#### 认证与权限的区别

- 认证主要是识别客户端的访问者的身份，但是不能拦截客户端访问
- 权限基于认证来实现，但是可以针对不同身份的用户进行对应的**视图、模型访问的拦截**





### 限流Throttling

#### 基础使用

- 可以对接口访问的频次进行限制，以实现特定的业务
- 一般用于付费购买次数，投票等场景使用

可以在配置文件中，使用`DEFAULT_THROTTLE_CLASSES`和`DEFAULT_THROTTLE_RATES`进行全局配置。

```python
REST_FRAMEWORK = {
    # 限流全局配置
    'DEFAULT_THROTTLE_CLASSES': [
    	'rest_framework.throttling.AnonRateThrottle', #未认证用户(未登录用户)
    	'rest_framework.throttling.UserRateThrottle', #已认证用户(已登录用户)
    ],
    
    #频率限制全局配置
    'DEFAULT_THROTTLE_RATES': {
        # s：秒， m：分钟， h：小时， d：天
        'anon': '2/day', #未登录用户访问频率的限制，实际上DRF只识别首字母(d)，但是为了提高代码的维护性，建议写完整单词(day)
        'user': '5/day', #针对登录用户的访问频率进行限制
    }
}
```

一旦用户超过访问次数，则会返回**429(Too Many Requests)**。当服务器重启时，这个限制会清零。

关于限流类里访问频率的首字母，可以在`rest_framework.throttling.parse_rate`里自行添加配置。常用且默认的有：

1. `s`：秒
2. `m`：分
3. `h`：时
4. `d`：天

也可以在具体的视图中通过**`throttle_classes`**属性来配置，如：

```python
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
class ThrottlingAPIView(APIView):
    throttle_classes = [AnonRateThrottle, UserRateThrottle]
    def get(self, request):
        return Response("ok")
```



#### 可选限流类

- **`AnonRateThrottle`**

    限制所有匿名未认证用户，使用`IP`区分用户。使用`DEFAULT_THROTTLE_RATES[’anon‘]`来设置频次。

- **`UserRateThrottle`**

    限制认证用户，使用`User`模型的主键`id`来区分。使用`DEFAULT_THROTTLE_RATES[’user‘]`来设置频次。

- **`ScopedRateThrottle`**

    限制用户对于每个视图的访问频次，使用`ip`或者`user id`来区分。需要在视图中设定**`throttle_scope`**属性，如：

    - `views.py`

        ```python
        class ThrottlingAPIView(APIView):
            # throttle_classes = [AnonRateThrottle, UserRateThrottle]
            throttle_scope = "throttle" #重点
            def get(self, request):
                return Response("ok")
        ```

    - 主应用中`settings.py`

        ```python
        REST_FRAMEWORK = {
            # 限流全局配置
            'DEFAULT_THROTTLE_CLASSES': [
                'rest_framework.throttling.AnonRateThrottle', #未认证用户(未登录用户)
                'rest_framework.throttling.UserRateThrottle', #已认证用户(已登录用户)
                'rest_framework.throttling.ScopedRateThrottle', #以视图为识别单位进行限流
            ],
            
            'DEFAULT_THROTTLE_RATES': {
                'anon': '2/day', #未登录用户访问频率的限制，实际上DRF只识别首字母(d)，但是为了提高代码的维护性，建议写完整单词(day)
                'user': '5/day', #针对登录用户的访问频率进行限制
                'throttle': '1/m' #对于某个视图而使用的频率限制，对应视图中的`throttle_scope`属性
            }
        }
        ```






### 过滤Filtering

#### 基础使用

对于列表数据可能需要根据字段进行过滤，可以通过添加`django-filter`扩展来增强支持。

```python
pip install django-filter
```

并将其添加进`settings.py`：

```python
INSTALLED_APPS = [
    ...
    'django_filters',
]
```

然后在配置文件中增加过滤器类的全局设置：

```python
REST_FRAMEWORK = {
    ...
    #查询过滤，全局配置
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend'
    ]
}
```

也可以为当前列表视图的查询过滤器类单独设置：

```python
from django_filters.rest_framework import DjangoFilterBackend
filter_backends = [DjangoFilterBackend]
```

在视图中添加类属性`filterset_fields`（`django4.0`之前是`filter_fields`），指定可以过滤的字段：

```python
from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend
class FilterAPIView(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentModelSerializer
    filter_backends = [DjangoFilterBackend]
    # 设置当前列表视图的过滤字段
    filterset_fields = ["sex", "class_name"]
```

在浏览器中输入地址，加上过滤的字段名：

```http
http://127.0.0.1:8000/component/filter/?class_name=wqdwd
```

最终显示：

```json
HTTP 200 OK
Allow: GET, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

[
    {
        "id": 1,
        "name": "hsz",
        "sex": true,
        "age": 18,
        "description": "why7wdhgwu8 j dionmwd",
        "class_name": "wqdwd"
    }
]
```





### 排序Ordering

#### 基础使用

对于列表数据，`Rest Framework`提供了`OrderingFilter`过滤器来帮助我们快速指定字段进行排序.

使用方法：

在类视图中设置`filter_backends`，使用`rest_framework.filters.OrderingFilter`过滤器，`DRF`会在请求的查询字符串参数中检查是否包含了`ordering`参数，如果包含了`ordering`参数，则按照`ordering`参数指明的排序字段对数据集进行排序。前端可以传递`ordering`参数的可选字段值需要在`ordering_fields`属性中指明。

**配置文件**

```python
REST_FRAMEWORK = {
    ...
    'DEFAULT_FILTER_BACKENDS': [
        # 'django_filters.rest_framework.DjangoFilterBackend', #过滤
        'rest_framework.filters.OrderingFilter' #排序
    ]
}
```



**注意**

因为排序和过滤公用了一个配置项，所以如果排序和过滤要一起使用，则必须整个项目，要么全局一起设置过滤排序，要么一起局部过滤排序。绝不能出现一个全局，一个局部的情况，否则局部`filter_backends`会覆盖全局的`DEFAULT_FILTER_BACKENDS`配置。



#### 示例

**不使用过滤的情况下**

- `views.py`

    ```python
    from rest_framework.generics import ListAPIView
    
    class OrderAPIView(ListAPIView):
        queryset = Student.objects.all()
        serializer_class = StudentModelSerializer
        # 当前列表视图的排序字段
        ordering_fields = ["id", "age"]
    ```

- `http`

    ```http
    http://127.0.0.1:8000/component/order/?ordering=id    id表示使用id这个字段升序排列
    ```

    ```http
    http://127.0.0.1:8000/component/order/?ordering=-id    -id表示使用id这个字段降序排列
    ```

**使用过滤的情况下，排除配置项冲突**

- `views.py`

    ```python
    from rest_framework.filters import OrderingFilter
    from django_filters.rest_framework import DjangoFilterBackend
    class OrderAPIView(ListAPIView):
        queryset = Student.objects.all()
        serializer_class = StudentModelSerializer
        #局部设置过滤器类与排序类
        filter_backends = [DjangoFilterBackend, OrderingFilter] #会覆盖全局的DEFAULT_FILTER_BACKENDS，因此需要两个配置项
        ordering_fields = ["id", "age"]
        filterset_fields = ['sex']
    ```

    



### 分页Pagination

#### 基本使用

因为`Django`默认提供的分页主要用于前后端不分离的业务场景，所以`DRF`也提供了针对接口数据的分页支持。

可以在配置文件`settings.py`中设置全局的分页方式。如：

```python
REST_FRAMEWORK = {
    #列表分页全局配置
    #'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',  # 分页类，参数是limit和offset
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',  # 分页类，参数是page
    'PAGE_SIZE': 2,  # 每页显示的数量
}
```

也可在视图类里局部设置分页类属性（`pageination_class`）:

```python
from rest_framework.pagination import PageNumberPagination
from rest_framework.pagination import LimitOffsetPagination
class PageAPIView(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentModelSerializer
    pagination_class = None  # 禁用分页，如果需要分页可以设置为自定义分页类
```



#### 可选分页类

- **`PageNumberPagination`**，参数为`limit`和`offset`
- **`LimitOffsetPagination`**，参数为`page`

**`PageNumberPaginatio`有如下可选属性参数：**

| 参数名                  | 作用                                                         |
| ----------------------- | ------------------------------------------------------------ |
| `page_size`             | 每页数据量的数量，默认为`None`                               |
| `page_query_param`      | 前端发送的页数关键字，默认为`page`                           |
| `page_size_query_param` | 前端发送的参数名，这个参数名可以修改每页数据的数量，默认为`None`，也就是不允许前端修改每一页数量 |
| `max_page_size`         | 前端最多能设置的每页数量                                     |

**`LimitOffsetPagination`子类有如下可选参数：**

| 参数名               | 作用                                                         |
| -------------------- | ------------------------------------------------------------ |
| `default_limit`      | 默认每页显示的数量，默认值与`page_size`一致                  |
| `max_limit`          | 最大每页显示的数量，限制地址栏对每一页数据展示的最大数量，相当于`max_page_size`，默认为`None` |
| `limit_query_param`  | 可以通过查询参数来设置每页显示的数量，相当于`page_size_query_param` |
| `offset_query_param` | 可以通过查询参数来设置偏移量，相当于`page_query_param`       |

*`offset`为偏移量，表示从第几条数据开始分页返回，其实就是类似于`page`参数*



#### 返回数据的格式

```json
{
    "count": 8, #本次分页的总数据量
    "next": "http://127.0.0.1:8000/component/page/?limit=2&offset=2", #下一页数据所在地址，以LimitOffset为分页类
    "previous": null, #上一页数据的地址
    "results": [ # 当前页List数据的内容
        {
            "id": 1,
            "name": "hsz",
            "sex": true,
            "age": 18,
            "description": "why7wdhgwu8 j dionmwd",
            "class_name": "wqdwd"
        },
        {
            "id": 3,
            "name": "小明",
            "sex": true,
            "age": 99,
            "description": "dwdwd",
            "class_name": "三年级一班"
        }
    ]
}
```

```json
{
    "count": 8,
    "next": "http://127.0.0.1:8000/component/page/?page=2", #下一页数据所在地址，以PageNumber为分页类
    "previous": null,
    "results": [
        {
            "id": 1,
            "name": "hsz",
            "sex": true,
            "age": 18,
            "description": "why7wdhgwu8 j dionmwd",
            "class_name": "wqdwd"
        },
        {
            "id": 3,
            "name": "小明",
            "sex": true,
            "age": 99,
            "description": "dwdwd",
            "class_name": "三年级一班"
        }
    ]
}
```



#### 自定义分页类

例如在当前子应用下创建一个自定义分页类`pagination.py`，代码：

- `pagination.py`

    ```python
    from rest_framework.pagination import PageNumberPagination
    from rest_framework.pagination import LimitOffsetPagination
    
    class CustomPageNumberPagination(PageNumberPagination):
        page_size = 2  # 每页显示的数量
        page_query_param = 'page'  # 可以通过查询参数来设置页码
        page_size_query_param = 'page_size'  # 可以通过查询参数来设置每页显示的数量
        max_page_size = 10  # 最大每页显示的数量
        
    class CustomLimitOffsetPagination(LimitOffsetPagination):
        default_limit = 2  # 默认每页显示的数量
        max_limit = 10  # 最大每页显示的数量
        limit_query_param = 'limit'  # 可以通过查询参数来设置每页显示的数量
        offset_query_param = 'offset'  # 可以通过查询参数来设置偏移量
    ```

- `views.py`

    ```python
    from .pagination import CustomPageNumberPagination
    
    class CustomPageAPIView(ListAPIView):
        queryset = Student.objects.all()
        serializer_class = StudentModelSerializer
        pagination_class = CustomPageNumberPagination  # 使用自定义分页类
        
    class CustomLimitOffsetAPIView(ListAPIView):
        queryset = Student.objects.all()
        serializer_class = StudentModelSerializer
        pagination_class = CustomLimitOffsetPagination
    ```
  
- `url`

    ```http
    http://127.0.0.1:8000/component/customPage/?page=2&page_size=1
    ```

    ```http
    http://127.0.0.1:8000/component/customLimitOffsetPage/?limit=2&offset=2
    ```

- 返回的数据

    ```json
    {
        "count": 8,
        "next": "http://127.0.0.1:8000/component/customPage/?page=3&page_size=1",
        "previous": "http://127.0.0.1:8000/component/customPage/?page_size=1",
        "results": [
            {
                "id": 3,
                "name": "小明",
                "sex": true,
                "age": 99,
                "description": "dwdwd",
                "class_name": "三年级一班"
            }
        ]
    }
    ```

    ```json
    {
        "count": 8,
        "next": "http://127.0.0.1:8000/component/customLimitOffsetPage/?limit=2&offset=4",
        "previous": "http://127.0.0.1:8000/component/customLimitOffsetPage/?limit=2",
        "results": [
            {
                "id": 6,
                "name": "小明",
                "sex": true,
                "age": 18,
                "description": "dwdwd",
                "class_name": "三年级一班"
            },
            {
                "id": 7,
                "name": "小明",
                "sex": true,
                "age": 101,
                "description": "dwdwd",
                "class_name": "三年级一班"
            }
        ]
    }
    ```

    



### 异常处理Exceptions

#### 存在原因

`DRF`本身在`APIView`提供了异常处理，但是针对`DRF`内部现有的接口开发相关的异常进行格式处理，但是开发中我们还会使用到各种的数据或者进行各种网络请求，这些都有可能导致异常且这些异常在`DRF`中是没有进行处理的，所以就会冒泡给`Django`框架了，`Django`框架会进行组织错误信息，作为`html`页面返回给客客户端，在前后端分离项目中，可能`js`无法理解或者无法接收到这种数据，甚至导致`js`出现错误的情况。因此为了避免这种情况，可以自定义一个属于自己的异常处理函数，对于`DRF`无法处理的异常，我们自己编写异常处理的代码逻辑，使其不会冒泡到`Django`。

#### 基础使用

在`settings.py`中声明异常配置类：

```python
REST_FRAMEWORK = {
    ...
    # 自定义异常处理函数
    'EXCEPTION_HANDLER': 'rest_framework.views.exception_handler',  # 异常处理函数，这个是DRF默认的
}
```

自定义异常函数（假设在`demo`应用下的`exceptions.py`）：

```python
from rest_framework.views import exception_handler, Response

def custom_exception_handler(exc, context):
    '''
    自定义异常处理函数
    exc：异常示例对象，发生异常时实例化出来的
    context：字典，异常发生时python解释器会自动收集异常的执行上下文信息。报错时会包含请求信息、视图函数信息等
    '''
    # 1. 先让DRF处理它能处理的异常
    response = exception_handler(exc, context)
    if response is None:
        # 如果DRF没有处理这个异常，则返回一个自定义的响应
        if isinstance(exc, ValueError):
            return Response({"error": "自定义的ValueError异常处理"}, status=400)
        elif isinstance(exc, KeyError):
            return Response({"error": "自定义的KeyError异常处理"}, status=400)
        else:
            # 如果DRF没有处理这个异常，且不是ValueError或KeyError，则返回一个500错误
            return Response({"error": "服务器内部错误"}, status=500)
    # 2. 如果DRF处理了这个异常，则返回DRF处理后的响应
    return response
```

此时需要把`settings.py`中的异常处理函数改为：

```python
REST_FRAMEWORK = {
    ...
    # 自定义异常处理函数
    'EXCEPTION_HANDLER': 'demo.exceptions.custom_exception_handler',  # 自定义异常处理函数
}
```



#### `DRF`的内置异常类

| 类名                   | 解释                   |
| ---------------------- | ---------------------- |
| `APIException`         | 所有异常的父类         |
| `ParseError`           | 解析错误               |
| `AuthenticationFailed` | 认证失败               |
| `NotAuthenticated`     | 尚未认证               |
| `PermissionDenied`     | 权限拒绝               |
| `NotFound`             | 404未找到              |
| `MethodNotAllowed`     | 请求方式不支持         |
| `NotAcceptable`        | 要获取的数据格式不支持 |
| `Throttled`            | 超过限流次数           |
| `ValidationError`      | 校验失败               |
| `UnsupportedMediaType` | 不支持的媒体格式       |



### 自动生成接口文档

#### 接口文档说明

`DRF`可以自动生成接口文档，以网页的方式呈现。自动接口文档生成的是继承自`APIView`及其子类的视图。



#### coreapi

- 安装

    ```python
    pip install coreapi
    pip install setuptools #前置模块
    ```

- 在`settings.py`中配置接口文档的模块

    ```python
    INSTALLED_APPS = [
    	...
        'coreapi', #DRF提供的核心API功能
    ]
    
    REST_FRAMEWORK = {
        ...
        # 自定义API文档生成器
        'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',  # 使用CoreAPI生成API文档
    }
    ```

- 在总路由中添加接口文档路径

    ```python
    from rest_framework.documentation import include_docs_urls
    
    urlpatterns = [
        ...
        path('docs/', include_docs_urls(title='Dtest API Documentation', public=True, authentication_classes=[])),
    ]
    ```



#### 文档描述说明的定义位置

- 单一方法的视图，直接使用类视图的文档字符串，如：

    ```python
    class DocumentationAPIView(ModelViewSet):
        """
        测试API文档
        """
        serializer_class = StudentModelSerializer
        queryset = Student.objects.all()
    ```

- 多方法视图，在类视图的文档字符串中分开方法定义：

    ```python
    class ModelAPIView(ModelViewSet):
        """
        list 返回学生信息
        create 创建学生信息
        """
        serializer_class = StudentModelSerializer
        queryset = Student.objects.all()
    ```

     

## Admin站点管理

### 组件说明

`Django`内置了一个强大的组件叫`Admin`，提供给网站管理员快速开发运营后台的管理站点。

提醒：虽然`Django`内置的运营站点功能齐全，但是在实际工作中如果要实现高定制性后台运营站点，很多公司都是自己另行从0开始搭建或使用第三方插件对`Admin`站点进行增强美化。

`Admin`站点默认并没有提供其他操作给我们，所以一切功能都需要我们进行配置，在项目中，我们每次创建子应用的时候都会存在一个`admin.py`文件，这个文件就是用于配置`Admin`站点功能的文件。这些`admin.py`文件最终都会被项目运营的时候被`Django`加载并且识别。

### RBAC权限认证机制

RBAC(Role Base Access Control)，基于角色分配的访问控制权限。

在开发中，我们一般用于项目权限的分配机制无非三种：RBAC，Auth授权认证，RLS(Row Level Security，行级数据安全)。

在网站后台运营站点这种单个站点内部，单个站点集群场景下，一般使用的都是RBAC。

在对外开发的业务站点中，基于不同的渠道，不同的领域，不同的站点之间，一般都是使用OAuth2.0授权认证。

在对外开发的站点服务，如果配置多台前后台的租出模式，多数使用RLS权限机制。

### RBAC的实现

在实现过程中，因为项目业务的复杂程度不一致，所以存在有3表RBAC或5表RBAC的实现方案。`Django`的`Admin`站点实际上就是5表实现的方式扩展出来的6表RBAC认证机制。

#### 3表RBAC

使用三张表保存了权限相关的所有数据，这3张表分别是用户表(User)，组表(role/group/department)，权限表(permission/auth)。

常见的场景有：单个网站，小论坛，小商城，普通的后台站点。

