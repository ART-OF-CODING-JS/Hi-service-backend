const { report, users, service } = require("../../models/index-model");
const express = require("express");
const reportAdminRouter = express.Router();
const bearer = require("../../middleware/bearer");

reportAdminRouter.get("/readReports", bearer, handleReadReports);
reportAdminRouter.put("/confirmReport/:id", bearer, handleConfirmReports);
reportAdminRouter.put("/rejectReport/:id", bearer, handleRejectReports);

// read all reports for admin

async function handleReadReports(req, res) {
  const role = req.user.role;

  if (role !== "admin") {
    res.status(404).send("Access denied");
    return;
  }
  const readReports = await report.findAll();

  res.status(200).send(readReports);
}

// admin confirm the reports

async function handleConfirmReports(req, res) {
  const role = req.user.role;

  const { id } = req.params;
  if (role !== "admin") {
    res.status(404).send("Access denied");
    return;
  }

  const findReport = await report.findOne({ where: { id: id } });

  const updateStatus = await findReport.update({ status: "confirm" });

  const findService = await service.findOne({
    where: { id: findReport.serviceID },
  });

  const increaseCounter = await findService.increment("reportsCounter");

  if (increaseCounter.reportsCounter === 3) {
    const deleteUser = await users.destroy({
      where: { id: increaseCounter.userID },
    });
    res.status(204).send("Deleted");
    return;
  }

  res.status(201).send("The report confirm successfully");
}

// admin reject the reports

async function handleRejectReports(req, res) {
  const role = req.user.role;
  const { id } = req.params;

  if (role !== "admin") {
    res.status(404).send("Access denied");
    return;
  }

  const findReport = await report.findOne({ where: { id: id } });
  const findService = await service.findOne({
    where: { id: findReport.serviceID },
  });


   if(findReport.status !== null){
  const increaseCounter = await findService.decrement("reportsCounter");
    
   }
  const updateStatus = await findReport.update({ status: "reject" });
  res.status(201).send("The report reject successfully");
}
module.exports = reportAdminRouter;
