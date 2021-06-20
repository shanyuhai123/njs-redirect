function hello(r) {
  var result = { name: 'shanyuhai123' };

  r.headersOut["Content-Type"] = "application/json;charset=UTF-8";
  r.return(200, JSON.stringify(result));
}

export default { hello };