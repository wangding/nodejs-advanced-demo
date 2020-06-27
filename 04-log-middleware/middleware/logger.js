async function logger(ctx, next) {
  const start = Date.now();

  await next();
  const end  = Date.now();
  console.log(`${ctx.method} ${ctx.path} - ${end-start}ms`);
}

module.exports = logger;
