async function notFound(ctx, next) {
  await next();

  if(ctx.status === 404) {
    ctx.status = 404;
    ctx.body = '<h1>杯具，您访问的页面丢失了！</h1>'
  }
}

module.exports = notFound;
