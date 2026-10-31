const Computer = require("./../models/Computer");

exports.getComputer = async (req, res) => {
  try {
    const {
      brand,
      status,
      formFactor,
      minRam,
      maxRam,
      storageType,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;
    const filter = {};

    if (brand) filter.brand = new RegExp(`^${brand}$`, "i");
    if (status) filter.status = status;
    if (formFactor) filter.formFactor = formFactor;
    if (storageType) filter["specs.storageType"] = storageType;
    if (minRam || maxRam) {
      filter["specs.storageType.ramGb"] = {};
      if (minRam) filter["specs.ramGb"].$gte = Number(minRam);
      if (maxRam) filter["specs.ramGb"].$lte = Number(maxRam);
    }

    const pageNumber = Math.max(Number(page) || 1);
    const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 50);

    const skip = (pageNumber - 1) * limitNumber;

    const allowedSortFields = ["createdAt", "brand", "modelName"];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
    const sortOrder = order === "asc" ? 1 : -1;

    const [computers, total] = await Promise.all([
      Computer.find(filter)
        .sort({
          [sortField]: sortOrder,
        })
        .skip(skip)
        .limit(limitNumber),

      Computer.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      total,
      page: pageNumber,
      page: Math.ceil(total / limitNumber),
      data: computers,
    });
  } catch (err) {
    res.status(500).json({ message: err, success: false });

    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching computers",
      error: err.message,
    });
  }
};

exports.getComputerById = async (req, res) => {
  try {
    const computer = await Computer.findById(req.params.id);

    if (!computer) {
      return res
        .status(404)
        .json({ success: false, message: "Computer Not Found" });
    }
    res.status(200).json({ success: true, data: computer });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

exports.createComputer = async (req, res) => {
  try {
    const newComputer = await Computer.create(req.body);

    res.status(201).json({
      success: true,
      data: newComputer,
      message: "Computer created successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

exports.updateComputer = async (req, res) => {
  try {
    const { modifiedBy = "System Admin", notes, ...updateData } = req.body;
    const computer = await Computer.findById(req.params.id);
    if (!computer) {
      return res
        .status(404)
        .json({ success: false, message: "computer not found" });
    }

    computer.modificationsLog.push({
      modifiedBy,
      notes: notes || "updating computer record",
      changes: updateData,
    });

    Object.keys(updateDate).forEach((key) => {
      if (key === "specs") {
        computer.specs = { ...computer.specs, ...updateData.specs };
      } else {
        computer[key] = updateData[key];
      }
    });
    const updatedComputer = await computer.save();

    res.status(200).json({
      success: true,
      data: updatedComputer,
      message: "Computer updated successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

exports.deleteComputer = async (req, res) => {
  try {
    const computer = await Computer.findByIdAndDelete(req.params.id);

    if (!computer) {
      return res
        .status(404)
        .json({ success: false, message: "computer not found" });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "Computer deleted successfully",
    });
  } catch (err) {}
};
