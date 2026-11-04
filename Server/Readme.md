const pairKey = [userId, receiverId]
  .sort()
  .join("_");

pairKey ব্যবহার করছি যাতে একই দুজনের মধ্যে বারবার নতুন conversation তৈরি না হয়।