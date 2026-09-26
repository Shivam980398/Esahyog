const Complaint = require("../models/Complaint");

const ACTIVE_STATUSES = [
  "Pending",
  "Accepted",
  "Scheduled",
  "On the Way",
  "Inter-Dept Forwarded",
];

const escalateOverdueComplaints = async () => {
  try {
    const now = new Date();

    const fiveDaysAgo = new Date(now);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const criticalResult = await Complaint.updateMany(
      {
        createdAt: {
          $lte: sevenDaysAgo,
        },

        status: {
          $in: ACTIVE_STATUSES,
        },

        priority: {
          $ne: "critical",
        },
      },
      {
        $set: {
          priority: "critical",
          isStuck: true,
        },
      },
    );

    const highResult = await Complaint.updateMany(
      {
        createdAt: {
          $lte: fiveDaysAgo,
          $gt: sevenDaysAgo,
        },

        status: {
          $in: ACTIVE_STATUSES,
        },

        priority: {
          $nin: ["high", "critical"],
        },
      },
      {
        $set: {
          priority: "high",
          isStuck: true,
        },
      },
    );

    await Complaint.updateMany(
      {
        createdAt: {
          $lte: fiveDaysAgo,
        },

        status: {
          $in: ACTIVE_STATUSES,
        },
      },
      {
        $set: {
          isStuck: true,
        },
      },
    );

    await Complaint.updateMany(
      {
        status: {
          $nin: ACTIVE_STATUSES,
        },

        isStuck: true,
      },
      {
        $set: {
          isStuck: false,
        },
      },
    );

    if (criticalResult.modifiedCount > 0 || highResult.modifiedCount > 0) {
      console.log(
        `[Complaint SLA] Escalated ${highResult.modifiedCount} complaint(s) to HIGH and ${criticalResult.modifiedCount} complaint(s) to CRITICAL`,
      );
    }

    return {
      high: highResult.modifiedCount,
      critical: criticalResult.modifiedCount,
    };
  } catch (error) {
    console.error("[Complaint SLA] Escalation failed:", error.message);

    return {
      high: 0,
      critical: 0,
    };
  }
};

module.exports = {
  escalateOverdueComplaints,
};
