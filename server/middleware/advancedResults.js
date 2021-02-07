const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };

  const removeFields = ['select', 'sort', 'page', 'limit'];
  if (req.query.category === '' || req.query.category === 'all') {
    removeFields.push('category');
  }
  if (req.query.keyword === '' || req.query.keyword === 'nokeyword') {
    removeFields.push('keyword');
  }
  removeFields.forEach((param) => delete reqQuery[param]);

  //Add $ to the operators
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  if (req.query.keyword !== 'nokeyword') {
    query = model.find({
      title: { $regex: req.query.keyword, $options: 'i' },
    });
  } else {
    query = model.find(JSON.parse(queryStr));
  }

  //Filter
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');

    query = query.sort(sortBy);
  } else {
    query = query.sort('title');
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  const results = await query;

  const pagination = {};

  let finalResultPages;
  if (
    !req.query.category ||
    req.query.category === 'all' ||
    req.query.category === ''
  ) {
    if (req.query.keyword !== 'nokeyword') {
      finalResultPages = await model.countDocuments({
        title: { $regex: req.query.keyword, $options: 'i' },
      });
    } else {
      finalResultPages = await model.countDocuments();
    }
  } else {
    if (req.query.keyword !== 'nokeyword') {
      finalResultPages = await model.countDocuments({
        category: req.query.category,
        title: { $regex: req.query.keyword, $options: 'i' },
      });
    } else {
      finalResultPages = await model.countDocuments({
        category: req.query.category,
      });
    }
  }

  const currentSearchTotalPages = finalResultPages / limit;
  pagination.totalPages = Number(currentSearchTotalPages.toFixed(0));

  if (endIndex < finalResultPages) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
