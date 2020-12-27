## 2.0.0 (2020-12-27)

##### Breaking Changes

*  change to functionality of jsonBody.  It now converts the response body to a json object ([87598791](https://github.com/ThatTokenGirl-utilities/http/commit/87598791b370657d50dc1d1ceb0bef12b47ee9cb))

##### New Features

*  add contentformatter middleware to format body of the request ([6c9003a3](https://github.com/ThatTokenGirl-utilities/http/commit/6c9003a3cc772f7a45f9f39f482123e1f6a96206))
*  add application/json to header for jsonbody ([e9851c6d](https://github.com/ThatTokenGirl-utilities/http/commit/e9851c6db553b0fced4bafbaf6e0d41fa0edabfe))

### 1.6.0 (2020-12-19)

##### New Features

*  add middleware to convert body to json string ([7900373e](https://github.com/ThatTokenGirl-utilities/http/commit/7900373e4e82fc1e8637fb8c4f9ecfdce1018ca4))

### 1.5.0 (2020-12-16)

##### Bug Fixes

*  properly check if header contains content type for application/json ([fbfa40b6](https://github.com/ThatTokenGirl-utilities/http/commit/fbfa40b6da136e2e4ab834b17c0637653d4a09bf))

### 1.5.0 (2020-12-16)

#### 1.4.2 (2020-12-03)

##### Bug Fixes

* **testing:**  allow handler for path to return null to indicate that it's not handled ([e82eacff](https://github.com/ThatTokenGirl-utilities/http/commit/e82eacff632e12d2f513ce72bd6f3019ce5fe074))

#### 1.4.1 (2020-12-02)

### 1.4.0 (2020-12-02)

##### New Features

* **testing:**  path now acts as a decorator to a testhandler ([3f3deec0](https://github.com/ThatTokenGirl-utilities/http/commit/3f3deec00271cc0e02694f53f74179a055a90b0f))

#### 1.3.3 (2020-12-02)

##### Bug Fixes

* **testing:**  properly exporting testing library ([508dfbc0](https://github.com/ThatTokenGirl-utilities/http/commit/508dfbc064c3e032d1f990811c874cce98744f23))

#### 1.3.2 (2020-12-02)

##### Bug Fixes

* **testing:**  export httpmethods ([e35e1e42](https://github.com/ThatTokenGirl-utilities/http/commit/e35e1e4287aca60e33d057fcb6a5c231b1e1235f))

#### 1.3.1 (2020-12-01)

##### Bug Fixes

* **testing:**  fix to exporting testing library ([1dc63f81](https://github.com/ThatTokenGirl-utilities/http/commit/1dc63f819482614ca7779388226c29d0d3a51850))

### 1.3.0 (2020-12-01)

##### Bug Fixes

* **testing:**  add declaration file for testing ([a6bb5bd7](https://github.com/ThatTokenGirl-utilities/http/commit/a6bb5bd70565b45f3d353fcd063dc9a09f8bf8d7))

### 1.2.0 (2020-12-01)

#### 1.1.2 (2020-11-28)

##### New Features

* **middleware:**  middleware to add a base url to all requests ([6b04b5e8](https://github.com/ThatTokenGirl-utilities/http/commit/6b04b5e8f156f3cec2e5c8e8fc1e5fc65d6c4d14))

#### 1.1.1 (2020-11-28)

##### Bug Fixes

*  output for public api ([e7321cfc](https://github.com/ThatTokenGirl-utilities/http/commit/e7321cfcbcd26ccd7992646c7ba1fc28c52634f3))

### 1.1.0 (2020-11-28)

##### Breaking Changes

*  httpClientFactory no longer takes middleware arguments.  Use addMiddleware instead ([3432cbf4](https://github.com/ThatTokenGirl-utilities/http/commit/3432cbf49e02027e18c0bf6f52d0242138bbba6f))

##### Chores

*  Move fetch requester factory to requests folder ([a0f1b35e](https://github.com/ThatTokenGirl-utilities/http/commit/a0f1b35e8fb083c5c9283008b9069c2f033a21f0))

##### New Features

*  decorator function to create a requester with middleware ([c4c91d4f](https://github.com/ThatTokenGirl-utilities/http/commit/c4c91d4fba072e46e98f830bc48c8230e25252e5))

#### 1.0.5 (2020-11-27)

##### Bug Fixes

*  properly set response headers for fetchrequester ([78b17daa](https://github.com/ThatTokenGirl-utilities/http/commit/78b17daa204e7f9b4e22f91cdc53f9403e230409))

#### 1.0.4 (2020-11-27)

##### Bug Fixes

*  export middleware types ([34809ea4](https://github.com/ThatTokenGirl-utilities/http/commit/34809ea41713615adbf84950394b589719fab10b))

#### 1.0.3 (2020-11-27)

##### Bug Fixes

*  export requesters ([a17c0e1b](https://github.com/ThatTokenGirl-utilities/http/commit/a17c0e1bce53bd15b6c10d3ca2111c1daf129fad))

#### 1.0.2 (2020-11-27)

##### New Features

* **requesters:**  add requester that uses fetch api ([0dfd29a6](https://github.com/ThatTokenGirl-utilities/http/commit/0dfd29a6fb1418ac0562e43763cbb7bc7c8cab9a))
* **headers:**  add method to convert headers to key, value pairs ([10d9ba65](https://github.com/ThatTokenGirl-utilities/http/commit/10d9ba6562e09902ef0663e13c0e547bf2f7d2b9))

#### 1.0.2 (2020-11-27)

##### New Features

* **headers:**  add method to convert headers to key, value pairs ([10d9ba65](https://github.com/ThatTokenGirl-utilities/http/commit/10d9ba6562e09902ef0663e13c0e547bf2f7d2b9))

#### 1.0.1 (2020-11-26)

##### Chores

*  remove unused package script and add .npmrc file ([88aa6a35](https://github.com/ThatTokenGirl-utilities/http/commit/88aa6a356eb1d076f6b366aeff16498df3386ad6))
*  add build folder ([6883f588](https://github.com/ThatTokenGirl-utilities/http/commit/6883f5888fc6e1432d1f220fd48f2c8b278656ec))
*  change lib folder back to src ([7c2c83e4](https://github.com/ThatTokenGirl-utilities/http/commit/7c2c83e4acd7b0bf9a22c59a4d7d8a9797756520))
*  setup package name, description, and main file ([e7cb2498](https://github.com/ThatTokenGirl-utilities/http/commit/e7cb2498e3e2891bce65a889159e809a4e4b2db8))
*  update scripts in package json ([6f2db750](https://github.com/ThatTokenGirl-utilities/http/commit/6f2db7508788893d4bc7f26fc8822a2071bc92d7))
*  rename src to lib ([9bf5890a](https://github.com/ThatTokenGirl-utilities/http/commit/9bf5890a6bec78f0b84171bb75b8834350388dca))
*  modify package.json for automate releases to npm ([5a353743](https://github.com/ThatTokenGirl-utilities/http/commit/5a35374397906860a0ef5224c3516a5b4b47ee6e))

##### Bug Fixes

*  export public api ([0d0a36df](https://github.com/ThatTokenGirl-utilities/http/commit/0d0a36df31dc954b842d9353e4947df6296414c1))

#### 1.0.1 (2020-11-26)

##### Chores

*  remove unused package script and add .npmrc file ([88aa6a35](https://github.com/ThatTokenGirl-utilities/http/commit/88aa6a356eb1d076f6b366aeff16498df3386ad6))
*  add build folder ([6883f588](https://github.com/ThatTokenGirl-utilities/http/commit/6883f5888fc6e1432d1f220fd48f2c8b278656ec))
*  change lib folder back to src ([7c2c83e4](https://github.com/ThatTokenGirl-utilities/http/commit/7c2c83e4acd7b0bf9a22c59a4d7d8a9797756520))
*  setup package name, description, and main file ([e7cb2498](https://github.com/ThatTokenGirl-utilities/http/commit/e7cb2498e3e2891bce65a889159e809a4e4b2db8))
*  update scripts in package json ([6f2db750](https://github.com/ThatTokenGirl-utilities/http/commit/6f2db7508788893d4bc7f26fc8822a2071bc92d7))
*  rename src to lib ([9bf5890a](https://github.com/ThatTokenGirl-utilities/http/commit/9bf5890a6bec78f0b84171bb75b8834350388dca))
*  modify package.json for automate releases to npm ([5a353743](https://github.com/ThatTokenGirl-utilities/http/commit/5a35374397906860a0ef5224c3516a5b4b47ee6e))

##### Bug Fixes

*  export public api ([0d0a36df](https://github.com/ThatTokenGirl-utilities/http/commit/0d0a36df31dc954b842d9353e4947df6296414c1))

#### 1.0.1 (2020-11-26)

##### Chores

*  add build folder ([6883f588](https://github.com/ThatTokenGirl-utilities/http/commit/6883f5888fc6e1432d1f220fd48f2c8b278656ec))
*  change lib folder back to src ([7c2c83e4](https://github.com/ThatTokenGirl-utilities/http/commit/7c2c83e4acd7b0bf9a22c59a4d7d8a9797756520))
*  setup package name, description, and main file ([e7cb2498](https://github.com/ThatTokenGirl-utilities/http/commit/e7cb2498e3e2891bce65a889159e809a4e4b2db8))
*  update scripts in package json ([6f2db750](https://github.com/ThatTokenGirl-utilities/http/commit/6f2db7508788893d4bc7f26fc8822a2071bc92d7))
*  rename src to lib ([9bf5890a](https://github.com/ThatTokenGirl-utilities/http/commit/9bf5890a6bec78f0b84171bb75b8834350388dca))
*  modify package.json for automate releases to npm ([5a353743](https://github.com/ThatTokenGirl-utilities/http/commit/5a35374397906860a0ef5224c3516a5b4b47ee6e))

##### Bug Fixes

*  export public api ([0d0a36df](https://github.com/ThatTokenGirl-utilities/http/commit/0d0a36df31dc954b842d9353e4947df6296414c1))

## 1.0.0 (2020-11-26)

##### Chores

*  Fix release scripts ([d22d04dc](https://github.com/ThatTokenGirl-utilities/http/commit/d22d04dcf446525498a61feab84bf6d035f4b435))
*  add generate change log ([0426f5b8](https://github.com/ThatTokenGirl-utilities/http/commit/0426f5b86b2b3ed854f616a3ec695062a00ae203))

##### New Features

* **middleware:**
  *  add contentType middleware ([7bec084a](https://github.com/ThatTokenGirl-utilities/http/commit/7bec084a491a7d2e30d45ada960855e7870b4c40))
  *  add logging and retry middleware ([9df7fd2b](https://github.com/ThatTokenGirl-utilities/http/commit/9df7fd2b2cfe3948e650f9dbb0e0cdec6cf96cd9))
* **headers:**  allow header functions to work on undefined headers ([5aa065c7](https://github.com/ThatTokenGirl-utilities/http/commit/5aa065c7a29a048402db3ed33d067242c59b3b22))
*  add method to clone and make changes to an http request object ([1cb0f3de](https://github.com/ThatTokenGirl-utilities/http/commit/1cb0f3def72feadae949ac94c99c9f676f71bd6b))
*  add http client factory and middleware support ([944e5472](https://github.com/ThatTokenGirl-utilities/http/commit/944e547200b66fb5462a4f9f20f83531cf66989c))

## 1.0.0 (2020-11-26)

##### Chores

*  add generate change log ([0426f5b8](https://github.com/ThatTokenGirl-utilities/http/commit/0426f5b86b2b3ed854f616a3ec695062a00ae203))

##### New Features

* **middleware:**
  *  add contentType middleware ([7bec084a](https://github.com/ThatTokenGirl-utilities/http/commit/7bec084a491a7d2e30d45ada960855e7870b4c40))
  *  add logging and retry middleware ([9df7fd2b](https://github.com/ThatTokenGirl-utilities/http/commit/9df7fd2b2cfe3948e650f9dbb0e0cdec6cf96cd9))
* **headers:**  allow header functions to work on undefined headers ([5aa065c7](https://github.com/ThatTokenGirl-utilities/http/commit/5aa065c7a29a048402db3ed33d067242c59b3b22))
*  add method to clone and make changes to an http request object ([1cb0f3de](https://github.com/ThatTokenGirl-utilities/http/commit/1cb0f3def72feadae949ac94c99c9f676f71bd6b))
*  add http client factory and middleware support ([944e5472](https://github.com/ThatTokenGirl-utilities/http/commit/944e547200b66fb5462a4f9f20f83531cf66989c))

