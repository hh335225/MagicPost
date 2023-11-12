export function checkHeaderFooter(req, res, next) {
    // Xác định điều kiện để hiển thị header và footer dựa trên route
    res.locals.showHeaderAndFooter = !(req.baseUrl === '/');
    next();
  }