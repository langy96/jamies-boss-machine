module.exports = (req, res, next) => {
  const { numWeeks, weeklyRevenue } = req.body;

  const value = Number(numWeeks) * Number(weeklyRevenue);

  if (!numWeeks || !weeklyRevenue || value < 1000000) {
    return res.sendStatus(400);
  }

  next();
};
