import nodecron from 'node-cron'

nodecron.schedule('0 0 0 * * *', async () => {
  try {
    console.log("Running membership status check...");

    const today = new Date();

      // Update them to inactive
      await Trainee.updateMany(
        { endDate: { $lt: today }, isActive: true },
        { $set: { isActive: false } }
      );
      console.log("Expired memberships updated")

  } catch (error) {
    console.error("Error running membership cron:", error);
  }
});
* * * * * *
// 0 0 0 * * *