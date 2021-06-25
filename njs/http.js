function redirect(r) {
  var ip = r.headersIn["X-Real-Ip"];
  
  r.subrequest("/proxy/" + ip).then((res) => {
    var parsed = JSON.parse(res.responseText);
    
    r.warn('parsed.isCN:' + parsed.isCN);
    if (parsed.isCN) {
      r.internalRedirect('@local');
    } else {
      r.internalRedirect('@remote');
    }
  });
}

export default { redirect };