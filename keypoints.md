# route handler-middlewares, which handles req and sends res - request handler in between are middlewares
# when we're adding err in app.use it should be the first order is err> req >res>next
# error handling using app.us("/", err, req,res,next) always keep it in the end
# best way of handling error is using try and catch but we can always keep app.use("/", err, req,res,send) at the end so anything breaks it handles it