import Queue from "bull";
import { User } from "./models/user";
import { monitorWebscrape } from "./tasks/webscrape";

const webscrapeQueue = new Queue("webscrape", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

webscrapeQueue.process(async (job, done) => {
  const { id, userId } = job.data;

  const user = await User.findOne({ _id: userId });

  await monitorWebscrape(user);

  // transcode video asynchronously and report progress

  job.progress(15);
  job.progress(50);
  job.progress(75);

  // call done when finished
  done(null, {
    status: "successful",
  });

  // or give a error if error
  done(new Error("error transcoding"));
});

webscrapeQueue.on("progress", (job) => {
  const progress = job.progress();
  console.log(progress);

  // task.progress = progress
  console.log("progress");
});

webscrapeQueue.on("completed", async (job) => {
  const userId = job.data.userId;
  console.log("Completeddd!!");

  const user = await User.findOne({ _id: userId });

  // if (user) {
  //   if (user.numOfLogins < 1) {
  //     user.numOfLogins = 1;
  //   } else {
  //     user.numOfLogins += 1;
  //   }
  //   await user.save();
  //   console.log(user);
  // }
});

export { webscrapeQueue };
